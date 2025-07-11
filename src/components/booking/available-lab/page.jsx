"use client";
import { useEffect, useState } from "react";
import { booking } from "../../../components/element/images";
import Image from "next/image";
import data from "../../../_data/availabledoctor.json";
import SearchLabForm from "../search-lab-form/page";



const itemsPerPage = 6;

const AvailableLab = ({ getData, setGetData, loading, setLoading, doctorList, setDoctorList, clinicList, setClinicList, location, setLocation,  city, setCity, originalData, selectedLanguage, setSelectedLanguage, onSelectLanguage, search, setSearch, onSearchData, test, setAvailableTest, availableTest }) => {
  const [availablelabs, setAvailablelabs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  // Calculate total pages
  const totalPages = Math.ceil(availablelabs?.length / itemsPerPage);

  // Get current page data
  const paginatedLabs = availablelabs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPageNumbers = () => {
    const pages = [];
    const totalPages = Math.ceil(availablelabs?.length / itemsPerPage);

    if (totalPages <= 3) {
      // If pages are 5 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show page 2, 3 if not near the end
      if (currentPage <= 2) {
        pages.push(2, 3);
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 3, totalPages - 2);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 2);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  useEffect(() => {
    setAvailablelabs(getData);
  }, [getData]);

  return (
    <div className="w-full">
      <div className="main-container">
        <div className="container">
          <div className=" pt-8 px-0 md:pt-20">
            {/* sm:px-10 md:px-20 lg:px-14  */}
            <div className=" md:relative availablebgbanner hidden sm:flex md:flex md:justify-between w-full ">
              <div className="text-[var(--White)] px-0 py-4 md:p-0 md:px-4 lg:px-8 font-semibold md:w-auto hidden sm:hidden md:block lg:block">
                <h3 className="font-[600]">
                  Skip the waiting room consult your doctor online from the
                  comfort of home!
                </h3>
                <h3 className="font-[600] mt-0  md:mt-3">
                  {data[0].availabledoctor.title2}
                </h3>
                <p className="py-1 md:py-3">
                 Video/Audio/In-person
                </p>
              </div>
              <div className="pr-0 md:pr-2  md:w-auto  mt-0 sm:-mt-12 md:-mt-11  hidden sm:hidden md:block lg:block   lg:h-[100%] ">
                <Image
                  // src={booking.availabledoctorbannerimg}
                  src={booking.labImg}
                  alt="not found"
                  width="100%"
                  height="100%"
                  className=" md:h-[300px] lg:h-[100%] object-contain"
                />
              </div>

              <div className=" md:absolute w-[100%] sm:w-[100%] md:w-[90%] lg:w-[90%] left-1/2 bottom-1/2  md:transform  md:-translate-x-1/2 top-[10%] md:top-[90%]  z-200 ">
                <SearchLabForm   getData={getData} setGetData={setGetData} loading={loading} setLoading={setLoading} location={location} setLocation={setLocation} city={city} setCity={setCity} originalData={originalData } selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} onSelectLanguage={onSelectLanguage} search={search} setSearch={setSearch} onSearchData={onSearchData} test={test} setAvailableTest={setAvailableTest} availableTest={availableTest}/>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AvailableLab;

{
  /* Pagination Controls */
}
{
  /* <div className="flex justify-center items-center mt-6 mb-6 gap-2 ">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md text-[var(--lightBlue)] disabled:opacity-50"
            >
              Previous
            </button>

            
            {renderPageNumbers().map((page, index) =>
              page === "..." ? (
                <button
                  key={index}
                  disabled
                  className="px-3 py-1 border rounded-md text-gray-500 cursor-not-allowed"
                >
                  ...
                </button>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === page
                      ? "bg-[var(--lightBlue)] text-white"
                      : "text-[var(--lightBlue)]"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md text-[var(--lightBlue)] disabled:opacity-50"
            >
              Next
            </button>
          </div> */
}
