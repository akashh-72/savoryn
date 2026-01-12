import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedItem } from '../components/FeedItem';
import { MOCK_POSTS, MOCK_STORIES } from '../services/mockData';
import { BottomNav } from '../components/Layout';
import { StoryViewer } from '../components/StoryViewer';
import { Plus } from 'lucide-react';

export const Feed = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewingStoryIndex, setViewingStoryIndex] = useState<number | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const containerHeight = e.currentTarget.clientHeight;
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / containerHeight);
    setActiveIndex(index);
  };

  const openReel = (index: number) => {
    navigate('/reels', { state: { startIndex: index } });
  };

  const handleAddStory = () => {
    navigate('/create');
  };

  return (
    <div className="bg-white h-screen w-full relative flex flex-col">
        
        {/* Fresh Bites (Stories) Section - Clean White Header */}
        <div className="w-full bg-white z-20 px-4 py-3 flex-shrink-0 border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
             <div className="flex justify-between items-center mb-2">
                 <h1 className="text-brand text-lg font-bold tracking-tight">Savoryn</h1>
                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Stories</span>
             </div>
             
             <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
                
                {/* Add Story Card */}
                <div 
                    onClick={handleAddStory}
                    className="flex-shrink-0 w-20 h-28 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-brand/5 hover:border-brand/30 transition-all active:scale-95"
                >
                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white mb-1 shadow-lg shadow-brand/20">
                        <Plus size={18} strokeWidth={3} />
                    </div>
                    <span className="text-[10px] font-semibold text-dark">Add Yours</span>
                </div>

                {/* User Story Cards */}
                {MOCK_STORIES.map((story, index) => (
                    <div 
                        key={story.id} 
                        onClick={() => setViewingStoryIndex(index)}
                        className={`flex-shrink-0 w-20 h-28 rounded-2xl p-[2px] cursor-pointer relative group transition-transform hover:scale-[1.02] ${story.hasUnseen ? 'bg-gradient-to-tr from-brand to-orange-400' : 'bg-slate-200'}`}
                    >
                        <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-slate-900 border border-white">
                            <img src={story.mediaUrl} alt={story.username} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            
                            {/* Avatar on card */}
                            <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full border-2 border-white/30 backdrop-blur-sm">
                                <img src={story.avatarUrl} className="w-full h-full rounded-full object-cover" />
                            </div>

                            {/* Username */}
                            <div className="absolute bottom-2 left-1 right-1 text-center">
                                <span className="text-[9px] font-bold text-white truncate block leading-tight shadow-black drop-shadow-sm">{story.username}</span>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>

      {/* Feed List Container */}
      <div 
        className="flex-1 overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black relative pb-16"
        onScroll={handleScroll}
      >
        {MOCK_POSTS.map((post, index) => (
          <FeedItem 
            key={post.id} 
            post={post} 
            isActive={index === activeIndex} 
            onPress={() => openReel(index)}
            mode="feed"
          />
        ))}
      </div>
      
      <BottomNav />

      {/* Story Viewer Overlay */}
      {viewingStoryIndex !== null && (
          <StoryViewer 
            stories={MOCK_STORIES}
            initialIndex={viewingStoryIndex}
            onClose={() => setViewingStoryIndex(null)}
          />
      )}
    </div>
  );
};