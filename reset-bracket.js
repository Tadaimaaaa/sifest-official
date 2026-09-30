const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseKey = 'sb_publishable_oqTxtR39oWOy8sgYSAgWdA_b4NPQ0Rb';
const supabase = createClient(supabaseUrl, supabaseKey);

async function resetBrackets() {
  console.log("Clearing all event_brackets...");
  
  // We can just set bracket_data to an empty object or delete the rows
  const { error } = await supabase
    .from('event_brackets')
    .delete()
    .neq('event_slug', 'dummy'); // deletes all rows

  if (error) {
    console.error("Error deleting brackets:", error);
  } else {
    console.log("Successfully cleared all brackets. Everything is now TBD!");
  }
}

resetBrackets();
