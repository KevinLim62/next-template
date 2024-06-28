import { axiosRequest } from "@/lib/axios";
import { decrypt } from "@/lib/cryptoUtils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Proxy route, manage token decryption and attaching to request headers
export async function POST(request: Request) {
  const session = cookies().get("sessionToken")?.value;

  if (!session)
    return new Response("Unauthorized", {
      status: 401,
    });

  const decryptedToken = decrypt(session);
  const body = await request.json();

  try {
    const result = await axiosRequest(
      body.method,
      body.url,
      body.data,
      decryptedToken.accessToken,
      decryptedToken.refreshToken
    );

    return new NextResponse(JSON.stringify(result.data), {
      status: result.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ ...error.response.data }), {
      status: error.response?.status || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
