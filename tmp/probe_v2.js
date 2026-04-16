const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://hzbqsvfxpkaygocjodjk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YnFzdmZ4cGtheWdvY2pvZGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODQ2MTQsImV4cCI6MjA4ODM2MDYxNH0.lQwMo3wlBO9MM8pqc8ngwTL3lfTWTKC838qRdzJWjvI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function probe() {
    console.log('Probing...');
    try {
        const { data, error } = await supabase.from('universities').select('*').limit(1);
        let result = '';
        if (error) {
            result = `ERROR: ${error.message}`;
        } else if (data && data.length > 0) {
            result = `COLUMNS: ${Object.keys(data[0]).join(', ')}`;
        } else {
            // Try to get columns even if empty by selecting a non-existent column to see error message or just listing
            result = 'Table exists but is empty. Trying to fetch schema via RPC or just guessing.';
            // Actually, if it's empty, we might need a different way. 
            // Let's try to insert a dummy row and see what happens? No, destructive.
            // Let's try to select common names.
        }
        console.log(result);
        fs.writeFileSync('tmp/schema_final.txt', result);
    } catch (err) {
        console.error(err);
        fs.writeFileSync('tmp/schema_final.txt', `CRASH: ${err.message}`);
    }
}

probe();
