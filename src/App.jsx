import React from "react";
import { Route, Routes } from "react-router-dom";
import { CampaignDetails, CreateCampaign, Profile, Home, Register, Login, Document, VerifierLogin, VerifierProfile, PendingDoc, ApprovedDoc, RejectedDoc, Requesters } from "./pages";
import { Navbar, Sidebar } from "./components";

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 w-full max-sm:max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/document" element={<Document/>} />
          <Route path="/verifier-login" element={<VerifierLogin/>} />
          <Route path="/verifier-profile" element={<VerifierProfile/>} />
          <Route path="/pending-Doc" element={<PendingDoc/>} />
          <Route path="/approved-Doc" element={<ApprovedDoc/>} />
          <Route path="/rejected-Doc" element={<RejectedDoc/>} />          
          <Route path="/requesters" element={<Requesters/>} />
        </Routes>
      </div>
    </div>  
  );
};

export default App;
