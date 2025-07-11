import React from "react";
import ComingSoon from "../../components/coming-soon/page";
import Link from "@mui/material/Link";

// const TermAndConditions = () => {
//   return (
//     <div className="w-full  pt-20 text-center px-8 sm:px-10 md:px-0 lg:px-0 flex justify-center items-center  ">

//     <ComingSoon/>

// </div>
//   )
// }

// export default TermAndConditions
const TermsAndConditions = () => {
  return (
    <div className="w-full  pt-[6.5rem] md:pt-[8rem] pb-8">
      <div className="main-container">
        <div className="container ">
          <center>
            <p className="mainheading ">Terms & Conditions</p>
          </center>
          <div className="mt-8 md:mt-10   font-extralight px-1">
            <div className="font-bold mt-4 text-lg md:text-2xl text-black">
              General Terms & Conditions for Aarsh ReproHealth
            </div>
            <ul className="list-decimal mt-4 px-4">
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Introduction
              </li>

              <p className="mt-3 text-[var(--darkGrey)]">
                Welcome to Aarsh ReproHealth! We are a dedicated platform
                focused on supporting the{" "}
                <span className="font-semibold">reproductive health</span> and{" "}
                <span className="font-semibold">fertility</span> journeys of
                individuals and couples. Aarsh ReproHealth acts as a
                facilitator, connecting patients with a consortium of highly
                qualified specialists, specialty clinics, and diagnostic labs in
                the field of reproductive and sexual health. <br /> <br />
                Our goal is to provide seamless access to expert care, fostering
                a holistic approach to reproductive well-being — while making it
                easier for patients to find and connect with trusted healthcare
                providers. By using our platform, you agree to these Terms &
                Conditions, which outline your rights and responsibilities when
                accessing our services.
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Definitions
              </li>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  <b className="font-semibold text-black">Facilitator: </b>{" "}
                  Aarsh ReproHealth acts as a facilitator, providing an online
                  platform to connect users with healthcare providers and
                  service partners. We do not offer medical services but enable
                  access to consultations, appointments, and information.
                </li>
                <li>
                  <b className="font-semibold text-black">Service Provider: </b>
                  This refers to healthcare professionals, clinics, hospitals,
                  diagnostic labs, counselors, psychiatrists, and other entities
                  offering reproductive health and fertility-related services
                  through the Aarsh ReproHealth platform.
                </li>
                <li>
                  <b className="font-semibold text-black">User: </b>
                  Any individual or entity accessing the Aarsh ReproHealth
                  platform, including patients seeking medical consultations,
                  caregivers, or anyone utilizing the services available through
                  the platform.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Platform Role & Limitation of Liability
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Aarsh ReproHealth is a facilitator and does not provide
                  medical advice, diagnosis, treatment, or any healthcare
                  services.
                </li>
                <li>
                  All medical consultations, treatments, and tests are provided
                  directly by independent service/healthcare providers. Aarsh
                  ReproHealth is not responsible for the accuracy of medical
                  advice, effectiveness of treatments, or outcomes of any
                  medical services received through the platform.
                </li>
                <li>
                  Users agree that Aarsh ReproHealth shall not be liable for any
                  harm, injury, or damages (including legal consequences)
                  arising from consultations, procedures, or interactions with
                  service providers.
                </li>
              </ul>

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Information & Content Disclaimer
              </li>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Content, articles, interviews, or insights shared by
                  service/healthcare providers on the Aarsh ReproHealth platform
                  reflect their personal opinions and professional viewpoints.
                  Aarsh ReproHealth does not endorse or verify the accuracy of
                  this content.
                </li>
                <li>
                  Users are advised to consult qualified medical professionals
                  for personalized healthcare decisions.
                </li>
              </ul>

              {/* <p className="mt-5 text-md md:text-lg text-black font-bold">
                Data Security Commitment:
              </p>
              <p className="mt-3 text-[var(--darkGrey)]">
                We take data security seriously and have implemented robust
                measures to protect patient and service provider information.
                Our platform uses advanced encryption protocols, secure servers,
                and strict access controls to prevent unauthorized access. We
                regularly audit our systems to identify and mitigate potential
                vulnerabilities.
              </p>
              <p className="mt-3 text-[var(--darkGrey)]">
                All sensitive health and personal data are stored in compliance
                with applicable data protection laws, and we ensure that any
                third-party service providers adhere to our security standards.
                By prioritizing privacy and security, we strive to create a safe
                and trustworthy environment for all users.
              </p>
              <p className="mt-5 text-md md:text-lg text-black font-bold">
                Online Consultation Recordings:
              </p>
              <p className="mt-3 text-[var(--darkGrey)]">
                To enhance accuracy and improve patient care, online
                consultations will be recorded, and the speech will be converted
                into text. A PDF document of the consultation will be generated
                and securely stored. This data will be retained for 3 months,
                after which it will be permanently deleted from our systems.
              </p> */}

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                User Responsibilities
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Users must provide accurate and complete information when
                  booking appointments or using services on the platform.
                </li>
                <li>
                  Patients are responsible for following their healthcare
                  provider’s instructions and seeking clarification when needed.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Service Provider Responsibilities
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Service Providers are solely responsible for the quality,
                  accuracy, and legality of the services they offer.
                </li>
                <li>
                  Service Providers must comply with all applicable medical
                  regulations and maintain patient confidentiality in accordance
                  with legal and ethical standards.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Fees & Payments
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Users agree to pay all applicable fees for consultations,
                  tests, and services booked through the platform.
                </li>
                <li>
                  Aarsh ReproHealth will not charge any service fee for
                  facilitating appointments and transactions.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Data Security & Privacy
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Aarsh ReproHealth prioritizes the security of user and provider
                data. Please refer to our{" "}
                <Link href="/privacy-policy" underline="none">
                  Privacy Policy
                </Link>{" "}
                for details on how we collect, store, and protect your
                information.
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Cancellation & Refunds
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Cancellations and refunds are governed by our{" "}
                <Link href="/cancellation-policy" underline="none">
                  Cancellation Policy
                </Link>{" "}
                and{" "}
                <Link href="/refund-policy" underline="none">
                  Refund Policy
                </Link>
                . Users are encouraged to review these policies before booking
                any services
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Platform Usage & Conduct
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Users agree to use the platform respectfully and refrain from
                  abusive, illegal, or disruptive behavior.
                </li>
                <li>
                  Aarsh ReproHealth reserves the right to suspend or terminate
                  access to users who violate these terms or misuse the
                  platform.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Amendments to Terms
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Aarsh ReproHealth reserves the right to update or modify these
                Terms & Conditions at any time. Users will be notified of
                significant changes, and continued platform usage will indicate
                acceptance of the revised terms.
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Governing Law & Dispute Resolution
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  These Terms & Conditions are governed by the laws of Indian
                  Jurisdiction.
                </li>
                <li>
                  In the event of disputes, parties agree to first seek
                  resolution through mediation. If unresolved, disputes will be
                  subject to the jurisdiction of [Insert Court/Location].
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Contact Us
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                If you have any questions or concerns about these Terms &
                Conditions, please contact us at:
              </p>
              <p className="text-lg font-bold black mt-4">Aarsh ReproHealth </p>
               <p className="mt-3 text-[var(--darkGrey)]">
             
                <b className="font-semibold text-black">Email: </b>support@aarshreprohealth.com
              </p>
              <p className="mt-3 text-[var(--darkGrey)]">
             
                <b className="font-semibold text-black">Phone Number: </b>+91 9740522300
              </p>
            </ul>
          </div>
          <div className="mt-8 md:mt-10   font-extralight px-1">
            <div className="font-bold mt-4 text-lg md:text-2xl text-black">
              Terms & Conditions for Aarsh ReproHealth - Service Providers
            </div>
            <ul className="list-decimal mt-4 px-4">
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Introduction
              </li>

              <p className="mt-3 text-[var(--darkGrey)]">
                Welcome to Aarsh ReproHealth! We are a dedicated platform
                focused on supporting the reproductive health and fertility
                journeys of individuals and couples. Aarsh ReproHealth acts as a
                facilitator, connecting patients with a consortium of highly
                qualified specialists, specialty clinics, and diagnostic labs in
                the field of reproductive and sexual health. <br /> <br />
                These Terms & Conditions specifically apply to healthcare and
                service providers (including doctors, clinics, hospitals, and
                diagnostic labs) who wish to join and offer their services
                through the Aarsh ReproHealth platform. By registering as a
                service provider, you agree to comply with these terms and
                uphold the highest standards of care and professionalism.
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Definitions
              </li>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  <b className="font-semibold text-black">Facilitator: </b>{" "}
                  Aarsh ReproHealth provides an online platform to connect users
                  with healthcare providers. We do not offer medical services
                  but enable access to consultations, appointments, and
                  information.
                </li>
                <li>
                  <b className="font-semibold text-black">Service Provider: </b>
                  This refers to healthcare professionals, clinics, hospitals,
                  diagnostic labs, counselors, psychiatrists, and other entities
                  offering reproductive health and fertility-related services
                  through the Aarsh ReproHealth platform.
                </li>
                <li>
                  <b className="font-semibold text-black">Subscriber: </b>A
                  service provider who pays an annual subscription fee to access
                  additional platform features and enhanced visibility. The
                  subscription fee is non-refundable.
                </li>
                <li>
                  <b className="font-semibold text-black">Non-Subscriber: </b>A
                  service provider who is listed on the platform without paying
                  a subscription fee but may have limited access to platform
                  features.
                </li>
                <li>
                  <b className="font-semibold text-black">User: </b>
                  Any individual or entity accessing the Aarsh ReproHealth
                  platform, including patients seeking medical consultations,
                  caregivers, or anyone utilizing the services available through
                  the platform.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Registration & Verification
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Service Providers must fill out a registration form with
                  accurate and complete details.
                </li>
                <li>
                  Aarsh ReproHealth will verify the provided information, and
                  registration will only be confirmed upon successful
                  verification.
                </li>
                <li>
                  Aarsh ReproHealth reserves the right to approve or reject
                  applications at its discretion.
                </li>
              </ul>

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Subscription & Fees
              </li>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  <b className="font-semibold text-black">
                    Subscription Model:{" "}
                  </b>{" "}
                  Service Providers can choose to become subscribers by
                  selecting one of the Subscription Packages and paying an
                  annual fee. Subscribers receive increased visibility, priority
                  listing, and access to premium platform features.
                </li>
                <li>
                  <b className="font-semibold text-black">Service Fee: </b>
                  Aarsh ReproHealth will charge a service fee for each
                  consultation, test, or treatment, which will vary depending on
                  whether the provider is a Subscriber or Non-Subscriber.
                  (Details are provided in the Package Section.).
                </li>
                <li>
                  <b className="font-semibold text-black">
                    Non-Refundable Fees:{" "}
                  </b>
                  The subscription fee is non-refundable, even in cases of early
                  termination or discontinuation of services.
                </li>
                <li>
                  <b className="font-semibold text-black">Fee Revisions: </b>
                  Aarsh ReproHealth reserves the right to revise subscription
                  fees, with prior notice of 3 months given to existing
                  subscribers.
                </li>
              </ul>

              {/* <p className="mt-5 text-md md:text-lg text-black font-bold">
                Data Security Commitment:
              </p>
              <p className="mt-3 text-[var(--darkGrey)]">
                We take data security seriously and have implemented robust
                measures to protect patient and service provider information.
                Our platform uses advanced encryption protocols, secure servers,
                and strict access controls to prevent unauthorized access. We
                regularly audit our systems to identify and mitigate potential
                vulnerabilities.
              </p>
              <p className="mt-3 text-[var(--darkGrey)]">
                All sensitive health and personal data are stored in compliance
                with applicable data protection laws, and we ensure that any
                third-party service providers adhere to our security standards.
                By prioritizing privacy and security, we strive to create a safe
                and trustworthy environment for all users.
              </p>
              <p className="mt-5 text-md md:text-lg text-black font-bold">
                Online Consultation Recordings:
              </p>
              <p className="mt-3 text-[var(--darkGrey)]">
                To enhance accuracy and improve patient care, online
                consultations will be recorded, and the speech will be converted
                into text. A PDF document of the consultation will be generated
                and securely stored. This data will be retained for 3 months,
                after which it will be permanently deleted from our systems.
              </p> */}

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Service Provider Responsibilities
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Providers must offer services in compliance with all
                  applicable laws, regulations, and medical ethics.
                </li>
                <li>
                  Providers are responsible for the quality and accuracy of
                  their services and agree to maintain patient confidentiality.
                </li>
                <li>
                  Providers must update their profile details (such as
                  qualifications, availability, and pricing) promptly to ensure
                  accuracy.
                </li>
                <li>
                  Providers will be given access to a Dashboard to manage
                  personal details, view appointments, rescheduled or canceled
                  bookings, and see completed appointments.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Invoicing & Payments
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Aarsh ReproHealth will share a summary of consultations,
                  tests, and treatments conducted through the platform with the
                  respective service providers via their dashboards for
                  verification and approval.
                </li>
                <li>
                  Service Providers must review, verify, and approve these
                  details and raise an invoice through the platform by the 5th
                  of each month.
                </li>
                <li>
                  Upon receiving the invoice, Aarsh ReproHealth will verify the
                  details, and once approved, payments will be made by the 15th
                  of each month, after deducting the applicable service fee.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Platform Role & Limitation of Liability
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Aarsh ReproHealth acts solely as a facilitator and is not
                  responsible for the medical outcomes of consultations,
                  treatments, or tests conducted by service providers.
                </li>
                <li>
                  Service Providers agree to indemnify Aarsh ReproHealth against
                  any legal claims, damages, or liabilities arising from their
                  services.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Content & Communication
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Providers may share articles, interviews, and educational
                  content, which will be attributed to them.
                </li>
                <li>
                  Aarsh ReproHealth is not liable for the accuracy of shared
                  content or any consequences resulting from it.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Data Security & Privacy
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Aarsh ReproHealth is committed to safeguarding provider and
                patient data. Please refer to our Privacy Policy for details.
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Service Fee & Dashboard Access
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Aarsh ReproHealth will charge a Service Fee for each
                  consultation, test, or treatment. The fee structure will
                  differ for Subscribers and Non-Subscribers and will be
                  detailed in the Package Section.
                </li>
                <li>
                  Service Providers will have access to a Dashboard where they
                  can view and manage their profile, track appointments,
                  rescheduled and canceled bookings, and view the list of
                  completed services.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Monthly Reconciliation & Payment
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Every month, Aarsh ReproHealth will share the detailed list of
                  all completed consultations, tests, and treatments through the
                  platform with the respective Service Providers via their
                  dashboards for review and approval.
                </li>
                <li>
                  Once the Service Provider verifies the list, they must raise
                  an invoice and upload it to their dashboard by the 5th of each
                  month.
                </li>
                <li>
                  After receiving the invoice, Aarsh ReproHealth will verify the
                  records, and upon confirmation, the payment will be made by
                  the 15th of each month, after deducting the applicable service
                  fee.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Termination of Agreement
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Service Providers can terminate their association with Aarsh
                  ReproHealth by providing a written notice of 3 months.
                </li>
                <li>
                  Aarsh ReproHealth reserves the right to remove providers from
                  the platform in cases of malpractice, legal violations, or
                  breaches of these terms.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Data Security & Privacy
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Aarsh ReproHealth is committed to safeguarding provider and
                patient data. Please refer to our Privacy Policy for details.
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Amendments to Terms
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Aarsh ReproHealth may update these Terms & Conditions, with
                changes communicated to service providers in advance
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Governing Law & Dispute Resolution
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  These Terms & Conditions are governed by the laws of Indian
                  Jurisdiction.
                </li>
                <li>
                  Disputes will be resolved through mediation, or, if
                  unresolved, via the jurisdiction of [Insert Court/Location].
                </li>
              </ul>

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Contact Us
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                If you have any questions or concerns about these Terms &
                Conditions, please contact us at:
              </p>
              <p className="text-lg font-bold black mt-4">Aarsh ReproHealth </p>
              <p className="mt-3 text-[var(--darkGrey)]">
             
                <b className="font-semibold text-black">Email: </b>support@aarshreprohealth.com
              </p>
              <p className="mt-3 text-[var(--darkGrey)]">
             
                <b className="font-semibold text-black">Phone Number: </b>+91 9740522300
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TermsAndConditions;
