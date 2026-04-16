const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://hzbqsvfxpkaygocjodjk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YnFzdmZ4cGtheWdvY2pvZGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODQ2MTQsImV4cCI6MjA4ODM2MDYxNH0.lQwMo3wlBO9MM8pqc8ngwTL3lfTWTKC838qRdzJWjvI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
    try {
        const { data, error } = await supabase.from('universities').select('*').limit(1);
        if (error) {
            fs.writeFileSync('tmp/probe_result.json', JSON.stringify({ error: error.message }));
        } else {
            const columns = data.length > 0 ? Object.keys(data[0]) : 'Empty table';
            fs.writeFileSync('tmp/probe_result.json', JSON.stringify({ columns, data }));
        }
    } catch (e) {
        fs.writeFileSync('tmp/probe_result.json', JSON.stringify({ crash: e.message }));
    }
}

run();
