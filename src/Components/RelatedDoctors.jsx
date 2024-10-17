// RelatedDoctors.jsx

import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ currentDoctorId, currentDoctorSpecialty }) => {
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedDoctors = () => {
      // Filter out the current doctor and find related doctors by specialty
      const filteredDoctors = doctors.filter(doc => 
        doc.speciality === currentDoctorSpecialty && doc._id !== currentDoctorId
      );

      if (filteredDoctors.length > 0) {
        setRelatedDoctors(filteredDoctors);
      } else {
        setError("No related doctors found.");
      }

      setLoading(false);
    };

    fetchRelatedDoctors();
  }, [currentDoctorId, currentDoctorSpecialty, doctors]);

  if (loading) {
    return <div className="text-center py-5">Loading related doctors...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-5">{error}</div>;
  }

  return (
    <div className="related-doctors-container py-8">
      <h2 className="text-2xl font-bold mb-4">Related Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedDoctors.map((doctor, index) => (
          <div
            key={index}
            className=" border border-[#d0d8ec] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            onClick={() => navigate(`/appointment/${doctor._id}`)}
          >
            <img className="bg-[#e9efff] w-[full] object-cover" src={doctor.image} alt={doctor.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
              <p className="text-gray-600 text-sm font-medium">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
