
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getIdToken, UserCredential } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    if (typeof window !== 'undefined') {
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
}

function eraseCookie(name: string) {   
    if (typeof window !== 'undefined') {
        document.cookie = name+'=; Max-Age=-99999999; path=/;';  
    }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        const token = await getIdToken(user);
        setCookie('firebase-auth-token', token, 1);
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
        if (isAuthPge) {
          router.replace('/');
        }
      } else {
        eraseCookie('firebase-auth-token');
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
        if (!isAuthPage) {
            router.replace('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);
  
  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        photoURL: user.photoURL,
        accountInfo: {
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            emailVerified: user.emailVerified,
            profileComplete: 15,
            onboardingCompleted: false,
        },
        appSettings: {
            notificationPreferences: {
                moodReminders: { enabled: true, frequency: "daily", time: "09:00" },
                emergencyAlerts: true
            },
            privacySettings: {
                profileVisibility: "private",
                dataSharing: { therapistAccess: false, anonymousResearch: false }
            },
            interface: { theme: "light", language: "english" }
        },
        safetyProfile: {
            riskLevel: "low",
            emergencyLocationSharing: false
        }
    });
    
    return userCredential;
  };
  
  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
