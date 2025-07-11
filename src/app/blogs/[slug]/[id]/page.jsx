"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  fetchBlogs,
  fetchBlogById,
  fetchRelatedBlogById,
} from "../../../../utils/blog/blog.util";
import parse from "html-react-parser";
import Link from "next/link";
import Head from "next/head";

const BlogSeo = ({ blog }) => {
  if (!blog) return null;

  const {
    title,
    slug,
    metaTitle,
    metaDescription,
    coverImage,
    createdAt,
    updatedAt,
    createdBy,
  } = blog;

  const blogUrl = `https://www.aarshreprohealth.com/blogs/${slug}/${blog._id}`;
  const authorName = createdBy?.name || "Aarsh ReproHealth";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    "headline": title,
    "description": metaDescription,
    "image": coverImage,
    "author": {
      "@type": "Person",
      "name": authorName,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Aarsh ReproHealth",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aarshreprohealth.com/logo.png", // ✅ Replace with actual logo URL
      },
    },
    "datePublished": createdAt,
    "dateModified": updatedAt,
  };

  return (
    <Head>
      <title>{metaTitle} | Aarsh ReproHealth</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={blog.metaKeywords || "Health, Counseling, Mental Wellness"} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={blogUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={coverImage} />
      <meta property="og:url" content={blogUrl} />
      <meta property="og:site_name" content="Aarsh ReproHealth" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={coverImage} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
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

const formatDate = (utcDate) => {
  const date = new Date(utcDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const blogData = await fetchBlogById(id);
        const currentBlog = blogData?.data;
        console.log("currentBlog---------------",currentBlog)
        setBlog(currentBlog || null);
        const category = currentBlog?.bcId?.name;
        if (!category) return;  
        const reqBody = {blogId: currentBlog?._id, bcId: currentBlog?.bcId?._id };
        const result = await fetchRelatedBlogById(reqBody);
        // console.log("result of related blogs-------------------", result);
        if(result?.code==200){
          setRelatedBlogs(result?.data);
        } 
        setLoading(false);
      } 
      catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchData();
  }, [id]);
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
        <BlogSeo blog={blog} />
        <div className="container mx-auto px-4 py-8 mb-8 mt-8">
      {/* Blog Image Carousel */}
      <Slider {...sliderSettings}>
        {loading ? (
          <div className="h-[260px] md:h-[500px] w-full  rounded-xl animate-pulse" />
        ) : (
          blog?.blogImages?.map((image, i) => (
            <div className="w-full">
              <Image
                src={image}
                alt={`Blog Image ${i}`}
                width={100}
                height={100}
                className="w-full rounded-xl object-cover mt-20 md:mt-24"
                // h-[260px] md:h-[500px]
              />
            </div>
          ))
        )}
      </Slider>

      {/* Blog Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Main Blog */}
        <div className="lg:col-span-2">
          {blog ? (
            <>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
                {blog.title}
              </h1>
              <p className="text-pink-500 mt-1">
                {blog.bcId.name}
                <span className="text-gray-500">
                  {" "}
                  | {formatDate(blog.createdAt)}
                </span>
              </p>
              <div className="text-gray-700 mt-6 leading-relaxed text-[17px]">
                {renderDescription(blog.description)}
              </div>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="flex gap-4 mb-4">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
              <ul className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <li key={i} className="h-4 bg-gray-200 rounded w-full"></li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Related Blogs - Sticky Sidebar */}
        <div className="lg:col-span-1 mt-6 lg:mt-0">
          <div className="sticky top-28">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Related Blogs
              </h3>

              <div className={`space-y-4 ${loading ? "animate-pulse" : ""}`}>
                {loading ? (
                  [...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="flex gap-3 bg-gray-100 p-3 rounded-lg"
                    >
                      <div className="w-24 h-20 bg-gray-300 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/2 bg-gray-300 rounded" />
                        <div className="h-5 w-3/4 bg-gray-300 rounded" />
                        <div className="h-3 w-1/4 bg-gray-300 rounded" />
                      </div>
                    </div>
                  ))
                ) : relatedBlogs.length > 0 ? (
                  relatedBlogs.slice(0, 5).map((related) => (
                    <div
                      key={related._id}
                      className="flex gap-3 bg-gray-100 p-3 rounded-lg"
                    >
                      <Image
                        src={related.coverImage}
                        alt={related.title}
                        width={80}
                        height={80}
                        className="w-24 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-pink-500 text-sm">
                          {related.bcId.name}{" "}
                          <span className="text-gray-500">
                            | {formatDate(related.createdAt)}
                          </span>
                        </p>
                        <h4
                          className="text-sm font-medium text-gray-800 truncate"
                          title={related.title}
                        >
                          {related.title}
                        </h4>
                        <p
                          className="text-gray-600 text-sm line-clamp-1"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {renderDescription(related.description)}
                        </p>
                        <Link
                          href={`/blogs/${related.slug}/${related._id}`}
                          className="text-pink-500 text-xs mt-1 inline-block"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No related blogs found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default BlogPage;
