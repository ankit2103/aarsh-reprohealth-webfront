"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import sidebarRoutes from "../../_data/sidebarRoutes.json";
import { IoFlaskOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiCapsuleLine, RiSettings3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdOutlineThumbsUpDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/common.util";
import { updateToken, updateUser } from "../../redux/slice/user.slice";
import { FaBars, FaTimes, FaRegFile, FaFileMedical } from "react-icons/fa";
import LogoutModal from "../logout-modal/page";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { toast } from "react-toastify";

const iconMap = {
  FaRegFile: <FaRegFile />,
  IoFlaskOutline: <IoFlaskOutline />,
  // RiCapsuleLine: <RiCapsuleLine />,
  FaFileMedical: <FaFileMedical />,
  MdOutlineThumbsUpDown: <MdOutlineThumbsUpDown />,
  CgProfile: <CgProfile />,
  RiSettings3Line: <RiSettings3Line />,
  IoMdLogOut: <IoMdLogOut />,
};

const Sidebar = ({toggleSidebar}) => {
  const pathname = usePathname();
  const isAuthenticated = useAuthenticated();
  const router = useRouter();
  const dispatch = useDispatch();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleCallModal = () => setOpenLogoutModal(true);
  const handleCloseModal = () => setOpenLogoutModal(false);


  const handleLogout = () => {
    logout(dispatch); 
    router.push("/login"); 
  };

  return (
    <div className="w-full h-full">
      <div className=" md:mt-10 lg:mt-10 px-4 ">
        <div className="  flex flex-col gap-6  lg:border rounded-2xl capitalize px-2 lg:px-5 py-5">
          {sidebarRoutes.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-[var(--lightgray)] font-light capitalize mb-3 px-2">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.items.map((item, idx) => {
                  return (
                    <li key={idx}>
                      {item.path === "/logout" && isAuthenticated ? (
                        <>
                          <button
                            className="w-full  flex items-center gap-3 p-3 text-left text-gray-800 hover:bg-[var(--lightskyblue)] rounded-md text-sm font-[500]"
                            onClick={handleCallModal}
                          >
                            <span className="text-[var(--pink)] text-xl">
                              {iconMap.IoMdLogOut}
                            </span>
                            { item.name}
                          </button>
                          {openLogoutModal && (
                            <LogoutModal
                              open={openLogoutModal}
                              handleClose={handleCloseModal}
                              handleLogout={handleLogout}
                            />
                          )}
                          {/* <LogoutModal
                            open={openLogoutModal}
                            handleClose={handleCloseModal}
                            handleLogout={handleLogout}
                          /> */}
                        </>
                      ) : (
                        <Link href={`/profile${item.path}`} onClick={()=>toggleSidebar()}>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer text-[var(--black)] text-sm font-light hover:bg-[var(--lightskyblue)] ${
                              pathname === `/profile${item.path}`
                                ? "bg-[var(--lightskyblue)]"
                                : "bg-[var(--White)]"
                            }`}
                          >
                            <span
                              className={` ${
                                pathname === item.path
                                  ? "text-[var(--pink)]"
                                  : "text-[var(--pink)]"
                              } text-xl`}
                            >
                              {iconMap[item.icon]}
                            </span>
                            {item.name}
                          </div>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// "use Client";
// import React, { useState } from "react";
// import { Profileicons } from "../../components/element/icons";
// import MyAppointments from "../../app/my-appointments/page";
// import UserProfile from "../../app/user-profile/page";
// import TestResults from "../../app/test-results/page";
// import MedicalRecords from "../../app/medical-records/page";
// import MedicineOrders from "../../app/medicine-orders/page";
// import OnlineConsultations from "../../app/online-consultations/page";
// import MyFeedback from "../../app/my-feedback/page";
// import ChangePassword from "../../app/change-password/page";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";

// const Sidebar = () => {

//       const [isActive, setIsActive] = useState("/my-appointments");
//       const [isSetComponents, setIsSetComponents] = useState();
//       const router = useRouter();
//       const pathname = usePathname();

//       const handleNavigate =(path)=>{
//         setIsSetComponents()
//         setIsActive(path)
//         pathname(path)
//       }

//        const handleLogout = () => {
//          logout(router); // Ensure history is passed
//          setIsAuth(useAuthenticated())

//        };

//   return (
//     <div className="w-full">
//        <div className="md:mt-32 lg:mt-36 px-4 ">
//         <ul className=" flex flex-col gap-6  border rounded-2xl capitalize px-5 py-5">
//           <li className="px-2 ">
//             <h1 className="text-[var(--lightgray)] font-semibold">Dashboard</h1>
//           </li>

//           <li
//             className={`py-2 px-4 ${pathname === "/my-appointments" ? "bg-[var(--lightskyblue)]" : "hover:bg-[var(--lightskyblue)] hover:rounded-md"}`}
//           >
//             <div className="flex  items-center gap-2">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.FaRegFile}
//               </span>
//               <Link
//                 href="/my-appointments"
//                 onClick={() => handleNavigate("/my-appointment")}
//               >
//                 My Appointments
//               </Link>
//             </div>
//           </li>
//           <li
//             className={`py-2 px-4
//               ${pathname === "/test-results" ? "bg-[var(--lightskyblue)]" : "hover:bg-[var(--lightskyblue)]  hover:rounded-md"}
//             `}
//           >
//             <div className="flex  items-center gap-2 ">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.IoFlaskOutline}
//               </span>
//               <Link
//                 href="/test-results"
//                 onClick={() => handleNavigate("/test-results")}
//                 className="text-[var(--black)] text-md"
//               >
//                 Test Results
//               </Link>
//             </div>
//           </li>
//           <li
//             className={`py-2 px-4 ${
//               pathname === "/medicine-orders" ?  "bg-[var(--lightskyblue)]" : "hover:bg-[var(--lightskyblue)] hover:rounded-md"
//             } `}
//           >
//             <div className="flex  items-center gap-2 ">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.RiCapsuleLine}
//               </span>
//               <Link
//                 href="/medicine-orders"
//                 onClick={() => handleNavigate("/medicine-orders")}
//               >
//                 Medicine Orders
//               </Link>
//             </div>
//           </li>
//           <li
//             className={ `py-2 px-4
//               ${pathname === "/medical-records" ?  "bg-[var(--lightskyblue)]" : "hover:bg-[var(--lightskyblue)] hover:rounded-md"}`}
//           >
//             <div className="flex  items-center gap-2">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.FaFileMedical}
//               </span>
//               <Link
//                 href="/medical-records"
//                 onClick={() => handleNavigate("/medical-records")}
//               >
//                 Medical Records
//               </Link>
//             </div>
//           </li>
//           <li
//             className={`py-2 px-4 ${
//               pathname === "/online-consultations" ?  "bg-[var(--lightskyblue)]" : "hover:bg-[var(--lightskyblue)] hover:rounded-md"
//             }`}
//           >
//             <div className="flex  items-center gap-2">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.FaRegFile}
//               </span>
//               <Link
//                 href="/online-consultations"
//                 onClick={() => handleNavigate("/online-consultations")}
//               >
//                 Online Consultations
//               </Link>
//             </div>
//           </li>

//           <li className="px-2">
//             <h1 className="text-[var(--lightgray)] font-semibold">General</h1>
//           </li>
//           <li
//             className={`py-2 px-4 ${
//               pathname === "/my-feedback" ?  "bg-[var(--lightskyblue)]" : "hover:bg-[var(--lightskyblue)]  hover:rounded-md"
//             }`}
//           >
//             <div className="flex  items-center gap-2">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.MdOutlineThumbsUpDown}
//               </span>
//               <Link
//                 href="/my-feedback"
//                 onClick={() => handleNavigate("/my-feedback")}
//                 className="text-[var(--black)] text-md"
//               >
//                 My Feedback
//               </Link>
//             </div>
//           </li>
//           <li
//             className={`py-2 px-4 ${
//               pathname === "/user-profile" ?  "bg-[var(--lightskyblue)]" : "hover:bg-[var(--lightskyblue)] hover:rounded-md"
//             }`}
//           >
//             <div className="flex  items-center gap-2">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.CgProfile}
//               </span>
//               <Link
//                 href="/user-profile"
//                 onClick={() => handleNavigate("/user-profile")}
//                 className="text-[var(--black)] text-md"
//               >
//                 User Profile
//               </Link>
//             </div>
//           </li>
//           <li
//             className={`py-2 px-4 ${
//               pathname === "/change-password" ?  "bg-[var(--lightskyblue)]" : "hover:bg-[var(--lightskyblue)]  hover:rounded-md"
//             }`}
//           >
//             <div className="flex  items-center gap-2">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.RiSettings3Line}
//               </span>
//               <Link
//                 href="/change-password"
//                 onClick={() => handleNavigate("/change-password")}
//               >
//                 Change Password
//               </Link>
//             </div>
//           </li>
//           <li
//             className={
//                   "hover:bg-[var(--lightskyblue)] py-2 px-4 hover:rounded-md"
//             }
//           >
//             <div className="flex  items-center gap-2">
//               <span className="text-[var(--pink)] text-xl  font-bold">
//                 {Profileicons.IoMdLogOut}
//               </span>
//               <button

//                 onClick={()=>handleLogout('/')}
//               >
//                 Logout
//               </button>
//             </div>
//           </li>

//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Sidebar
