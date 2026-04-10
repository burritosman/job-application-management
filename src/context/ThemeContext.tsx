import { createContext, useEffect, useState } from "react";

type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

// Extracted theme to context as it should be accessible by different components
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Default light state
    const [isDark, setIsDark] = useState(false);

    // As page loads, retrieve saved theme from localStorage from a previous session
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        setIsDark(savedTheme === "dark");
    }, []);
    
    // Observe current state, and swaps to other theme, persist for future sessions
    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setIsDark(!isDark);
    };

    return (
        // Provide theme to all child components
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};