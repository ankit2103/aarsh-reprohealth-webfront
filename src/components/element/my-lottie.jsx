// components/MyLottie.tsx
// import { Player } from '@lottiefiles/react-lottie-player'; // alternative
import Lottie from "lottie-react";
import animationData from "../../../public/animations/animation-thanks.json"; // adjust path

const recolorLottie = (data, newColor) => {
    const json = JSON.parse(JSON.stringify(data)); // deep clone
  
    const traverse = (obj) => {
      if (typeof obj !== 'object' || obj === null) return;
  
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          traverse(obj[key]);
        }
  
        // Match color key
        if (
          key === 'c' &&
          obj[key] &&
          typeof obj[key] === 'object' &&
          Array.isArray(obj[key].k) &&
          obj[key].k.length === 3
        ) {
          console.log('Found color:', key ,obj[key]);
          obj[key].k = newColor;
        }
      }
    };
  
    traverse(json);
    return json;
  };
  
  
  


export default function MyLottie() {
    const modifiedData = recolorLottie(animationData, [1, 0, 0]); 
  return (
    <div style={{ width: 300, height: 300 }}>
      {/* <Lottie animationData={modifiedData} loop={true} /> */}
      <Lottie animationData={modifiedData} loop={true} />
    </div>
  );
}
