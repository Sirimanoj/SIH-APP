'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, displayName: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      const isAuthPage = pathname === '/login' || pathname === '/register';

      if (!user && !isAuthPage) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);
  
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    // Create user document in Firestore
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
