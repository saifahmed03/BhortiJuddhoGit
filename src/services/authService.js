// src/services/authService.js
import { supabase } from '../supabaseClient';

// --------------------
// Sign up with Email/Password
// --------------------
export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// --------------------
// Sign in with Email/Password
// --------------------
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// --------------------
// Sign in / Sign up with Google
// --------------------
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: window.location.origin,
    },
  });

  if (error) throw error;
  return data;
};

// --------------------
// Logout
// --------------------
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// --------------------
// Get Current User
// --------------------
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user; // <-- always return user object directly
};
