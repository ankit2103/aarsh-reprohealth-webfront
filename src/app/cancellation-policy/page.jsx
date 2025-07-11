const CancellationPolicy = () => {
  return (
    <div className="w-full  pt-[6.5rem] md:pt-[8rem] pb-8">
      <div className="main-container">
        <div className="container ">
          <center>
            <p className="mainheading ">Cancellation Policy</p>
          </center>
          <div className="mt-8 md:mt-10   font-extralight px-1">
            <ul className="list-decimal mt-4 px-4">
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Introduction
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                At Aarsh ReproHealth, we understand that plans can change, and
                you may need to modify or cancel your appointments. This policy
                outlines the conditions and procedures for cancellations to
                ensure a fair and smooth experience for both patients and
                healthcare providers.
              </p>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Cancellation by Patients
              </li>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  <b className="font-semibold text-black pr-1">
                    Free Cancellation Window:
                  </b>
                  Patients can cancel their appointment without any charge if
                  done at least{" "}
                  <strong className="font-semibold"> 24 hours</strong> before
                  the scheduled time.
                </li>
                <li>
                  <b className="font-semibold text-black pr-1">
                    Late Cancellation Fee:
                  </b>
                  Cancellations made within{" "}
                  <strong className="font-semibold">12 hours</strong> of the
                  appointment time may incur a fee of{" "}
                  <strong className="font-semibold">50%</strong> of the
                  consultation cost.
                </li>
                <li>
                  <b className="font-semibold text-black pr-1">No-Show Policy:</b>
                  If a patient fails to attend the appointment without prior
                  notice, the full fee may be charged, and no refund will be
                  provided.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Cancellation by Healthcare Providers or Service Partners
              </li>
              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  If a doctor, clinic, or diagnostic lab cancels an appointment,
                  the patient will be given the option to reschedule or receive
                  a full refund.
                </li>
                <li>
                  Aarsh ReproHealth will make every effort to inform patients of
                  provider cancellations as early as possible and assist in
                  finding an alternative appointment.
                </li>
              </ul>

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Rescheduling Appointments
              </li>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  Patients can reschedule their appointment free of charge if
                  done at least 24 hours in advance.
                </li>
                <li>
                  Rescheduling requests made close to the appointment time may
                  be treated as a cancellation, and the applicable fees may not
                  be eligible for a refund.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Special Circumstances
              </li>

              <ul className="list-disc mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  In cases of emergencies or unavoidable situations, Aarsh
                  ReproHealth may waive cancellation fees at its discretion.{" "}
                </li>
                <li>
                  If a consultation is disrupted due to technical issues on the
                  platform, patients will be offered a reschedule or full
                  refund.{" "}
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Cancellation Process
              </li>

              <p className="mt-3 text-[var(--darkGrey)]">
                To cancel or reschedule an appointment, users must:
              </p>

              <ul className="list-decimal mt-4 px-2 text-[var(--darkGrey)] space-y-3">
                <li>
                  <b className="font-semibold text-black">Submit a Request:</b>
                  Use the Aarsh ReproHealth platform or email
                  support@aarshreprohealth.com.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    Provide Booking Details:
                  </b>
                  Include booking ID, patient name, and appointment date/time.
                </li>
                <li>
                  <b className="font-semibold text-black">
                    {" "}
                    Receive Confirmation:{" "}
                  </b>
                  A confirmation email will be sent once the cancellation or
                  rescheduling is processed.
                </li>
              </ul>
              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Policy Updates
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                Aarsh ReproHealth reserves the right to modify this Cancellation
                Policy as needed. Users are encouraged to review it
                periodically.
              </p>

              <li className="font-semibold mt-4 text-md md:text-lg text-black">
                Contact Us
              </li>
              <p className="mt-3 text-[var(--darkGrey)]">
                If you have any questions or need assistance, please contact us
                at:
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
export default CancellationPolicy;
