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
    "0x775044e67f6f4a4C90693Bc5C0f874AfB2a4B80e"
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

  const { mutateAsync: updatePassword } = useContractWrite(
    contract, 
  "updatePassword"
  );

    const {mutateAsync: verifierLogin} = useContractWrite(
      contract,
    "verifierLogin"
  );

      const {mutateAsync: verifyDocument} = useContractWrite(
      contract,
    "verifyDocument"
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

const passwordUpdate = async (_name, _newPassword) => {

  try {
    const data = await updatePassword({
      args:[_name, _newPassword],
    });
    console.log("Password Reset Completed", data);
    return true;
  }

  catch (error){
    console.error("Event Unsuccesful", error);
    return false;
  }
}

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

const isSignUp = async(_username, _address) => {

    const data = await contract.call('isUserRegistered', [_username,_address]);

    return data;
}

const getUsernameAddress = async (_username) => {
    try {
        const address = await contract.call('getAddressByUsername', [_username]);
        return address;
    } catch (error) {
        console.error("Failed to fetch address by username:", error);
        return null;
    }
};

  const getUserDocumentStatus = async(_address) => {
    try {
      const status = await contract.call('getUserDocumentStatus',[_address]);
      return status;
    }
    catch (error) {
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

    const documentVerify = async(_address, _id, _newStatus) =>{
      try {
        const data = await verifyDocument({
          args: [_address, _id, _newStatus],
        });
        console.log("Operation successful", data);
        return true;
      }
      catch (error) {
      console.error("Error", error);
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
          form.fees,
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
      name: campaign.name,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()), 
      fees: ethers.utils.formatEther(campaign.fees.toString()), 
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

    const getApprovedDocs = async() =>
  {
    const allDocuments = await getAllDocuments();
    console.log(allDocuments);

    const approvedDocs = allDocuments.filter(
      (document) => document.status === 1);

      return approvedDocs;
  }

    const getRejectedDocs = async() =>
  {
    const allDocuments = await getAllDocuments();
    console.log(allDocuments);

    const rejectedDocs = allDocuments.filter(
      (document) => document.status === 2);

      return rejectedDocs;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address);

    return filteredCampaigns;
  };

  const filterCampaignsByCategory = async(searchInput) => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.category.toLowerCase().includes(searchInput.toLowerCase()));

      return filteredCampaigns;
  }

const donate = async (pId, amount, name) => {

  const data = await contract.call('donateToCampaigns', [pId, name], { value: ethers.utils.parseEther(amount) });

  return data;
}

const verifierPayment = async(fees) => {
  try {
    const data = await contract.call('paymentToVerifier',[], { value: ethers.utils.parseEther(fees)});
        return data;
      } 
  catch (error) 
  {
    console.error("Error calling paymentToVerifier:", error);
  }
}


  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[2][i],
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
        getApprovedDocs,
        connect,
        getRejectedDocs,
        createCampaigns: publishCampaign,
        getCampaigns,
        getAllDocuments,
        getPendingDocs,
        documentVerify,
        getUserCampaigns,
        filterCampaignsByCategory,
        donate,
        verifierPayment,
        getDonations,
        deleteCampaigns,
        registerUser,
        isSignUp,
        loginUser,
        passwordUpdate,
        getUsernameAddress,
        uploadUserDocument,
        loginVerifier,
        getUserDocumentStatus,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
// With this our first call to the smart contract is done.
