import React from 'react';
import { ScreenWrapper, Header, BottomNav } from '../components/Layout';
import { MOCK_CHATS } from '../services/mockData';
import { Search } from 'lucide-react';

export const Messages = () => {
    return (
        <ScreenWrapper>
            <Header title="Messages" />
            <div className="p-4">
                 <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search chats"
                        className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 text-dark shadow-sm"
                    />
                </div>

                <div className="space-y-4">
                    {MOCK_CHATS.map(chat => (
                        <div key={chat.id} className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer">
                            <div className="relative">
                                <img src={chat.user.avatarUrl} alt={chat.user.username} className="w-14 h-14 rounded-full object-cover border border-slate-100" />
                                {chat.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand rounded-full border-2 border-white"></span>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-dark truncate text-base">{chat.user.displayName}</h3>
                                    <span className="text-xs text-slate-400 font-medium">{chat.timestamp}</span>
                                </div>
                                <p className={`text-sm truncate ${chat.unread > 0 ? 'font-semibold text-dark' : 'text-slate-500'}`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BottomNav />
        </ScreenWrapper>
    );
};