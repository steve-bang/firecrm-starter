import { getInitials } from "@/lib/utils";

export function Avatar({
  name,
  image,
  size = "md",
}: {
  name?: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "h-9 w-9 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-16 w-16 text-lg",
  }[size];

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "User avatar"}
        className={`${sizeClass} rounded-2xl object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} inline-flex items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--color-brand)_16%,white)] font-semibold text-[var(--color-brand)]`}
    >
      {getInitials(name)}
    </div>
  );
}
