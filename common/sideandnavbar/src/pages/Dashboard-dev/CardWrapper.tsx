import React from "react";

interface CardWrapperProps {
  title: String;
  children: React.ReactNode;
  showDropdown?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  title,
  children,
  showDropdown,
}) => {
  return (
    <div className="rounded-2x1 shadow-md p-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {showDropdown && <button className="text-sm text-gray-600">▼</button>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CardWrapper;
