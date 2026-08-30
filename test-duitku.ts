import { createDuitkuTransaction } from "./lib/payment/duitku";
import crypto from "crypto";

import fs from "fs";

// Load env vars
const envFile = fs.readFileSync(".env.local", "utf-8");
envFile.split("\n").forEach(line => {
  if (line && line.includes("=")) {
    const [key, val] = line.split("=");
    process.env[key.trim()] = val.trim();
  }
});

async function test() {
  try {
    const transactionId = crypto.randomUUID();
    const req = {
      paymentAmount: 50000,
      merchantOrderId: transactionId,
      productDetails: "Test Product",
      email: "test@example.com",
      customerVaName: "John Doe",
      phoneNumber: "08123456789",
      itemDetails: [{
        name: "Test Event",
        price: 50000,
        quantity: 1
      }],
      callbackUrl: "http://localhost:3000/api/payment/duitku/callback",
      returnUrl: "http://localhost:3000/payment/status",
      expiryPeriod: 1440
    };

    console.log("Testing Duitku transaction...");
    const res = await createDuitkuTransaction(req);
    console.log("Success:", res);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
