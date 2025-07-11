// Keep this file as a Server Component

import "./globals.css";
import { ToastContainer } from "react-toastify";
import StoreProvider from "./store-provider";
import ClientWrapper from "./clientwrapper"; // import new Client Component
import ScrollToTop from "../components/scroll/scroll-to-top";

//  Metadata must be inside a Server Component
export const metadata= {
  title: "Aarsh ReproHealth",
  description: "Aarsh Repro Health is your trusted partner in reproductive health, offering specialized care in endometriosis, gynecology, andrology, urology, psychiatry, and counseling. Our platform connects you with top doctors in India for private online consultations, addressing conditions like endometriosis, PCOS, infertility, menstrual disorders, and erectile dysfunction. We prioritize safety, patient-centric care, and transparent pricing to improve your reproductive health.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full">
        <StoreProvider>
        <ToastContainer position="top-right" autoClose={4000} />
          <ScrollToTop />
          <ClientWrapper>{children}</ClientWrapper> {/*Use Client Component */}
        </StoreProvider>
      </body>
    </html>
    
  );
}

