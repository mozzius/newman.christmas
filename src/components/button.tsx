import { forwardRef } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { twMerge } from "tailwind-merge";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "green";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { className, variant = "green", loading, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "relative h-10 max-w-max cursor-pointer overflow-hidden rounded px-10",
          variant === "green" && "bg-green-700 text-white",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div
            className={twMerge(
              "absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center",
              variant === "green" && "bg-green-700"
            )}
          >
            <SpinnerCircularFixed
              className="scale-50"
              color="#ffffff"
              secondaryColor="#ffffff25"
            />
          </div>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
