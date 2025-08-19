"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if needed
import { User } from '@supabase/supabase-js';

// Define the shape of your profile data
interface Profile {
    avatarUrl: string | null;
    firstName: string;
    lastName: string;
    username: string;
}

// Define the shape of the context value
interface ProfileContextType {
    profile: Profile | null;
    loading: boolean;
    refetchProfile: () => void;
}

// Create the context with a default value
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Create the Provider component
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const fetchProfile = useCallback(async (currentUser: User) => {
        setLoading(true);
        const { data: profileData } = await supabase
            .from('profiles')
            .select('avatar_url, first_name, last_name, username')
            .eq('id', currentUser.id)
            .single();

        if (profileData) {
            setProfile({
                avatarUrl: profileData.avatar_url,
                firstName: profileData.first_name,
                lastName: profileData.last_name,
                username: profileData.username,
            });
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const getInitialUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                await fetchProfile(user);
            } else {
                setLoading(false);
            }
        };
        getInitialUser();
    }, [fetchProfile]);
    
    // Function to allow other components to trigger a refetch
    const refetchProfile = () => {
        if (user) {
            fetchProfile(user);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, loading, refetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};