"use client";
import UploadButtonComponent from "@/components/shared/UploadButtonComponent";
import { useSession } from "next-auth/react";
import React, { ReactElement, useState, useTransition } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaAt } from "react-icons/fa";

const OnboardingModal = (props: {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  ActionComponent: ReactElement;
  onClick: () => void;
  actionStyle?: string;
}) => {
  const {
    title,
    subtitle,
    ActionComponent,
    buttonLabel,
    onClick,
    actionStyle,
  } = props;

  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <div className="self-start">
        <div>
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className={`flex-1 ${actionStyle}`}>{ActionComponent}</div>
      <div className="self-stretch">
        <button
          className="bg-mainBlue w-full py-1 rounded-full"
          onClick={onClick}
        >
          {buttonLabel ? buttonLabel : "Skip"}
        </button>
      </div>
    </div>
  );
};

const SelectUsernameSection = (props: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { username, setUsername } = props;

  // const handleUsernameChange = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const result = await fetch("/api/username", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username: e.target.value }),
  //   });

  //   setUsername(e.target.value);
  // };

  return (
    <div className="w-full">
      <div className="relative">
        <FaAt className="absolute top-1/2 left-2 transform -translate-y-1/2 text-mainBlue" />
        <input
          // value={username}
          type="text"
          className="text-white w-full bg-inherit border-2 border-mainBlue rounded-md p-2 pl-6 text-sm"
          // onChange={(e) => handleUsernameChange(e)}
        />
      </div>
    </div>
  );
};

const Onboarding = () => {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  const handleNextStep = () => {
    setOnboardingStep((currentStep) => currentStep + 1);
  };

  const onboardingFlow = [
    <OnboardingModal
      title="Pick a profile picture"
      subtitle="Have a favoruite selfie? Upload it now!"
      buttonLabel={profilePicture ? "Continue" : "Skip"}
      onClick={handleNextStep}
      actionStyle="flex items-center justify-center"
      ActionComponent={
        <UploadButtonComponent setProfilePicture={setProfilePicture} />
      }
    />,
    <OnboardingModal
      title="What should we call you?"
      subtitle="Your @username is your unique.You can always change it later."
      // buttonLabel={profilePicture ? "Continue" : "Skip"}
      onClick={() => {}}
      actionStyle="w-full"
      ActionComponent={
        <SelectUsernameSection username={username} setUsername={setUsername} />
      }
    />,
  ];

  return (
    <div className="h-full w-full flex items-center justify-center bg-bgGrayOpac">
      <div className="w-[35rem] h-[35rem] bg-bgGray py-4 px-12 rounded-lg flex flex-col gap-6">
        <div>
          <BsTwitter
            className="mx-auto"
            style={{
              fontSize: "2rem",
            }}
          />
        </div>
        {onboardingFlow[onboardingStep]}
      </div>
    </div>
  );
};

export default Onboarding;
