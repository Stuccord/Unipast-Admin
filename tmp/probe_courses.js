const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const supabase = createClient('https://hzbqsvfxpkaygocjodjk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YnFzdmZ4cGtheWdvY2pvZGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODQ2MTQsImV4cCI6MjA4ODM2MDYxNH0.lQwMo3wlBO9MM8pqc8ngwTL3lfTWTKC838qRdzJWjvI');
async function run() {
    let result = {};
    const { data: cData, error: cErr } = await supabase.from('courses').select('*').limit(1);
    result.courses = cData ? Object.keys(cData[0] || {}) : cErr;
    
    const { data: lData, error: lErr } = await supabase.from('levels').select('*').limit(1);
    result.levels = lData ? Object.keys(lData[0] || {}) : lErr;

    const { data: pData, error: pErr } = await supabase.from('programmes').select('*').limit(1);
    result.programmes = pData ? Object.keys(pData[0] || {}) : pErr;

    fs.writeFileSync('tmp/probe_output.json', JSON.stringify(result, null, 2));
}
run();
