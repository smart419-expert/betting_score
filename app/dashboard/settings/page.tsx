'use client'

import { useState, useRef, useEffect } from 'react';
import {
  UserCircleIcon, CreditCardIcon, KeyIcon, Cog6ToothIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon, TrashIcon, ArrowDownTrayIcon, CameraIcon
} from '@heroicons/react/24/outline';
import { getUserProfile, updateUserProfile, uploadAvatar, ensureUserProfile } from '@/lib/supabaseProfile';
import { supabase } from '@/lib/supabase';

const SECTIONS = [
  { name: 'Profile', icon: UserCircleIcon },
  { name: 'Subscription', icon: CreditCardIcon },
  { name: 'Security', icon: KeyIcon },
  { name: 'Preferences', icon: Cog6ToothIcon },
  { name: 'Privacy', icon: ShieldCheckIcon },
  { name: 'Account Actions', icon: TrashIcon },
];

const COUNTRY_LIST = [
  'South Africa', 'Nigeria', 'Kenya', 'Ghana', 'Egypt', 'Morocco', 'Other'
];

function TierBadge({ tier }: { tier: string }) {
  return (
    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-semibold shadow-lg border border-white/20">
      {tier}
    </span>
  );
}

function ProfileSection({ user, setUser }: { user: any, setUser: any }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    residence: user.country || '',
    bio: user.bio || '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      residence: user.country || '',
      bio: user.bio || '',
    });
  }, [user]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setLoading(true);
      const { url, error } = await uploadAvatar(user.id, file);
      setLoading(false);
      if (url) setUser((u: any) => ({ ...u, avatar: url }));
      if (error) setError(error.message);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    const { error } = await updateUserProfile(user.id, {
      name: form.name,
      phone: form.phone,
      country: form.residence,
      bio: form.bio,
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setUser((u: any) => ({ ...u, ...form }));
      setEdit(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="relative group">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 blur-xl z-0" />
        <img
          src={avatarPreview || user.avatar}
          alt="Avatar"
          className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-2xl relative z-10 bg-white/20 object-cover"
        />
        <button
          type="button"
          className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg z-20 border-4 border-white/80 transition"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload avatar"
        >
          <CameraIcon className="w-6 h-6" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>
      <div className="flex-1">
        {!edit ? (
          <>
            <div className="text-3xl font-extrabold text-white mb-1 flex items-center gap-2">
              {user.name} <TierBadge tier={user.tier} />
            </div>
            <div className="text-gray-300 text-lg mb-2">{user.email}</div>
            <div className="text-gray-400 text-base mb-2">{user.phone}</div>
            <div className="text-gray-400 text-base mb-2">{user.country}</div>
            <div className="text-gray-400 text-base mb-2">{user.bio}</div>
            <button onClick={() => setEdit(true)} className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-blue-600 transition font-bold text-lg active:scale-95">Edit Profile</button>
          </>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg" placeholder="Name" />
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg" placeholder="Phone" />
            <select value={form.residence} onChange={e => setForm(f => ({ ...f, residence: e.target.value }))} className="px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg">
              <option value="">Select Country</option>
              {COUNTRY_LIST.map(c => <option key={c}>{c}</option>)}
            </select>
            <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg" placeholder="Bio" rows={3} />
            <div className="flex gap-2 mt-2">
              <button type="submit" disabled={loading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition font-bold text-lg active:scale-95">{loading ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => setEdit(false)} className="px-5 py-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition font-bold text-lg">Cancel</button>
            </div>
            {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}

function SectionContent({ section, user, setUser }: { section: string, user: any, setUser: any }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAvatar = () => {
    if (avatarPreview) {
      setUser((u: any) => ({ ...u, avatar: avatarPreview }));
      setAvatarPreview(null);
    }
  };

  switch (section) {
    case 'Profile':
      return <ProfileSection user={user} setUser={setUser} />;
    case 'Subscription':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-white/10 backdrop-blur rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-0">
            <div>
              <div className="text-2xl font-extrabold text-white mb-1 flex items-center gap-2">
                Current Tier: <span className="text-blue-400">{user.tier}</span>
                <TierBadge tier={user.tier} />
              </div>
              <ul className="list-disc list-inside text-gray-100 text-lg">
                <li>Forex signals</li>
                <li>Chatroom access</li>
                <li>Live updates</li>
              </ul>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-blue-600 transition font-bold text-lg active:scale-95">Manage/Upgrade</button>
          </div>
        </div>
      );
    case 'Security':
      return (
        <div className="flex flex-col gap-8 max-w-md">
          <div className="bg-white/10 backdrop-blur rounded-2xl shadow-xl p-6">
            <label className="block text-gray-300 mb-2 text-lg font-semibold">Change Password</label>
            <input type="password" placeholder="New password" className="w-full px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none mb-3 text-lg" />
            <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition font-bold text-lg active:scale-95">Change Password</button>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-2xl shadow-xl p-6">
            <label className="text-gray-300 text-lg font-semibold">Two-Factor Authentication</label>
            <input type="checkbox" className="accent-blue-500 w-6 h-6" />
            <span className="text-gray-400 text-base">Enable 2FA</span>
          </div>
        </div>
      );
    case 'Preferences':
      return (
        <div className="flex flex-col gap-8 max-w-md">
          <div className="bg-white/10 backdrop-blur rounded-2xl shadow-xl p-6">
            <label className="block text-gray-300 mb-2 text-lg font-semibold">Odds Format</label>
            <select className="w-full px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg">
              <option>Decimal</option>
              <option>Fractional</option>
              <option>American</option>
            </select>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl shadow-xl p-6">
            <label className="block text-gray-300 mb-2 text-lg font-semibold">Default Bookmaker</label>
            <select className="w-full px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg">
              <option>Betway</option>
              <option>Easybet</option>
              <option>HollywoodBets</option>
            </select>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-2xl shadow-xl p-6">
            <input type="checkbox" className="accent-blue-500 w-6 h-6" />
            <span className="text-gray-300 text-lg">Enable smart notifications</span>
          </div>
        </div>
      );
    case 'Privacy':
      return (
        <div className="flex flex-col gap-8 max-w-md">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-2xl shadow-xl p-6">
            <input type="checkbox" className="accent-blue-500 w-6 h-6" />
            <span className="text-gray-300 text-lg">Appear in league chatrooms</span>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-2xl shadow-xl p-6">
            <input type="checkbox" className="accent-blue-500 w-6 h-6" />
            <span className="text-gray-300 text-lg">Opt-in to influencer features</span>
          </div>
        </div>
      );
    case 'Account Actions':
      return (
        <div className="flex flex-col gap-8 max-w-md">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition font-bold text-lg active:scale-95">
            <ArrowDownTrayIcon className="w-6 h-6" /> Download Data
          </button>
          <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full shadow-lg hover:from-red-700 hover:to-pink-600 transition font-bold text-lg active:scale-95">
            <TrashIcon className="w-6 h-6" /> Delete Account
          </button>
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-700 flex flex-col items-center">
                <div className="text-white text-2xl font-bold mb-6">Are you sure you want to delete your account?</div>
                <div className="flex gap-6">
                  <button onClick={() => setShowDeleteModal(false)} className="px-6 py-3 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition font-bold text-lg">Cancel</button>
                  <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full shadow-lg hover:from-red-700 hover:to-pink-600 transition font-bold text-lg active:scale-95">Yes, Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Profile');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError(userError ? userError.message : 'User not found');
        setLoading(false);
        return;
      }
      await ensureUserProfile();
      const userId = user.id;
      getUserProfile(userId).then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
        if (!data || data.length === 0) {
          setError('User not found.');
          setLoading(false);
          return;
        }
        if (data.length > 1) {
          setError('Multiple users found with this ID.');
          setLoading(false);
          return;
        }
        setUser(data[0]);
        setLoading(false);
      });
    }
    fetchProfile();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-400">{error}</div>;
  if (!user) return null;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#181c24] via-[#1a2233] to-[#181c24] flex flex-col items-center py-14 px-2 md:px-0 font-sans">
      {/* Profile Header */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-4 mb-12">
        <div className="relative w-32 h-32 flex items-center justify-center mb-2">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 blur-xl z-0" />
          <img src={user.avatar} alt="Avatar" className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-2xl relative z-10 bg-white/20 object-cover" />
        </div>
        <div className="text-3xl font-extrabold text-white flex items-center gap-2">{user.name} <TierBadge tier={user.tier} /></div>
        <div className="text-gray-300 text-lg">{user.email}</div>
      </div>
      {/* Tabs */}
      <div className="w-full max-w-3xl flex gap-3 mb-12 justify-center">
        {SECTIONS.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActiveSection(name)}
            className={`flex items-center gap-2 px-7 py-3 rounded-full font-bold text-lg transition-all focus:outline-none shadow-lg backdrop-blur border-0 ${activeSection === name ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white scale-105 ring-4 ring-blue-400' : 'bg-white/10 text-gray-200 hover:bg-white/20 hover:scale-105 active:scale-100'}`}
          >
            <span className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 p-2 rounded-full"><Icon className="w-6 h-6" /></span> {name}
          </button>
        ))}
      </div>
      {/* Section Card */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur rounded-3xl shadow-2xl border-0 p-12 min-h-[340px] flex flex-col justify-center">
        <SectionContent section={activeSection} user={user} setUser={setUser} />
      </div>
    </div>
  );
} 