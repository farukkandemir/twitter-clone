"use client";
import UploadButtonComponent from "@/components/shared/UploadButtonComponent";
import { fetchTwitterApi } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactElement, useEffect, useState, useTransition } from "react";
import { BsTwitter, BsCheck2Circle } from "react-icons/bs";
import { FaAt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import ErrorField from "@/components/shared/ErrorField";

const IconStatus = ({
  isChecking,
  username,
  success,
}: {
  isChecking: boolean;
  username: string;
  success: boolean;
}) => {
  const icons = {
    checking: {
      icon: <AiOutlineLoading3Quarters className="animate-spin" />,
    },
    success: {
      icon: <BsCheck2Circle className="text-green-500" />,
    },
    error: {
      icon: <VscError className="text-red-500" />,
    },
  };

  const iconType =
    isChecking && username
      ? "checking"
      : !isChecking && username && success
      ? "success"
      : !isChecking && username && !success
      ? "error"
      : null;

  if (!iconType) {
    return;
  }

  return (
    <div className={`absolute top-1/2 right-2 transform -translate-y-1/2`}>
      {icons[iconType].icon}
    </div>
  );
};

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
  error?: string;
  checkUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecking: boolean;
  success: boolean;
}) => {
  const { username, error, checkUsername, isChecking, success } = props;

  return (
    <div className="w-full">
      <div className="relative">
        <FaAt className="absolute top-1/2 left-2 transform -translate-y-1/2 text-mainBlue" />
        <input
          value={username}
          type="text"
          className="text-white w-full bg-inherit border-2 border-mainBlue rounded-md p-2 pl-6 text-sm"
          onChange={(e) => checkUsername(e)}
        />
        <IconStatus
          isChecking={isChecking}
          username={username}
          success={success}
        />
      </div>
      {error && <ErrorField error={error} />}
    </div>
  );
};

const Onboarding = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isAccountLoading, setIsAccountLoading] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const checkUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError("");
    setUsername(e.target.value);

    if (e.target.value.length < 3) {
      return setSuccess(false);
    }

    await fetchTwitterApi({
      path: "/user/check-username",
      method: "POST",
      data: {
        username,
      },
      callback: (res: Record<string, boolean>) => setSuccess(res.success),
    });

    setIsChecking(false);
  };

  const handleNextStep = () =>
    setOnboardingStep((currentStep) => currentStep + 1);

  const createUserName = async () => {
    if (username.length < 3) {
      return setUsernameError("Username must be at least 3 characters long");
    }
    if (!success) {
      return setUsernameError("Username is already taken");
    }

    setIsAccountLoading(true);
    await fetchTwitterApi({
      path: "/user/new-username",
      method: "POST",
      data: {
        username,
        email: session?.user?.email,
      },
    });
    setIsAccountLoading(false);
    return router.push("/");
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
      buttonLabel={isAccountLoading ? "Creating Username" : "Create Username"}
      onClick={createUserName}
      actionStyle="w-full"
      ActionComponent={
        <SelectUsernameSection
          username={username}
          setUsername={setUsername}
          error={usernameError}
          checkUsername={checkUsername}
          isChecking={isChecking}
          success={success}
        />
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
