"use client"; 
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import InternetStatus from "../components/internet-status/page";
import Script from "next/script";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const hideNavFooter = pathname === "/login" || pathname === "/signup";

  return (
    <>
    <InternetStatus>
      {!hideNavFooter && <Navbar />}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      {children}
      {!hideNavFooter && <Footer />}
    </InternetStatus>
    </>
  );
}
