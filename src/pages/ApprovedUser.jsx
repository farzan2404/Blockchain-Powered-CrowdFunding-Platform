import React, { useState, useEffect } from 'react';
import { useStateContext } from "../context";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";

const ApprovedUser = () => {
  const [approvedDocuments, setApprovedDocs] = useState([]);
  const { getApprovedDocs } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedDocs = async () => {
      try {
        const approvedDocuments = await getApprovedDocs();
        setApprovedDocs(approvedDocuments);
      } catch (error) {
        console.error('Error fetching pending documents:', error);
      }
    };

    fetchApprovedDocs();
  }, []); 

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      {approvedDocuments.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-10 py-3">
                Name
              </th>
              <th scope="col" className="px-14 py-3">
                Address
              </th>
              <th scope="col" className="px-10 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {approvedDocuments.map((document, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="ps-3">
                    <div className="text-base font-semibold">{document.name}</div>
                  </div>
                </th>
                <td className="px-8 py-4">{document.creator}</td>
                <CustomButton
                  btnType="button"
                  title={"View Documents"}
                  styles={"bg-[#0B60B0]"}
                  handleClick={() => {
                    navigate("/approved-Doc", { state: { user: document } });
                  }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">No Approved documents</div>
      )}
    </div>
  );
};

export default ApprovedUser;
