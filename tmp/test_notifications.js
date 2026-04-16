const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://hzbqsvfxpkaygocjodjk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YnFzdmZ4cGtheWdvY2pvZGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODQ2MTQsImV4cCI6MjA4ODM2MDYxNH0.lQwMo3wlBO9MM8pqc8ngwTL3lfTWTKC838qRdzJWjvI');

async function testInsert() {
    const { data, error } = await supabase.from('notifications').insert({
        title: 'System Audit',
        message: 'Verifying notification system connectivity.',
        type: 'info'
    }).select();
    
    if (error) {
        console.error('❌ Notification insert failed:', error.message);
    } else {
        console.log('✅ Notification table exists and insert worked:', data);
    }
}

testInsert();
