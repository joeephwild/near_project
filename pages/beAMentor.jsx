import React, { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useMentor } from "../context/MentorContext";
import ipfsClient from "ipfs-http-client"; 
import { uploadFile } from '@mintbase-js/storage';
import ConnectModal from "../components/ConnectModal";

const BeAMentor = () => {
  const route = useRouter();
  const { beAMentor, modalOpen } = useMentor();

  // Define state variables
  const [preferredImage, setPreferredImage] = useState("");
  const [languageToMentor, setLanguageToMentor] = useState("Spanish");
  const [aboutYourself, setAboutYourself] = useState("");
  const [languageExperience, setLanguageExperience] = useState("");
  const [contact, setContact] = useState("");
  const [subscriptionCharge, setSubscriptionCharge] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const uploadResult = await uploadFile(file);
        const imageUrl = `https://arweave.net/${uploadResult.id}`;
        // Here you can store the `imageHash` or display a link to the IPFS image
        console.log("IPFS Image Hash:", imageUrl);
        setPreferredImage(imageUrl)
        // You can also save the `imageHash` to your component's state or perform other actions.
      } catch (error) {
        console.error("Error uploading image to IPFS:", error);
      }
    }
  };

  const handleSubmit = async () => {

    try {
      // Pass the state variables to the beAMentor function
      await beAMentor(
        languageToMentor,
        subscriptionCharge,
        aboutYourself,
        languageExperience,
        contact,
        preferredImage
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl p-8 border bg-white rounded shadow">
          <div className="flex items-center justify-between mb-8">
            <XIcon
              onClick={() => route.back()}
              className="text-black w-6 h-6 cursor-pointer"
            />
            <h2 className="text-black text-2xl font-medium">
              Apply to become a language mentor on <span className="text-Accent">Lacent</span>
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Preferred name</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-Black px-4 py-2 border rounded"
                  // value={preferredImage}
                  onChange={handleImageUpload}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Language to mentor</label>
                <select
                  className="w-full text-Black px-4 py-2 border rounded"
                  value={languageToMentor}
                  onChange={(e) => setLanguageToMentor(e.target.value)}
                >
                  <option value="select">Select your Language</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="English">English</option>
                  <option value="Polish">Polish</option>
                  <option value="Korean">Korean</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Tell us about yourself</label>
              <textarea
                rows="6"
                className="w-full text-Black px-4 py-2 border rounded"
                value={aboutYourself}
                onChange={(e) => setAboutYourself(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">
                  How long have you been speaking the chosen language
                </label>
                <input
                  type="number"
                  className="w-full text-Black px-4 py-2 border rounded"
                  value={languageExperience}
                  onChange={(e) => setLanguageExperience(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Contact</label>
                <input
                  type="number"
                  className="w-full text-black px-4 py-2 border rounded"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Your subscription charge</label>
              <input
                type="number"
                className="w-full px-4 text-Black py-2 border rounded"
                value={subscriptionCharge}
                onChange={(e) => setSubscriptionCharge(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="text-Accent"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="text-Black font-bold text-sm">I agree to Terms of Service and Privacy Policy</span>
            </div>
            <button
            onClick={handleSubmit}
              className="bg-Accent text-Black w-full py-2 rounded"
              disabled={!agreeToTerms}
            >
              Submit your application
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <ConnectModal title="Application submitted" detail="We will review your application and give you a response soon, in the mean time, continue enjoying Lacent" />
      )}
    </div>
  );
};

export default BeAMentor;
