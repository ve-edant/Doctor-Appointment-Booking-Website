import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';


const SpecialityButton = ({speciality , doctorSpeciality} ) => {
    const navigate = useNavigate();

  return (
    <p onClick={()=> speciality === `${doctorSpeciality}` ? navigate('/doctors') : navigate(`/doctors/${doctorSpeciality}`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === `${doctorSpeciality}` ? "bg-indigo-400 text-black" : ""}`}>{doctorSpeciality}</p>
  )
}

SpecialityButton.propTypes = {
    speciality: PropTypes.string,
    doctorSpeciality:PropTypes.string
  }

export default SpecialityButton