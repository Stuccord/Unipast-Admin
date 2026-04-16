const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const { data, count, error } = await supabase.from('past_questions').select('*', { count: 'exact' });
    const output = {
        count,
        error: error ? error.message : null,
        sample: data ? data.slice(0, 3) : []
    };
    fs.writeFileSync('tmp/db_check.json', JSON.stringify(output, null, 2));
    process.exit(0);
}

run();
