// import React, { useState } from "react";
// import axios from "axios";
// import { decryptData, encryptData } from "../utils/encryptdecrypt";
// import { getTokenLocal } from "../utils/localstorage.util";


// const AppointmentBooking = () => {

//   const [formData, setFormData] = useState(
//     {
//         "type": "consultation",
//         "doctorId": "doc_12345",
//         "doctorClinicId": "clinic_67890",
//         "clinicId": "clinic_001",
//         "labId": "lab_002",
//         "tests": ["test_abc", "test_xyz"],
//         "services": ["service_001", "service_002"],
//         "mode": "online",
//         "homeCollection": false,
//         "appointmentDate": "2025-04-01",
//         "startTime": "10:00 AM",
//         "endTime": "11:00 AM",
       
//       }
// //     {
// //     type: "",
// //     doctorId: "",
// //     doctorClinicId: "",
// //     clinicId: "",
// //     labId: "",
// //     tests: [],
// //     services: [],
// //     mode: "online",
// //     homeCollection: false,
// //     appointmentDate: "",
// //     startTime: "",
// //     endTime: "",
// //   }
// );

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleArrayChange = (e, field) => {
//     const values = e.target.value.split(",").map((id) => id.trim());
//     setFormData((prev) => ({ ...prev, [field]: values }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const cleanedData = Object.fromEntries(
//       Object.entries(formData).filter(([_, value]) =>
//         Array.isArray(value) ? value.length > 0 : value !== ""
//       )
//     );

//     const encryptedData = await encryptData(cleanedData);
//     if (!encryptedData) {
//       toast.error("Encryption failed!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://b87d-2409-4081-9d8b-239d-340d-b6fa-d527-f84c.ngrok-free.app/api/user/book-appointment",
//         encryptedData,
//         {
//           headers: {
//             "Content-Type": "text/plain",
//             authKey:
//               "U2FsdGVkX1+s7iaDHGXrA60BI1SaFnHfZI3Y6z89TSLi0wrWZ79rNOrHYJP89gns",
              
//             Authorization: `Bearer ${getTokenLocal()  || ""}`,
//           },
//         }
//       );
//       const decryptedUserData = decryptData(response.data);
//       console.log("fdsjkjkgfds", decryptedUserData);

//       if (!decryptedUserData) {
//         toast.error("Decryption failed!");
//         return;
//       }

//       const { orderId, amount, currency } = response.data;

//       const options = {
//         key: "rzp_test_mB2gYqLnRViDDD",
//         amount,
//         currency,
//         order_id: orderId,
//         name: "Clinic Appointment",
//         description: "Doctor Consultation",
//         prefill: {
//           name: "Patient Name",
//           email: "patient@example.com",
//           contact: "9876543210",
//         },
//       };

//         console.log("options-----------------", options);
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Book an Appointment</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="input-group">
//           <label>Type:</label>
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Doctor ID:</label>
//           <input
//             type="text"
//             name="doctorId"
//             value={formData.doctorId}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Doctor Clinic ID:</label>
//           <input
//             type="text"
//             name="doctorClinicId"
//             value={formData.doctorClinicId}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Clinic ID:</label>
//           <input
//             type="text"
//             name="clinicId"
//             value={formData.clinicId}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Lab ID:</label>
//           <input
//             type="text"
//             name="labId"
//             value={formData.labId}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Tests (Enter comma-separated IDs):</label>
//           <input
//             type="text"
//             name="tests"
//             onChange={(e) => handleArrayChange(e, "tests")}
//           />
//         </div>

//         <div className="input-group">
//           <label>Services (Enter comma-separated IDs):</label>
//           <input
//             type="text"
//             name="services"
//             onChange={(e) => handleArrayChange(e, "services")}
//           />
//         </div>

//         <div className="input-group">
//           <label>Mode:</label>
//           <select name="mode" value={formData.mode} onChange={handleChange}>
//             <option value="online">Online</option>
//             <option value="offline">Offline</option>
//           </select>
//         </div>

//         <div className="input-group checkbox-group">
//           <input
//             type="checkbox"
//             name="homeCollection"
//             checked={formData.homeCollection}
//             onChange={handleChange}
//           />
//           <label>Home Collection</label>
//         </div>

//         <div className="input-group">
//           <label>Appointment Date:</label>
//           <input
//             type="date"
//             name="appointmentDate"
//             value={formData.appointmentDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Start Time:</label>
//           <input
//             type="time"
//             name="startTime"
//             value={formData.startTime}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>End Time:</label>
//           <input
//             type="time"
//             name="endTime"
//             value={formData.endTime}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="submit-btn bg-[var(--lightBlue)]">
//           Proceed to Payment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AppointmentBooking;