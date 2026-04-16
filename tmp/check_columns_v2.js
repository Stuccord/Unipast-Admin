const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load .env
const envPath = path.join(process.cwd(), '.env');
dotenv.config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('--- DIAGNOSTIC: past_questions table ---');
    try {
        const { data, error } = await supabase
            .from('past_questions')
            .select('*')
            .limit(1);

        if (error) {
            console.log('Error selecting from past_questions:', error.message);
            // If it's a schema cache error, we can try to select specific columns to narrow it down
            const potentialColumns = ['id', 'course_id', 'year', 'semester', 'pdf_url', 'file_path', 'level', 'title'];
            for (const col of potentialColumns) {
                const { error: colError } = await supabase.from('past_questions').select(col).limit(0);
                if (!colError) {
                    console.log(`✅ Column exists: ${col}`);
                } else {
                    console.log(`❌ Column MISSING: ${col} (${colError.message})`);
                }
            }
        } else {
            if (data && data.length > 0) {
                console.log('Data found. Available keys:', Object.keys(data[0]).join(', '));
            } else {
                console.log('No rows in table. Checking columns via head request...');
                const potentialColumns = ['id', 'course_id', 'year', 'semester', 'pdf_url', 'file_path', 'level', 'title'];
                for (const col of potentialColumns) {
                    const { error: colError } = await supabase.from('past_questions').select(col).limit(0);
                    if (!colError) {
                        console.log(`✅ Column exists: ${col}`);
                    } else {
                        console.log(`❌ Column MISSING: ${col}`);
                    }
                }
            }
        }
    } catch (err) {
        console.error('Crash check:', err);
    }
}

checkSchema();
