import { useEffect, useState } from "react";
import type { Application } from "../../types/application";
import { APPLICATION_STATUS } from "../../utils/constants";
import { searchCompanies } from "../../services/applicationService";
import { validateRequired } from "../../utils/validation";


type Props = {
    onClose: () => void;
    onAdd: (data: Omit<Application, "id">) => void;
};

type Suggestion = {
    name: string;
    domain: string;
};

function AddApplicationModal({onClose, onAdd}: Props) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const [form, setForm] = useState({
        role: "",
        company: "",
        status: APPLICATION_STATUS.APPLIED,
        date: "",
      });

      const [errors, setErrors] = useState({
        role: "",
        company: "",
        date: "",
      });

    // Retrieve auto complete results from service
    // Limit rate of API call to once per 3 second, character inputted more than 2
    useEffect(() => {
        if (!isFocused) return; 

        const delay = setTimeout(async () => {
            if (form.company.length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                // Call API from service
                const results = await searchCompanies(form.company);
                const mapped = results.map((item: any) => ({
                    name: item.name || item.domain,
                    domain: item.domain,
                }));
    
                setSuggestions(mapped);
            } catch (err) {
                console.error(err);
            }
        }, 300);
    
        return () => clearTimeout(delay);
    }, [form.company]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm({
          ...form,
          [name]: value,
        });
      
        const message = validateRequired(name, value);
      
        setErrors((prev) => ({
          ...prev,
          [name]: message,
        }));

    };

    // Submit: Ensure all fields filled, close modal
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
      
        const roleError = validateRequired("role", form.role);
        const companyError = validateRequired("company", form.company);
        const dateError = validateRequired("date", form.date);
        
        if (roleError || companyError || dateError) {
          setErrors({
            role: roleError,
            company: companyError,
            date: dateError,
          });
        
          return;
        }
      
        onAdd(form);
        onClose();
      };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                {/* New application form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <h1 className="text-xl">Add Application</h1>
                    <input
                        className="input input-bordered w-full"
                        name="role"
                        placeholder="Role"
                        value={form.role}
                        onChange={handleChange}
                    />

                    {/* Form field: Company */}
                    <div className="relative w-full">
                        <input
                            className="input input-bordered w-full"
                            name="company"
                            placeholder="Company"
                            value={form.company}
                            autoComplete="off"
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                setTimeout(() => setIsFocused(false), 100);
                            }}
                        />

                        {isFocused && suggestions.length > 0 && (
                            <ul className="absolute left-0 w-full z-50 bg-base-100 border rounded mt-1 shadow max-h-40 overflow-y-auto">
                                {suggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.domain}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                                        onMouseDown={() => {
                                            setForm({ ...form, company: suggestion.name });
                                            setSuggestions([]);
                                        }}
                                    >
                                        {/* Logo */}
                                        <img
                                            src={`https://img.logo.dev/${suggestion.domain}?token=${import.meta.env.VITE_LOGO_API_PUBLISHABLE_KEY}`}
                                            className="w-5 h-5 rounded"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />

                                        {/* Company Name */}
                                        <span>{suggestion.name}</span>
                                    </li>
                                ))}
                                    {/* Attribution*/}
                                <li className="text-xs text-base-content/50 mx-2 my-2 cursor-default">
                                    <a href="https://logo.dev">Logos provided by Logo.dev</a>
                                </li>
                            </ul>
                        )}
                    </div>
                    
                    {/* Form field: Application status - retrieve values from util/constants.ts */}
                    <select 
                        className="select select-bordered w-full" 
                        name="status" 
                        value={form.status} 
                        onChange={handleChange}
                    >
                        {Object.values(APPLICATION_STATUS).map((status) => (
                            <option key={status} value={status}>
                            {status}
                            </option>
                        ))}
                    </select>
                    
                    {/* Form field: Date */}
                    <input
                        className="input input-bordered w-full"
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />

                    {/* Form error messages */}
                    {Object.values(errors).some((err) => err) && (
                        <div className="text-red-500 text-sm">
                            <ul className="list-disc ml-5">
                            {Object.entries(errors).map(([field, error]) =>
                                error ? <li key={field}>{error}</li> : null
                            )}
                            </ul>
                        </div>
                    )}

                    {/* Form actions: Cancel / Submit */}
                    <div className="modal-action mt-14">
                        <button type="button" className="btn "onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary ml-2">Submit</button>
                    </div>
        
                </form>
            </div>
        </dialog>
    );
  }
  
  export default AddApplicationModal;