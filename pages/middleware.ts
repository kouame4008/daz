import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    console.log('token', token)

    if (typeof token === 'undefined') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    else if (token && request.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
        return NextResponse.next()
    }
}

// // See "Matching Paths" below to learn more
export const config = {
    matcher: ['/public', '/dashboard/:path*'],
}