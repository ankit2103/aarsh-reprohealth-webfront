import { getTokenLocal, getUserLocal } from "../utils/localstorage.util";

export const useAuthenticated = () => {
  const token = getTokenLocal();
  const user = getUserLocal();
  if (token && user) {
    return true;
  } else {
    return false;
  }
};
// "use client"
// import { useEffect, useState } from "react";
// import { getTokenLocal, getUserLocal } from "../utils/localstorage.util";
// import { useRouter } from "next/navigation";

// export const useAuthenticated = () => {
//   const [isAuth, setIsAuth] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = getTokenLocal();
//     const user = getUserLocal();

//     if (!token || !user) {
//       sessionStorage.setItem("redirectAfterLogin", router.asPath);
//       router.push("/login");
//     } else {
//       setIsAuth(true);
//     }
//   }, []);

//   return isAuth;
// };

