const RefundPolicy = () => {
  return (
    <div className="w-full  pt-[6.5rem] md:pt-[8rem] pb-8">
      <div className="main-container">
        <div className="container ">
          <center>
            <p className="mainheading ">Refund Policy</p>
          </center>
          <div className="mt-8 md:mt-10   font-extralight px-1">
            <ul className="list-decimal mt-4 px-4">
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Introduction
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                At Aarsh ReproHealth, we strive to provide the best possible
                experience for our patients, healthcare providers, and service
                partners. We understand that circumstances may arise where
                refunds are necessary, and this policy outlines the conditions
                under which refunds will be processed.
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Refund Eligibility
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Refunds may be considered under the following circumstances:{" "}
              </p>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  <b className="font-semibold text-black">
                    Appointment Cancellations:
                  </b>
                  If a consultation or diagnostic appointment is canceled by the
                  patient at least [X hours/days] prior to the scheduled time, a
                  full or partial refund may be issued.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    Provider Unavailability:
                  </b>
                  If a healthcare provider, clinic, or diagnostic lab cancels or
                  fails to attend the scheduled appointment, patients will be
                  offered the option to reschedule or receive a full refund.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    {" "}
                    Technical Issues:{" "}
                  </b>
                  If a consultation cannot be completed due to platform-related
                  technical issues, users may request a rescheduled session or a
                  refund.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    {" "}
                    Service Discrepancy:{" "}
                  </b>
                  If the service provided significantly differs from what was
                  agreed upon or advertised, a refund request will be reviewed.{" "}
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Non-Refundable Scenarios
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Refunds will not be issued in the following cases:
              </p>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  <b className="font-semibold text-black">
                    Late Cancellations/No-shows:
                  </b>
                  If the patient cancels after the cancellation window or fails
                  to attend the appointment, no refund will be provided.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    Partially Completed Consultations:
                  </b>
                  If a consultation starts and is partially completed, refunds
                  will be issued only in exceptional cases, at the discretion of
                  Aarsh ReproHealth.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    {" "}
                    Third-Party Fees:{" "}
                  </b>
                  Any fees charged by external service providers, such as
                  payment gateways, banking institutions, or platforms
                  facilitating online consultations, may be non-refundable.
                  These fees are typically beyond Aarsh ReproHealth’s control,
                  and refunds will only cover the platform’s service charges,
                  not these third-party costs.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Refund Process
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                To request a refund, users must:
              </p>
              <ul className="list-decimal mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  <b className="font-semibold text-black">Submit a Request:</b>{" "}
                  Send a written request to [Insert Email] within [X days] of
                  the incident.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    Provide Supporting Details:
                  </b>
                  Include relevant details such as booking ID, appointment
                  date/time, and the reason for the refund request.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    Review and Response:
                  </b>
                  Refund requests will be reviewed within [X business days], and
                  users will be notified of the outcome via email.
                </li>
              </ul>

              <p className="mt-4 text-[var(--darkGrey)]">
                If approved, refunds will be processed within [X days] and
                returned to the original payment method.
              </p>

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Policy Updates
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Aarsh ReproHealth reserves the right to update this Refund
                Policy as needed. We encourage users to review this policy
                periodically to stay informed.
              </p>

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Contact Us
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                If you have any questions or need assistance with a refund,
                please contact us at:
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
export default RefundPolicy;
