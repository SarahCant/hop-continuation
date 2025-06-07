"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth";
import { createGroupChat } from "../firebase";
import RequireAuth from "../components/RequireAuth";
import BottomMenu from "../components/BottomMenu";
import GroupNameInput from "../components/GroupNameInput";
import Banner from "../components/Banner";
import UserSearch from "../components/UserSearch";
import SelectedMembersList from "../components/SelectedMembersList";
import CreateChatButton from "../components/CreateChatButton";
import StepIndicator from "../components/StepIndicator";
import ColourSelect from "../components/ColorSelect";
import Image from "next/image";

export default function CreateChat() {
  const { currentUser } = useAuth();
  const router = useRouter();

  //flow state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  //form state
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("var(--green)"); //default to green
  const [isCreating, setIsCreating] = useState(false);

  //user management
  const addUser = (user) => {
    if (
      user.uid === currentUser.uid ||
      selectedUsers.some((u) => u.uid === user.uid)
    )
      return;

    setSelectedUsers((prev) => [...prev, user]);
  };

  const removeUser = (uid) => {
    setSelectedUsers((prev) => prev.filter((u) => u.uid !== uid));
  };

  //nav between steps
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  //chat creation
  const handleCreateChat = async () => {
    if (!groupName.trim() || selectedUsers.length === 0 || isCreating) return;

    try {
      setIsCreating(true);
      const chatId = await createGroupChat(
        currentUser,
        selectedUsers,
        groupName.trim(),
        selectedColor
      );

      //reset state
      setSelectedUsers([]);
      setGroupName("");
      setSelectedColor("var(--green)");
      setCurrentStep(1);

      //navigate to chat
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
      //handle error
    } finally {
      setIsCreating(false);
    }
  };

  //validation
  const canGoToNextStep = selectedUsers.length > 0;
  const canCreateChat =
    groupName.trim() && selectedUsers.length > 0 && !isCreating;

  return (
    <RequireAuth delay={700}>
      <div className="flex flex-col w-80 mx-auto pb-60">
        {/* step indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* header */}
        <h1 className="mt-7">Opret gruppe</h1>

        {/* step-specific content */}
        {currentStep === 1 && (
          <>
            <p className="mb-8">
              Søg efter medlemmer til din gruppe ved at indtaste deres e-mails
              nedenfor.
            </p>

            <section className="flex flex-col gap-8 w-80 mx-auto">
              <UserSearch
                currentUser={currentUser}
                selectedUsers={selectedUsers}
                onAdd={addUser}
              />
            </section>

            <SelectedMembersList
              selectedUsers={selectedUsers}
              onRemove={removeUser}
            />

            {/* next btn */}
            <CreateChatButton
              onClick={goToNextStep}
              disabled={!canGoToNextStep}
              isLoading={false}
              text="NÆSTE"
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <p className="mb-8">
              Vælg et navn og en farve til din gruppe og tryk på
              &quot;Opret&quot; for at afslutte.
            </p>

            {/* back btn */}
            <button
              onClick={goToPreviousStep}
              className="self-start flex items-center justify-center left-[4%] absolute top-4 transition-opacity"
            >
              <Image
                src="/img/icons/back-green.png"
                width={12}
                height={12}
                alt="Tilbage"
                className="!ml-[0.2rem]"
              />
              <p className="!text-[var(--green)] !text-xs pl-1">Tilbage</p>
            </button>

            <section className="flex flex-col gap-12 w-80 mx-auto">
              <GroupNameInput value={groupName} onChange={setGroupName} />

              <div className="relative self-center -top-6.5 -mb-3">
                <Banner name={groupName || " "} color={selectedColor} />
              </div>

              <h2 className="-mb-7 -mt-3">Vælg farve</h2>
              <ColourSelect
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
            </section>

            {/* create btn w/ loading state */}
            <CreateChatButton
              onClick={handleCreateChat}
              disabled={!canCreateChat}
              isLoading={isCreating}
              text={isCreating ? "OPRETTER..." : "OPRET"}
            />
          </>
        )}
      </div>

      <BottomMenu />
    </RequireAuth>
  );
}
