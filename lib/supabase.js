// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const serviceKey = process.env.SUPABASE_SERVICE_KEY || ''

// Public client — used in pages/components for reads
export const supabase = url && anonKey
  ? createClient(url, anonKey)
  : null

// Admin client — used only in /pages/api/* routes
export const supabaseAdmin = url && serviceKey
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : null
