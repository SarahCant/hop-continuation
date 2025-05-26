"use client";

export default function ColorSelect({ selectedColor, onColorChange }) {
  //selectable colors
  const colors = ["var(--blue)", "var(--green)", "var(--red)", "var(--purple)"];

  return (
    <section className="flex self-center justify-between items-center w-[80%] pt-[3vw]">
      {colors.map((color) => (
        //color btns
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className="w-[13vw] h-[13vw] rounded-full"
          style={{ backgroundColor: color }}
          aria-label={`Select ${color} color`}
        >
          {/* selected? add checkmark svg */}
          {selectedColor === color && (
            <svg
              className="w-6 h-6 text-[var(--bg)] mx-auto "
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      ))}
    </section>
  );
}
