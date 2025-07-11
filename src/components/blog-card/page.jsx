"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { illustration } from "../../components/element/images";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchBlogs } from "../../utils/blog/blog.util"; // Adjust path if needed
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import parse from "html-react-parser";
import { IoSearch } from "react-icons/io5";

const renderDescription = (desc) => {
  if (!desc) return null;

  const parsed = parse(desc);

  if (Array.isArray(parsed)) {
    return parsed; // or more advanced logic if needed
  } else {
    const text = typeof desc === "string" ? desc : "";
    const stripped = text.replace(/<[^>]*>/g, ""); // or use `striptags` package
    // const truncated =
    //   stripped.length > 100 ? `${stripped.slice(0, 100)}...` : stripped;

    return <>{stripped}</>;
  }
};

const BlogCard = ({
  filteredCategory,
  setFilteredCategory,
  originalBlogs,
  isLoading,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [numRowsPerPage, setNumRowsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredCategory?.length / numRowsPerPage);
  const paginatedData = filteredCategory?.slice(
    (currentPage - 1) * numRowsPerPage,
    currentPage * numRowsPerPage
  );
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  const formatDate = (utcDate) => {
    const date = new Date(utcDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  // Search Handler
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value.toLowerCase();

    setSearchQuery(query);
    setCurrentPage(1);
    if (query.trim() === "") {
      setFilteredCategory(originalBlogs);
      return;
    }

    const filtered = filteredCategory.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(query);
      const metaTitleMatch = item.metaTitle?.toLowerCase().includes(query);
      const categoryMatch = item.bcId?.name?.toLowerCase().includes(query);
      return titleMatch || metaTitleMatch || categoryMatch;
    });

    setFilteredCategory(filtered);
  };

  // useEffect(() => {
  //   // This should be done when receiving/fetching original blogs
  //   if (Array.isArray(filteredCategory)) {
  //     setBlogs(filteredCategory);
  //   }
  // }, []);
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredCategory, totalPages]);

  return (
    <>
      <div className="w-[95%] lg:w-[96%] m-auto py-10">
        <div className="main-container">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full px-2">
              <div className="w-full">
                <h2 className="heading text-start mt-4">
                  Expert health advice, resources and updates.
                </h2>
                <p className="text-[var(--greyP)] text-start mt-2 fontsizelg">
                  Read about how your surrounding defines your health.
                </p>
              </div>
            </div>
            {/* Serach bar */}
            <div
              className={`flex justify-center items-center gap-2 md:w-full lg:w-[50%] ${isLoading ||
                  (Array.isArray(filteredCategory) &&
                    filteredCategory.length === 0)
                  ? "bg-[var(--White)]"
                  : " bg-[var(--White)]"
                } px-4 py-2 rounded-full mt-4`}
            >
              <IoSearch
                className="text-xl text-[var(--listText)]"
                color="grey"
              />
              <input
                className="w-[95%] bg-[var(--White)] text-[var(--listText)] rounded-full border-none focus:outline-none focus:ring-0 px-2"
                type="text"
                placeholder="Search blogs, health tips, etc..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            {/* Loading State */}
            {isLoading ? (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="p-4 shadow-lg rounded-xl bg-[var(--White)] animate-pulse"
                  >
                    <div className="w-full h-[300px] bg-gray-200 rounded-2xl"></div>
                    <div className="flex gap-4 mt-6">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                    <div className="mt-1 h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="mt-4 w-32 h-5 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : Array.isArray(filteredCategory) &&
              filteredCategory.length === 0 ? (
              <div className="w-full flex justify-center items-center min-h-screen ">
                <Image
                  src={illustration?.empty}
                  alt="not found"
                  width={300}
                  height={300}
                  className="w-[240px] h-[240px]"
                />
              </div>
            ) : (
              <>
                {/* Blog Cards Grid */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.isArray(paginatedData) &&
                    paginatedData.map((blog) => (
                      <div
                        key={blog?._id}
                        onClick={() =>
                          router.push(`/blogs/${blog.slug}/${blog._id}`)
                        }
                        className="testimonial-main-card p-4 shadow-lg rounded-xl bg-[var(--White)]"
                      >
                        <div className="testimonial-img w-full object-cover">
                          <Image
                            src={blog?.coverImage}
                            alt={blog?.title}
                            width={400}
                            height={300}
                            className="rounded-2xl w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex gap-4 mt-6 fontsizelg">
                          <p className="text-[var(--pink)]">
                            {blog?.category || "Health Tips"}
                          </p>
                          <p className="text-[var(--greyP)]">
                            {formatDate(blog.createdAt) || "N/A"}
                          </p>
                        </div>
                        <h2 className="fontsizexl font-semibold mt-4">
                          {blog.title}
                        </h2>
                        <p
                          className="text-gray-600 text-sm text-start truncate overflow-hidden w-full"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {renderDescription(blog.description) ||
                            "No description available."}
                        </p>
                        <button
                          className="mt-4 text-[var(--pink)] font-medium text-sm flex gap-3 items-center hover:text-[var(--listText)]"
                          onClick={() =>
                            router.push(`/blogs/${blog.slug}/${blog._id}`)
                          }
                        >
                          Read More <FaArrowRightLong />
                        </button>
                      </div>
                    ))}
                </div>
                {/* Pagination Controls */}

                <div className="flex justify-end items-center mt-6 gap-2 mb-4  ">
                  {/* Previous Arrow */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`p-3  w-[10%] flex items-center gap-2 hover:bg-gray-200  rounded-md ${currentPage === 1
                        ? "text-[var(--greyP)] cursor-not-allowed"
                        : "text-[var(--lightBlue)] "
                      }`}
                  >
                    <FaArrowLeft />
                    <span> Previous</span>
                  </button>

                  {/* Page Numbers */}
                  {generatePageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" && setCurrentPage(page)
                      }
                      className={`px-4 py-2 rounded-md hover:bg-gray-300 ${currentPage === page
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
                    className={`px-4 py-2  w-[10%] flex items-center gap-2 rounded-md  ${currentPage === totalPages
                        ? "text-[var(--greyP)] cursor-not-allowed"
                        : "text-[var(--lightBlue)] hover:bg-gray-200"
                      }`}
                  >
                    <span>Next </span>
                    <FaArrowRight />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default BlogCard;

