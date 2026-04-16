const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

const supabase = createClient(supabaseUrl, supabaseKey);

async function probe() {
  console.log('--- Probing Database Schema ---\n');

  const tables = ['profiles', 'universities', 'faculties', 'courses', 'past_questions', 'transactions'];

  for (const table of tables) {
    console.log(`Table: ${table}`);
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.error(`  Error fetching ${table}: ${error.message}`);
    } else if (data && data.length > 0) {
      console.log(`  Columns: ${Object.keys(data[0]).join(', ')}`);
    } else {
      console.log(`  No data found in ${table}, but table likely exists.`);
    }
    console.log('');
  }
}

probe();
