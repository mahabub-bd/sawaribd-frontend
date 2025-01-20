import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string | string[];
  showPasswordToggle?: boolean;
  isTextarea?: boolean;
  rows?: number;
  ariaDescribedBy?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  error,
  showPasswordToggle = false,
  isTextarea = false,
  rows = 4,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 mb-4 w-full relative">
      <Label htmlFor={id} className="text-sm font-medium text-gray-600">
        {label}
      </Label>
      <div className="relative w-full">
        {isTextarea ? (
          <Textarea
            id={id}
            name={name}
            placeholder={placeholder}
            rows={rows}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        ) : (
          <Input
            id={id}
            name={name}
            type={showPasswordToggle && showPassword ? "text" : type} // Toggle password visibility
            placeholder={placeholder}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        )}

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-1 text-sm text-red-500">
          {Array.isArray(error) ? (
            error.map((err, index) => (
              <p key={index} className="mt-1">
                {err}
              </p>
            ))
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
