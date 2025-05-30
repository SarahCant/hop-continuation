export default function UserIcon({
  name,
  color = "var(--blue)", //default colour
  className = "uicon",
}) {
  //convert name's first character to uppercase
  const initial = name?.[0]?.toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full ${className}`} //name
      style={{
        backgroundColor: `color-mix(in oklab, ${color} 50%, transparent)`, //colour
        color: color,
      }}
    >
      <span className="text-[14px]">{initial}</span>
    </div>
  );
}
