"use client";
import Walpage from "./home/page";
import Head from 'next/head';

export default function Home() {
  return (
    <>
     <Head>
        <title>Aarsh Reprohealth | Best Reproductive Health & Fertility Care</title>
        <meta
          name="description"
          content="The only Healthcare Platform focusing on Endometriosis care, Male Fertility among other Reproductive Healthcare challenges."
        />
        <meta name="keywords" content="Aarsh Reprohealth, IVF, fertility, gynecologist, reproductive health, women's health" />
        <link rel="canonical" href="https://www.aarshreprohealth.com/" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Aarsh Reprohealth | Best Fertility & Reproductive Care" />
        <meta property="og:description" content="Personalized fertility and IVF solutions with compassionate care." />
        <meta property="og:url" content="https://www.aarshreprohealth.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.aarshreprohealth.com/assets/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aarsh Reprohealth" />
        <meta name="twitter:description" content="Your trusted partner in Endometriosis care and Reproductive Health." />
        <meta name="twitter:image" content="https://www.aarshreprohealth.com/assets/twitter-image.jpg" />
      </Head>
      <div>
      <Walpage />
    </div>
    </>
    
  );
}
