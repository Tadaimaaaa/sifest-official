import "server-only";
import crypto from 'crypto';

const isProduction = process.env.DUITKU_ENVIRONMENT === 'production';
const merchantCode = process.env.DUITKU_MERCHANT_CODE || '';
const apiKey = process.env.DUITKU_API_KEY || '';

const INQUIRY_URL = isProduction 
  ? 'https://passport.duitku.com/webapi/api/merchant/v2/inquiry' 
  : 'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry';

export function getDuitkuConfig() {
  if (!merchantCode || !apiKey) {
    throw new Error('Konfigurasi Duitku (DUITKU_MERCHANT_CODE atau DUITKU_API_KEY) belum tersedia di server.');
  }
  return { merchantCode, apiKey };
}

/**
 * Validasi signature untuk Inquiry (Create Payment)
 * stringToSign = merchantCode + merchantOrderId + paymentAmount
 */
export function generateInquirySignature(merchantOrderId: string, paymentAmount: number): string {
  const { merchantCode, apiKey } = getDuitkuConfig();
  const stringToSign = `${merchantCode}${merchantOrderId}${paymentAmount}`;
  return crypto.createHmac('sha256', apiKey).update(stringToSign).digest('hex');
}

/**
 * Validasi signature untuk Callback / Webhook
 * stringToSign = merchantCode + amount + merchantOrderId
 */
export function verifyCallbackSignature(merchantOrderId: string, amount: string | number, signatureToVerify: string): boolean {
  const { merchantCode, apiKey } = getDuitkuConfig();
  
  const stringToSign = `${merchantCode}${amount}${merchantOrderId}`;
  const calcSignature = crypto.createHmac('sha256', apiKey).update(stringToSign).digest('hex');
  
  if (calcSignature.length !== signatureToVerify.length) return false;
  
  return crypto.timingSafeEqual(
    Buffer.from(calcSignature), 
    Buffer.from(signatureToVerify)
  );
}

export interface DuitkuInquiryRequest {
  paymentAmount: number;
  paymentMethod?: string; // Optional if we want user to pick on Duitku page
  merchantOrderId: string;
  productDetails: string;
  email: string;
  customerVaName: string;
  phoneNumber?: string;
  itemDetails?: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  customerDetail?: any;
  callbackUrl: string;
  returnUrl: string;
  expiryPeriod?: number; // In minutes
}

export async function createDuitkuTransaction(req: DuitkuInquiryRequest) {
  const { merchantCode } = getDuitkuConfig();
  const signature = generateInquirySignature(req.merchantOrderId, req.paymentAmount);
  
  // Clean up optional fields if undefined so we don't send nulls unexpectedly
  const payload: any = {
    merchantCode,
    ...req,
    signature,
  };
  
  // We trust the paymentMethod provided in the req object
  
  const payloadString = JSON.stringify(payload);

  try {
    const response = await fetch(INQUIRY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payloadString).toString()
      },
      body: payloadString
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Duitku] HTTP Error:", response.status, errorText);
      throw new Error(`Duitku HTTP Error: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Duitku statusCode "00" is SUCCESS for Inquiry
    if (result.statusCode !== "00") {
      console.error("[Duitku] API returned non-success code:", result);
      throw new Error(result.statusMessage || 'Duitku API Failed');
    }
    
    return result; // contains paymentUrl, reference, etc.
  } catch (error) {
    console.error('[Duitku] Exception in createDuitkuTransaction:', error);
    throw error;
  }
}
