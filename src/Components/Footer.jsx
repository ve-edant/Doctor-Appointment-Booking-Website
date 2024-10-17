import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            AppointX offers features like appointment reminders, telemedicine
            options, secure patient data management, and integration with
            insurance. It simplifies the process of booking appointments, making
            healthcare more accessible and efficient.
          </p>
        </div>
        <div className="">
          <h2 className="text-xl font-bold mb-5">COMPANY</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/dead-link">Delivery</a></li>
            <li><a href="/dead-link">Privacy policy</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-5 text-black">GET IN TOUCH</h2>
          <div className="flex flex-col gap-2 text-gray-600">
            <p>+0-000-000-000</p>
            <p>vedantsalunke17473@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
