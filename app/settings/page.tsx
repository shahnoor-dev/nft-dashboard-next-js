// app/settings/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import AccountInformation from "@/components/account-information";
import type { Profile } from "@/types";
import { User } from "@supabase/supabase-js";
import AuthRedirect from '@/components/auth-redirect';
import toast from 'react-hot-toast';
import { useProfile } from "@/context/profile-context";

// --- TYPE DEFINITIONS ---
interface NotificationSettings {
    itemSold: boolean;
    auctionExpires: boolean;
    ownedItemUpdates: boolean;
    successfulPurchase: boolean;
}

// --- CHILD COMPONENTS ---
const Notifications = ({ notifications, handleNotificationChange }: { notifications: NotificationSettings; handleNotificationChange: (setting: keyof NotificationSettings) => void; }) => {
    const settingsConfig = [ { key: "itemSold" as const, title: "Item Sold", description: "When someone purchased one of your items" }, { key: "auctionExpires" as const, title: "Auction Expires", description: "When a timed auction you created ends" }, { key: "ownedItemUpdates" as const, title: "Owned Item Updates", description: "When a significant update occurs for one of the items you have purchased" }, { key: "successfulPurchase" as const, title: "Successful Purchase", description: "When you successfully buy an item" }, ];
    return (
        <div className="space-y-4 max-w-2xl">
            {settingsConfig.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                    <div>
                        <h3 className="font-medium text-gray-900">{setting.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                    </div>
                    <button onClick={() => handleNotificationChange(setting.key)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[setting.key] ? "bg-green-500" : "bg-gray-300"}`}><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications[setting.key] ? "translate-x-6" : "translate-x-1"}`} /></button>
                </div>
            ))}
        </div>
    );
};
const SocialLinked = () => {
    const [isGoogleConnected, setIsGoogleConnected] = useState(true);
    return (
        <div className="border border-gray-200 rounded-lg p-6 max-w-md">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3"><svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg><span className="font-medium text-gray-900">Google</span></div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${isGoogleConnected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{isGoogleConnected ? "Connected" : "Not Connected"}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Use Google to sign in to your account.</p>
            <button onClick={() => setIsGoogleConnected(!isGoogleConnected)} className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${isGoogleConnected ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-500 text-white hover:bg-green-600"}`}>{isGoogleConnected ? "Disconnect" : "Connect Google"}</button>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<string>("account");
    const [isSaving, setIsSaving] = useState<boolean>(false);
    
    const { profile: contextProfile, loading: profileLoading, refetchProfile } = useProfile();
    const [user, setUser] = useState<User | null>(null);

    const [originalProfile, setOriginalProfile] = useState<Profile | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    
    const [notifications, setNotifications] = useState<NotificationSettings>({ itemSold: true, auctionExpires: false, ownedItemUpdates: false, successfulPurchase: true, });

    const hasChanges = JSON.stringify(originalProfile) !== JSON.stringify(profile);

    // This effect syncs the local form state with the global context state
    useEffect(() => {
        const syncUserAndProfile = async () => {
            // UPDATED: Asynchronously get the user
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (contextProfile) {
                // Map context profile to the shape your form expects
                const formProfile = {
                    firstName: contextProfile.firstName,
                    lastName: contextProfile.lastName,
                    username: contextProfile.username,
                    // These fields seem to only exist on the settings page form
                    phoneNumber: originalProfile?.phoneNumber || '', 
                    biography: originalProfile?.biography || '',   
                    profileImage: contextProfile.avatarUrl
                };
                setProfile(formProfile);
                setOriginalProfile(formProfile);
            }
        };
        syncUserAndProfile();
    }, [contextProfile]);


    const handleProfileUpdate = ({ field, value, file }: { field: keyof Profile; value: any; file?: File | null }) => {
        setProfile(prev => (prev ? { ...prev, [field]: value } : null));
        if (file !== undefined) {
            setAvatarFile(file);
        }
    };

    const handleCancel = () => {
        setProfile(originalProfile);
        setAvatarFile(null);
        toast('Changes discarded.');
    };

    const handleSave = async () => {
        if (!profile || !user) return;
        const savingToast = toast.loading('Saving profile...');
        try {
            setIsSaving(true);
            let avatarUrl = profile.profileImage;
            const oldAvatarUrl = originalProfile?.profileImage;

            if (oldAvatarUrl && (avatarFile || !profile.profileImage)) {
                try {
                    const oldAvatarPath = oldAvatarUrl.split('/avatars/')[1];
                    if (oldAvatarPath) {
                        await supabase.storage.from('avatars').remove([oldAvatarPath]);
                    }
                } catch (deleteError) {
                    console.error("Failed to delete old avatar:", deleteError);
                }
            }

            if (avatarFile) {
                const filePath = `${user.id}/${Date.now()}_${avatarFile.name}`;
                const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
                avatarUrl = publicUrl;
            } else if (!profile.profileImage) {
                avatarUrl = null;
            }

            const updates = {
                id: user.id,
                first_name: profile.firstName,
                last_name: profile.lastName,
                username: profile.username,
                phone_number: profile.phoneNumber,
                biography: profile.biography,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;
            
            await refetchProfile();

            toast.success('Profile updated successfully!', { id: savingToast });
        } catch (error) {
            toast.error("Error updating profile: " + (error as Error).message, { id: savingToast });
        } finally {
            setIsSaving(false);
        }
    };

    const handleNotificationChange = useCallback((setting: keyof NotificationSettings) => {
        const newSettings = { ...notifications, [setting]: !notifications[setting] };
        setNotifications(newSettings);
        const status = newSettings[setting] ? 'enabled' : 'disabled';
        const settingName = setting.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        toast.success(`${settingName} notifications ${status}.`);
    }, [notifications]);

    const tabs = [ { id: "account", label: "Account Information" }, { id: "notifications", label: "Notifications" }, { id: "social", label: "Social Linked" }, ];

    if (profileLoading) {
        return <div className="p-6 md:p-8"><p>Loading profile...</p></div>;
    }

    if (!user) {
        return <AuthRedirect />;
    }

    return (
        <main className="h-[calc(100vh-103px)] xl:h-[calc(100vh-119px)] overflow-y-scroll no-scrollbar">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>{tab.label}</button>
                        ))}
                    </nav>
                </div>
                <div>
                    {activeTab === "account" && profile && (
                        <AccountInformation
                            userData={profile}
                            onUpdate={handleProfileUpdate}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            isSaving={isSaving}
                            hasChanges={hasChanges}
                        />
                    )}
                    {activeTab === "notifications" && (
                        <Notifications notifications={notifications} handleNotificationChange={handleNotificationChange} />
                    )}
                    {activeTab === "social" && <SocialLinked />}
                </div>
            </div>
        </main>
    );
}