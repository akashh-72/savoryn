import React, { useState, useEffect } from 'react';
import { Settings, Grid, Bookmark, PlayCircle, ArrowLeft, MoreHorizontal } from 'lucide-react';
import { ScreenWrapper, BottomNav } from '../components/Layout';
import { MOCK_POSTS, MOCK_CHATS, CURRENT_USER } from '../services/mockData';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { User, Post } from '../types';

export const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'reels' | 'saved'>('reels');
    const [user, setUser] = useState<User | null>(null);
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Mock fetching user data
        // 1. Check if it's the current user (just in case)
        if (userId === CURRENT_USER.id) {
            setUser(CURRENT_USER);
            setUserPosts(MOCK_POSTS); // Mock posts for current user
            return;
        }

        // 2. Try to find user in MOCK_POSTS or MOCK_CHATS
        let foundUser = MOCK_POSTS.find(p => p.user.id === userId)?.user || 
                        MOCK_CHATS.find(c => c.user.id === userId)?.user;
        
        if (foundUser) {
            setUser(foundUser);
            // Filter posts for this user
            const posts = MOCK_POSTS.filter(p => p.user.id === userId);
            setUserPosts(posts);
        } else {
            // Fallback mock user if id exists but no data found in small mock set
            if (userId) {
                setUser({
                    id: userId,
                    username: 'culinary_artist',
                    displayName: 'Culinary Artist',
                    avatarUrl: 'https://picsum.photos/200/200',
                    bio: 'Passionate about food and flavors. 🌶️',
                    followers: 123,
                    following: 45
                });
                setUserPosts([]);
            }
        }
    }, [userId]);

    if (!user) {
        return (
            <ScreenWrapper>
                <div className="flex items-center justify-center h-full pt-20">
                    <p className="text-slate-500">Loading profile...</p>
                </div>
                <BottomNav />
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <div className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md z-40 flex items-center justify-between px-4 border-b border-slate-100">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-dark hover:bg-slate-50 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <span className="font-bold text-lg text-dark">{user.username}</span>
                <button className="p-2 -mr-2 text-dark hover:bg-slate-50 rounded-full"><MoreHorizontal size={24} /></button>
            </div>

            <div className="px-4 pt-4 pb-6 border-b border-slate-50 bg-white">
                <div className="flex items-center justify-between mb-8 mt-2">
                    <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-brand to-orange-400">
                        <img src={user.avatarUrl} alt={user.username} className="w-full h-full rounded-full border-4 border-white object-cover shadow-sm" />
                    </div>
                    <div className="flex-1 ml-8 flex justify-around text-center">
                        <div>
                            <span className="block font-bold text-xl text-dark">{userPosts.length}</span>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Posts</span>
                        </div>
                        <div>
                            <span className="block font-bold text-xl text-dark">{user.followers}</span>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Followers</span>
                        </div>
                        <div>
                            <span className="block font-bold text-xl text-dark">{user.following}</span>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Following</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="font-bold text-lg text-dark">{user.displayName}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">{user.bio || 'Food lover & recipe creator.'}</p>
                </div>

                <div className="flex space-x-3">
                    <button className="flex-1 bg-brand text-white py-2.5 rounded-xl font-bold text-sm shadow-md shadow-brand/20 hover:bg-rose-600 transition-colors">Follow</button>
                    <button className="flex-1 bg-slate-100 text-dark py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">Message</button>
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
                {userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <div key={post.id} className="aspect-[3/4] bg-slate-100 relative group cursor-pointer" onClick={() => navigate('/reels', { state: { startIndex: 0 } })}>
                            {post.type === 'video' ? (
                                <video src={post.url} className="w-full h-full object-cover" />
                            ) : (
                                <img src={post.url} alt="Post" className="w-full h-full object-cover" />
                            )}
                            <div className="absolute top-2 right-2 text-white drop-shadow-md">
                                <PlayCircle size={16} fill="white" className="text-transparent" />
                            </div>
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 py-10 text-center text-slate-400">
                        <p className="text-sm">No posts yet.</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </ScreenWrapper>
    );
};