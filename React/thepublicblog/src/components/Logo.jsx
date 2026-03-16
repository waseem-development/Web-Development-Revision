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
    small:   "h-7",
    default: "h-10",
    large:   "h-14",
  };

  const heightClass = sizeMap[size] ?? sizeMap.default;

  return (
    <div className="flex items-center">
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
          className={`text-amber ${size === "small" ? "h-5 w-5" : "h-7 w-7"}`}
          strokeWidth={1.5}
        />
        <span
          className={`font-display font-semibold tracking-tight ${
            size === "small" ? "text-xl" : "text-2xl"
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