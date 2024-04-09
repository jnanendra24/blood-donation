import React, { useEffect } from "react";
import axios from "axios";
import DonorCard from "./DonorCard";
const Home = () => {
  const [donors, setDonors] = React.useState(null);
  const [filterBloodType, setFilterBloodType] = React.useState("");
  useEffect(() => {
    fetchDonors();
  }, []);
  const fetchDonors = async () => {
    const res = await axios.get("http://localhost:5000/donors");
    setDonors(res.data);
  };

  const filterByBloodType = async (e) => {
    const bloodType = e.target.value;
    setFilterBloodType(bloodType);
    if (bloodType === "") {
      fetchDonors();
      return;
    } else {
      const res = await axios.get(
        `http://localhost:5000/donors/filter?bloodType=${encodeURIComponent(
          bloodType
        )}`
      );
      setDonors(res.data);
    }
  };
  return (
    <div>
      <div className="flex space-x-8 m-4 justify-center items-center">
        <h2 className="text-2xl font-bold">Available Donors</h2>
        <select
          name="filterBloodType"
          value={filterBloodType}
          onChange={filterByBloodType}
          className="border border-gray-300 rounded-md w-fit focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>
      {donors && (
        <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {donors.map((donor, index) => (
            <DonorCard
              key={index}
              name={donor.username}
              bloodGroup={donor.bloodType}
              location={donor.location}
              phone={donor.phoneNumber}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
