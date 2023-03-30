import PromptInput from "@/components/PromptInput";
import React from "react";

type Props = {};

const GeneratePage = (props: Props) => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-2xl p-5">Generate new Image</h1>
      <div className="w-full">
        <PromptInput />
      </div>
    </div>
  );
};

export default GeneratePage;
