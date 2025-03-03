import React from "react";
import CardWrapper from "./CardWrapper";

const CodeSuggestionCard = () => {
  return (
    <CardWrapper title="Code Suggestion" showDropdown={true}>
      <div className="flex">
        <div className="bg-white min-h-82 rounded-xl grow">
          <div>Project 1</div>
          <div>Project 2</div>
          <div>Project 3</div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default CodeSuggestionCard;
