import React, { useState } from 'react';
import { Settings, Grid, Bookmark, PlayCircle } from 'lucide-react';
import { ScreenWrapper, BottomNav } from '../components/Layout';
import { CURRENT_USER, MOCK_POSTS } from '../services/mockData';
import { Link, useNavigate } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'reels' | 'saved'>('reels');

    // Duplicate mock posts to make the grid look fuller for the demo without generic gray boxes
    const displayPosts = [...MOCK_POSTS, ...MOCK_POSTS];

    return (
        <ScreenWrapper>
            <div className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md z-40 flex items-center justify-between px-4 border-b border-slate-100">
                <span className="font-bold text-lg text-dark">{CURRENT_USER.username}</span>
                <Link to="/settings" className="p-2 text-dark hover:bg-slate-50 rounded-full"><Settings size={22} /></Link>
            </div>

            <div className="px-4 pt-4 pb-6 border-b border-slate-50 bg-white">
                <div className="flex items-center justify-between mb-8 mt-2">
                    <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-brand to-orange-400">
                        <img src={CURRENT_USER.avatarUrl} alt="Me" className="w-full h-full rounded-full border-4 border-white object-cover shadow-sm" />
                    </div>
                    <div className="flex-1 ml-8 flex justify-around text-center">
                        <div>
                            <span className="block font-bold text-xl text-dark">{displayPosts.length}</span>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Posts</span>
                        </div>
                        <div>
                            <span className="block font-bold text-xl text-dark">{CURRENT_USER.followers}</span>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Followers</span>
                        </div>
                        <div>
                            <span className="block font-bold text-xl text-dark">{CURRENT_USER.following}</span>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Following</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="font-bold text-lg text-dark">{CURRENT_USER.displayName}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">{CURRENT_USER.bio}</p>
                </div>

                <div className="flex space-x-3">
                    <button className="flex-1 bg-dark text-white py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-black transition-colors">Edit Profile</button>
                    <button className="flex-1 bg-slate-100 text-dark py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">Share Profile</button>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="flex border-b border-slate-100 sticky top-14 bg-white z-30">
                <button 
                    className={`flex-1 py-3 flex justify-center transition-colors ${activeTab === 'reels' ? 'border-b-2 border-dark text-dark' : 'text-slate-400 hover:text-slate-600'}`}
                    onClick={() => setActiveTab('reels')}
                >
                    <Grid size={24} />
                </button>
                <button 
                    className={`flex-1 py-3 flex justify-center transition-colors ${activeTab === 'saved' ? 'border-b-2 border-dark text-dark' : 'text-slate-400 hover:text-slate-600'}`}
                    onClick={() => setActiveTab('saved')}
                >
                    <Bookmark size={24} />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-0.5 pb-20 bg-white">
                {displayPosts.map((post, index) => (
                    <div 
                        key={`${post.id}-${index}`} 
                        className="aspect-[3/4] bg-slate-100 relative group cursor-pointer"
                        onClick={() => navigate('/reels', { state: { startIndex: index % MOCK_POSTS.length } })}
                    >
                        {post.type === 'video' ? (
                            <div className="w-full h-full">
                                <img src={post.thumbnailUrl} alt="Post" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <img src={post.url} alt="Post" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute top-2 right-2 text-white drop-shadow-md">
                            <PlayCircle size={16} fill="white" className="text-transparent" />
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            <BottomNav />
        </ScreenWrapper>
    );
};