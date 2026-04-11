"use client";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
            value === option.value
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              value === option.value ? "border-primary" : "border-gray-300"
            }`}
          >
            {value === option.value && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            )}
          </div>
          <span className="text-base">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
