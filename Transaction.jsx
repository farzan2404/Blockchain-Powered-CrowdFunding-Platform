import React from 'react';
import { useLocation } from 'react-router-dom';

const Transaction = () => {
  const { state: data } = useLocation();
  const index = 0;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Transaction Details</h2>
      {data && (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial No.</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction Hash</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gas Used</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gas Limit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{index+1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{data.receipt.transactionHash}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{parseInt(data.receipt.gasUsed._hex, 16)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{parseInt(data.receipt.effectiveGasPrice._hex, 16)}</td>

            </tr>
          </tbody>
        </table>
      )}
      {!data && <p className="text-gray-800 dark:text-gray-200">No transaction details available.</p>}
    </div>
  );
}

export default Transaction;
