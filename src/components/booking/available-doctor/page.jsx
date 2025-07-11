"use client";
import { booking } from "../../../components/element/images";
import Image from "next/image";
import data from "../../../_data/availabledoctor.json";
import SearchAvailableDoctorForm from "../search-available-doctor-form/page";
import ComingSoon from "../../../components/coming-soon/page";



const AvailableDoctor = ({getData, setGetData, loading, setLoading, labList, setLabList, clinicList, setClinicList, location, setLocation,city, setCity, selectedLanguage, setSelectedLanguage, onSelectLanguage, search, setSearch, onSearchData, }) => {
  // console.log("AvailableDoctor-------------", getData, search);
  return (
    <div className="w-full">
      <div className="main-container">
        <div className="container">
          <div className=" pt-8 px-0 md:pt-20">
            <div className=" md:relative availablebgbanner hidden sm:flex md:flex md:justify-between w-full ">
              <div className="text-[var(--White)] px-0 py-4 md:p-0 md:px-4 lg:px-8 font-semibold md:w-auto hidden sm:hidden md:block lg:block">
                <h3 className="font-[600]">
                  Trusted care, now just a click away. Book your online consult today
                </h3>
                <h3 className="font-[600] mt-0  md:mt-3">
                  {data[0].availabledoctor.title2}
                </h3>
                <p className="py-1 md:py-3">Video/Audio/In-person</p>

              </div>
              <div className="pr-0 md:pr-2  md:w-auto  mt-0 sm:-mt-12 md:-mt-11 hidden sm:hidden md:block lg:block  ">
                <Image
                  src={booking.availabledoctorbannerimg}
                  alt="not found"
                  width="100%"
                  height="100%"
                  className="md:h-[300px] lg:h-[100%] object-cover"
                />
              </div>

              <div className=" md:absolute w-[100%] sm:w-[100%] md:w-[90%] lg:w-[90%] left-1/2 bottom-1/2  md:transform  md:-translate-x-1/2 top-[10%] md:top-[90%]  z-200 ">
                <SearchAvailableDoctorForm  getData={getData} setGetData={setGetData} loading={loading} setLoading={setLoading} location={location} setLocation={setLocation} city={city} setCity={setCity} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} onSelectLanguage={onSelectLanguage}  search={search} setSearch={setSearch} onSearchData={onSearchData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableDoctor;

{
  /* <div className="availablebgbanner border rounded-md">
        <div className="available-content font-semibold">
          <div className=" sm:p-3 md:p-6 ">
            <h2 className="fontsize3xl ">{data[0].availabledoctor.title1} </h2>
            <h2 className="fontsize3xl mt-0  md:mt-3">
              {data[0].availabledoctor.title2}
            </h2>
            <p className="py-1 md:py-3">Audio/text/video/in-person</p>

            <div className=" flex  items-center font-medium">
                <div className="flex  -space-x-2">
                  {images.map((image) => (
                    <Image
                      key={image.id}
                      src={image.src}
                      alt="not found"
                      width="100%"
                      height="100%"
                    />
                  ))}
                </div>
              <p className="ml-1 md:ml-2">
                {data[0].availabledoctor.noofonlinedr}
              </p>
            </div>
          </div>
          <div className="md:-mt-11 sm:max-w-[40%] md:min-w-[20%] lg:min-w-[30%]">
          <Image
            src={booking.availabledoctorbannerimg}
            alt="not found"
            width="100%"
            height="100%"
            className="sm:w-full  md:h-[auto] lg:h-[100%] sm:object-fit md:object-fit lg:object-cover "
          />
          </div>
        </div>
        <div className="available-booking-form">
            <div className="w-[100%] ">
              <div className="w-full ">
              <SearchAvailableDoctorForm />

              </div>
            </div>
        </div>
      </div> */
}
