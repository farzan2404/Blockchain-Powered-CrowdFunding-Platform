import React, { useContext, createContext } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

// below are the utility functions coming from web3
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // connecting our smart contract with  its address below
  const { contract } = useContract(
    "0x6c3238989eE67a66a1E8F8fD051B56ce886711DD"
  );

  const { mutateAsync: createCampaigns } = useContractWrite(
    contract,
    "createCampaigns"
  );

    const { mutateAsync: userRegistration } = useContractWrite(
    contract,
    "userRegistration"
  );

  const { mutateAsync: uploadDocument } = useContractWrite(
  contract,
  "uploadDocument"
  );

  const { mutateAsync: userLogin } = useContractWrite(
    contract, 
  "userLogin"
  );

    const {mutateAsync: verifierLogin} = useContractWrite(
      contract,
    "verifierLogin"
  );


  const address = useAddress();
  const connect = useMetamask();
  const navigate = useNavigate();
    
    const registerUser = async (_name, _email, _password, _isRequester) => {
    try {

      const userAddress = await getUsernameAddress(_name);
      if ((userAddress != "0x0000000000000000000000000000000000000000")) {
      alert("User already exists. Please log in.");
      navigate("/Login");
      return;
      }

      const data = await userRegistration({
        args: [_name, _email, _password, _isRequester],
      });

      console.log("User registration success", data);
      return true; 

    } catch (error) {
      console.error("User registration failure", error);
    }
  };


const loginUser = async (_name, _password) => {
    try {
        const data = await userLogin({
            args: [_name, _password],
        });

        console.log("User login success", data);
        return true;

    } catch (error) {
        console.error("User login failure", error);
        return false;
    }
};

const loginVerifier = async (_address) => {
    try {
        const data = await verifierLogin({
            args: [_address],
        });

        console.log("Verifier login success", data);
        return true;

    } catch (error) {
        console.error("Verifier login failure", error);
        return false;
    }
};

const getUsernameAddress = async (_username) => {
    try {
        const address = await contract.call('getAddressByUsername', [_username]);
        return address;
    } catch (error) {
        console.error("Failed to fetch address by username:", error);
        return null;
    }
};


 const uploadUserDocument = async (_address, _documentAddresses) => {
    try {
      const data = await uploadDocument({
        args: [_address, _documentAddresses],
      });
      console.log("Document upload success", data);
      return true;

    } catch (error) {
      console.error("Document upload failure", error);
    }
  };



  // With this function we finally create our campaign
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaigns({
        args: [
          address, // owner
          form.name,
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,z
          form.image,
          form.category,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  // get campaigns.
  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    console.log("Campaigns from contract:", campaigns);

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()), 
      deadline: campaign.deadline.toNumber(),
      amtCollected: ethers.utils.formatEther(campaign.amountCollected.toString()), 
      image: campaign.image,
      category: campaign.category,
      pId: i,
    }));

    return parsedCampaigns;
  };



  const getAllDocuments = async () => 
  {
    const allDocuments = await contract.call("getDocuments");
    console.log("Campaigns from contract:", allDocuments);

    const parsedDocuments = allDocuments.map((document, i) => ({
      creator: document.creator,
      name: document.name,
      doc1: document.documentAddress1,
      doc2: document.documentAddress2,
      doc3: document.documentAddress3,
      status: document.status,
      pId: i,
    }));

    return parsedDocuments;
  }

  const getPendingDocs = async() =>
  {
    const allDocuments = await getAllDocuments();
    console.log(allDocuments);

    const pendingDocs = allDocuments.filter(
      (document) => document.status === 0);

      return pendingDocs;
  }

  const getUserDocuments = async() =>
  {
    
  }


  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address);

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaigns', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  const deleteCampaigns = async (pId) => {
    try {
      const data = await contract.call('deleteCampaigns', [pId]);
      console.log("Returned data from deleteCampaign:", data);

      console.log("Campaign deleted successfully.");

    } catch (error) {
      console.error("Failed to delete campaign:", error);
    }
  };


  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaigns: publishCampaign,
        getCampaigns,
        getAllDocuments,
        getPendingDocs,
        getUserCampaigns,
        donate,
        getDonations,
        deleteCampaigns,
        registerUser,
        loginUser,
        getUsernameAddress,
        uploadUserDocument,
        loginVerifier,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
// With this our first call to the smart contract is done.
