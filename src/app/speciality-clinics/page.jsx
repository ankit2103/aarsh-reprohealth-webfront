"use client";
import React, { useEffect, useState } from "react";
import ComingSoon from "../../components/coming-soon/page";
import AvailableClinic from "../../components/booking/available-clinic/page";
import {
  fetchAllClinicServices,
  fetchClinics,
} from "../../utils/speciality-clinic/clinic.util";
import {
  getCityFromCoordinates,
  getCurrentLatitudeLongitude,
} from "../../utils/geolocation";
import { toast } from "react-toastify";
import { fetchLabs } from "../../utils/lab/lab.util";
import { fetchDoctors } from "../../utils/doctor/doctor.util";
import Head from "next/head";


const SpecialityClinics = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [getData, setGetData] = useState([]);
  const [getSlots, setGetSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labList, setLabList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [city, setCity] = useState("");
  const [services, setServices] = useState([]);
  const [availableTest, setAvailableTest] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [search, setSearch] = useState("");


  const handleChange = (e) => {
    setSelectedLanguage(e);
    console.log("Selected language:", e); // you can use it in forms or logic
  };
  const handleSearch = (searchData) => {
    console.log("searchData:", searchData);
    setSearch(searchData);
  };

  // get lat lng
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const coords = await getCurrentLatitudeLongitude();
        console.log("coords--------------", coords);
        setLocation(coords);
      } catch (error) {
        if (error.code === 1) {
          // User denied permission
          console.warn("Location permission denied by user.");
          // Optionally set fallback or skip logic
          setLocation(null); // or some default location
        } else {
          console.error("Failed to fetch location:", error.message || error);
        }
      }
    };

    fetchLocation();
  }, []);
  //get city
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const cityName = await getCityFromCoordinates(
          location?.lat,
          location?.lng
        );
        // console.log("city name----------------------", cityName);
        setCity(cityName);
      } catch (err) {
        console.error("Failed to fetch city name:", err);
      }
    };

    if (location?.lat && location?.lng) {
      fetchCity();
    }
  }, [location]);
  // get all clinics
  useEffect(() => {

    const getClinics = async () => {
      setLoading(true);
      try {
        const lat = location?.lat;
        const lng = location?.lng;
        // { lat, lng }
        const result = await fetchClinics({ lat, lng, search: search });
        console.log("Result of get all Clinic: ", result);
        if (result?.code === 200 && result?.data) {
          setGetData(result?.data || []);
          setGetSlots(result?.data?.slots || []);

        }
        else {
          setGetData([]); // In case of no data, reset state
          setGetSlots([]);
        }
      } catch (error) {
        console.log("Error fetching clinics:", error);
      }
      finally {
        setLoading(false);
      }
    };

    getClinics();
  }, [location, search]);
  // get all labs
  useEffect(() => {
    const getLabs = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;
        // { lat, lng }
        const result = await fetchLabs({ lat, lng });
        console.log("Result of get all fetchLabs: ", result);
        if (result?.code === 200) {
          setLabList(result?.data);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getLabs();
  }, [location]);
  //get all Doctors
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;

        const result = await fetchDoctors({ lat, lng });
        // console.log("Result of get all Doctor: ", result);
        if (result?.code === 200) {
          const selectedData =
            Array.isArray(result?.data[5]) && result?.data[5].length > 0
              ? result?.data[5]
              : Array.isArray(result?.data[10]) && result?.data[10].length > 0
                ? result?.data[10]
                : Array.isArray(result?.data[15]) && result?.data[15].length > 0
                  ? result?.data[15]
                  : [];
          setDoctorList(selectedData || []);
          setGetSlots(result?.data?.slots || []);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getDoctors();
  }, [location]);
  useEffect(() => {
    const getAllClinicServices = async () => {
      try {
        const response = await fetchAllClinicServices();
        // console.log("response of getAllClinicServices:", response);
        if (response.code === 200) {
          const serviceName = response?.data?.map((item) => item.name);
          console.log(
            "response of getAllClinicServices:",
            response,
            serviceName
          );
          setServices(serviceName);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    getAllClinicServices();
  }, []);

  return (
    <>
      <Head>
        <title>{clinic?.name} | Book Fertility, Gynaecology, and Reproductive Services | Aarsh ReproHealth</title>

        <meta
          name="description"
          content={`${clinic?.name} offers specialized services like ${clinic?.serviceDetails?.map(s => s.serviceName).join(", ")} in ${clinic?.address?.locality}, ${clinic?.address?.city}, ${clinic?.address?.state}. Open from ${clinic?.operatingHours?.openingTime} to ${clinic?.operatingHours?.closingTime}, ${clinic?.operatingDay?.[0]?.join(", ")}.`}
        />

        <meta
          name="keywords"
          content={`${clinic?.name}, fertility clinic ${clinic?.address?.city}, reproductive care, ${clinic?.serviceDetails?.map(s => s.serviceName).join(", ")}, Aarsh Verified Clinic, best gynaecology center ${clinic?.address?.state}`}
        />

        <meta property="og:title" content={`${clinic?.name} - Fertility & Gynaecology Services`} />
        <meta property="og:description" content={`${clinic?.description?.replace(/<[^>]*>/g, '')?.slice(0, 150)}...`} />
        <meta property="og:type" content="healthcareFacility" />
        <meta property="og:url" content={`https://www.aarshreprohealth.com/clinic/${clinic?._id}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.aarshreprohealth.com/clinic/${clinic?._id}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": clinic?.name,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": clinic?.address?.locality,
                "addressLocality": clinic?.address?.city,
                "addressRegion": clinic?.address?.state,
                "postalCode": clinic?.address?.pincode,
                "addressCountry": "India"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": clinic?.address?.location?.coordinates?.[1],
                "longitude": clinic?.address?.location?.coordinates?.[0]
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": clinic?.operatingDay?.[0],
                "opens": clinic?.operatingHours?.openingTime,
                "closes": clinic?.operatingHours?.closingTime
              },
              "medicalSpecialty": clinic?.serviceDetails?.map(s => s.serviceName),
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": clinic?.ratingPercentage || 0,
                "reviewCount": clinic?.totalReviews || 0
              }
            })
          }}
        />

      </Head>
      <div className=" pt-10">
        {/* <ComingSoon/> */}
        <AvailableClinic
          getData={getData}
          setGetData={setGetData}
          loading={loading}
          setLoading={setLoading}
          labList={labList}
          setLabList={setLabList}
          doctorList={doctorList}
          setDoctorList={setDoctorList}
          location={location}
          setLocation={setLocation}
          city={city}
          setCity={setCity}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          onSelectLanguage={handleChange}
          search={search}
          setSearch={setSearch}
          onSearchData={handleSearch}
          test={services}
          setAvailableTest={setAvailableTest}
          availableTest={availableTest}
        />
      </div>
    </>

  );
};

export default SpecialityClinics;
