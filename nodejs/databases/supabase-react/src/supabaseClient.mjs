import { createClient } from '@supabase/supabase-js'

console.log('VITE_SUPABASE_URL', import.meta.env.VITE_SUPABASE_URL)
console.log('VITE_SUPABASE_KEY', import.meta.env.VITE_SUPABASE_KEY)

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);