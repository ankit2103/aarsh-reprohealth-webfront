"use client";
import { useState, useRef, useEffect } from "react";
import { Form, useForm } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import {
  getCityFromCoordinates,
  getCurrentLatitudeLongitude,
} from "../../../utils/geolocation";
import Language from "../../element/language";
// import ISO6391 from "iso-639-1";

const SearchLabForm = ({
  getData,
  setGetData,
  loading,
  setLoading,
  location,
  setLocation,
  city,
  setCity,
  originalData,
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
  const [formData, setFormData] = useState({
    cityName: city?.short_name || "",
    searchbyname: "",
    location: null,
    language: "",
  });
  const handleSearch = (e) => {
    e.preventDefault();
    const query = formData.searchbyname.trim();
    // console.log("query------------", query);
    // const filtered = originalData.filter((lab) => {
    //   const address = lab.address || {};
    //   const specializations = lab.specialization || [];
    //   const testNames = (lab.testDetails || []).map((t) =>
    //     t.testName?.toLowerCase()
    //   );

    //   return (
    //     lab.name?.toLowerCase().includes(query) ||
    //     specializations.some((spec) => spec?.toLowerCase().includes(query)) ||
    //     address.locality?.toLowerCase().includes(query) ||
    //     address.city?.toLowerCase().includes(query) ||
    //     address.state?.toLowerCase().includes(query) ||
    //     address.pincode?.toString().includes(query) ||
    //     testNames.some((name) => name.includes(query)) ||
    //     lab.experience?.toString().includes(query) ||
    //     lab.gender?.toLowerCase().includes(query)
    //   );
    // });

    if (!query) {
      setSuggestions([]);
      return;
    }

    const result = onSearchData(query); // Call parent search logic
    setSuggestions(result);
    // setGetData(filtered);
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    // console.log("handleSearchInput:", value);
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
    if (place && place.geometry) {
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
        language,
      }));
    }
  };
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const coords = await getCurrentLatitudeLongitude();
        setLocation(coords); // optional, if you need it elsewhere

        const place = await getCityFromCoordinates(coords.lat, coords.lng);
        const formatted = `${
          place?.sublocality ? place.sublocality + ", " : ""
        }${place?.long_name}`;
        setCity({ long_name: place?.long_name, short_name: place?.short_name });

        setFormData((prev) => ({
          ...prev,
          cityName: formatted, // e.g., "Indore"
          location: coords,
        }));
      } catch (err) {
        console.error("Failed to fetch city name:", err);
      }
    };
    fetchCity(); // call directly on mount
  }, []);
  // console.log("search form of lab:", location, city, getData);

  return (
    <div className="w-full border-none sm:border-none bg-[var(--White)] rounded-xl py-8 md:p-5 mb-6 sm:mb-3 md:mb-0 lg:mb-0 md:shadow-lg">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 "
      >
        <div className="w-full  rounded-lg ">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 w-full">
            <div className="w-full">
              <div className="w-full flex-col  md:flex-row flex gap-2 md:gap-4">
                <div className="flex justify-center items-center gap-2 md:w-[30%] border border-[var(--Iron)] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]">
                  <MdOutlineLocationOn className="text-2xl text-[var(--Iron)] font-semibold p" />
                  <LoadScript
                    googleMapsApiKey={
                      process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
                    }
                    libraries={libraries}
                  >
                    <Autocomplete
                      onLoad={(auto) => (autoCompleteRef.current = auto)}
                      onPlaceChanged={handlePlaceChanged}
                      options={{
                        types: ["(geocode)"], // restrict to cities only
                        componentRestrictions: { country: "in" },
                      }}
                    >
                      <input
                        type="text"
                        className="w-full border-none focus:outline-none truncate"
                        placeholder="Search area or city"
                        value={formData.cityName || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cityName: e.target.value,
                          }))
                        }
                      />
                    </Autocomplete>
                  </LoadScript>
                </div>
                {/* Search with Autocomplete */}
                <div className="relative flex justify-center items-center gap-2  md:w-full lg:w-[70%] border border-[var(--Iron)] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]">
                  <IoSearch className="text-2xl text-[var(--Iron)] pl-2" />
                  <input
                    className="w-[95%] outline-none focus:ring-0"
                    type="search"
                    placeholder="Search by labs, tests, etc..."
                    value={formData.searchbyname}
                    onChange={handleSearchInput}
                  />
                  {/* (e) =>
                      setFormData((prev) => ({
                        ...prev,
                        searchbyname: e.target.value,
                      })) */}
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
              <div className=" mt-2 md:mt-5 flex  flex-col gap-2  md:flex-row  md:gap-4">
                {/* <div className="md:w-[220px] lg:w-50">
                  <div className="relative w-full">
                    <label htmlFor="language"></label>
                    <select className="w-full px-4 py-2 border border-[var(--Iron)]  rounded-md shadow-sm  text-[var(--black)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)] scrollbar-hide">
                      <option value="">Consultation Language </option>
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
                </div> */}
                <div className="w-auto lg:w-30">
                  <div className="relative w-full">
                    <select className="w-full pl-6 pr-12 py-2 border border-[var(--Iron)] rounded-md shadow-sm  text-[var(--black)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]">
                      <option value="">Laboratory Tests</option>

                      {test?.length>0 && test?.map((labtest, index) => (
                        <option key={index} value={labtest}>
                          {labtest}
                        </option>
                      ))}

                      {/* <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option> */}
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute inset-y-0 right-2 text-[var(--lightBlue)] flex items-center pointer-events-none">
                      <RiArrowDropDownLine className="text-3xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={handleSearch} className="flex justify-center items-center gap-2 w-full lg:w-[20%] text-[var(--White)] bg-[var(--lightBlue)] px-4 py-2 rounded-md font-medium fontsizexl focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]">
              <IoSearch className="text-2xl text-[var(--White)]" />
              <button
                type="button"
                
                className="text-[var(--White)] bg-[var(--lightBlue)] cursor-pointer rounded-full font-medium fontsizexl"
              >
                Search
              </button>
              {/* onClick={handleSearch} */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchLabForm;

//  SearchAvailableDoctorForm
