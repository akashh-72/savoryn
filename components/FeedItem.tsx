import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, ChefHat, Music2, X, Play, Pause, Send } from 'lucide-react';
import { Post, RecipeMetadata } from '../types';
import { useNavigate } from 'react-router-dom';

interface FeedItemProps {
  post: Post;
  isActive: boolean;
  onPress?: () => void;
  mode?: 'feed' | 'reel';
}

const RecipeOverlay = ({ recipe, isOpen, onClose }: { recipe: RecipeMetadata, isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm animate-fade-in flex flex-col justify-end" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-t-3xl p-6 h-[75%] overflow-y-auto animate-slide-up relative text-dark shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500">
                    <X size={20} />
                </button>
                
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />

                <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {recipe.difficulty}
                    </span>
                    <span className="text-secondary text-sm font-medium flex items-center">
                        🕒 {recipe.cookingTime}
                    </span>
                </div>

                <h3 className="text-2xl font-bold mb-6 text-dark tracking-tight">Recipe Details</h3>

                <div className="space-y-8">
                    <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center text-dark">
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs mr-3">1</span>
                            Ingredients
                        </h4>
                        <ul className="grid grid-cols-2 gap-3">
                            {recipe.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-center text-sm font-medium bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand mr-2.5" />
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center text-dark">
                            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-3">2</span>
                            Instructions
                        </h4>
                        <div className="space-y-6">
                            {recipe.steps.map((step, i) => (
                                <div key={i} className="flex group">
                                    <span className="font-bold text-slate-300 mr-4 text-xl group-hover:text-brand transition-colors">{String(i + 1).padStart(2, '0')}</span>
                                    <p className="text-sm leading-relaxed text-slate-600 mt-1">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CommentsOverlay = ({ isOpen, onClose, commentsCount }: { isOpen: boolean, onClose: () => void, commentsCount: number }) => {
    if (!isOpen) return null;
    
    // Mock comments
    const comments = [
        { id: 1, user: 'chef_mario', text: 'This looks absolutely delicious! 🍝' },
        { id: 2, user: 'foodie_gal', text: 'Need to try this this weekend.' },
        { id: 3, user: 'baker_ben', text: 'Great technique on the sauce.' },
    ];

    return (
        <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm animate-fade-in flex flex-col justify-end" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-t-3xl h-[60%] flex flex-col animate-slide-up shadow-2xl">
                 {/* Header */}
                 <div className="p-4 border-b border-slate-100 flex items-center justify-between relative">
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-12 h-1.5 bg-slate-200 rounded-full" />
                    <span className="font-bold text-dark text-sm mt-2">{commentsCount} Comments</span>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-dark mt-2">
                        <X size={20} />
                    </button>
                 </div>

                 {/* List */}
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     {comments.map(c => (
                         <div key={c.id} className="flex space-x-3">
                             <div className="w-8 h-8 rounded-full bg-brand/10 flex-shrink-0" />
                             <div className="flex-1">
                                 <p className="text-xs font-bold text-dark">{c.user}</p>
                                 <p className="text-sm text-slate-600 leading-snug">{c.text}</p>
                             </div>
                             <button className="text-slate-300 hover:text-brand transition-colors">
                                 <Heart size={14} />
                             </button>
                         </div>
                     ))}
                 </div>

                 {/* Input */}
                 <div className="p-3 border-t border-slate-100 bg-white pb-safe">
                     <div className="flex items-center space-x-2">
                         <input 
                            type="text" 
                            placeholder="Add a comment..." 
                            className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand focus:bg-white transition-colors text-dark placeholder:text-slate-400"
                         />
                         <button className="p-2 text-brand font-bold hover:bg-brand/5 rounded-full transition-colors">
                             <Send size={20} />
                         </button>
                     </div>
                 </div>
            </div>
        </div>
    )
}

export const FeedItem: React.FC<FeedItemProps> = ({ post, isActive, onPress, mode = 'feed' }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(false);

  // Position logic: 'feed' needs space for nav, 'reel' goes lower
  const contentBottomClass = mode === 'feed' ? 'bottom-[4.5rem]' : 'bottom-8';
  const actionsBottomClass = mode === 'feed' ? 'bottom-[4.5rem]' : 'bottom-8';

  useEffect(() => {
    if (isActive && videoRef.current) {
        setIsPaused(false);
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    } else if (videoRef.current) {
        videoRef.current.pause();
    }
  }, [isActive]);

  const toggleLike = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsLiked(!isLiked);
  };

  const toggleSave = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSaved(!isSaved);
  };

  const handleShare = async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (navigator.share) {
          try {
              await navigator.share({
                  title: `Recipe by @${post.user.username}`,
                  text: post.caption,
                  url: window.location.href
              });
          } catch (err) {
              console.log('Share cancelled');
          }
      } else {
          alert("Link copied to clipboard! (Simulation)");
      }
  };

  const handleContainerClick = () => {
      if (onPress) {
          onPress();
      } else {
          if (videoRef.current) {
              if (videoRef.current.paused) {
                  videoRef.current.play();
                  setIsPaused(false);
                  animatePlayPauseIcon('play');
              } else {
                  videoRef.current.pause();
                  setIsPaused(true);
                  animatePlayPauseIcon('pause');
              }
          }
      }
  };

  const animatePlayPauseIcon = (type: 'play' | 'pause') => {
      setShowPauseIcon(true);
      setTimeout(() => setShowPauseIcon(false), 600);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (post.user) {
        navigate(`/user/${post.user.id}`);
      }
  };

  return (
    <div 
        className="relative w-full h-full snap-center bg-black overflow-hidden cursor-pointer select-none group"
        onClick={handleContainerClick}
    >
      {/* Video Content */}
      {post.type === 'video' ? (
          <video
            ref={videoRef}
            src={post.url}
            className="w-full h-full object-cover"
            loop
            muted 
            playsInline
            poster={post.thumbnailUrl}
          />
      ) : (
          <img src={post.url} alt="Post" className="w-full h-full object-cover" />
      )}

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent via-60% to-black/80 pointer-events-none" />

      {/* Play/Pause Animation Overlay */}
      {showPauseIcon && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none animate-ping-once">
              <div className="bg-white/20 rounded-full p-6 backdrop-blur-md">
                  {isPaused ? <Pause size={40} className="text-white" fill="white" /> : <Play size={40} className="text-white" fill="white" />}
              </div>
          </div>
      )}

      {/* Side Actions - Clean & Glassmorphic */}
      <div className={`absolute right-2 flex flex-col items-center space-y-4 text-white z-20 w-14 transition-all duration-300 ${actionsBottomClass}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center group/btn">
            <button onClick={toggleLike} className="p-3 rounded-full transition-all active:scale-90 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10">
                <Heart size={24} strokeWidth={2} className={isLiked ? "text-brand fill-brand" : "text-white"} />
            </button>
            <span className="text-[11px] font-semibold mt-1 shadow-black drop-shadow-md">{isLiked ? post.likes + 1 : post.likes}</span>
        </div>
        
        <div className="flex flex-col items-center group/btn">
            <button 
                onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
                className="p-3 rounded-full transition-all active:scale-90 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10"
            >
                <MessageCircle size={24} strokeWidth={2} />
            </button>
            <span className="text-[11px] font-semibold mt-1 shadow-black drop-shadow-md">{post.commentsCount}</span>
        </div>

        <button 
            onClick={toggleSave}
            className="p-3 rounded-full transition-all active:scale-90 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10"
        >
            <Bookmark size={24} strokeWidth={2} className={isSaved ? "text-amber-400 fill-amber-400" : "text-white"} />
        </button>

        <button 
            onClick={handleShare}
            className="p-3 rounded-full transition-all active:scale-90 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10"
        >
            <Share2 size={24} strokeWidth={2} />
        </button>

         {post.recipe && (
             <button 
                onClick={(e) => { e.stopPropagation(); setShowRecipe(true); }}
                className="flex flex-col items-center mt-2 animate-bounce-slow hover:scale-105 transition-transform"
             >
                <div className="p-2.5 bg-brand text-white rounded-full shadow-lg shadow-brand/40 border-2 border-white mb-1">
                    <ChefHat size={22} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-bold text-brand bg-white px-2 py-0.5 rounded-full shadow-lg tracking-wide">Recipe</span>
             </button>
         )}
      </div>

      {/* Bottom Info - Refined Typography */}
      <div className={`absolute left-4 right-16 z-20 text-white pointer-events-none transition-all duration-300 ${contentBottomClass}`}>
        <div className="flex items-center space-x-3 mb-3 pointer-events-auto" onClick={handleProfileClick}>
            <div className="p-[2px] bg-gradient-to-br from-brand to-orange-400 rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform">
                <img src={post.user.avatarUrl} alt={post.user.username} className="w-9 h-9 rounded-full border border-black/50" />
            </div>
            <div className="flex flex-col items-start">
                <h3 className="font-bold text-sm drop-shadow-md tracking-wide cursor-pointer hover:underline text-white">@{post.user.username}</h3>
                <button className="text-[10px] font-semibold border border-white/40 px-2.5 py-0.5 rounded-full bg-black/20 backdrop-blur-md mt-1 hover:bg-white hover:text-black hover:border-white transition-all">Follow</button>
            </div>
        </div>
        <p className="text-sm font-medium leading-relaxed drop-shadow-md mb-3 line-clamp-2 pr-2 text-white/95">
            {post.caption}
        </p>
        <div className="flex items-center space-x-2 text-xs font-semibold text-white/80 bg-black/30 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
            <Music2 size={12} />
            <span className="tracking-wide">Original Audio - {post.user.username}</span>
        </div>
      </div>

      {/* Recipe Modal Overlay */}
      <RecipeOverlay 
          recipe={post.recipe!} 
          isOpen={showRecipe} 
          onClose={() => setShowRecipe(false)} 
      />

      {/* Comments Modal Overlay */}
      <CommentsOverlay
          commentsCount={post.commentsCount}
          isOpen={showComments}
          onClose={() => setShowComments(false)}
      />
    </div>
  );
};