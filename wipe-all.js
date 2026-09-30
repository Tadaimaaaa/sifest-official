const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseKey = 'sb_publishable_oqTxtR39oWOy8sgYSAgWdA_b4NPQ0Rb';
const supabase = createClient(supabaseUrl, supabaseKey);

async function wipeAll() {
  console.log('Menghapus semua data pendaftar...');

  const { error: txError } = await supabase
    .from('transactions')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  if (txError) console.error('Gagal hapus transactions:', txError.message);
  else console.log('Transactions dihapus.');

  const { error: partError } = await supabase
    .from('participants')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  if (partError) console.error('Gagal hapus participants:', partError.message);
  else console.log('Participants dihapus.');

  const { error: regError } = await supabase
    .from('registrations')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  if (regError) console.error('Gagal hapus registrations:', regError.message);
  else console.log('Registrations dihapus.');

  const { count } = await supabase.from('registrations').select('id', { count: 'exact', head: true });
  console.log('Sisa registrations: ' + (count ?? 0));
  console.log('Selesai!');
}

wipeAll().catch(console.error);
