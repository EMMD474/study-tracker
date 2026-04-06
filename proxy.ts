import { auth } from "@/auth"
import { NextResponse } from "next/server"

const publicRoutes = ["/auth/login", "/auth/register", "/timetable"]

export const proxy = auth((req) => {
  const { nextUrl, auth: session } = req
  const isPublic = publicRoutes.some((route) => nextUrl.pathname.startsWith(route))

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
