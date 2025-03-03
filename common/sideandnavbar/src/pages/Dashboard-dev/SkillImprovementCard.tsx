import React from "react";
import CardWrapper from "./CardWrapper";

const SkillImprovementCard = () => {
  return (
    <CardWrapper title="Skills to Improve" showDropdown={true}>
      <div className="flex">
        <div className="bg-white min-h-82 rounded-xl grow">
          <div>Suggestion 1</div>
          <div>Suggestion 2</div>
          <div>Suggestion 3</div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default SkillImprovementCard;
