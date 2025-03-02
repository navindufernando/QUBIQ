import React, { useState } from "react";

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
  const [selectedPeriod, setSelectedPeriod] = useState("this week");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <div className="bg-[#D7C2F2] rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {showDropdown && (
          <form action="">
            <select
              name="Period"
              id="Period"
              value={selectedPeriod}
              onChange={handleSelectChange}
              className="bg-[#A3B0EB] rounded-xl p-0.5 cursor-pointer text-[12px] focus:outline-none focus:ring-0"
            >
              <option value="this week">This Week</option>
              <option value="last week">Last Week</option>
              <option value="this month">This Month</option>
              <option value="last month">Last Month</option>
            </select>
          </form>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CardWrapper;
