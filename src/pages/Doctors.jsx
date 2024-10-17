import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SpecialityButton from "../Components/SpecialityButton";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setfilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setfilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setfilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600 font-semibold">
          <SpecialityButton speciality={speciality}  doctorSpeciality={"General physician"}/>
          <SpecialityButton speciality={speciality}  doctorSpeciality={"Gynecologist"}/>
          <SpecialityButton speciality={speciality}  doctorSpeciality={"Dermatologist"}/>
          <SpecialityButton speciality={speciality}  doctorSpeciality={"Pediatricians"}/>
          <SpecialityButton speciality={speciality}  doctorSpeciality={"Neurologist"}/>
          <SpecialityButton speciality={speciality}  doctorSpeciality={"Gastroenterologist"}/>

        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((doctor, index) => (
            <div
              key={index}
              className="border border-[#d0d8ec] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              onClick={() => navigate(`/appointment/${doctor._id}`)}
            >
              <img className="bg-[#e9efff]" src={doctor.image} />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-600 text-sm font-medium">
                  {doctor.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
