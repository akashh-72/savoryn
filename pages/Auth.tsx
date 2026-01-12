import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
    onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            onLogin(); // Update parent state
            navigate('/');
        }, 1500);
    };

    const GoogleIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );

    const AppleIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.09-1.44 1.29.13 2.76.66 3.75 2.13-3.69 2.06-3.08 6.94.39 8.65-.96 1.76-2.18 3.55-3.31 4.89zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.29-2.02 4.16-3.74 4.25z" />
        </svg>
    );

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-dark font-sans">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80" 
                    alt="Spices" 
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand rounded-2xl shadow-lg shadow-brand/20 mb-4 transform hover:scale-105 transition-transform">
                        <ChefHat size={36} className="text-white" strokeWidth={2} />
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Savoryn</h1>
                    <p className="text-slate-300 font-medium text-sm">Discover authentic flavors & recipes.</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    
                    {/* Tab Switcher */}
                    <div className="flex border-b border-slate-100">
                        <button 
                            className={`flex-1 py-4 text-sm font-bold transition-colors ${isLogin ? 'text-brand border-b-2 border-brand bg-brand/5' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Log In
                        </button>
                        <button 
                            className={`flex-1 py-4 text-sm font-bold transition-colors ${!isLogin ? 'text-brand border-b-2 border-brand bg-brand/5' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleAuth} className="space-y-5">
                            {!isLogin && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                            <User size={18} />
                                        </div>
                                        <input 
                                            type="text" 
                                            required 
                                            placeholder="Chef Priya" 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-dark placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none font-medium text-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <input 
                                        type="email" 
                                        required 
                                        placeholder="hello@savoryn.com" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-dark placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none font-medium text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        required 
                                        placeholder="••••••••" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-12 text-dark placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none font-medium text-sm"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-dark transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {isLogin && (
                                    <div className="flex justify-end pt-1">
                                        <a href="#" className="text-xs font-semibold text-brand hover:underline">Forgot password?</a>
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-brand hover:bg-rose-600 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-brand/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-4 bg-white text-slate-400 font-medium uppercase tracking-wide">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 py-3 rounded-xl transition-all">
                                <GoogleIcon />
                                <span className="font-semibold text-sm text-dark">Google</span>
                            </button>
                            <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 py-3 rounded-xl transition-all">
                                <AppleIcon />
                                <span className="font-semibold text-sm text-dark">Apple</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Footer Area */}
                    <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                        <p className="text-xs text-slate-500">
                            By continuing, you agree to Savoryn's <a href="#" className="underline hover:text-dark">Terms of Service</a> and <a href="#" className="underline hover:text-dark">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};