import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, signAdminSession, validateAdminCredentials } from "@/lib/auth/adminAuth";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    let isValid = validateAdminCredentials(email, password);
    let authenticatedEmail = email.toLowerCase().trim();

    // Fallback: If not matched via env credentials, try Supabase Auth
    if (!isValid && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (!error && data?.user?.email) {
          isValid = true;
          authenticatedEmail = data.user.email;
        }
      } catch (authErr) {
        console.error("Supabase auth check failed:", authErr);
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Email atau kata sandi salah. Akses ditolak." },
        { status: 401 }
      );
    }

    // Generate signed token
    const token = await signAdminSession({
      email: authenticatedEmail,
      role: "super_admin",
    });

    const isProduction = process.env.NODE_ENV === "production";
    const response = NextResponse.json({
      success: true,
      message: "Autentikasi berhasil.",
      user: {
        email: authenticatedEmail,
        role: "Super Admin",
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
