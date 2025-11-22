import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grok-estudando.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyb2stZXN0dWRhbmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyODk0NzIsImV4cCI6MjA0Nzg2NTQ3Mn0.LZmQ8eD9jK9bKx9e9v6t7e6r5t4y3u2i1o0p9l8k7j6'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
