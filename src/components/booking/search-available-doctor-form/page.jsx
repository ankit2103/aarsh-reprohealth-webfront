"use client";
import { useEffect, useState, useRef, Suspense  } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import {
  getCityFromCoordinates,
  getCurrentLatitudeLongitude,
} from "../../../utils/geolocation";
import Language from "../../element/language";
import { useParams, usePathname, useSearchParams  } from "next/navigation";

const SearchAvailableDoctorForm = ({
  getData,
  setGetData,
  loading,
  setLoading,
  location,
  setLocation,
  city,
  setCity,
  selectedLanguage,
  setSelectedLanguage,
  onSelectLanguage,
  search,
  setSearch,
  onSearchData,
  test,
  setAvailableTest,
  availableTest,
}) => {
  const libraries = ["places"];
  const autoCompleteRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const pathname = usePathname();
  const [specialization, setSpecialization] = useState('');
  // const searchParams = useSearchParams();
  // const specialization = searchParams.get('specialization');
  const segment = pathname.split("/")[1];
  // console.log("full path:", pathname.split("/")[1], specialization);

  const [formData, setFormData] = useState({
    cityName: city?.short_name || "",
    searchbyname: "",
    location: null,
    language: "",
  });

  
  const handleSearch = (e) => {
    e.preventDefault();
    const query = formData.searchbyname.trim();
    if (!query) {
      setSuggestions([]);
      return;
    }
    const result = onSearchData(query); // Call parent search logic
    setSuggestions(result); // Set results locally
  };
  const handleSearchInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log("handleSearchInput:", value);
    setFormData((prev) => ({ ...prev, searchbyname: value }));
    setSearch();
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const query = value.toLowerCase();
    const filteredSuggestions = getData
      .filter((lab) => lab.name?.toLowerCase().includes(query))
      .slice(0, 5);

    setSuggestions(filteredSuggestions);
  };

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    if (!place || !place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const components = place.address_components || [];
    const area = components.find(
      (c) =>
        c.types.includes("sublocality") ||
        c.types.includes("sublocality_level_1")
    );
    const cityComp = components.find(
      (c) =>
        c.types.includes("locality") ||
        c.types.includes("administrative_area_level_2")
    );

    const formatted = `${area?.long_name ? area.long_name + ", " : ""}${
      cityComp?.long_name || place.name
    }`;

    setLocation({ lat, lng });
    setCity({ long_name: cityComp?.long_name });
    setFormData((prev) => ({
      ...prev,
      cityName: formatted,
      location: { lat, lng },
    }));
  };

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const coords = await getCurrentLatitudeLongitude();
        setLocation(coords);
        const place = await getCityFromCoordinates(coords.lat, coords.lng);
        const formatted = `${
          place?.sublocality ? place.sublocality + ", " : ""
        }${place?.long_name}`;
        setCity({ long_name: place?.long_name, short_name: place?.short_name });
        setFormData((prev) => ({
          ...prev,
          cityName: formatted,
          location: coords,
        }));
      } catch (err) {
        console.log("Failed to fetch location:", err);
      }
    };
    fetchCity();
  }, []);

   useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const specializationParam = params.get('specialization');
  if (specializationParam) {
    const decoded = decodeURIComponent(specializationParam);
    console.log("decoded-------------", decoded); // should now show: Gynecology & Obstetrics
    setSpecialization(decoded);
    setFormData((prev) => ({
      ...prev,
      searchbyname: decoded,
    }));
  }
}, []);
  useEffect(()=>{
    if(specialization){
      const query = formData.searchbyname.trim();
    if (!query) {
      setSuggestions([]);
      return;
    }
    const result = onSearchData(query); // Call parent search logic
    setSuggestions(result);
    }
  },[specialization])

  return (
    <div className="w-full bg-[var(--White)] rounded-xl pt-5 md:p-5 mb-6 md:shadow-lg">
      <form className="space-y-4">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4">
            {/* Location Input */}
            <div className="flex gap-2 md:w-[30%] border border-[var(--Iron)] px-4 py-2 rounded-md">
              <MdOutlineLocationOn className="text-2xl text-[var(--Iron)]" />
              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                libraries={libraries}
              >
                <Autocomplete
                  onLoad={(auto) => (autoCompleteRef.current = auto)}
                  onPlaceChanged={handlePlaceChanged}
                  options={{
                    types: ["geocode"],
                    componentRestrictions: { country: "in" },
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search area or city"
                    value={formData.cityName || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cityName: e.target.value,
                      }))
                    }
                    className="w-full border-none focus:outline-none truncate"
                  />
                </Autocomplete>
              </LoadScript>
            </div>

            {/* Search with Autocomplete */}
            <div className="relative flex items-center gap-2 md:w-full lg:w-[70%] border border-[var(--Iron)] px-0 py-2 rounded-md">
              <IoSearch className="text-2xl text-[var(--Iron)] w-[5%]" />
              <input
                className="w-[95%] outline-none"
                type="search"
                placeholder="Search by name, specialization, service ,location..."
                value={formData.searchbyname}
                onChange={handleSearchInput}
              />

              {/* Autocomplete Dropdown */}
              {suggestions?.length > 0 && (
                <ul className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          searchbyname: item.name,
                        }));
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div onClick={handleSearch} className="flex justify-center items-center gap-2 w-full lg:w-[20%] bg-[var(--lightBlue)] px-4 py-2 rounded-md text-white">
            <IoSearch className="text-2xl" />
            <button
              type="button"
              className="text-white font-medium"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-2 md:mt-5 flex flex-col md:flex-row gap-2 md:gap-4">
          {segment == "medical-specialist" ? (
            <div className="md:w-[220px] lg:w-50 relative">
              <select
                className="w-full px-4 py-2 border border-[var(--Iron)] rounded-md text-[var(--black)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)] scrollbar-hide"
                value={selectedLanguage}
                onChange={(e) => onSelectLanguage(e.target.value)}
              >
                <option value="">Consultation Language</option>
                {Language.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 text-[var(--lightBlue)] flex items-center pointer-events-none">
                <RiArrowDropDownLine className="text-3xl" />
              </div>
            </div>
          ) : (
            ""
          )}

          {segment == "speciality-clinics" ? (
            <div className="w-auto lg:w-[30%]">
              <div className="relative w-full">
                <select className="w-full lg:w-[100%] pl-6 pr-12 py-2 border border-[var(--Iron)] rounded-md shadow-sm  text-[var(--black)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]">
                  <option value="">Clinic Services</option>
                  {test.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {/* Custom Arrow */}
                <div className="absolute inset-y-0 right-2 text-[var(--lightBlue)] flex items-center pointer-events-none">
                  <RiArrowDropDownLine className="text-3xl" />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchAvailableDoctorForm;
