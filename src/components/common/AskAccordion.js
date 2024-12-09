import React from "react";

const AsksSection = () => {
  return (
    <div className="asks-container mb50">
      <div className="ask">
        <div className="question">What is your favorite color?</div>
        <div className="answer">My favorite color is blue.</div>
      </div>
      <div className="ask">
        <div className="question">What is your favorite food?</div>
        <div className="answer">I love pizza!</div>
      </div>
      {/* Add more questions and answers as needed */}
    </div>
  );
};

export default AsksSection;
