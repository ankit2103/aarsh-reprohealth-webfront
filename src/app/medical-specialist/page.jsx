"use client";
import { useEffect, useState, useRef } from "react";
import AvailableDoctor from "../../components/booking/available-doctor/page";
import DoctorList from "../../components/booking/doctor-list/page";
import ComingSoon from "../../components/coming-soon/page";
import {
  getCurrentLatitudeLongitude,
  getCityFromCoordinates,
} from "../../utils/geolocation";
import { fetchDoctors } from "../../utils/doctor/doctor.util";
import { fetchLabs } from "../../utils/lab/lab.util";
import { fetchClinics } from "../../utils/speciality-clinic/clinic.util";
import { useSearchParams } from 'next/navigation'
import Head from "next/head";


const Appointments = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [getData, setGetData] = useState([]);
  const [getSlots, setGetSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labList, setLabList] = useState([]);
  const [clinicList, setClinicList] = useState([]);
  const [city, setCity] = useState("");
  const libraries = ["places"];
  const autoCompleteRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [search, setSearch] = useState('');
  const handleChange = (e) => {
    setSelectedLanguage(e);
    console.log('Clinic Selected language:', e); // you can use it in forms or logic
  };
  const handleSearch = (searchData) => {
    console.log('clinic searchData:', searchData);
    setSearch(searchData);
  }

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
        console.log("city name----------------------", cityName);
        setCity(cityName);
      } catch (err) {
        console.error("Failed to fetch city name:", err);
      }
    };

    if (location.lat && location.lng) {
      fetchCity();
    }
  }, [location]);

  // Get doctor list
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;
        // console.log("selectedLanguage , search-------------------", selectedLanguage, search)
        const result = await fetchDoctors({ lat, lng, language: selectedLanguage, search: search });
        console.log("Result of get all Doctor: ", result);
        if (result?.code === 200) {
          setGetData(result?.data || []);
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
  }, [location, selectedLanguage, search]);
  // get lab list
  useEffect(() => {
    const getLabs = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;
        // { lat, lng }
        const result = await fetchLabs({ lat, lng });
        // console.log("Result of get all fetchLabs: ", result);
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
  // get clinic list
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;
        // { lat, lng }
        const result = await fetchClinics({ lat, lng });
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



  return (
    <>
      <Head>
        <title>our special doctors | Aarsh Reprohealth</title>
        <meta
          name="description"
          content="Our team of specialists is at the forefront of medical innovation. Each specialist brings a unique blend of expertise, empathy, and experience to ensure that your health is in the best hands."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.aarshreprohealth.com/medical-specialist" />
        {Array.isArray(getData) && getData.length > 0 && getData.filter((doctor) => doctor.isSpecialDoctor === true).map((doc) => (
          <script
            key={doc?._id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Physician",
                "name": `Dr. ${doc?.name}`,
                "image": doc?.profilePic,
                "description": `Expert in ${doc?.specialization.join(", ")}, ${doc?.experience || "Experienced"}.`,
                "medicalSpecialty": doc?.specialization,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": doc?.clinic?.[0]?.city || "Bangalore",
                  "addressRegion": doc?.clinic?.[0]?.state || "Karnataka",
                  "postalCode": doc?.clinic?.[0]?.pincode || "560034",
                  "addressCountry": "IN"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": doc?.averageRating || "4",
                  "reviewCount": doc?.totalReviews || "1"
                }
              })
            }}
          />
        ))}

      </Head>
      <div className="w-full  pt-10 ">
        <div className="">
          {/* flex flex-col justify-center items-center text-center */}
          {/* <ComingSoon/> */}
          <AvailableDoctor
            getData={getData}
            setGetData={setGetData}
            loading={loading}
            setLoading={setLoading}
            labList={labList}
            setLabList={setLabList}
            clinicList={clinicList}
            setClinicList={setClinicList}
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
          />
        </div>

        <div className="w-full  sm:pt-20 lg:pt-0 md:mt-28 ">
          <DoctorList
            getData={getData}
            setGetData={setGetData}
            loading={loading}
            setLoading={setLoading}
            labList={labList}
            setLabList={setLabList}
            clinicList={clinicList}
            setClinicList={setClinicList}
            city={city}
          />
        </div>
      </div>
    </>

  );
};
export default Appointments;
