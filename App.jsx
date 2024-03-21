import React, {useEffect} from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CampaignDetails, CreateCampaign, Profile, Home, Register, Login, Logout, Document, VerifierLogin, VerifierProfile, PendingDoc, ApprovedDoc, RejectedDoc, Requesters, ApprovedUser, RejectedUser, ForgotCredential, Chatbot, Transaction} from "./pages";
import { Navbar, Sidebar } from "./components";

const App = () => {

  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'CrowdFunding App'; 
  }, []);
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 w-full max-sm:max-w-[1280px] mx-auto sm:pr-5">
        <Navbar setFilteredCampaigns={setFilteredCampaigns} setIsLoading = {setIsLoading}/>
        <Routes>
          <Route path="/" element={<Home filteredCampaigns={filteredCampaigns} isLoading = {isLoading} setIsLoading = {setIsLoading}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/document" element={<Document/>} />
          <Route path="/transaction" element={<Transaction/>} />
          <Route path="/verifier-login" element={<VerifierLogin/>} />
          <Route path="/verifier-profile" element={<VerifierProfile/>} />
          <Route path="/pending-Doc" element={<PendingDoc/>} />
          <Route path="/approved-Doc" element={<ApprovedDoc/>} />
          <Route path="/rejected-Doc" element={<RejectedDoc/>} />        
          <Route path="/requesters" element={<Requesters/>} />
          <Route path="/approved-User" element={<ApprovedUser/>} />
          <Route path="/rejected-User" element={<RejectedUser/>} />
          <Route path="/forgot-credential" element={<ForgotCredential/>} />
        </Routes>
        <Chatbot />
      </div>
    </div>  
  );
};

export default App;
