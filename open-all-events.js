const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseKey = 'sb_publishable_oqTxtR39oWOy8sgYSAgWdA_b4NPQ0Rb';
const supabase = createClient(supabaseUrl, supabaseKey);

async function openAllEvents() {
  console.log('Membuka pendaftaran semua event secara global...\n');

  const { error } = await supabase
    .from('events')
    .update({ registration_open: true })
    .neq('id', '00000000-0000-0000-0000-000000000000'); 

  if (error) {
    console.error('❌ Gagal mengupdate status event:', error.message);
  } else {
    console.log('✅ Berhasil mengupdate semua event menjadi OPEN.');
  }
}

openAllEvents().catch(console.error);
