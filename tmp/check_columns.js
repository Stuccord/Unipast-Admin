const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Try to find .env in various locations
const envPaths = [
    path.join(__dirname, '.env'),
    path.join(__dirname, '..', '.env'),
    path.join(__dirname, '..', '..', '.env')
];

let envFound = false;
for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
        envFound = true;
        break;
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('Checking table: past_questions');
    try {
        const { data, error } = await supabase
            .from('past_questions')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        if (data && data.length > 0) {
            console.log('Columns found:', Object.keys(data[0]).join(', '));
        } else {
            console.log('Table is empty. Trying to guess columns...');
            // Try to select common column names to see which one works
            const columnsToTest = ['file_path', 'pdf_url', 'url'];
            for (const col of columnsToTest) {
                const { error: testError } = await supabase
                    .from('past_questions')
                    .select(col)
                    .limit(0);
                if (!testError) {
                    console.log(`Column "${col}" exists!`);
                } else {
                    console.log(`Column "${col}" does NOT exist (${testError.message})`);
                }
            }
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

checkSchema();
