"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import parse from "html-react-parser";
import { useRouter, usePathname } from "next/navigation";
import { illustration } from "../../../components/element/images";
import { fetchBlogs } from "../../../utils/blog/blog.util";

const formattedDate = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

// Custom Slick Arrows
const PrevArrow = ({ onClick }) => (
    <div
        className="absolute z-10 left-[-10px] top-[40%] cursor-pointer hidden md:block"
        onClick={onClick}
    >
        <div className="bg-[var(--lightBlue)] p-2 rounded-full text-white hover:bg-[var(--vista)]">
            <FaChevronLeft />
        </div>
    </div>
);

const NextArrow = ({ onClick }) => (
    <div
        className="absolute z-10 right-[-10px] top-[40%] cursor-pointer hidden md:block"
        onClick={onClick}
    >
        <div className="bg-[var(--lightBlue)] p-2 rounded-full text-white hover:bg-[var(--vista)]">
            <FaChevronRight />
        </div>
    </div>
);

const BlogSliderCard = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const sliderSettings = {
        dots: false,
        infinite: blogs.length > 2,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    const renderDescription = (desc) => {
        if (!desc) return null;
        const parsed = parse(desc);
        if (Array.isArray(parsed)) return parsed[0];

        const text = typeof desc === "string" ? desc : "";
        const stripped = text.replace(/<[^>]*>/g, "");
        return stripped.length > 180 ? stripped.slice(0, 180) + "..." : stripped;
    };

    useEffect(() => {
        const getBlogs = async () => {
            try {
                setIsLoading(true);
                const result = await fetchBlogs();

                if (result?.code === 200) {


                    const filteredData = result.data?.filter(item => item?.name !== "Our Story");
                    console.log("result of blogs in blogs----------------", filteredData);
                    setBlogs(filteredData);
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getBlogs();
    }, []);

    return (
        <div className="w-full mx-auto pb-10 relative">
            <div className="main-container">
                <div className="container">
                    <div className="flex flex-row md:flex-row md:items-center justify-between w-full px-2 mb-6">
                        <div className="w-[60%] md:w-full">
                            <h2 className="heading text-start capitalize">Latest Blogs</h2>
                            <p className="text-[var(--greyP)] text-start mt-2">
                                Your reliable source for health insights and wellness tips.
                            </p>
                        </div>
                        <div className=" w-[40%] flex justify-end h-[30%]">
                            {pathname !== "/blogs" && (
                                <p
                                    className="border bg-[var(--lightBlue)] text-center w-[70%]  py-2 px-2 md:w-[112px] md:py-3 md:px-5 rounded-full text-[var(--White)] cursor-pointer hover:bg-[var(--vista)] hover:text-[var(--lightBlue)] flex justify-center items-center gap-2 mt-4 md:mt-0"
                                    onClick={() => router.push("/blogs")}
                                >
                                    See all <FaArrowRightLong />
                                </p>
                            )}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="mt-10 animate-pulse">
                            <div className="flex overflow-x-scroll gap-6">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="min-w-[400px] p-3 bg-gray-100 rounded-2xl">
                                        <div className="h-[180px] bg-gray-300 rounded-2xl mb-4 w-full" />
                                        <div className="h-5 bg-gray-300 w-3/4 rounded mb-2" />
                                        <div className="h-4 bg-gray-300 w-[90%] rounded mb-1" />
                                        <div className="h-4 bg-gray-300 w-[80%] rounded mb-4" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="w-full flex justify-center items-center">
                            <Image src={illustration?.empty} alt="no blogs" width={300} height={300} />
                        </div>
                    ) : (
                        <div className="mt-10 relative">
                            <Slider {...sliderSettings}>
                                {blogs.map((blog) => (
                                    <div key={blog._id} className="px-2">
                                        <div className="bg-white shadow rounded-2xl min-h-[480px] flex flex-col p-4">
                                            <div className="w-full aspect-[4/3] relative overflow-hidden rounded-2xl">
                                                <Image
                                                    src={blog.coverImage}
                                                    alt={blog.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                    className="object-cover rounded-2xl"
                                                />
                                            </div>

                                            <div className="flex justify-between gap-4 mt-4 text-sm">
                                                <p className="text-[var(--pink)] truncate">
                                                    {blog?.bcId?.name || "Health Tips"}
                                                </p>
                                                <p className="text-[var(--greyP)] whitespace-nowrap">
                                                    {formattedDate(blog.createdAt)}
                                                </p>
                                            </div>

                                            <p className="mt-2 font-semibold text-md leading-snug line-clamp-1">
                                                {blog.title}
                                            </p>

                                            <div className="text-[var(--greyP)] mt-2 text-sm leading-snug line-clamp-3">
                                                {renderDescription(blog.description)}
                                            </div>


                                            <button
                                                onClick={() => router.push(`/blogs/${blog.slug}/${blog._id}`)}
                                                className="mt-auto pt-4 text-[var(--pink)] font-medium flex gap-2 items-center text-sm hover:text-[var(--lightBlue)]"
                                            >
                                                Read More <FaArrowRightLong />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
        .slick-slide > div {
          display: flex !important;
          height: 100%;
        }
      `}</style>
        </div>
    );
};

export default BlogSliderCard;
