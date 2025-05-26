"use client";

export default function CreateChatButton({
  onClick,
  disabled,
  isLoading,
  text,
}) {
  return (
    <div className="w-fit h-fit rounded-4xl bg-[var(--bg)] fixed bottom-25 right-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`cta !w-fit !text-[1.1rem] ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "opacity-100 hover:opacity-90"
        }`}
      >
        {text}
      </button>
    </div>
  );
}
