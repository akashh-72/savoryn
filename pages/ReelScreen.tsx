import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { FeedItem } from '../components/FeedItem';
import { MOCK_POSTS } from '../services/mockData';

export const ReelScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialIndex = location.state?.startIndex || 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Scroll to the initial index immediately on mount
    if (containerRef.current && !hasScrolled) {
      const containerHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: initialIndex * containerHeight,
        behavior: 'instant'
      });
      setHasScrolled(true);
    }
  }, [initialIndex, hasScrolled]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const containerHeight = e.currentTarget.clientHeight;
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / containerHeight);
    setActiveIndex(index);
  };

  return (
    <div className="h-screen w-full bg-black relative z-50">
       <button 
         onClick={() => navigate(-1)}
         className="absolute top-12 left-4 z-50 p-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition-colors"
       >
         <ChevronLeft size={24} />
       </button>
       
       <div 
         ref={containerRef}
         className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
         onScroll={handleScroll}
       >
         {MOCK_POSTS.map((post, index) => (
           <FeedItem 
            key={post.id} 
            post={post} 
            isActive={index === activeIndex}
            mode="reel"
            // No onPress prop passed here, so it defaults to play/pause toggle
           />
         ))}
       </div>
    </div>
  );
};