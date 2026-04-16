const { createClient } = require('@supabase/supabase-client');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function probeSchema() {
    console.log('Probing universities table structure...');
    const { data, error } = await supabase
        .from('universities')
        .select('*')
        .limit(1);
    
    if (error) {
        console.error('Error fetching university:', error);
    } else {
        console.log('Sample University Data:', data);
        if (data && data.length > 0) {
            console.log('Columns:', Object.keys(data[0]));
        } else {
            console.log('No data found in universities table.');
        }
    }
}

probeSchema();
