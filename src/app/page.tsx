'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import StorySection from '@/components/StorySection';
import LevelProgress from '@/components/LevelProgress';
import DonationWidget from '@/components/DonationWidget';
import ActivityFeed from '@/components/ActivityFeed';
import ThankYouModal from '@/components/ThankYouModal';
import TrustFooter from '@/components/TrustFooter';
import AudioPlayer from '@/components/AudioPlayer';
import LiveCounter from '@/components/LiveCounter';
import SupporterGallery from '@/components/SupporterGallery';
import DailyLogs from '@/components/DailyLogs';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { supabase, fetchCurrentLevel, fetchActivityFeed, fetchTotalStats, insertDonation } from '@/lib/supabase';
import { MOCK_CURRENT_LEVEL, MOCK_STREAK_DAY } from '@/lib/constants';
import type { Level, ActivityFeedItem } from '@/lib/types';

function HomeContent() {
  const searchParams = useSearchParams();
  const [totalCollected, setTotalCollected] = useState(0);
  const [totalSupporters, setTotalSupporters] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Level>(MOCK_CURRENT_LEVEL);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [lastDonation, setLastDonation] = useState(0);
  const [lastTxnId, setLastTxnId] = useState<string | undefined>(undefined);
  const [recentDonors, setRecentDonors] = useState<{ name: string; amount: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [levelData, feedData, statsData] = await Promise.all([
          fetchCurrentLevel(),
          fetchActivityFeed(),
          fetchTotalStats()
        ]);

        if (levelData) setCurrentLevel(levelData as Level);
        if (feedData) setActivityFeed(feedData as ActivityFeedItem[]);
        if (statsData) {
          setTotalCollected(statsData.totalCollected);
          setTotalSupporters(statsData.totalSupporters);
        }
      } catch (err) {
        console.error("Error loading initial data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();

    // Setup Supabase Realtime Subscription
    const channel = supabase
      .channel('public_updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'donations' }, (payload) => {
        const newDonation = payload.new;
        if (newDonation.state === 'success') {
          setTotalCollected(prev => prev + Number(newDonation.amount));
          setTotalSupporters(prev => prev + 1);
          setCurrentLevel(prev => ({
            ...prev,
            collected_amount: Number(prev.collected_amount) + Number(newDonation.amount)
          }));
          // Add to recent donors for toast notification
          setRecentDonors(prev => [{ name: newDonation.name || 'Anonymous Supporter', amount: Number(newDonation.amount) }, ...prev].slice(0, 5));
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_feed' }, (payload) => {
        const newFeedItem = payload.new as ActivityFeedItem;
        setActivityFeed(prev => [newFeedItem, ...prev].slice(0, 10)); // Keep last 10
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'levels' }, async (payload) => {
        // When admin updates a level (e.g. active to complete), refetch the current active level
        const updatedLevel = await fetchCurrentLevel();
        if (updatedLevel) setCurrentLevel(updatedLevel as Level);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (searchParams) {
      const payment = searchParams.get('payment');
      const amount = searchParams.get('amount');
      const txnId = searchParams.get('txnId');
      if (payment === 'success' && amount) {
        setLastDonation(Number(amount));
        if (txnId) setLastTxnId(txnId);
        setShowThankYou(true);
        // Optional: clear the url params here using history API
        window.history.replaceState(null, '', '/');
      } else if (payment === 'failed') {
        alert('Payment failed or was cancelled. Please try again.');
        window.history.replaceState(null, '', '/');
      } else if (payment === 'error') {
        alert('An error occurred while verifying your payment. Please contact support.');
        window.history.replaceState(null, '', '/');
      }
    }
  }, [searchParams]);

  function scrollToDonate() {
    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleDonationComplete(amount: number) {
    // Show thank you immediately for good UX
    setLastDonation(amount);
    setShowThankYou(true);
    
    // Attempt to save to Supabase
    await insertDonation(amount, currentLevel.id, "Supporter");
  }

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}>
        <p className="animate-pulse-glow" style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>Loading Mission 50 Lakh...</p>
      </div>
    );
  }

  return (
    <>
      <LiveCounter totalCollected={totalCollected} recentDonors={recentDonors} />
      <HeroSection
        totalCollected={totalCollected}
        totalSupporters={totalSupporters}
        streakDay={MOCK_STREAK_DAY}
        onSupportClick={scrollToDonate}
      />
      <StorySection />
      <LevelProgress level={currentLevel} />
      <DonationWidget
        onDonationComplete={handleDonationComplete}
        levelName={currentLevel.name}
      />
      <DailyLogs />
      <SupporterGallery />
      <ActivityFeed items={activityFeed} />
      <TrustFooter />
      <ExitIntentPopup />

      <AudioPlayer />

      {showThankYou && (
        <ThankYouModal
          amount={lastDonation}
          transactionId={lastTxnId}
          onClose={() => setShowThankYou(false)}
        />
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}>
        <p className="animate-pulse-glow" style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>Loading Mission 50 Lakh...</p>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
