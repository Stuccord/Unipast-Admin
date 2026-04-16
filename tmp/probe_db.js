const { createClient } = require('@supabase/supabase-js')

const args = process.argv.slice(2)
const supabaseUrl = args[0]
const supabaseAnonKey = args[1]

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Usage: node probe_db.js <url> <key>')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function probe() {
  const tables = ['universities', 'faculties', 'courses', 'profiles', 'past_questions']
  console.log('Probing tables...')
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1)
      if (error) {
        console.log(`Table ${table}: ERROR - ${error.message}`)
      } else {
        console.log(`Table ${table}: EXISTS`)
        if (data && data.length > 0) {
          console.log(`Columns for ${table}:`, Object.keys(data[0]))
        } else {
          console.log(`Table ${table}: EMPTY`)
        }
      }
    } catch (e) {
      console.log(`Table ${table}: CRASH - ${e.message}`)
    }
  }
}

probe()
