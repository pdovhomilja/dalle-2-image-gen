"use client";
import useSWR from "swr";
import { FormEvent, useState } from "react";
import fetchSuggestionFromChatGPT from "@/lib/fechSuggestionFromChatGPT";
import fetchImages from "@/lib/fetchImages";
import toast from "react-hot-toast";

function PromptInput() {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/test", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: refreshImages } = useSWR("images", fetchImages);

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;

    //clear input after submitting
    setInput("");

    //console.log(inputPrompt, "inputPrompt");

    const p = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = p;
    const notificationPromptShort = notificationPrompt.slice(0, 20);

    const notification = toast.loading(
      `Generating image for "${notificationPromptShort}..."`
    );

    const response = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: p }),
    });

    const data = await response.json();

    /*     if (response.ok) {
      toast.success(`Image generated for "${notificationPromptShort}..."`, {
        id: notification,
      });
    } else {
      toast.error(
        `Error generating image for "${notificationPromptShort}..."`,
        {
          id: notification,
        }
      );
    } */

    if (data.error) {
      toast.error(data.error, {
        id: notification,
      });
    } else {
      toast.success(
        `Image generated and stored in S3 bucket for "${notificationPromptShort}..."`,
        {
          id: notification,
        }
      );
    }

    //refresh images after generating a new image
    refreshImages();
  };

  const handlePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  //  console.log(suggestion, "suggestion");

  const loading = isLoading || isValidating;

  return (
    <div className="m-10">
      <form
        onSubmit={handlePrompt}
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 bordeer rounded-md lg:divide-x"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion ...") ||
            suggestion ||
            "Enter a prompt ... "
          }
          className="flex-1 p-4 outline-none rounded-md"
        />
        <button
          className={`p-4 font-bold ${
            input
              ? `bg-violet-500 text-white transition-colors duration-200`
              : `text-gray-300 cursor-not-allowed`
          }`}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          className="p-4 bg-white text-violet-500 boder-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
          type="button"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p>
          Suggestion:
          <span className="text-violet-500 px-2">
            {loading ? "ChatGPT is thinking" : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
