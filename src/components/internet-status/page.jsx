"use client";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

export default function InternetStatus({children}) {
  const [isOnline, setIsOnline] = useState(true);
  const hasMounted = useRef(false);

  useEffect(() => {
    const handleOnline = () => {
      
      setIsOnline(true);
       if (hasMounted.current) toast.success("You're back online! ");
    };

    const handleOffline = () => {
     
      setIsOnline(false);
       if (hasMounted.current) return;
        // toast.error("No internet connection!");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setIsOnline(false);
      toast.error(" No internet connection! ");
    }

        hasMounted.current = true; 
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{children}</>; // ✅ This ensures `children` render correctly
//   return null; // No UI needed, only toast notifications
}
