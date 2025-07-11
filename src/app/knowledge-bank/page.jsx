"use client";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import {
  fetchKnowledgeBankByCategory,
  fetchKnowledgeBankCategory,
  fetchKnowledgeBanks,
} from "../../utils/knowledge-bank/knowledge-bank.util";
import KnowledgeCard from "../../components/custom-card/knowledge-card";
import KnowledgeBankTab from "../../components/knowledge-bank-tab/page";
import { knowledgebankcategoryIcon } from "../../components/element/images";
import Image from "next/image";
import FrequeentlyAskQuestion from "../../components/get-in-touch/frequently-ask-question/page";
import CommunityDiscussionsAndCommonConcerns from "./_components/community-discussions-and-common-concerns";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { useRouter } from "next/navigation";
import KnowledgeBankCard from "./_components/knowledge-bank-card";
import Head from "next/head";

const SeoStructuredData = ({ blogs }) => {
  if (!blogs || !blogs.length) return null;

  const blogSchemaArray = blogs.map((blog) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog?.metaTitle || blog?.title,
    description: blog?.metaDescription || "",
    image: blog?.coverImage || blog?.knowledgeBankImages?.[0],
    datePublished: blog?.createdAt,
    author: {
      "@type": "Person",
      name: "Aarsh Repro Health", // Replace with dynamic if needed
    },
    publisher: {
      "@type": "Organization",
      name: "Aarsh Repro Health",
      logo: {
        "@type": "ImageObject",
        url: "https://www.aarshreprohealth.com/logo.png", // Your actual logo
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.aarshreprohealth.com/knowledge-bank/${blog.slug}`,
    },
  }));

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchemaArray),
        }}
      />
    </Head>
  );
};

const newCategories = [
  {
    _id: 0,
    category: "Treatment FAQs",
    icon: knowledgebankcategoryIcon.icon1,
    inActiveIcon: knowledgebankcategoryIcon.inActiveIcon1,
    para: "Answers to your most asked questions on fertility, endometriosis, and reproductive health care.",
  },
  {
    _id: 1,
    category: "Wellness & Lifestyle Support",
    icon: knowledgebankcategoryIcon.icon2,
    inActiveIcon: knowledgebankcategoryIcon.inActiveIcon2,
    para: "Guidance on nutrition, stress, sleep, and habits that support your reproductive and overall health.",
  },
  {
    _id: 2,
    category: "Awareness Days & Events",
    icon: knowledgebankcategoryIcon.icon3,
    inActiveIcon: knowledgebankcategoryIcon.inActiveIcon3,
    para: "Stay informed about key health observances and upcoming events that matter to you.",
  },
  {
    _id: 3,
    category: "Community Discussions / Common Concerns",
    icon: knowledgebankcategoryIcon.icon4,
    inActiveIcon: knowledgebankcategoryIcon.inActiveIcon4,
    para: "Explore real concerns, shared stories, and honest conversations from people like you.",
  },
  {
    _id: 4,
    category: "Other Medical News",
    icon: knowledgebankcategoryIcon.icon5,
    inActiveIcon: knowledgebankcategoryIcon.inActiveIcon5,
    para: "Updates on wider health topics beyond reproductive care — because all wellness matters.",
  },
  {
    _id: 5,
    category: "Latest Updates &  Technologies",
    icon: knowledgebankcategoryIcon.icon6,
    inActiveIcon: knowledgebankcategoryIcon.inActiveIcon6,
    para: "Discover new breakthroughs, tests, and treatments shaping the future of reproductive health.",
  },
  {
    _id: 6,
    category: "News & Articles",
    icon: knowledgebankcategoryIcon.icon7,
    inActiveIcon: knowledgebankcategoryIcon.inActiveIcon7,
    para: "Curated insights, expert-written pieces, and the latest trends in reproductive and general health.",
  },
];
const KnowledgeBank = () => {
  const isAuthenticated = useAuthenticated();
  const router = useRouter();
  const [kbCategory, setKBCategory] = useState([]);
  const [getData, setGetData] = useState([]);
  const [selectMainCategory, setSelectMainCategory] = useState("");
  const contentRef = useRef(null);

  const [selectedCategoryPara, setSelectedCategoryPara] = useState("");
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    searchbyname: "",
  });

  // const handleSelectCategory = async (selectedCategory) => {
  //   console.log("handleSelectCategory---------------", selectedCategory);

  //   if (selectMainCategory === selectedCategory) {
  //     setSelectMainCategory(null); // unselect if same category clicked

  //   } else {
  //     setSelectMainCategory(selectedCategory);
  //     setSelectedCategoryPara()
  //     if (selectedCategory) {
  //       const filtered = getData.filter(
  //         (item) => item?.name === selectedCategory
  //       );

  //       setFilteredCategory(filtered);
  //     } else {
  //       setFilteredCategory(getData);
  //     }
  //   }
  // };

  const handleSelectCategory = async (selectedCategory) => {
    if (selectMainCategory === selectedCategory) {
      setSelectMainCategory(null);
      setSelectedCategoryPara("");
      setFilteredCategory(getData); // Reset to full list
    } else {
      setSelectMainCategory(selectedCategory);

      // Find the matching category object
      const matchedCategory = newCategories.find(
        (cat) => cat.category === selectedCategory
      );

      // Set para if found
      if (matchedCategory) {
        setSelectedCategoryPara(matchedCategory.para);
      } else {
        setSelectedCategoryPara("");
      }

      // Filter data based on selectedCategory
      const filtered = getData.filter(
        (item) => item?.name === selectedCategory
      );
      setFilteredCategory(filtered);

      // 💥 Scroll to content after selection
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // tiny delay to make sure content is updated
    }
  };

  useEffect(() => {
    try {
      const getKnowledgeBanks = async () => {
        const result = await fetchKnowledgeBanks();
        console.log("Calling fetchKnowledgeBanks...", result?.data);
        if (result?.code === 200) {
          setGetData(result?.data || []);
          if (result.data.length > 0 && result.data[0]?.name) {
          }

          setLoading(false);
        } else {
          setLoading(true);
        }
      };
      getKnowledgeBanks();
    } catch (error) {
      console.log("Error in fetching getKnowledgeBanks:", error);
    }
  }, []);

  useEffect(() => {
    const getKBCategory = async () => {
      try {
        const result = await fetchKnowledgeBankCategory();
        const data = result?.data;

        console.log("Knowledge Bank category Data:", data);

        if (Array.isArray(data) && data.length > 0) {
          setKBCategory(data);
        }
      } catch (error) {
        console.error("Failed to fetch Knowledge Bank category:", error);
      }
    };
    getKBCategory();
  }, []);

  return (
    <>
      <SeoStructuredData blogs={getData} />
        {/* // bg-gradient-to-b  from-cyan-100 via-slate-50 to-slate-50 */}
      <section className="w-full flex flex-col md:mt-20">
        {/* Section Title */}
        <div className="w-[100%] h-[50vh] bg-cover bg-[url(/assets/images/banners/new-kb.png)]">
          {/* kb-banner.png */}
          <div className="flex h-[100%] justify-center flex-col">
            {/* <p className="text-[#FE76A8] text-[15px] px-10 ">The FAQs</p> */}
            <h1 className="capitalize text-[40px]  sm:max-w-[100%]  md:max-w-[100%] lg:max-[100%] px-10 sm:px-10 md:px-10">
              Knowledge Bank
            </h1>
            <p className="px-10 text-[var(--greyP)] ">
              Everything you need to know — from treatments and technologies to
              lifestyle tips and real experiences.
            </p>
          </div>
        </div>

        <div className="w-full  text-left px-5 md:py-10 md:px-14">
          <div className="w-[100%] flex flex-col ">
            <div className="">
              <h2 className="">Explore Our Health Insights</h2>
              <div className="w-full flex justify-start items-center text-left  max-w-[1344px] mt-5 mb-5">
                <div className="flex justify-center items-center gap-2 w-full md:w-full lg:w-[50%] border border-[#D2D2D229] bg-slate-100 px-4 md:px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]">
                  <IoSearch
                    className="text-xl  text-[var(--listText)]"
                    color="grey"
                  />
                  <input
                    className="w-[95%] bg-transparent text-[var(--listText)] rounded-full outline-none focus:ring-0 "
                    type="search"
                    placeholder="Search by category, health tips, etc..."
                    value={formData.searchbyname}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        searchbyname: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            {/* category after banner section */}
            <div className="w-full">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 bg-[var(--White)] ">
                {/* flex flex-col md:flex-row lg:flex-row justify-start items-start  flex-wrap gap-5 */}
                {Array.isArray(newCategories) &&
                  newCategories.length > 0 &&
                  newCategories.slice(0, 1).map((item, index) => {
                    return (
                      <div
                        key={item?._id}
                        onClick={() => handleSelectCategory(item?.category)}
                        className={`w-[100%] md:w-[100%] lg:w-[100%] border rounded-md flex flex-col justify-start gap-2 py-5 px-5 cursor-pointer ${item?.category === selectMainCategory
                            ? "border-[var(--lightBlue)] border-2"
                            : ""
                          }`}
                      >
                        <div
                          className={`${item?.category === selectMainCategory
                              ? " border-[var(--lightBlue)]"
                              : "bg-[var(--lightBlue)] border-[var(--lightBlue)]"
                            }  py-2 px-2 w-[10%] sm:w-[15%] md:w-[15%]  lg:w-[10%]  border-2 rounded-md`}
                        >
                          {/* bg-[#2ED1E233]  */}
                          <Image
                            src={
                              item?.category === selectMainCategory
                                ? item?.inActiveIcon
                                : item?.icon
                            }
                            // src={item?.inActiveIcon}
                            alt="not found"
                            width="10px"
                            height="10px"
                            className=""
                          />
                        </div>
                        <h2 className="text-[var(listText)] font-medium text-base">
                          {item?.category}
                        </h2>
                        <p className="text-[var(--greyP)]">{item?.para}</p>
                      </div>
                    );
                  })}
                {Array.isArray(kbCategory) &&
                  kbCategory.length > 0 &&
                  kbCategory.map((item, index) => {
                    const matchedCategory = newCategories.find(
                      (cat) => cat.category.trim() === item?.name.trim()
                    );
                    return (
                      <div
                        key={item?._id}
                        onClick={() => handleSelectCategory(item?.name)}
                        className={`w-[100%] md:w-[100%] lg:w-[100%]  border rounded-md flex flex-col justify-start gap-2 py-5 px-5 cursor-pointer ${item?.name === selectMainCategory
                            ? "border-[var(--lightBlue)] border-2"
                            : ""
                          }`}
                      >
                        <div
                          className={`${item?.name === selectMainCategory
                              ? " border-[var(--lightBlue)]"
                              : "bg-[var(--lightBlue)] border-[var(--lightBlue)]"
                            }  py-2 px-2 w-[10%] sm:w-[15%] md:w-[15%] lg:w-[10%]  border-2 rounded-md`}
                        >
                          {matchedCategory?.icon && (
                            <Image
                              src={
                                item?.name === selectMainCategory
                                  ? matchedCategory?.inActiveIcon
                                  : matchedCategory?.icon
                              }
                              alt="not found"
                              width="10px"
                              height="10px"
                              className=""
                            />
                          )}
                        </div>
                        <h2 className="text-[var(listText)] font-medium text-base">
                          {item?.name}
                        </h2>
                        <p className="text-[var(--greyP)]">
                          {matchedCategory?.para}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="my-10" ref={contentRef}>
              <div className="w-[100%] flex flex-col ">
                <h2 className="">
                  {selectMainCategory
                    ? selectMainCategory
                    : ""}
                </h2>
                <p className="text-[var(--greyP)]">{selectedCategoryPara}</p>
              </div>

              {selectMainCategory ===
                "Community Discussions / Common Concerns" ? (
                <div>
                  <CommunityDiscussionsAndCommonConcerns />
                </div>
              ) : selectMainCategory === "Treatment FAQs" ? (
                <div>
                  <FrequeentlyAskQuestion />
                </div>
              ) : (
                Array.isArray(newCategories) &&
                Array.isArray(kbCategory) &&
                newCategories.length > 0 &&
                kbCategory.length > 0 &&
                kbCategory.some((item) => item?.name === selectMainCategory) && (
                  <KnowledgeBankCard
                    selectMainCategory={selectMainCategory}
                    filteredCategory={filteredCategory}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>

  );
};
export default KnowledgeBank;

{
  /* serach filter */
}
{
  /* <div className="w-full flex justify-start items-center text-left  max-w-[1344px] mx-auto my-10">
        <div className="flex justify-center items-center gap-2 md:w-full lg:w-[50%] border border-[#D2D2D229] bg-[var(--White)] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]">
          <IoSearch className="text-xl  text-[var(--listText)]" color="grey" />
          <input
            className="w-[95%] bg-transparent text-[var(--listText)] rounded-full outline-none focus:ring-0 "
            type="search"
            placeholder="Search by category, health tips, etc..."
            value={formData.searchbyname}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                searchbyname: e.target.value,
              }))
            }
          />
        </div>
      </div> */
}
{
  /* Main Category Title */
}

{
  /* <div>
        {kbCategory.length > 0 &&
          kbCategory?.map((item) => {
            return (
              <div key={item._id}>
                <div className="w-full text-left px-4 mx-auto mb-4">
                 //  max-w-[1344px]  
                  <h2 className="text-3xl text-[var(--black)]">{item?.name}</h2>
                </div>
              //  Subcategory Buttons 
                <div className="flex flex-wrap justify-start gap-4  w-full mx-auto px-4">
                  // max-w-[1344px] 
                  <KnowledgeBankTab
                    kbCategory={item}
                    selectMainCategory={selectMainCategory}
                    selectedCategory={selectedCategory}
                    handleSelectCategory={handleSelectCategory}
                  />
                </div>
                <div className=" m-auto pb-10">
                  
                      <div className="w-full mt-10">
                        <KnowledgeCard filteredCategory={filteredCategory} />
                      </div>
                  
                </div>
              </div>
            );
          })}
      </div> */
}
