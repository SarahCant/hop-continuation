"use client";

export default function Banner({ name, children, color = "var(--green)" }) {
  //banner text SpilSammen Chat if no children or name attached
  const title = children ?? name ?? "SpilSammen Chat";

  //get dark variant of selected/groupColor for borders and shadows
  const getDarkColor = (colorVar) => {
    switch (colorVar) {
      case "var(--blue)":
        return "var(--dark-blue)";
      case "var(--green)":
        return "var(--dark-green)";
      case "var(--red)":
        return "var(--dark-red)";
      case "var(--purple)":
        return "var(--dark-purple)";
      default:
        return "var(--dark-green)";
    }
  };

  const darkColor = getDarkColor(color);

  return (
    <div className="banner-outer">
      <div
        className="banner"
        style={{
          background: color,
          borderColor: darkColor,
          boxShadow: `0 0 4px ${darkColor} inset, 0 0px 0px`,
        }}
      >
        <h1 className="!text-[1.5rem] !-mt-1.5 !text-[var(--bg)]">{title}</h1>

        {/* dynamic styling for pseudo-elements */}
        <style jsx>{`
          .banner::before,
          .banner::after {
            background: ${darkColor};
          }
          .banner::after {
            border-left-color: ${darkColor};
          }
        `}</style>
      </div>
    </div>
  );
}
