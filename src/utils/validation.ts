/**
 * File to store collection of generic validation rules that may be reused with any fields
 */
export const validateRequired = (name: string, value: string) => {
    if (!value.trim()) return "Error for " + name + ": This field is required";
    return "";
  };
