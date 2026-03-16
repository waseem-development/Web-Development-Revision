import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

const Logo = ({ size = "default" }) => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const sizeMap = {
    small:   "h-10",
    default: "h-14",
    large:   "h-20",
  };

  const heightClass = sizeMap[size] ?? sizeMap.default;

  return (
    <div className="flex items-center cursor-pointer">
      <img
        src={isDark ? "/logo-dark.png" : "/logo-light.png"}
        alt="ThePublicBlog"
        className={`${heightClass} w-auto object-contain transition-opacity duration-300`}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      {/* Fallback — shown only if image fails */}
      <div className="items-center gap-2 hidden">
        <Globe
          className={`text-amber ${size === "small" ? "h-7 w-7" : "h-10 w-10"}`}
          strokeWidth={1.5}
        />
        <span
          className={`font-display font-semibold tracking-tight ${
            size === "small" ? "text-2xl" : "text-4xl"
          }`}
        >
          <span className="text-amber">The</span>
          <span className="text-foreground">Public</span>
          <span className="text-amber">Blog</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;