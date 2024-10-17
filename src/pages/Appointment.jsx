import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../Components/RelatedDoctors";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
    </div>
  );
};

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDoctor = doctors.find(doc => doc._id === docId);
  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    if (docInfo) {
      setDocInfo(docInfo);
    } else {
      setError("Doctor not found");
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    setLoading(true); // Start loading

    try {
      let today = new Date();
      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);

        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
          );
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10, 0, 0); // Start at 10 AM for future dates
        }

        let timeSlots = [];

        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });

          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        setDocSlots((prev) => [...prev, timeSlots]);
      }
    } catch (err) {
      setError("Failed to fetch available slots.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Doctor Image */}
        <div className="">
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img src={assets.verified_icon} alt="Verified" className="w-5" />
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          {/* --------------Doctor About-------------- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] font-semibold">
              {docInfo.about}
            </p>
          </div>
          <p className="flex items-center gap-1 text-lg font-medium text-gray-700 mt-4">
            Appointment fee:{" "}
            <span className="text-black">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* ----------------Booking Slots----------------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div 
                onClick={() => setSlotIndex(index)} 
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-400'}`} 
                key={index}
              >
                <p>{daysOfWeek[item[0]?.datetime.getDay()]}</p>
                <p>{item[0]?.datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-5">
          {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
            <p 
              onClick={() => setSlotTime(item.time)} 
              className={`text-sm font-medium flex-shrink-0 px-5 py-2 border border-gray-400 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-800 border-gray-300'}`} 
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={()=>navigate('/*')} className="bg-primary text-white text-lg px-14 py-3 rounded-full my-6">Book an Appointment</button>
      </div>
      <div>{currentDoctor && (
        <RelatedDoctors 
        currentDoctorId={docId} 
        currentDoctorSpecialty={currentDoctor.speciality} 
      />
      )}</div>
    </div>
  );
};

export default Appointment;
//main
