const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://hzbqsvfxpkaygocjodjk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YnFzdmZ4cGtheWdvY2pvZGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODQ2MTQsImV4cCI6MjA4ODM2MDYxNH0.lQwMo3wlBO9MM8pqc8ngwTL3lfTWTKC838qRdzJWjvI');

async function probe() {
    const { data, error } = await supabase.from('notifications').select('*').limit(1);
    console.log('Notifications table status:', error ? 'Table missing or error: ' + error.message : 'Table exists');
}

probe();
