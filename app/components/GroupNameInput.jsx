"use client";

export default function GroupNameInput({ value, onChange }) {
  const MAX_LENGTH = 20;

  return (
    <section className="flex flex-col pt-2">
      <input
        className={`input w-full ${
          value === "" ? "!bg-[var(--blue)]/40" : "!bg-[var(--green)]/20"
        } focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:border-[var(--green)]`}
        type="text"
        placeholder="Gruppenavn"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={MAX_LENGTH}
        required
      />
      <p className="!text-xs text-right pr-2 !text-gray-400 pt-1">
        {value.length}/{MAX_LENGTH}
      </p>
    </section>
  );
}
