import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    // '/submit(.*)', // made public for testing; authentication will be enforced in the page component
    '/profile/edit(.*)',
    '/profile/settings(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    console.log(`[Middleware] Processing ${req.nextUrl.pathname}`);
    if (isProtectedRoute(req)) {
        console.log(`[Middleware] Protecting ${req.nextUrl.pathname}`);
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
