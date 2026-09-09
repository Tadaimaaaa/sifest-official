import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { checkTicketData } from './app/cetak-tiket/actions';

async function test() {
  const result = await checkTicketData('turnamen-futsal', 'Zikpung', '08127635282');
  console.log("Result:", JSON.stringify(result, null, 2));
}

test();
