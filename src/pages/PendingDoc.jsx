import React from 'react';
import { useLocation } from "react-router-dom";
import { CustomButton } from "../components";

const PendingDoc = () => {
  const location = useLocation();
  const user = location?.state?.user;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-10 py-3">
              Document 
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="ps-3 flex flex-col">
            <div className="text-base font-semibold mb-2">
              <span className="text-blue-500">Document 1:</span>
              <a href={user?.doc1} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline ml-2">
                View Document 1
              </a>
            </div>
            <div className="text-base font-semibold mb-2">
              <span className="text-green-500">Document 2:</span>
              <a href={user?.doc2} target="_blank" rel="noopener noreferrer" className="text-green-700 underline ml-2">
                View Document 2
              </a>
            </div>
            <div className="text-base font-semibold">
              <span className="text-red-500">Document 3:</span>
              <a href={user?.doc3} target="_blank" rel="noopener noreferrer" className="text-red-700 underline ml-2">
                View Document 3
              </a>
            </div>
          </div>
            </th> 
          </tr>
          <div className='pt-3 pr-3'>
            <CustomButton
              btnType="button"
              title={"Approve"}
              styles={"bg-[#1dc071]"}
              handleClick={() => {
              }}
            />
            <CustomButton
              btnType="button"
              title={"Reject"}
              styles={"bg-[#C70039]"}
              handleClick={() => {
                
              }}
            />
          </div>
        </tbody>
      </table>
    </div>
  );
}

export default PendingDoc;
