'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      } else if (session && pathname === '/admin/login') {
        window.location.href = '/admin';
      } else {
        setIsAuthenticated(!!session);
        setIsLoading(false);
      }
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        window.location.href = '/admin/login';
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

  if (isLoading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}><p style={{ color: 'var(--gold)' }}>Verifying access...</p></div>;
  }

  // If on login page, just show the children (no sidebar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Admin Panel Layout
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--navy)', color: 'white', padding: '24px 0', borderRight: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ padding: '0 24px', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '20px', margin: 0 }}>Mission Admin</h2>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Control Panel</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 12px' }}>
          <NavLink href="/admin" active={pathname === '/admin'}>Dashboard</NavLink>
          <NavLink href="/admin/donations" active={pathname === '/admin/donations'}>Donations</NavLink>
          <NavLink href="/admin/levels" active={pathname === '/admin/levels'}>Level Management</NavLink>
          <NavLink href="/admin/withdrawals" active={pathname === '/admin/withdrawals'}>Withdrawals</NavLink>
          <NavLink href="/admin/log" active={pathname === '/admin/log'}>Daily Log</NavLink>
        </nav>

        <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
          <button onClick={() => supabase.auth.signOut()} style={{ background: 'transparent', border: 'none', color: '#E53E3E', cursor: 'pointer', fontSize: '14px', padding: '8px 0' }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ 
      padding: '12px 16px', 
      borderRadius: '8px', 
      textDecoration: 'none', 
      color: active ? 'var(--gold)' : 'rgba(255,255,255,0.7)', 
      background: active ? 'rgba(255,213,79,0.1)' : 'transparent',
      fontWeight: active ? 600 : 400,
      fontSize: '14px',
      transition: 'all 0.2s'
    }}>
      {children}
    </Link>
  );
}
