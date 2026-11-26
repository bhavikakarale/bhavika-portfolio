import { NextRequest } from "next/server";

const safeHeaders = ["x-vercel-cache", "x-vercel-id", "x-matched-path", "x-nextjs-cache", "user-agent"];

export function GET(request: NextRequest) {
  const headers = Object.fromEntries(safeHeaders.flatMap((name) => {
    const value = request.headers.get(name);
    return value ? [[name, value.slice(0, 120)]] : [];
  }));
  return Response.json({ headers, cache: request.headers.get("x-vercel-cache") ?? "LOCAL", message:"Only non-sensitive diagnostic headers are exposed." }, { headers:{ "Cache-Control":"no-store" } });
}
