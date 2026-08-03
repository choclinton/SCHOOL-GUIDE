import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Auth Helper Functions
export const signUpUser = async ({ email, password, fullName, school, region }) => {
  if (!isSupabaseConfigured) {
    // Local fallback simulation
    const mockUser = { id: 'mock-user-id', email, user_metadata: { full_name: fullName, school, region } };
    localStorage.setItem('supabase_mock_session', JSON.stringify(mockUser));
    return { data: { user: mockUser }, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        school: school || 'N/A',
        region: region || 'General'
      }
    }
  });

  return { data, error };
};

export const signInUser = async ({ email, password }) => {
  if (!isSupabaseConfigured) {
    const mockUser = { id: 'mock-user-id', email, user_metadata: { full_name: 'Student' } };
    localStorage.setItem('supabase_mock_session', JSON.stringify(mockUser));
    return { data: { user: mockUser }, error: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
};

export const signOutUser = async () => {
  if (!isSupabaseConfigured) {
    localStorage.removeItem('supabase_mock_session');
    return { error: null };
  }

  return await supabase.auth.signOut();
};

export const getCurrentSession = async () => {
  if (!isSupabaseConfigured) {
    const mock = localStorage.getItem('supabase_mock_session');
    return mock ? { user: JSON.parse(mock) } : null;
  }

  const { data: { session } } = await supabase.auth.getSession();
  return session ? session.user : null;
};
