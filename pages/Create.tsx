import React, { useState } from 'react';
import { Upload, Camera, Wand2, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { BottomNav, ScreenWrapper } from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { generateRecipeFromIdea } from '../services/geminiService';
import { RecipeMetadata } from '../types';

export const Create = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'media' | 'details'>('media');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    // Recipe Metadata State
    const [caption, setCaption] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [recipeData, setRecipeData] = useState<Partial<RecipeMetadata & { title: string }>>({
        ingredients: [],
        steps: [],
        difficulty: 'Medium',
        cookingTime: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleCameraClick = () => {
        // In a real mobile app, this would trigger native camera intent.
        // For web, we simulate with a file input that allows capture.
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*,image/*';
        input.capture = 'environment'; // Hint to open camera
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            if(file) {
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
            }
        };
        input.click();
    };

    const handleAIGenerate = async () => {
        if (!aiPrompt.trim()) return;
        setIsGenerating(true);
        const result = await generateRecipeFromIdea(aiPrompt);
        if (result) {
            setRecipeData({
                title: result.title,
                ingredients: result.ingredients,
                steps: result.steps,
                difficulty: result.difficulty as any,
                cookingTime: result.cookingTime
            });
            setCaption(result.description);
        }
        setIsGenerating(false);
    };

    if (step === 'media') {
        return (
            <div className="h-screen bg-black text-white flex flex-col font-sans">
                <div className="flex justify-between items-center p-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full"><XIcon /></button>
                    <span className="font-bold text-lg">New Reel</span>
                    <div className="w-10" />
                </div>

                <div className="flex-1 flex flex-col items-center justify-center bg-zinc-900 rounded-3xl m-4 relative overflow-hidden border border-white/10">
                    {previewUrl ? (
                        <div className="relative w-full h-full">
                            {selectedFile?.type.startsWith('video') ? (
                                <video src={previewUrl} className="w-full h-full object-cover" autoPlay loop muted />
                            ) : (
                                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                            )}
                            <button 
                                onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                                <XIcon size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center p-8 w-full max-w-sm">
                            <h3 className="text-2xl font-bold mb-8">Create Content</h3>
                            
                            <div className="space-y-4">
                                <button 
                                    onClick={handleCameraClick}
                                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white p-5 rounded-2xl flex items-center justify-between group transition-all border border-zinc-700"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center group-hover:bg-zinc-600 transition-colors">
                                            <Camera size={24} />
                                        </div>
                                        <span className="font-bold text-lg">Camera</span>
                                    </div>
                                    <ArrowRightIcon />
                                </button>

                                <label className="w-full bg-brand hover:bg-rose-600 text-white p-5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer shadow-lg shadow-brand/20">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <Upload size={24} />
                                        </div>
                                        <span className="font-bold text-lg">Gallery</span>
                                    </div>
                                    <ArrowRightIcon />
                                    <input type="file" className="hidden" accept="video/*,image/*" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 pb-10 flex justify-end">
                    {selectedFile && (
                        <button 
                            onClick={() => setStep('details')}
                            className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                        >
                            <span>Next</span>
                            <ArrowRightIcon />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <ScreenWrapper className="bg-light min-h-screen">
             <div className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-white z-40 border-b border-slate-100 shadow-sm">
                <button onClick={() => setStep('media')} className="p-2 hover:bg-slate-50 rounded-full"><ArrowLeft size={24} className="text-dark" /></button>
                <span className="font-bold text-lg text-dark">Details</span>
                <button 
                    onClick={() => navigate('/')} 
                    className="text-white font-bold text-sm bg-brand px-5 py-2 rounded-full shadow-md shadow-brand/20 hover:bg-rose-600 transition-colors"
                >
                    Post
                </button>
            </div>

            <div className="p-4 space-y-6 max-w-lg mx-auto">
                {/* Media Preview & Caption */}
                <div className="flex space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-20 h-28 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                         {selectedFile?.type.startsWith('video') ? (
                            <video src={previewUrl!} className="w-full h-full object-cover" />
                        ) : (
                            <img src={previewUrl!} className="w-full h-full object-cover" alt="Thumb" />
                        )}
                    </div>
                    <textarea 
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a tasty caption..."
                        className="flex-1 bg-transparent resize-none border-none focus:ring-0 text-dark p-0 text-sm leading-relaxed placeholder:text-slate-400"
                        rows={4}
                    />
                </div>

                {/* AI Generator */}
                <div className="bg-gradient-to-br from-brand/5 to-orange-50 rounded-2xl p-6 border border-brand/10">
                    <div className="flex items-center space-x-2 mb-4 text-brand">
                        <Wand2 size={22} />
                        <h3 className="font-bold text-base">AI Recipe Assistant</h3>
                    </div>
                    <div className="flex space-x-2">
                        <input 
                            type="text" 
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="e.g. 15-minute spicy noodles"
                            className="flex-1 bg-white border border-brand/10 rounded-xl text-sm px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30 text-dark"
                        />
                        <button 
                            onClick={handleAIGenerate}
                            disabled={isGenerating}
                            className="bg-brand text-white px-5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center shadow-md shadow-brand/20 hover:bg-rose-600 transition-colors"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : 'Generate'}
                        </button>
                    </div>
                </div>

                {/* Manual Fields / AI Results */}
                <div className="space-y-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-dark font-medium focus:bg-white focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                            value={recipeData.title || ''}
                            onChange={e => setRecipeData({...recipeData, title: e.target.value})}
                            placeholder="Recipe Title"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Time</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-dark font-medium focus:bg-white focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                value={recipeData.cookingTime || ''}
                                onChange={e => setRecipeData({...recipeData, cookingTime: e.target.value})}
                                placeholder="e.g. 30 mins"
                            />
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Difficulty</label>
                             <div className="relative">
                                 <select 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-dark font-medium appearance-none focus:bg-white focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                    value={recipeData.difficulty}
                                    onChange={e => setRecipeData({...recipeData, difficulty: e.target.value as any})}
                                 >
                                     <option>Easy</option>
                                     <option>Medium</option>
                                     <option>Hard</option>
                                     <option>Chef</option>
                                 </select>
                                 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                 </div>
                             </div>
                        </div>
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ingredients</label>
                        <textarea 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-dark font-medium focus:bg-white focus:ring-2 focus:ring-brand/20 outline-none transition-all text-sm leading-relaxed"
                            rows={4}
                            value={recipeData.ingredients?.join(', ')}
                            onChange={e => setRecipeData({...recipeData, ingredients: e.target.value.split(',').map(s => s.trim())})}
                            placeholder="Add ingredients separated by commas..."
                        />
                     </div>
                </div>
            </div>
        </ScreenWrapper>
    );
};

const XIcon = ({size=24, className=""}: {size?:number, className?:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
)
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)
