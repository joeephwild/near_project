import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { logo } from "../assets/images";
import { languages } from "../utils";
import { useUser } from "../context/ProfileContext";

const ProfileOnboarding = () => {
  const [selectedSpeakLanguage, setSelectedSpeakLanguage] = useState("");
  const [selectedLearnLanguage, setSelectedLearnLanguage] = useState("");
  const [userName, setUserName] = useState("")
  const [image, setImage] = useState("")
  const [step, setStep] = useState(1);
  const router = useRouter();
  console.log("selected langues", selectedLearnLanguage, selectedSpeakLanguage)

  useEffect(() => {
    const filterForLanguageImage = () => {
      const languageFilter = languages.filter((item) => item.name === selectedLearnLanguage)
      const imageResult = languageFilter.map((item) => item.image)
      console.log(imageResult[0])
      setImage(imageResult[0])
    }
    filterForLanguageImage()
  }, [selectedLearnLanguage])

  const {createProfile} = useUser()

  // Function to handle language selection
  const handleLanguageSelect = async(image) => {
    if (step === 1) {
      setSelectedSpeakLanguage(image);
    } else {
      setSelectedLearnLanguage(image);
    }
  };

  const handleSubmit = async() => {
    await createProfile(selectedSpeakLanguage, selectedLearnLanguage, userName, image )
  }

  return (
    <div className="mx-[120px] my-[70px]">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="logo"
          className="w-[58px] h-[58px] object-contain"
        />
        <span className="text-Black text-[32px] font-bold">Lancent</span>
      </div>

      {step === 1 && (
        <span className="flex items-center justify-center text-[28px] text-Black">
          What language do you speak?
        </span>
      )}
      {step === 2 && (
        <span className="flex items-center justify-center text-[28px] text-Black">
          What language do you want to learn?
        </span>
      )}

      <div className="grid grid-cols-4 mt-[115px] items-center justify-center gap-[40px]">
        {languages.map((item, i) => (
          <div
            onClick={() => handleLanguageSelect(item.name)}
            key={i}
            className={`${
              (step === 1 && selectedSpeakLanguage === item.name) ||
              (step === 2 && selectedLearnLanguage === item.name)
                ? "bg-Accent"
                : "bg-white"
            }  px-[77px] py-[20px] flex flex-col items-center space-y-[36px]`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={234}
              height={234}
              className="w-[116px] h-[80px] object-contain"
            />
            <span className="text-Black">{item.name}</span>
          </div>
        ))}
      </div>

      {step === 2 && (
        <form action="" className="flex items-center justify-center w-full mt-10">
                   <label className="flex flex-col items-start space-y-[8px]">
              <span className="text-Black text-[16px] font-normal">
                UserName
              </span>
              <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
                type="text"
                className="bg-Grey/50 text-Black outline-none focus:outline-none border-Grey border w-full h-[45px]"
              />
            </label>
        </form>
      )}

      {step === 1 && (
        <div className="flex items-center justify-center w-full">
        <button
          className="bg-Accent px-[145px] py-[15px] mt-11 text-Black"
          onClick={() => setStep(2)}
        >
          Next
        </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center justify-center w-full">
        <button
          className="bg-Accent px-[145px] py-[15px] mt-11 text-Black"
          onClick={handleSubmit}
        >
          Submit
        </button>
        </div>
      )}
    </div>
  );
};

export default ProfileOnboarding;
