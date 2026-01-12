import React, { useEffect, useState } from 'react';
import { Story } from '../types';
import { X } from 'lucide-react';

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  const DURATION = 5000; // 5 seconds per story
  const INTERVAL = 50; // Update every 50ms

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (100 / (DURATION / INTERVAL));
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setProgress(0);
    }
  };

  const currentStory = stories[currentIndex];

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 bg-zinc-900">
        <img 
            src={currentStory.mediaUrl} 
            alt="Story" 
            className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
      </div>

      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
        {stories.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-white transition-all duration-100 ease-linear ${
                idx < currentIndex ? 'w-full' : idx === currentIndex ? '' : 'w-0'
              }`}
              style={{ width: idx === currentIndex ? `${progress}%` : undefined }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between mt-2">
        <div className="flex items-center space-x-3">
          <img 
            src={currentStory.avatarUrl} 
            alt={currentStory.username} 
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
             <span className="text-white font-bold block leading-none">{currentStory.username}</span>
             <span className="text-white/70 text-xs">2h ago</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-white hover:bg-white/10 rounded-full">
          <X size={28} />
        </button>
      </div>

      {/* Touch Areas for Navigation */}
      <div className="absolute inset-0 z-10 flex">
        <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev}></div>
        <div className="w-2/3 h-full cursor-pointer" onClick={handleNext}></div>
      </div>

      {/* Input Placeholder (for "Reply") */}
      <div className="absolute bottom-6 left-4 right-4 z-20">
          <div className="w-full bg-transparent border border-white/40 rounded-full h-12 flex items-center px-4 text-white/80">
              <span className="text-sm font-medium">Send a message...</span>
          </div>
      </div>
    </div>
  );
};