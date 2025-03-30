import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light" | "system";

interface ThemeSwitcherProps {
  showLabel?: boolean;
  className?: string;
}

export function ThemeSwitcher({
  showLabel = false,
  className,
}: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (showLabel) {
    return (
      <Button
        variant="ghost"
        onClick={toggleTheme}
        className={cn(
          "flex items-center justify-start gap-2 w-full px-3 py-2 rounded-md",
          className
        )}
        title={theme === "dark" ? "Dark Mode" : "Light Mode"}
      >
        <div className="w-6 h-6  flex items-center justify-center">
          {theme === "dark" ? (
            <Sun className="h-6 w-6 text-[#344054]" />
          ) : (
            <Moon className="h-6 w-6 text-[#344054]" />
          )}
        </div>
        <span className="text-base text-[#344054] dark:text-gray-300">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("h-8 w-8", className)}
      title={theme === "dark" ? "Açık Mod" : "Koyu Mod"}
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-[#344054]" />
      ) : (
        <Moon className="h-6 w-6 text-[#344054]" />
      )}
    </Button>
  );
}
