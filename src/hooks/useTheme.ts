import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Custom hook to provide access to ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    
    return context;
};