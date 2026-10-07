import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "light",
  className = "h-9 w-auto",
  priority = false,
}: LogoProps) {
  const src = variant === "dark" ? "/logo-white.png" : "/logo-transparent.png";

  return (
    <div className={`relative inline-flex items-center shrink-0 ${className}`}>
      <Image
        src={src}
        alt="SV Care Health Diagnostics Logo"
        width={1024}
        height={261}
        className="w-auto h-full object-contain max-h-full"
        priority={priority}
      />
    </div>
  );
}
