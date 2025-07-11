"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Skeleton,
  Badge,
  Menu,
} from "@mui/material";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFilePdf,
  FaFileImage,
} from "react-icons/fa";
import { Edit, Delete, MoreVert } from "@mui/icons-material";
import { getUserAllBookedLabTestRecords } from "../../../utils/user/user.util";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { getUserAllBookedMedicalRecords } from "../../../utils/user/user.util";
import Image from "next/image";
import { illustration } from "../../../components/element/images";

export const LabTestHeaders = [
  { key: "serialNo", label: "S.No", sortable: false, visible: true },
  { key: "diseaseName", label: "DiseaseName", sortable: true, visible: true },
  { key: "doctorName", label: "Doctor", sortable: true, visible: true },
  { key: "date", label: "Date", sortable: true, visible: true },
  { key: "day", label: "Day", sortable: true, visible: true },
  { key: "time", label: "Time", visible: true },
  { key: "fileUrl", label: "Test Report", sortable: true, visible: true },
  // { key: "status", label: "Status", sortable: true, visible: true },
];

const formatToISTDetails = (dateString) => {
  if (!dateString) {
    return {
      formattedDate: "-",
      formattedTime: "-",
      formattedDay: "-",
    };
  }

  const date = new Date(dateString);
  if (isNaN(date)) {
    return {
      formattedDate: "-",
      formattedTime: "-",
      formattedDay: "-",
    };
  }

  const optionsDate = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const optionsTime = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const optionsDay = {
    timeZone: "Asia/Kolkata",
    weekday: "long",
  };

  return {
    formattedDate: new Intl.DateTimeFormat("en-IN", optionsDate).format(date),
    formattedTime: new Intl.DateTimeFormat("en-IN", optionsTime).format(date),
    formattedDay: new Intl.DateTimeFormat("en-IN", optionsDay).format(date),
  };
};

const MedicalRecords = () => {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [columns] = useState(LabTestHeaders);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [numRowsPerPage, setNumRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [hideActions] = useState({ edit: false, delete: false, view: true });

  // Search Handler
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter((row) =>
      row.doctorId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / numRowsPerPage);
  const paginatedData = Array.isArray(filteredData)
    ? filteredData.slice(
        (currentPage - 1) * numRowsPerPage,
        currentPage * numRowsPerPage
      )
    : [];
  console.log("paginatedData-------------------", paginatedData);
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  // Action Handlers
  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleDelete = (row) => {
    setData((prevData) => prevData.filter((item) => item.id !== row.id));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // start loading before fetch
      try {
        const result = await getUserAllBookedMedicalRecords();
        // console.log(
        //   "useEffect  getUserAllBookedMedicalRecords--------------------",
        //   result
        // );
        if (result?.code === 200) {
          setData(result?.data);
        }
      } catch (error) {
        console.log("useEffect getUserAllBookedMedicalRecords Error ", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full flex ">
      <div className=" md:mt-2 lg:mt-6 px-2 lg:px-4 w-full">
        <Box>
          {/* Search Bar */}
          <Input
            // fullWidth
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
                borderColor: "var(--lightBlue)", // Border color on focus
              },
            }}
          />

          {/* Table */}
          {loading ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ backgroundColor: "var(--lightskyblue)" }}
                    >
                      Serial .No
                    </TableCell>
                    <TableCell
                      style={{ backgroundColor: "var(--lightskyblue)" }}
                    >
                      Patient's Name
                    </TableCell>
                    <TableCell
                      style={{ backgroundColor: "var(--lightskyblue)" }}
                    >
                      Doctor Name
                    </TableCell>
                    <TableCell
                      style={{ backgroundColor: "var(--lightskyblue)" }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      style={{ backgroundColor: "var(--lightskyblue)" }}
                    >
                      Day
                    </TableCell>
                    <TableCell
                      style={{ backgroundColor: "var(--lightskyblue)" }}
                    >
                      Time
                    </TableCell>
                    <TableCell
                      style={{ backgroundColor: "var(--lightskyblue)" }}
                    >
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Array.from({ length: numRowsPerPage }).map((_, index) => (
                    <TableRow key={index}>
                      {columns.map(
                        (col) =>
                          col.visible && (
                            <TableCell key={`${col.key}-${index}`}>
                              <Skeleton
                                variant="text"
                                height={20}
                                width="100%"
                              />
                            </TableCell>
                          )
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : paginatedData?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col) =>
                      col.visible ? (
                        <TableCell
                          key={col.key}
                          style={{ backgroundColor: "var(--lightskyblue)" }}
                        >
                          {col.key === "amount" ? (
                            <Box
                              display="flex"
                              alignItems="center"
                              style={{
                                color: "var(--black)",
                                fontWeight: "normal",
                              }}
                            >
                              {col.label} (In
                              <LiaRupeeSignSolid size={16} />)
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
                                  <Skeleton
                                    variant="text"
                                    height={20}
                                    width="100%"
                                  />
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
                                  sx={{
                                    maxWidth: "350px",
                                    fontSize: "10px",
                                    color: "var(--greyP)",
                                  }}
                                >
                                  {col.key === "serialNo" ? (
                                    <Typography
                                      noWrap
                                      sx={{
                                        maxWidth: "100px",
                                        color: "var(--listText)",
                                      }}
                                    >
                                      {(currentPage - 1) * numRowsPerPage +
                                        index +
                                        1}
                                      .
                                    </Typography>
                                  ) : col.key === "doctorName" ? (
                                    <Typography
                                      noWrap
                                      sx={{
                                        maxWidth: "160px",
                                        textWrap: "wrap",
                                        color: "var(--listText)",
                                      }}
                                    >
                                      Dr.{row?.doctor?.name ?? ""}
                                    </Typography>
                                  ) : col.key === "date" ||
                                    col.key === "time" ||
                                    col.key === "day" ? (
                                    (() => {
                                      const {
                                        formattedDate,
                                        formattedTime,
                                        formattedDay,
                                      } = formatToISTDetails(
                                        row.updatedAt || row[col.key] || ""
                                      );
                                      return (
                                        <Typography
                                          noWrap
                                          sx={{
                                            maxWidth: "100px",
                                            color: "var(--listText)",
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {col.key === "date"
                                            ? formattedDate
                                            : col.key === "time"
                                            ? formattedTime
                                            : formattedDay}
                                        </Typography>
                                      );
                                    })()
                                  ) : col.key === "fileUrl" ? (
                                    <a
                                      href={row[col.key]}
                                      download
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-[var(--lightBlue)]"
                                    >
                                      {/\.(pdf)$/i.test(row[col.key]) ? (
                                        <>
                                          <FaFilePdf className="text-red-500 text-xl" />{" "}
                                          {/* PDF Icon */}
                                          <span className="text-sm">
                                            Download Report
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <FaFileImage className="text-green-500 text-xl" />{" "}
                                          {/* Image Icon */}
                                          <span className="text-sm">
                                            Download Report
                                          </span>
                                        </>
                                      )}
                                    </a>
                                  ) : (
                                    <Typography
                                      noWrap
                                      sx={{
                                        maxWidth: "100px",
                                        color: "var(--listText)",
                                      }}
                                      className="capitalize"
                                    >
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

          {/* Pagination Controls */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Select
              value={numRowsPerPage}
              onChange={(e) => setNumRowsPerPage(Number(e.target.value))}
              className="border my-5"
            >
              {[5, 10, 20, 30, 50, 100].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} Rows
                </MenuItem>
              ))}
            </Select>

            {/* right side pagination */}
            <div className="flex justify-end items-center mt-5 gap-2 mb-4 ">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-3 flex items-center gap-1 rounded ${
                  currentPage === 1
                    ? "text-[var(--greyP)] cursor-not-allowed"
                    : "text-[var(--lightBlue)] hover:bg-gray-100"
                }`}
              >
                <FaArrowLeft />
                Previous
              </button>

              {/* Page Numbers */}
              {generatePageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? "bg-[var(--lightBlue)] text-white"
                      : "bg-gray-200 text-[var(--lightBlue)] hover:bg-gray-300"
                  } ${page === "..." ? "cursor-default" : ""}`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`p-3 flex items-center gap-1 rounded ${
                  currentPage === totalPages
                    ? "text-[var(--greyP)] cursor-not-allowed"
                    : "text-[var(--lightBlue)] hover:bg-gray-100"
                }`}
              >
                Next
                <FaArrowRight />
              </button>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default MedicalRecords;
