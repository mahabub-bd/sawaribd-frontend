import { cn } from "@/lib/utils";
import type React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  icon,
  className,
}) => {
  return (
    <h3
      className={cn(
        "text-base font-medium mb-3 flex items-center text-primary",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </h3>
  );
};

export default SectionHeading;
