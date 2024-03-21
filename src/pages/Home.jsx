import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Home = ({filteredCampaigns, isLoading, setIsLoading}) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={filteredCampaigns.length > 0 ? filteredCampaigns : campaigns}
    />
    // we created to use this compo from within our profile pg.
  );
};

export default Home;
