import React from 'react';
import { Home, Compass, PlusSquare, MessageCircle, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem = ({ to, icon: Icon, active }: { to: string, icon: React.ElementType, active: boolean }) => (
    <Link to={to} className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${active ? 'text-brand' : 'text-slate-400 hover:text-slate-600'}`}>
      <Icon size={26} strokeWidth={active ? 2.5 : 2} />
    </Link>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-100 z-50 px-4 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex justify-between items-center h-full max-w-md mx-auto">
        <NavItem to="/" icon={Home} active={currentPath === '/'} />
        <NavItem to="/explore" icon={Compass} active={currentPath === '/explore'} />
        <div className="relative -top-5">
            <Link to="/create" className="flex items-center justify-center w-14 h-14 bg-brand text-white rounded-full shadow-lg shadow-brand/30 hover:scale-105 transition-transform active:scale-95">
                <PlusSquare size={28} />
            </Link>
        </div>
        <NavItem to="/messages" icon={MessageCircle} active={currentPath === '/messages'} />
        <NavItem to="/profile" icon={UserIcon} active={currentPath === '/profile'} />
      </div>
    </nav>
  );
};

export const Header = ({ title, rightAction }: { title?: React.ReactNode, rightAction?: React.ReactNode }) => {
    return (
        <header className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md z-40 flex items-center justify-between px-4 border-b border-slate-100">
            <div className="font-bold text-xl text-brand tracking-tight">
                {title || 'Savoryn'}
            </div>
            <div>
                {rightAction}
            </div>
        </header>
    );
}

export const ScreenWrapper = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
    return (
        <div className={`min-h-screen bg-light pb-20 pt-14 ${className}`}>
            {children}
        </div>
    );
}