const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://hzbqsvfxpkaygocjodjk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YnFzdmZ4cGtheWdvY2pvZGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODQ2MTQsImV4cCI6MjA4ODM2MDYxNH0.lQwMo3wlBO9MM8pqc8ngwTL3lfTWTKC838qRdzJWjvI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function probe() {
    console.log('Probing universities table...');
    const { data, error } = await supabase.from('universities').select('*').limit(1);
    
    if (error) {
        console.error('Error:', error.message);
        fs.writeFileSync('tmp/schema.txt', 'ERROR: ' + error.message);
    } else if (data && data.length > 0) {
        const columns = Object.keys(data[0]);
        console.log('Columns:', columns);
        fs.writeFileSync('tmp/schema.txt', 'COLUMNS: ' + columns.join(', '));
    } else {
        console.log('No data found in universities table.');
        fs.writeFileSync('tmp/schema.txt', 'ERROR: No data found');
    }
}

probe();
