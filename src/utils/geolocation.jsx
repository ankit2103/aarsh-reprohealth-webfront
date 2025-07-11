

import { useEffect } from "react";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

export const getCurrentLatitudeLongitude = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      reject({ code: 0, message: "Geolocation not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error); // error will include code/message
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};


// Reverse Geocoding Function (lat/lng → city)
export const getCityFromCoordinates = async (lat, lng) => {
  const apiKey = "AIzaSyDXBi0b7Cjh5dha-oGmp13MTa7lmxP7994"; // don't share publicly
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();

    if (!data.results || !data.results.length) {
      throw new Error("No address found for these coordinates");
    }

    const components = data.results[0].address_components;

    const cityObj = components.find((c) =>
      c.types.includes("locality") || c.types.includes("administrative_area_level_2")
    );

    const areaObj = components.find((c) =>
      c.types.includes("sublocality") || c.types.includes("sublocality_level_1")
    );

    return {
      long_name: cityObj?.long_name || "",
      short_name: cityObj?.short_name || "",
      sublocality: areaObj?.long_name || "",
    };
  } catch (error) {
    console.error("Reverse geocoding failed", error);
    return { long_name: "" };
  }
};

// Forward Geocoding Function (city → lat/lng)
export const getCoordinatesFromCity = async (cityName) => {
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      cityName
    )}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.status === "OK") {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } else {
    throw new Error("Failed to get coordinates from city name");
  }
};

export const PincodeAutoFill = ({ formData, setFormData, pinField, onAutoComplete }) => {
  useEffect(() => {
    const pin = formData[pinField];
    if (pin?.length === 6) {
      const fetchDetails = async () => {
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
          const data = await res.json();

          if (data[0]?.Status === "Success") {
            const postOffices = data[0]?.PostOffice;
            const localNames = postOffices.map((p) => p.Name);
            const first = postOffices[0];

            setFormData((prev) => ({
              ...prev,
              state: first.State,
              city: first.District,
              locality: prev.locality || first.Name,
            }));

            if (onAutoComplete) {
              onAutoComplete({
                state: first.State,
                city: first.District,
                localities: localNames,
              });
            }
          }
        } catch (err) {
          console.error("Error fetching pincode details:", err);
        }
      };

      fetchDetails();
    }
  }, [formData[pinField]]);

  return null;
};

export default PincodeAutoFill;


// export const fetchPincode = async (city, state, country) => {
//   console.log("city, state, country", city, state, country)
//   const apiKey = "AIzaSyDXBi0b7Cjh5dha-oGmp13MTa7lmxP7994"
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${country}&key=${apiKey}`
//     );
//     const data = await response.json();

//     if (!data.results || data.results.length === 0) return [];

//     // Extract all postal codes found in the address components
//     const pincodes = data.results
//       .flatMap((result) => result.address_components)
//       .filter((comp) => comp.types.includes("postal_code"))
//       .map((comp) => comp.long_name);

//     // Remove duplicates
//     const uniquePincodes = [...new Set(pincodes)];
//     console.log("uniquePincodes----------------", pincodes);
//     return uniquePincodes;
//   } catch (error) {
//     console.error("Failed to fetch pincode:", error);
//     return [];
//   }
// };


// utils/pincodeLookup.js

export const fetchPincodeFromCityState = async (city, state, country) => {
  if (!city || !state || country?.toLowerCase() !== "india") return [];


  try {
    const response = await fetch(`https://api.postalpincode.in/postoffice/${city}`);
    const data = await response.json();

    if (data[0]?.Status === "Success") {
      const filtered = data[0].PostOffice?.filter(
        (p) =>
          p.District.toLowerCase() === city.toLowerCase() &&
          p.State.toLowerCase() === state.toLowerCase()
      );
      // console.log("pincodes--------------------",data[0].PostOffice.map((po) => po.Pincode).filter(Boolean))
      // return data[0].PostOffice.map((po) => po.Pincode).filter(Boolean); 

      const pincodes = filtered?.map((p) => p.Pincode);
      
      return pincodes || [];
    }
  } catch (err) {
    console.error("Error fetching pincode:", err);
  }

  return [];
};









// export default getCurrentLatitudeLongitude