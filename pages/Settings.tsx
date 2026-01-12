import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Lock, Bell, Shield, Moon, Globe, HelpCircle, FileText, LogOut, ChevronRight, ChevronLeft, Trash2 
} from 'lucide-react';

interface SettingsProps {
  onLogout: () => void;
}

const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="mb-6">
      <h3 className="px-5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</h3>
      <div className="bg-white border-y border-slate-100 sm:border sm:rounded-2xl sm:mx-4 overflow-hidden shadow-sm">
          {children}
      </div>
  </div>
);

const Item = ({ icon: Icon, label, value, color = "text-slate-600", onClick, border = true }: any) => (
  <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors ${border ? 'border-b border-slate-50' : ''}`}
  >
      <div className="flex items-center space-x-4">
          <Icon size={22} className={color} strokeWidth={1.5} />
          <span className={`text-sm font-medium ${color === 'text-red-500' ? 'text-red-600' : 'text-dark'}`}>{label}</span>
      </div>
      <div className="flex items-center space-x-2">
          {value && <span className="text-sm text-slate-400">{value}</span>}
          <ChevronRight size={18} className="text-slate-300" />
      </div>
  </button>
);

export const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
        onLogout();
        navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-light font-sans">
      <div className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md z-40 flex items-center px-2 border-b border-slate-100 transition-all">
        <button onClick={() => navigate(-1)} className="p-3 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-dark" />
        </button>
        <span className="font-bold text-lg text-dark ml-2">Settings</span>
      </div>

      <div className="pt-20 pb-10 max-w-2xl mx-auto">
        <Section title="Account">
            <Item icon={User} label="Edit Profile" />
            <Item icon={Lock} label="Security" />
            <Item icon={Bell} label="Notifications" />
            <Item icon={Shield} label="Privacy" border={false} />
        </Section>

        <Section title="Preferences">
            <Item icon={Moon} label="Dark Mode" value="Off" />
            <Item icon={Globe} label="Language" value="English" border={false} />
        </Section>

        <Section title="Support">
            <Item icon={HelpCircle} label="Help Center" />
            <Item icon={FileText} label="Terms & Policies" border={false} />
        </Section>

        <Section title="Login">
            <Item icon={LogOut} label="Log Out" color="text-red-500" onClick={handleLogout} />
            <Item icon={Trash2} label="Delete Account" color="text-red-500" border={false} />
        </Section>
        
        <div className="text-center mt-8 mb-safe">
            <div className="w-12 h-12 bg-slate-200 rounded-xl mx-auto mb-3 flex items-center justify-center grayscale opacity-50">
               {/* Logo Placeholder */}
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <p className="text-xs text-slate-400 font-medium">Savoryn v1.0.0</p>
        </div>
      </div>
    </div>
  );
};