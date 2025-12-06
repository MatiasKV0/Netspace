import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

import clienteAxios from "../../config/axios";

function Confirm() {
  const [data, setData] = useState('');
  const location = useLocation();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = location.pathname.split("/")[2];
        const response = await clienteAxios.put(`/user/confirm/${token}`);
        setData(response.data.msg);
      } catch (error) {
        setData(error.response.data.msg);
      }
    };
    
    fetchData();
  }, []);

  return (
<>
  <div className="container mx-auto h-[40vh] my-10 shadow-md rounded-2xl p-8 bg-[#222] text-white text-center flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl">
    <h1 className="text-3xl font-extrabold mb-5">{data}</h1>
    {data.includes("confirmed") && (
      <p className="text-lg">
        You can now{" "}
        <Link
          to="/sign_in"
          className="text-blue-400 font-semibold underline hover:text-blue-300 transition-colors duration-200"
        >
          log in
        </Link>{" "}
        to your account.
      </p>
    )}
  </div>
</>

  );
}

export default Confirm;