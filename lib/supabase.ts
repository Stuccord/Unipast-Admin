import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production') {
        console.warn('CRITICAL: Supabase environment variables are missing! Deployment will be non-functional.')
    }
}

export const createClientClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey)

// Standard client for non-component usage
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
