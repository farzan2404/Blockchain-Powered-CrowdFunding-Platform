import React from 'react'
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

const VerifierProfile = () => {

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const success = await loginVerifier(address);

    if (!success) {
      alert('Something went wrong');
    } 
    else {
      navigate("/verifier-profile");
    }
      
    } catch (error) {
      console.error('User login failed', error);
      alert('User login failed');
    }
    };

  return (
    <div className="flex space-x-10">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="26" width="22" viewBox="0 0 384 512">
          <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" fill="#808191"/>
        </svg>

    <a href="#">
        <h5 className="mb-2 pt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Pending Documents</h5>
    </a>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"></p>
    <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
        View all
        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="26" width="22" viewBox="0 0 384 512">
          <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" fill="#808191"/>
        </svg>
    <a href="#">
        <h5 className="mb-2 pt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Approved Documents</h5>
    </a>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"></p>
    <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
        View all
        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="26" width="22" viewBox="0 0 384 512">
          <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" fill="#808191"/>
        </svg>
    <a href="#">
        <h5 className="mb-2 pt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Rejected Documents</h5>
    </a>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"></p>
    <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
        View all
        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
        </div>
    </div>

  )
}

export default VerifierProfile;