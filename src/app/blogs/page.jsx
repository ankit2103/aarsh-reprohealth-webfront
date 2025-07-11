"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { illustration } from "../../components/element/images";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import parse from "html-react-parser";
import { IoSearch } from "react-icons/io5";
import { fetchBlogCategory, fetchBlogs } from "../../utils/blog/blog.util";
import Head from "next/head";

const BlogsSeo = ({ displayedBlogs }) => {
  const blogSchema = displayedBlogs.map((blog) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.aarshreprohealth.com/blogs/${blog.slug}/${blog._id}`,
    },
    headline: blog.title,
    description: blog.metaDescription || blog.description.replace(/<[^>]+>/g, "").slice(0, 150),
    image: blog.coverImage,
    author: {
      "@type": "Person",
      name: blog.createdBy?.name || "Aarsh ReproHealth",
    },
    publisher: {
      "@type": "Organization",
      name: "Aarsh ReproHealth",
      logo: {
        "@type": "ImageObject",
        url: "https://www.aarshreprohealth.com/logo.png", // Replace with your actual logo URL
      },
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
  }));

  return (
    <Head>
      <title>Latest Blogs | Aarsh ReproHealth</title>
      <meta
        name="description"
        content="Stay updated with the latest blogs on fertility, urology, endometriosis, reproductive wellness, and expert advice from Aarsh ReproHealth."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.aarshreprohealth.com/blogs" />

      {/* Inject BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
    </Head>
  );
};

const renderDescription = (desc) => {
  if (!desc) return null;
  const parsed = parse(desc);
  if (Array.isArray(parsed)) return parsed;
  const stripped = typeof desc === "string" ? desc.replace(/<[^>]*>/g, "") : "";
  return <>{stripped}</>;
};

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [allBlogs, setAllBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [blogCategory, setBlogCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const rowsPerPage = 6;

  const loadBlogs = async (pageToFetch = 1, category = "All") => {
    setIsLoading(true);
    try {
      const result = await fetchBlogs(); // Ideally update API to accept pagination
      const fetched = result?.data || [];

      let filtered = fetched;
      if (category !== "All") {
        filtered = fetched.filter((item) => item?.bcId?.name === category);
      }

      const nextSlice = filtered.slice((pageToFetch - 1) * rowsPerPage, pageToFetch * rowsPerPage);

      if (pageToFetch === 1) {
        setDisplayedBlogs(nextSlice);
      } else {
        setDisplayedBlogs((prev) => [...prev, ...nextSlice]);
      }

      setAllBlogs(filtered);
      setHasMore(nextSlice.length === rowsPerPage);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setPage(1);
    loadBlogs(1, category);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query.trim()) {
      setDisplayedBlogs(allBlogs.slice(0, page * rowsPerPage));
      return;
    }

    const filtered = allBlogs.filter((item) => {
      return (
        item.title?.toLowerCase().includes(query) ||
        item.metaTitle?.toLowerCase().includes(query) ||
        item.bcId?.name?.toLowerCase().includes(query)
      );
    });
    console.log("filtered---------------------------",filtered)
    setDisplayedBlogs(filtered);
  };

  const formatDate = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight &&
      hasMore &&
      !isLoading &&
      searchQuery === ""
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    loadBlogs(page, selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const getBlogCategory = async () => {
      try {
        const result = await fetchBlogCategory();
       
        setBlogCategory((result?.data || []).filter(item => item.name !== 'Our Story'));
      } catch (error) {
        console.error("Failed to fetch blog categories:", error);
      }
    };
    getBlogCategory();
  }, []);

  return (
    <>
      <BlogsSeo displayedBlogs={displayedBlogs} />
      <section className="bg-gradient-to-b mt-20 ffrom-[#f0faff] via-[#fefaff] to-[#f3f9ff] flex flex-col py-10">
      <div className="w-full text-left px-4 max-w-[1344px] mx-auto mb-4">
        <h2 className="heading text-start capitalize">Latest Blogs</h2>
        <p className="text-[var(--greyP)] text-start mt-2">
          Your reliable source for health insights and wellness tips.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-[1344px] mx-auto px-3 w-full ">
        <div className="flex justify-center items-center gap-2 py-2 px-4 rounded-full border bg-gray-100">
          <IoSearch className="text-xl text-[var(--listText)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search blogs, health tips, etc..."
            className="w-full text-[var(--listText)] rounded-full border-none focus:outline-none px-2 bg-gray-100"
          />
        </div>
      </div>


      {/* Category Buttons */}
      <div className="flex flex-wrap justify-start gap-4 max-w-[1344px] w-full mx-auto px-4 mt-4">
        <button
          className={`px-4 py-2 border-2 rounded-full text-sm transition-all bg-white ${selectedCategory === "All"
            ? "border-[var(--lightBlue)] text-[var(--lightBlue)]"
            : "border-gray-300 text-[var(--listText)] hover:border-[var(--lightBlue)] hover:text-[var(--lightBlue)]"
            }`}
          onClick={() => handleSelectCategory("All")}
        >
          All
        </button>
        {blogCategory.map((category) => {
          const isSelected = selectedCategory === category.name;
          return (
            <button
              key={category._id}
              onClick={() => handleSelectCategory(category.name)}
              className={`px-4 py-2 border rounded-full text-sm transition-all bg-white ${isSelected
                ? "border-[var(--lightBlue)] text-[var(--lightBlue)]"
                : "border-gray-300 text-[var(--listText)] hover:border-[var(--lightBlue)] hover:text-[var(--lightBlue)]"
                }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Blog Cards */}
      <div className="w-full px-4 mt-10 max-w-[1344px] mx-auto">
        {isLoading && page === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-4 shadow-lg rounded-xl bg-white animate-pulse">
                <div className="w-full h-[300px] bg-gray-200 rounded-2xl"></div>
                <div className="flex gap-4 mt-6">
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : displayedBlogs.length === 0 ? (
          <div className="w-full flex justify-center items-center py-10">
            <Image src={illustration?.empty} alt="No blogs found" width={240} height={240} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBlogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => router.push(`/blogs/${blog.slug}/${blog._id}`)}
                  className="p-4 shadow-lg rounded-xl bg-white cursor-pointer"
                >
                  <Image
                    src={blog?.coverImage}
                    alt={blog?.title}
                    width={400}
                    height={300}
                    className="rounded-2xl w-full h-[300px] object-cover"
                  />
                  <div className="flex gap-4 mt-4 text-sm">
                    <span className="text-[var(--pink)]">{blog?.bcId?.name || "Health Tips"}</span>
                    <span className="text-[var(--greyP)]">{formatDate(blog.createdAt)}</span>
                  </div>
                  <h2 className="font-semibold text-lg mt-2 truncate">{blog.title}</h2>
                  <p
                    className="text-gray-600 text-sm line-clamp-2"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                  >
                    {renderDescription(blog.description)}
                  </p>
                  <button className="mt-4 text-[var(--pink)] font-medium text-sm flex gap-2 items-center hover:text-[var(--listText)]">
                    Read More <FaArrowRightLong />
                  </button>
                </div>
              ))}
            </div>

            {isLoading && page > 1 && (
              <div className="flex justify-center items-center py-10">
                <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
    </>
   
  );
};

export default Page;
