// lib/auth/adminAuth.ts

export const ADMIN_COOKIE_NAME = "sifest_admin_session";

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "sifest-2026-super-secure-admin-token-secret-key-salt-hmj-si"
  );
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecretKey()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface AdminSessionPayload {
  email: string;
  role: string;
  exp: number;
}

/**
 * Sign an admin session token (HMAC-SHA256, Edge & Node runtime compatible)
 */
export async function signAdminSession(data: { email: string; role?: string }): Promise<string> {
  const payload: AdminSessionPayload = {
    email: data.email.toLowerCase().trim(),
    role: data.role || "super_admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  };

  const enc = new TextEncoder();
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = bytesToBase64Url(enc.encode(payloadStr));

  const key = await getHmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64));
  const sigB64 = bytesToBase64Url(new Uint8Array(signature));

  return `${payloadB64}.${sigB64}`;
}

/**
 * Verify and parse an admin session token
 */
export async function verifyAdminSession(token: string | undefined | null): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) {
    return null;
  }

  try {
    const key = await getHmacKey();
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const sigBytes = base64UrlToBytes(sigB64);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as unknown as BufferSource,
      enc.encode(payloadB64)
    );

    if (!isValid) {
      return null;
    }

    const payloadJson = dec.decode(base64UrlToBytes(payloadB64));
    const payload: AdminSessionPayload = JSON.parse(payloadJson);

    if (!payload.exp || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Validates admin credentials against configured environment variables
 * or official defaults
 */
export function validateAdminCredentials(emailInput: string, passwordInput: string): boolean {
  const normalizedEmail = (emailInput || "").toLowerCase().trim();
  const password = passwordInput || "";

  // Environment credentials
  const configuredEmail = (process.env.ADMIN_EMAIL || "admin@sifest.id").toLowerCase().trim();
  const configuredPassword = process.env.ADMIN_PASSWORD || "sifest2026admin";

  // Allowed emails for convenience (in case admin logs in with different alias)
  const allowedEmails = new Set([
    configuredEmail,
    "admin@sifest.id",
    "admin@sifest.my.id",
    "admin@sifest.com",
    "admin",
  ]);

  const emailMatches = allowedEmails.has(normalizedEmail);
  const passwordMatches = password === configuredPassword;

  return emailMatches && passwordMatches;
}
