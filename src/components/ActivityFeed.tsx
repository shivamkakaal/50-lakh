'use client';

import { useState, useEffect } from 'react';
import type { ActivityFeedItem } from '@/lib/types';

interface ActivityFeedProps {
  items: ActivityFeedItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 5));

  useEffect(() => {
    setVisibleItems(items.slice(0, 5));
  }, [items]);

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  return (
    <section className="section">
      <div className="container">
        <span className="section-label">Live Activity</span>
        <h2 className="section-title">Community Support</h2>
        <div className="section-divider" />

        <div>
          {visibleItems.map((item) => (
            <div key={item.id} className="feed-item">
              <div className="feed-dot" />
              <span className="feed-message">{item.message}</span>
              <span className="feed-time">{timeAgo(item.created_at)}</span>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <p style={{ fontSize: 40, marginBottom: 8 }}>🙏</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>
              Be the first supporter of this mission
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
