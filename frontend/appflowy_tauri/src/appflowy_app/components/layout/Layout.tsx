import React, { ReactNode, useEffect } from 'react';
import SideBar from '$app/components/layout/side_bar/SideBar';
import TopBar from '$app/components/layout/top_bar/TopBar';
import { useAppSelector } from '$app/stores/store';
import './layout.scss';

function Layout({ children }: { children: ReactNode }) {
  const { isCollapsed, width } = useAppSelector((state) => state.sidebar);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && e.target instanceof HTMLBodyElement) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  return (
    <>
      <div className='flex h-screen w-[100%] text-sm text-text-title'>
        <SideBar />
        <div
          className='flex flex-1 flex-col bg-bg-body'
          style={{
            width: isCollapsed ? 'auto' : `calc(100% - ${width}px)`,
          }}
        >
          <TopBar />
          <div
            style={{
              height: 'calc(100vh - 64px - 48px)',
            }}
            className={'appflowy-layout overflow-y-auto overflow-x-hidden'}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
