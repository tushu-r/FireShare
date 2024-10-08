import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/FileView/:ID',
  '/files',
  '/upload',
  "/FilePreview/:ID"
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};