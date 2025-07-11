"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  getUserAllBookedAppointment,
  getUserAppointmentCancle,
} from "../../../utils/user/user.util";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { illustration } from "../../../components/element/images";

const AppointmentCardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between animate-pulse">
      <div className="w-full bg-[var(--White)] p-4 rounded-2xl border gap-2 flex flex-col md:flex-row justify-between">
        <div className="flex flex-row gap-4 items-start">
          <div className="py-2">
            <div className="uppercase text-center border border-gray-300 rounded-md px-4 py-4 w-[50px] flex flex-col items-center">
              <div className="h-4 w-6 bg-gray-300 rounded mb-1" />
              <div className="h-4 w-8 bg-gray-300 rounded" />
            </div>
          </div>
          <div>
            <ul className="py-2 text-sm space-y-2">
              <li className="h-4 bg-gray-300 rounded w-40" />
              <li className="h-3 bg-gray-300 rounded w-48" />
              <li className="h-3 bg-gray-300 rounded w-56" />
              <li className="h-3 bg-gray-300 rounded w-32" />
              <li className="h-3 bg-gray-300 rounded w-40" />
              <li className="h-3 bg-gray-300 rounded w-44" />
            </ul>
            <div className="flex flex-row gap-2 items-center mt-2">
              <div className="bg-gray-300 rounded-full h-6 w-28" />
              <div className="bg-gray-300 rounded-full h-6 w-24" />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center"></div>
      </div>
    </div>
  );
};

const MyAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [numRowsPerPage, setNumRowsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Search Handler
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };
  const filteredData = searchQuery
    ? data?.filter((item) => {
        const search = searchQuery.toLowerCase();
        return (
          item?.doctorName?.toLowerCase().includes(search) ||
          item?.name?.toLowerCase().includes(search) ||
          item?.status?.toLowerCase().includes(search) ||
          item?.mode?.toLowerCase().includes(search) ||
          item?.day?.toLowerCase().includes(search)
        );
      })
    : data;
  console.log("Data--------------------------", data);
  const totalPages = Math.ceil(filteredData.length / numRowsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * numRowsPerPage,
    currentPage * numRowsPerPage
  );

  const formatDateWithoutYear = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short" };

    const formatted = date.toLocaleDateString("en-GB", options);
    const [day, month] = formatted.split(" ");
    return { day, month };
  };

  const handleViewDetails = (appointmentId) => {
    setCurrentAppointmentId(appointmentId);
    router.push(`/profile/my-booked-appointments/${appointmentId}`);
  };
  const generatePageNumbers = () => {
    const pages = new Set(); // Use Set to prevent duplicates

    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) pages.add(i);
    } else {
      if (currentPage <= 3) {
        pages.add(1);
        pages.add(2);
        pages.add(3);
        if (totalPages > 3) {
          pages.add("...");
          pages.add(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pages.add(1);
        if (totalPages > 3) {
          pages.add("...");
        }
        pages.add(totalPages - 2);
        pages.add(totalPages - 1);
        pages.add(totalPages);
      } else {
        pages.add(1);
        pages.add("...");
        pages.add(currentPage);
        pages.add("...");
        pages.add(totalPages);
      }
    }

    return Array.from(pages);
  };
  const handleCancleAppointment = async (appointmentId) => {
    // console.log("appointmentId to cancle:", appointmentId);
    try {
      const result = await getUserAppointmentCancle(appointmentId);
      // console.log("Result of Appointment:",result);
    } catch (error) {
      console.log("Handle cancle Appointment:", error);
    }
  };
  const handleDownloadInvoice = (invoiceUrl) => {
    const link = document.createElement("a");
    link.href = invoiceUrl;
    link.download = "invoice.pdf"; // Optional: You can extract filename from URL if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataToSend = { type: "" };
        setLoading(true);
        const result = await getUserAllBookedAppointment(dataToSend);
        // console.log("useEffect Result--------------------", result);
        if (result?.code === 200) {
          setData(result?.data);
          setLoading(false);
        } else if (
          result?.data ===
          "to many request from this IP , please try again later"
        ) {
          setLoading(true);
        }
      } catch (error) {
        console.log("getUserAllBookedAppointment Error ", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredData, totalPages]);

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="px-2 lg:px-4 w-full">
        <Input
          // fullWidth
          placeholder="Search by doctor, lab, clinic, mode, status etc"
          value={searchQuery}
          onChange={handleSearch}
          type="search"
          sx={{
            mt: 3,
            width: "100%",
            border: 1,
            borderRadius: "10px",
            borderColor: "var(--Iron)",
            paddingY: 1,
            paddingX: 2,
            "&::before": {
              display: "none",
            },
            "&::after": {
              display: "none",
            },
            "&:focus-within": {
              borderColor: "var(--lightBlue)", // Border color on focus
            },
          }}
        />
      </div>
      {/* <div className="md:mt-2 lg:mt-6 px-2 lg:px-4 w-full grid grid-cols-3 gap-3"> */}
      {/* flex flex-row flex-wrap gap-4 */}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <AppointmentCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          {paginatedData?.length > 0 ? (
            <div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 lg:px-4 mt-4">
                {paginatedData.map((item, index) => {
                  const { day, month } = formatDateWithoutYear(item.date);
                  return (
                    <div
                      key={item?.appointmentId}
                      className="flex flex-col md:flex-row justify-between "
                    >
                      <div className="w-[100%] bg-[var(--White)] p-4 rounded-2xl  border gap-2  flex flex-col md:flex-row justify-between  ">
                        <div className="flex flex-col  justify-between">
                          <div className="flex flex-row gap-4 items-start ">
                            <div className="py-2">
                              <div className="uppercase text-center border border-[var(--lightBlue)] rounded-md px-4 py-2 w-[50px] flex flex-col items-center ">
                                <p className="text-xl text-[var(--lightBlue)]">
                                  {day}
                                </p>
                                <p className="text-md  text-[var(--lightBlue)]">
                                  {month}
                                </p>
                              </div>
                            </div>
                            <div className="">
                              <ul className="text-[var(--greyP)] py-2 text-sm">
                                <li className="text-[var(--black)] font-[500]">
                                  {item?.name}
                                </li>

                                <li className="text-[var(--black)] pt-1">
                                  {item?.type === "doctorConsultation" ||
                                  item?.type === "doctorVoiceConsultation" ||
                                  item?.type === "doctorVideoConsultation"
                                    ? "Dr. " + (item?.doctorName || "")
                                    : item?.type === "labTest"
                                    ? item?.tests?.length > 0
                                      ? item.tests
                                          .map((test) => test?.name)
                                          .join(", ")
                                      : ""
                                    : item?.type === "clinicService"
                                    ? item?.services?.length > 0
                                      ? item.services
                                          .map((service) => service?.name)
                                          .join(", ")
                                      : ""
                                    : ""}
                                </li>

                                <li className="text-[var(--black)] pt-1">
                                  {item?.type === "doctorConsultation"
                                    ? item?.clinicAddress
                                    : item?.type === "labTest"
                                    ? item?.labAddress?.locality +
                                      ", " +
                                      item?.labAddress?.city
                                    : item?.type === "clinicService"
                                    ? item?.clinicAddress?.locality +
                                      ", " +
                                      item?.clinicAddress?.city
                                    : ""}
                                </li>
                                <li className="capitalize text-[var(--black)] pt-1">
                                  {item?.day}, {item?.time}
                                </li>
                                <li className="capitalize text-[var(--black)] pt-1">
                                  Payment status:{" "}
                                  <span
                                    className={`text-sm ${
                                      item?.paymentStatus === "Paid"
                                        ? "text-[var(--applegreen)]"
                                        : "text-[var(--red)]"
                                    } font-medium`}
                                  >
                                    {item?.paymentStatus}
                                  </span>
                                </li>
                                <li className="capitalize text-[var(--black)] pt-1">
                                  Appointment status:{" "}
                                  <button
                                    className={`text-sm rounded-md font-medium ${
                                      item?.status === "Completed"
                                        ? "text-[var(--applegreen)] "
                                        : item?.status === "Pending"
                                        ? "text-[var(--pictonblue)] "
                                        : item?.status === "#f7c6c6"
                                        ? " text-[var(--red)]"
                                        : item?.status === "Confirmed"
                                        ? " text-[var(--applegreen)]"
                                        : item?.status === "Scheduled"
                                        ? "text-[var(--applegreen)] "
                                        : item?.status === "Cancelled"
                                        ? "text-[var(--red)]"
                                        : ""
                                    }`}
                                  >
                                    {item.status}
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <div className=" py-2">
                              <button
                                className={`text-center px-2 py-1 text-xs text-[var(--White)] border rounded-full ${
                                  item?.mode === "online"
                                    ? "bg-green-500"
                                    : "bg-red-600"
                                } `}
                              >
                                {item?.mode === "online" ? "Online" : "Offline"}
                              </button>
                            </div>
                          </div>
                          <div className="">
                            <div className=" flex flex-row gap-2 justify-start items-end ">
                              {item?.invoiceUrl &&
                                (item?.status === "Completed" ||
                                  item?.status === "Confirmed" ||
                                  item?.status === "Cancelled") && (
                                  <button
                                    onClick={() =>
                                      handleDownloadInvoice(item?.invoiceUrl)
                                    }
                                    className="bg-[#F6F7F9] text-[var(--packageList)] rounded-full font-[500] text-xs px-4 py-2 border hover:border-[var(--packageList)] hover:bg-[var(--White)] hover:text-[var(--packageList)]"
                                  >
                                    Download Invoice
                                  </button>
                                )}

                              <button
                                onClick={() =>
                                  handleViewDetails(item?.appointmentId)
                                }
                                className="bg-[var(--lightBlue)] text-[var(--White)] rounded-full font-[500]  text-xs px-4 py-2 border hover:border-[var(--lightBlue)] hover:bg-[var(--White)] hover:text-[var(--lightBlue)]"
                              >
                                View Details
                              </button>
                              {item?.status === "Confirmed" &&
                                !item?.isCancelled && (
                                  <button
                                    onClick={() =>
                                      handleCancleAppointment(
                                        item?.appointmentId
                                      )
                                    }
                                    className="bg-[var(--red)] text-[var(--White)] rounded-full font-[500] text-xs px-4 py-2 border hover:border-[var(--red)] hover:bg-[var(--White)] hover:text-[var(--red)]"
                                  >
                                    Cancel
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Pagination Controls */}

              <div className="flex justify-end md:justify-end items-center mt-6 gap-2 mb-4 ">
                {/* Previous Arrow */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={` lg:px-4 lg:py-2 md:w-[13%]  lg:w-[15%] flex justify-end items-center gap-2   rounded-md ${
                    currentPage === 1
                      ? "text-[var(--greyP)] cursor-not-allowed"
                      : "text-[var(--lightBlue)] "
                  }`}
                >
                  <FaArrowLeft />
                  <span className="hidden lg:inline-block"> Previous</span>
                </button>

                {/* Page Numbers */}
                {generatePageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && setCurrentPage(page)
                    }
                    className={`px-4 py-2 rounded-md hover:bg-gray-300 ${
                      currentPage === page
                        ? "bg-[var(--lightBlue)] text-white"
                        : "bg-gray-200 text-[var(--lightBlue)] "
                    } ${page === "..." ? "cursor-default" : ""}`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Arrow */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`lg:px-4 lg:py-2  md:w-[10%]  lg:w-[13%] flex items-center gap-2 rounded-md  ${
                    currentPage === totalPages
                      ? "text-[var(--greyP)] cursor-not-allowed"
                      : "text-[var(--lightBlue)] "
                  }`}
                >
                  <span className="hidden lg:inline-block">Next</span>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center py-8">
              <Image
                src={illustration?.empty}
                alt="not found"
                width={300}
                height={300}
                className="w-[240px] h-[240px]"
              />
            </div>
          )}
        </>
      )}
      {/* </div> */}
    </div>
  );
};

export default MyAppointments;

// const handleSelectAll = () => {
//   setSelected(
//     selected.length === paginatedData.length
//       ? []
//       : paginatedData.map((row) => row.id)
//   );
// };

// const handleCheckboxChange = (id) => {
//   setSelected((prevSelected) =>
//     prevSelected.includes(id)
//       ? prevSelected.filter((item) => item !== id)
//       : [...prevSelected, id]
//   );
// };

// // Action Handlers
// const handleEdit = (row) => {
//   console.log("Edit", row);
// };

// const handleDelete = (row) => {
//   setData((prevData) => prevData.filter((item) => item.id !== row.id));
// };
// const getStatus = (status) => {
//   switch (status.toLowerCase()) {
//     case "completed":
//       return { color: "#1ACF65", label: "Active" };
//     case "confirmed":
//       return { color: "#007BFF", label: "Inactive" };
//     case "pending":
//       return { color: "#FFA500", label: "Pending" };
//     case "cancel":
//       return { color: "#FF4D4F", label: "Cancelled" };
//     default:
//       return { color: "#6C757D", label: "Unknown" };
//   }
// };

{
  /* <Box>
<Input
  placeholder="Search..."
  value={searchQuery}
  onChange={handleSearch}
  sx={{
    mb: 4,
    width: "100%",
    border: 1,
    borderRadius: "10px",
    borderColor: "var(--Iron)",
    paddingY: 1,
    paddingX: 2,
    "&::before": {
      display: "none",
    },
    "&::after": {
      display: "none",
    },
    "&:focus-within": {
      borderColor: "var(--lightBlue)", 
    },
  }}
/>


<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
    
        {columns.map((col) =>
          col.visible ? (
            <TableCell key={col.key} style={{backgroundColor:"var(--lightskyblue)"}}>
              {col.key === "amount" ? (
                <Box display="flex" alignItems="center" style={{color:"var(--black)", fontWeight:"normal"}}>
                  {col.label}
                  {" "}(In<LiaRupeeSignSolid size={16}/>)
                </Box>
              ) : (
                col.label
              )}{" "}
            </TableCell>
          ) : null
        )}
        {(hideActions.edit || hideActions.delete) && (
          <TableCell>Actions</TableCell>
        )}
      </TableRow>
    </TableHead>
    <TableBody>
      {loading
        ? Array.from({ length: numRowsPerPage }).map((_, index) => (
            <TableRow key={index}>
              {columns.map(
                (col) =>
                  col.visible && (
                    <TableCell key={`${col.key}-${index}`}>
                      <Skeleton />
                    </TableCell>
                  )
              )}
            </TableRow>
          ))
        : paginatedData.map((row, index) =>
            row ? (
              <TableRow key={row.appoint_iD || row.id || index}>
                {columns.map((col) =>
                  col.visible ? (
                    <TableCell
                      key={`${col.key}-${
                        row.appoint_iD || row.id || index
                      }`}
                      sx={{ maxWidth: "350px", fontSize: "10px", color:"var(--greyP)" }}
                    >
                      {col.key === "serialNo" ? (
                        <Typography noWrap sx={{ maxWidth: "100px", color:"var(--greyP)" }}>
                          {(currentPage - 1) * numRowsPerPage +
                            index +
                            1}.
                        </Typography>
                      ) : col.key === "amount" ? (
                        <Typography noWrap sx={{ maxWidth: "100px", color:"var(--greyP)" }}>
                          {row[col.key]?.toLocaleString("en-IN") ??
                            ""}
                        </Typography>
                      ) : col.key === "labName" ? (
                        <Typography
                          noWrap
                          sx={{ maxWidth: "100px", textWrap: "wrap", color:"var(--greyP)" }}
                        >
                          {row[col.key] ?? ""}
                        </Typography>
                      
                      ) : col.key === "status" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <Box
                            sx={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              backgroundColor: getStatus(row[col.key])
                                .color,
                            }}
                          />
                          <Typography
                            noWrap
                            sx={{ maxWidth: "100px" }}
                          >
                            {row[col.key]}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography noWrap sx={{ maxWidth: "100px" }}>
                          {row[col.key] || ""}
                        </Typography>
                      )}
                    </TableCell>
                  ) : null
                )}

                {(hideActions.edit || hideActions.delete) && (
                  <TableCell>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                    <Menu>
                      {hideActions.edit && (
                        <MenuItem onClick={() => handleEdit(row)}>
                          <Edit /> Edit
                        </MenuItem>
                      )}
                      {hideActions.delete && (
                        <MenuItem onClick={() => handleDelete(row)}>
                          <Delete /> Delete
                        </MenuItem>
                      )}
                    </Menu>
                  </TableCell>
                )}
              </TableRow>
            ) : null
          )}
    </TableBody>
  </Table>
</TableContainer>
<Box display="flex" justifyContent="space-between" mt={2}>
  <Select
    value={numRowsPerPage}
    onChange={(e) => setNumRowsPerPage(Number(e.target.value))}
  >
    {[5, 10, 20, 30, 50, 100].map((num) => (
      <MenuItem key={num} value={num}>
        {num} Rows
      </MenuItem>
    ))}
  </Select>
  <Box display="flex" justifyContent="space-between" gap={2}>
    <Button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      style={{ 
        backgroundColor:"var(--lightBlue)",
        color:currentPage === 1?"var(--White)":"var(--White)",
        
      }}
    >
      Previous
    </Button>
    {Array.from({ length: totalPages }, (_, i) => (
      <Button key={i} onClick={() => setCurrentPage(i + 1)} style={{ 
        color:"var(--lightBlue)"
      }}>
        {i + 1}
      </Button>
    ))}
    <Button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      style={{ 
        backgroundColor:"var(--lightBlue)",
        color:currentPage === 1?"var(--White)":"var(--White)"
      }}
    >
      Next
    </Button>
  </Box>
</Box>
</Box> */
}
