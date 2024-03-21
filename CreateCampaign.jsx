import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader} from "../components";
import { checkIfImage, daysLeft } from "../utils";

const createCampaigns = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaigns, verifierPayment } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "", 
    description: "",
    target: "",
    fees:"",
    deadline: "",
    image: "",
    category: "",
  });


// Implementing below one, just to update relevant fields in the form, and not others.
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const daysRemaining = daysLeft(form.deadline)

    if(daysRemaining <= 0)
    {
      window.alert("Deadline cannot be in past")
      setForm({...form, deadline:""});
      return navigate("/create-campaign");
    }

      checkIfImage(form.image, async (exists) => {
      if (exists) 
      {
        setIsLoading(true);

        const fees = ((form.target * 2) / 100).toString();

        await verifierPayment(fees);

        await createCampaigns({...form, 
        target: ethers.utils.parseEther(form.target, 18), 
        fees: ethers.utils.parseEther(((form.target * 2) / 100).toString(), 18)});

        setIsLoading(false);
        navigate("/");
      } 
      else 
      {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

          <FormField
          labelName="Platform fees *"
          placeholder="ETH 0.50"
          inputType="number"
          value={(form.target) * 2 / 100} 
          handleChange={(e) => handleFormFieldChange("fees", e)}
        />

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <FormField
          labelName="Fundraise For*"
          inputType="dropdown"
          placeholder="Select a category"
          value={form.category}
          handleChange={(e) => handleFormFieldChange("category", e)}
        >
          <option value="Education">Education</option>
          <option value="Animals">Animals</option>
          <option value="Medical">Medical</option>
          <option value="Rural Development">Rural Development</option>
          <option value="Technology">Technology</option>
          <option value="Arts">Arts</option>
          <option value="Other">Other</option>
        </FormField>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default createCampaigns;
