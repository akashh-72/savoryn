import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, X } from 'lucide-react';
import { BottomNav, ScreenWrapper } from '../components/Layout';
import { MOCK_EXPLORE_ITEMS } from '../services/mockData';

interface CategoryPillProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${active ? 'bg-dark text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
    >
        {label}
    </button>
);

export const Explore = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Street Food', 'North Indian', 'South Indian', 'Dessert', 'Starters'];

    const filteredItems = useMemo(() => {
        return MOCK_EXPLORE_ITEMS.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  item.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory || 
                                   (activeCategory === 'North Indian' && item.category === 'Breads'); // Grouping for demo
            
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    const leftColumnItems = filteredItems.filter((_, i) => i % 2 === 0);
    const rightColumnItems = filteredItems.filter((_, i) => i % 2 !== 0);

    return (
        <ScreenWrapper>
            {/* Sticky Header with Search */}
            <div className="sticky top-14 bg-white/95 backdrop-blur-md z-30 pt-4 pb-2 border-b border-slate-50">
                <div className="px-4 relative mb-4">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text"
                        placeholder="Search for butter chicken, dosa..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-10 text-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:bg-white transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute right-12 top-1/2 -translate-y-1/2 text-slate-400 hover:text-dark"
                        >
                            <X size={16} />
                        </button>
                    )}
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-2 hover:text-dark transition-colors">
                        <Filter size={18} />
                    </button>
                </div>

                <div className="flex space-x-3 overflow-x-auto no-scrollbar py-1 px-4">
                    {categories.map(cat => (
                        <CategoryPill 
                            key={cat} 
                            label={cat} 
                            active={activeCategory === cat} 
                            onClick={() => setActiveCategory(cat)}
                        />
                    ))}
                </div>
            </div>

            <div className="px-4 pb-4 mt-4 min-h-[500px]">
                {!searchTerm && activeCategory === 'All' && (
                    <div className="flex items-center space-x-2 mb-5 text-brand">
                        <TrendingUp size={22} />
                        <h2 className="font-bold text-xl text-dark">Trending Desi Flavors</h2>
                    </div>
                )}

                {filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-20 text-slate-400">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p>No delicious results found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {/* Masonry Layout Simulation */}
                        <div className="space-y-3">
                            {leftColumnItems.map(item => (
                                <div key={item.id} className={`relative rounded-2xl overflow-hidden shadow-md group cursor-pointer ${item.layout === 'tall' ? 'aspect-[3/4]' : 'aspect-square'}`}>
                                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                        <p className="text-white text-sm font-bold leading-tight drop-shadow-md">{item.title}</p>
                                        <p className="text-white/80 text-[10px] uppercase font-semibold mt-1 tracking-wider">{item.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3 pt-6">
                            {rightColumnItems.map(item => (
                                <div key={item.id} className={`relative rounded-2xl overflow-hidden shadow-md group cursor-pointer ${item.layout === 'tall' ? 'aspect-[3/4]' : 'aspect-square'}`}>
                                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                        <p className="text-white text-sm font-bold leading-tight drop-shadow-md">{item.title}</p>
                                        <p className="text-white/80 text-[10px] uppercase font-semibold mt-1 tracking-wider">{item.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!searchTerm && activeCategory === 'All' && (
                    <div className="mt-10">
                        <h2 className="font-bold text-xl text-dark mb-5">Featured Indian Chefs</h2>
                        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-6 px-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="min-w-[150px] bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
                                    <img src={`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80`} className="w-16 h-16 rounded-full mb-3 object-cover shadow-sm border-2 border-white" alt="Chef" />
                                    <h3 className="font-bold text-sm text-dark">Chef Sanjeev</h3>
                                    <p className="text-xs text-slate-500 mb-4 font-medium">Punjabi Cuisine</p>
                                    <button className="w-full py-2 bg-brand/10 text-brand text-xs font-bold rounded-xl hover:bg-brand hover:text-white transition-colors">Follow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <BottomNav />
        </ScreenWrapper>
    );
};