import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AffiliateProgramPage } from "./screens/AffiliateProgramPage";
import { BlogDetailPage } from "./screens/BlogDetailPage";
import { BlogPage } from "./screens/BlogPage";
import { ContactPage } from "./screens/ContactPage";
import { CookiesPage } from "./screens/CookiesPage";
import { HomePage } from "./screens/HomePage";
import { MarkingServicePage } from "./screens/MarkingServicePage";
import { PrivacyPolicyPage } from "./screens/PrivacyPolicyPage";
import { TermsPage } from "./screens/TermsPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { ToastProvider } from "./contexts/ToastContext";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <HomePage />
      </>
    ),
  },
  {
    path: "/blogs",
    element: (
      <>
        <ScrollToTop />
        <BlogPage />
      </>
    ),
  },
  {
    path: "/blogs/:id",
    element: (
      <>
        <ScrollToTop />
        <BlogDetailPage />
      </>
    ),
  },
  {
    path: "/affiliate-program",
    element: (
      <>
        <ScrollToTop />
        <AffiliateProgramPage />
      </>
    ),
  },
  {
    path: "/marking-service",
    element: (
      <>
        <ScrollToTop />
        <MarkingServicePage />
      </>
    ),
  },
  {
    path: "/privacy",
    element: (
      <>
        <ScrollToTop />
        <PrivacyPolicyPage />
      </>
    ),
  },
  {
    path: "/terms",
    element: (
      <>
        <ScrollToTop />
        <TermsPage />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <ScrollToTop />
        <ContactPage />
      </>
    ),
  },
  {
    path: "/cookies",
    element: (
      <>
        <ScrollToTop />
        <CookiesPage />
      </>
    ),
  },
]);

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ToastProvider>
  </StrictMode>
);