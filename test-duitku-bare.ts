import crypto from "crypto";

const merchantCode = "DS34764";
const apiKey = "5d7aa2a0fbfbf40d123a2ba41c7f8415";
const amount = 50000;
const orderId = crypto.randomUUID();

const stringToSign = `${merchantCode}${orderId}${amount}`;
const signature = crypto.createHmac('sha256', apiKey).update(stringToSign).digest('hex');

const payload = {
  merchantCode,
  paymentAmount: amount,
  merchantOrderId: orderId,
  productDetails: "Test",
  email: "test@example.com",
  customerVaName: "John",
  callbackUrl: "http://localhost/callback",
  returnUrl: "http://localhost/return",
  signature
};

async function test() {
  const res = await fetch("https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  console.log(json);
}

test();
