"use client";
import { useState, useEffect } from "react";
import AvailableLab from "../../components/booking/available-lab/page";
import { fetchLabs, fetchLabTest } from "../../utils/lab/lab.util";
import LabList from "../../components/booking/lab-list/page";
import {
  getCurrentLatitudeLongitude,
  getCityFromCoordinates,
} from "../../utils/geolocation";
import { fetchClinics } from "../../utils/speciality-clinic/clinic.util";
import { fetchDoctors } from "../../utils/doctor/doctor.util";
import Head from "next/head";

const LabsSEO = ({ getData }) => {
  return (
    <Head>
      <title>Accredited Diagnostic Labs | Aarsh Reprohealth</title>
      <meta
        name="description"
        content="Explore NABL & CAP-accredited diagnostic labs offering trusted test services across Madhya Pradesh. Book lab tests and home collections online."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.aarshreprohealth.com/labs" />

      {Array.isArray(getData) &&
        getData.length > 0 &&
        getData.map((lab) => (
          <script
            key={lab?._id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MedicalOrganization",
                name: lab?.name,
                description: lab?.description?.replace(/<[^>]*>/g, " ") || "",
                image: lab?.labPics?.[0] || "https://www.aarshreprohealth.com/default-lab.jpg",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: lab?.address?.locality || "Madhya Pradesh",
                  addressRegion: lab?.address?.state || "MP",
                  postalCode: lab?.address?.pincode || "",
                  addressCountry: "IN"
                },
                openingHoursSpecification: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  opens: lab?.availabilitySchedule?.openingTime || "10:00",
                  closes: lab?.availabilitySchedule?.closingTime || "19:00"
                },
                aggregateRating: lab?.ratingPercentage
                  ? {
                      "@type": "AggregateRating",
                      ratingValue: (lab?.ratingPercentage / 20).toFixed(1), // Assuming out of 100
                      reviewCount: lab?.totalReviews || 1
                    }
                  : undefined,
                availableService:
                  lab?.testDetails?.map((test) => test?.testName) || []
              })
            }}
          />
        ))}
    </Head>
  );
};

const DiagnoisticCenterLaboratories = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [getData, setGetData] = useState([]);
  const [clinicList, setClinicList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [city, setCity] = useState("");
  const [formData, setFormData] = useState({ searchbyname: "" });
  const [originalData, setOriginalData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [search, setSearch] = useState("");
  const [test, setTest] = useState([]);
  const [availableTest, setAvailableTest] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedLanguage(e.target.value);
    console.log("Selected language:", e.target.value); // you can use it in forms or logic
  };
  const handleSearch = (searchData) => {
    console.log("lab searchData:", searchData);
    setSearch(searchData);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        if (
          permissionStatus.state === "granted" ||
          permissionStatus.state === "prompt"
        ) {
          const coords = await getCurrentLatitudeLongitude();
          setLocation(coords);
        } else {
          console.log("User denied geolocation permission.");
          // fallback logic if needed
        }
        // Optional: listen for permission changes
        permissionStatus.onchange = () => {
          console.log("Permission changed to:", permissionStatus.state);
        };
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };

    fetchLocation();
  }, []);
  // get city acc to lat, lng
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const cityName = await getCityFromCoordinates(
          location.lat,
          location.lng
        );
        // console.log("city name----------------------", cityName);
        setCity(cityName);
      } catch (err) {
        console.error("Failed to fetch city name:", err);
      }
    };

    if (location.lat && location.lng) {
      fetchCity();
    }
  }, [location]);
  //get all lab
  useEffect(() => {
    const getAllLabs = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;
        // language: selectedLanguage,

        const fetchAllLabs = await fetchLabs({ lat, lng, search: search });
        console.log("fetchAllLabs response--------------------", fetchAllLabs)
        if (fetchAllLabs?.code === 200) {
          setLoading(false);
          setGetData(fetchAllLabs?.data);
          setOriginalData(fetchAllLabs?.data);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Failed to fetch All Labs", error);
      }
    };
    getAllLabs();
  }, [location, search]);
  // get clinic list
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;
        // { lat, lng }
        const result = await fetchClinics({
          lat,
          lng,
        });
        // console.log("Result of get all fetch clinics: ", result);
        if (result?.code === 200) {
          setClinicList(result?.data);
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
  // Get doctor list
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;

        const result = await fetchDoctors({ lat, lng });
        console.log("Result of get all Doctor: ", result);
        const selectedData =
          Array.isArray(result?.data[5]) && result?.data[5].length > 0
            ? result?.data[5]
            : Array.isArray(result?.data[10]) && result?.data[10].length > 0
            ? result?.data[10]
            : Array.isArray(result?.data[15]) && result?.data[15].length > 0
            ? result?.data[15]
            : [];
        if (result?.code === 200) {
          setDoctorList(selectedData || []);
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
    const getAllTest = async () => {
      try {
        const response = await fetchLabTest();
        // console.log("fetchAllLabs:", response?.data);
        if (response?.code === 200) {
          const testNames = response?.data?.map((item) => item.name);
          setTest(testNames);
        }
      } catch (error) {
        console.log("get all lab test error:", error);
      }
    };
    getAllTest();
  }, []);
 

  return (
    <>
      <LabsSEO getData={getData} />
      <div className="w-full  pt-10 ">
        <div className="">
          {/* <ComingSoon/> */}
          <AvailableLab
            getData={getData}
            setGetData={setGetData}
            loading={loading}
            setLoading={setLoading}
            doctorList={doctorList}
            setDoctorList={setDoctorList}
            clinicList={clinicList}
            setClinicList={setClinicList}
            location={location}
            setLocation={setLocation}
            city={city}
            setCity={setCity}
            originalData={originalData}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onSelectLanguage={handleChange}
            search={search}
            setSearch={setSearch}
            onSearchData={handleSearch}
            test={test}
            setAvailableTest={setAvailableTest}
            availableTest={availableTest}
          />
        </div>
        <div className="w-full  sm:pt-20 md:pt-0">
          <LabList
            getData={getData}
            setGetData={setGetData}
            loading={loading}
            setLoading={setLoading}
            doctorList={doctorList}
            setDoctorList={setDoctorList}
            clinicList={clinicList}
            setClinicList={setClinicList}
            location={location}
            setLocation={setLocation}
            city={city}
            setCity={setCity}
          />
        </div>
      </div>
    </>
  );
};

export default DiagnoisticCenterLaboratories;
