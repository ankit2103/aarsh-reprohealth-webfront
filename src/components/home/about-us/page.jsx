import { aboutusbanner } from "../../../components/element/images";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Aboutus = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <>

      <Head>
        <title>About Aarsh Reprohealth | Reproductive Health Platform</title>
        <meta
          name="description"
          content="Learn how Aarsh Reprohealth supports your reproductive health journey with top doctors, lab tests, personalized care, and more."
        />
        <link rel="canonical" href="https://www.aarshreprohealth.com/about-us" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="About Aarsh Reprohealth" />
        <meta
          property="og:description"
          content="Your one-stop platform for fertility, wellness, and reproductive care. Consult verified doctors and access clinics nationwide."
        />
        <meta property="og:url" content="https://www.aarshreprohealth.com/about-us" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.aarshreprohealth.com/assets/about-og.jpg" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Aarsh Reprohealth" />
        <meta
          name="twitter:description"
          content="Empowering your reproductive health with trusted specialists, lab support, and personalized care."
        />
        <meta name="twitter:image" content="https://www.aarshreprohealth.com/assets/about-twitter.jpg" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aarsh Reprohealth",
              "url": "https://www.aarshreprohealth.com",
              "logo": "https://www.aarshreprohealth.com/assets/logo.png",
              "email": "mailto:support@aarshreprohealth.com",
              "telephone": "+91 9740522300",
              "sameAs": [
                "https://www.facebook.com/aarshreprohealth",
                "https://www.instagram.com/aarshreprohealth"
              ],
              "description":
                "Aarsh Reprohealth is a platform offering consultations with top reproductive health doctors, lab tests, and personalized wellness services.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560034",
                "addressCountry": "IN"

              }
            }),
          }}
        />
      </Head>
      <div>
        <div className="w-full  bg-[var(--vista)]">
          <div className="main-container ">
            <div className="container ">
              <div
                className=" flex flex-col 
              md:flex-row gap-8 md:gap-8 lg:gap-14  justify-between items-center py-10"
              >
                <div className=" ">
                  <div className="xl:min-w-full xl:max-h-[600px] px-2">
                    <button
                      disabled
                      className="fontsizebase bg-[var(--White)] rounded-full px-4 py-1 text-[var(--lightBlue)] "
                    >
                      About Us
                    </button>
                    {/* text-xl */}
                    <h2 className="heading capitalize mt-6">
                      The one place to solve all your <br />
                      <span className="text-[var(--pink)]">
                        reproductive health problems.
                      </span>
                    </h2>

                    <p className=" text-[var(--greyP)] mt-4 w-[90%]">
                      {/* text-sm md:text-xl lg:text-xl xl:text-xl */}
                      Our platform helps you recognize reproductive health
                      symptoms, consult with leading doctors, schedule lab tests,
                      and receive care from top clinics across India.
                    </p>

                    <div className="flex flex-col md:flex-row justify-between w-full lg:w-[80%] gap-4 md:gap-6 mt-8">
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-3 items-center">
                          <Image
                            src={aboutusbanner.tick}
                            alt="tickIcon"
                            width={25}
                            height={25}
                          />
                          <p className="text-[var(--black)] fontsizebase">
                            Video, Audio & In-person Appointments
                          </p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <Image
                            src={aboutusbanner.tick}
                            alt="tickIcon"
                            width={25}
                            height={25}
                          />
                          <p className=" text-[var(--black)] fontsizebase">
                            Multilingual Consultations
                          </p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <Image
                            src={aboutusbanner.tick}
                            alt="tickIcon"
                            width={25}
                            height={25}
                          />
                          <p className=" text-[var(--black)] fontsizebase">
                            Fertility & Wellness Packages
                          </p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <Image
                            src={aboutusbanner.tick}
                            alt="tickIcon"
                            width={25}
                            height={25}
                          />
                          <p className=" text-[var(--black)] fontsizebase">
                            Knowledge Bank
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-3 items-center">
                          <Image
                            src={aboutusbanner.tick}
                            alt="tickIcon"
                            width={25}
                            height={25}
                          />
                          <p className="text-[var(--black)] fontsizebase">
                            Doctors, Labs & Clinics in your vicinity
                          </p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <Image
                            src={aboutusbanner.tick}
                            alt="tickIcon"
                            width={25}
                            height={25}
                          />
                          <p className=" text-[var(--black)] fontsizebase">
                            Personalized Care
                          </p>
                        </div>

                        <div className="flex gap-3 items-center">
                          <Image
                            src={aboutusbanner.tick}
                            alt="tickIcon"
                            width={25}
                            height={25}
                          />
                          <p className="text-[var(--black)] fontsizebase">
                            Corporate Seminars, Packages & curated Webinars
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="w-full lg:min-w-[500px] lg:max-w-[620px] ">
                  <Image
                    src={aboutusbanner.aboutimg}
                    alt="image"
                    width={"100%"}
                    height={"100%"}
                    className="min-w-full w-full h-auto  lg:min-w-[500px] lg:max-w-[600px] object-cover "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Aboutus;
