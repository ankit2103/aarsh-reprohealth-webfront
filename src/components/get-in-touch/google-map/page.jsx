"use client";
import { FaRegClock } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";


const data = [

  {
    id: 2,
    img: <MdOutlineAlternateEmail className="text-[var(--White)] text-xl" />,
    title: "Email Address",
    des: "support@aarshreprohealth.com",
  },
  {
    id: 3,
    img: <IoCallOutline className="text-[var(--White)] text-2xl " />,
    title: "Phone Number",
    des: "+91 9740522300",
  },
  {
    id: 1,
    img: <FaWhatsapp className="text-[var(--White)] text-2xl" />,
    title: "Whatsapp Number",
    des: "+91 9740522300",
  },
];

const MapComponent = () => {


  return 1 ? (
    <div className="w-full ">
      {/* px-8 sm:px-10 md:px-14 lg:px-14 */}
      <div className="w-full relative ">
        {/* Google Map */}
        {/* <div className="bg-gray-200 w-[100%] h-[250px] sm:h-[200px]  md:w-[100%] md:h-[350px] rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d545.2329291177393!2d77.63264342561739!3d13.100544243551038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19fe0021fae3%3A0xa32a514b79c59444!2sCasagrand%20Lorenza!5e0!3m2!1sen!2sin&zoom=15&disableDefaultUI=true&mapTypeControl=false&marker=false"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */}
      

        {/* Address Card */}
        {/* <div className="absolute bottom-5 w-[100%] md:w-[100%] lg:w-[100%] flex items-center justify-center ">
          <div className=" w-[90%]  bg-[var(--White)]  px-4 py-2 sm:px-4 sm:py-4 md:px-6 md:py-2 lg:px-6 lg:py-4 shadow-lg rounded-xl flex items-center gap-2  ">
            <div className="w-[53px] h-[46px] flex items-center justify-center rounded-full bg-[var(--pictonblue)]">
              <LuMapPin className="text-[var(--White)] text-2xl" />
            </div>
            <div className="w-full text-start  ">
              <h3 className="text-lg font-semibold text-[var(--midnight)]">
                Office Address
              </h3>
              <p className="text-gray-600">AG04, Casagrand Lorenza, Bellahalli Village, Yelahanka Hobli, Bangalore - 560064</p>
            </div>
          </div>
        </div> */}
      </div>

      {data.map((item, index) => {
        return (
          <div key={item.id} className="w-[100%]  ">
            <div className="rounded-md  break-words flex items-center justify-center gap-2 px-4 py-4 md:px-4 md:py-4 lg:px-4 lg:py-4 mt-5 ">
              <div className="w-[50px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[45px] md:h-[50px] lg:w-[53px] lg:h-[50px] md:p-[12px]  flex items-center justify-center rounded-full bg-[var(--lightBlue)]">
                {/*  */}
                {item.img}
              </div>
              <div className="w-full text-start flex flex-col justify-start  ">
                <h3 className="text-lg font-medium text-[var(--midnight)] break-words">
                  {item.title}
                </h3>
                <p className="text-[var(--greyP)] text-sm">{item.des}</p>
                {index === 0 && (
                  <p className="text-[var(--greyP)] paragraph">{item.close}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <></>
    // <p>Loading Map...</p>
  );
};

export default MapComponent;
