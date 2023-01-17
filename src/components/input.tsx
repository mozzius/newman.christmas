/* eslint-disable @next/next/no-img-element */
import { twMerge } from "tailwind-merge";
import { forwardRef, useEffect, useState } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variant?: "white" | "bordered";
  label?: string;
  labelClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, label, variant = "white", labelClassName, ...props }, ref) => {
    let classes = "";
    switch (variant) {
      case "white":
        classes = "border-none bg-white";
        break;
      case "bordered":
        classes = "border border-slate-300 bg-white";
        break;
    }
    const inner = (
      <input
        ref={ref}
        className={twMerge("h-10 px-3", classes, className)}
        {...props}
      />
    );
    return label ? (
      <label className={twMerge("flex flex-col space-y-2", labelClassName)}>
        <span className="text-sm">{label}</span>
        {inner}
      </label>
    ) : (
      inner
    );
  }
);
Input.displayName = "Input";

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  variant?: "white" | "bordered";
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, variant = "white", ...props }, ref) => {
    let classes = "";
    switch (variant) {
      case "white":
        classes = "border-none bg-white";
        break;
      case "bordered":
        classes = "border border-slate-300 bg-white";
        break;
    }
    const inner = (
      <textarea
        ref={ref}
        className={twMerge("resize-y px-3 py-1", classes, className)}
        {...props}
      />
    );
    return label ? (
      <label className="flex flex-col space-y-2">
        <span className="text-sm">{label}</span>
        {inner}
      </label>
    ) : (
      inner
    );
  }
);
TextArea.displayName = "TextArea";

interface FileInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  placeholder?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, label, onChange, placeholder, ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(placeholder ?? null);
    const [hasFile, setHasFile] = useState(false);

    useEffect(() => {
      if (preview) return () => URL.revokeObjectURL(preview);
    }, [preview]);

    return (
      <label
        className={twMerge(
          "relative flex h-32 w-full cursor-pointer items-center justify-center",
          hasFile && !preview ? "bg-brand-blue" : "bg-gray-300",
          className
        )}
      >
        {preview && (
          <img
            src={preview}
            alt="file preview"
            className="t-0 l-0 absolute h-full w-full object-cover opacity-40"
          />
        )}
        <span className="z-10 bg-gray-600 px-2 py-1 text-center text-sm text-white">
          {label ?? "Select file"}
        </span>
        <input
          ref={ref}
          type="file"
          className="hidden"
          {...props}
          onChange={(evt) => {
            setHasFile((evt.target.files?.length ?? 0) > 0);
            if (
              evt.target.files?.[0] &&
              evt.target.files[0].type.startsWith("image/")
            ) {
              setPreview(URL.createObjectURL(evt.target.files[0]));
            }
            onChange?.(evt);
          }}
        />
      </label>
    );
  }
);
FileInput.displayName = "FileInput";

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  variant?: "white" | "bordered";
  label?: string;
  isPlaceholder?: boolean;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      variant = "white",
      placeholder,
      children,
      isPlaceholder,
      ...props
    },
    ref
  ) => {
    let classes = "";
    switch (variant) {
      case "white":
        classes = "border-none bg-white";
        break;
      case "bordered":
        classes = "border border-slate-300 bg-white";
        break;
    }
    const inner = (
      <select
        ref={ref}
        className={twMerge(
          "h-10 appearance-none bg-[url(https://go.aciworldwide.com/rs/030-ROK-804/images/drop-down-1.png)] bg-right bg-no-repeat px-3",
          isPlaceholder && "text-gray-400",
          classes,
          className
        )}
        style={{
          backgroundSize: "30px 30px",
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled selected hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
    return label ? (
      <label className="flex flex-col space-y-2">
        <span className="text-sm">{label}</span>
        {inner}
      </label>
    ) : (
      inner
    );
  }
);
SelectInput.displayName = "SelectInput";
