"use client";
import UploadButtonComponent from "@/components/shared/UploadButtonComponent";
import React, { ReactElement, useState } from "react";
import { BsTwitter } from "react-icons/bs";

const OnboardingModal = (props: {
  title: string;
  subtitle: string;
  buttonLabel: string;
  ActionComponent: ReactElement;
  onClick: () => void;
}) => {
  const { title, subtitle, ActionComponent, buttonLabel, onClick } = props;

  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <div className="self-start">
        <div>
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {ActionComponent}
      </div>
      <div className="self-stretch">
        <button
          className="bg-mainBlue w-full py-1 rounded-full"
          onClick={onClick}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const SelectUsernameSection = () => {
  return <div>hell</div>;
};

const Onboarding = () => {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const handleNextStep = () => {
    setOnboardingStep((currentStep) => currentStep + 1);
  };

  const onboardingFlow = [
    <OnboardingModal
      title="Pick a profile picture"
      subtitle="Have a favoruite selfie? Upload it now!"
      buttonLabel={profilePicture ? "Continue" : "Skip"}
      onClick={handleNextStep}
      ActionComponent={
        <UploadButtonComponent setProfilePicture={setProfilePicture} />
      }
    />,
    <OnboardingModal
      title="What should we call you?"
      subtitle="Your @username is your unique.You can always change it later."
      buttonLabel={profilePicture ? "Continue" : "Skip"}
      onClick={handleNextStep}
      ActionComponent={<SelectUsernameSection />}
    />,
  ];

  return (
    <div className="h-full w-full flex items-center justify-center bg-bgGrayOpac">
      <div className="w-[35rem] h-[35rem] bg-bgGray py-4 px-12 rounded-lg flex flex-col gap-6">
        <div className="">
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
