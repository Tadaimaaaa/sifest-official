export type PaymentMethod = {
  code: string;
  name: string;
  category: string;
  description?: string;
  enabled: boolean;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { 
    code: 'SP', 
    name: 'QRIS / ShopeePay', 
    category: 'QRIS', 
    description: 'Bayar instan menggunakan QRIS atau ShopeePay', 
    enabled: true 
  },
  { 
    code: 'M2', 
    name: 'Mandiri Virtual Account', 
    category: 'Virtual Account', 
    description: 'Transfer melalui ATM / Livin by Mandiri',
    enabled: true 
  },
  { 
    code: 'I1', 
    name: 'BNI Virtual Account', 
    category: 'Virtual Account', 
    description: 'Transfer melalui ATM / BNI Mobile',
    enabled: true 
  },
  { 
    code: 'B1', 
    name: 'CIMB Niaga Virtual Account', 
    category: 'Virtual Account', 
    description: 'Transfer melalui ATM / OCTO Mobile',
    enabled: true 
  },
  { 
    code: 'A1', 
    name: 'ATM Bersama', 
    category: 'Virtual Account', 
    description: 'Transfer dari Bank Lain via ATM Bersama',
    enabled: true 
  },
  { 
    code: 'VC', 
    name: 'Credit / Debit Card', 
    category: 'Card', 
    description: 'Visa / Mastercard / JCB',
    enabled: true 
  }
];

export function getPaymentMethodByCode(code: string): PaymentMethod | undefined {
  return PAYMENT_METHODS.find(method => method.code === code);
}
