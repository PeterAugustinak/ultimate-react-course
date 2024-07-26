import {createClient} from '@supabase/supabase-js'


export const supabaseUrl = 'https://wxoeyvqeownljrfykqje.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4b2V5dnFlb3dubGpyZnlrcWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExOTY1NTcsImV4cCI6MjAzNjc3MjU1N30.OcNA7xQjjPtKbvpsVWlpxzngJUqh2-tmussXZ4McOJI"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;