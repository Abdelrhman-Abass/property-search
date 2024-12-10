import React from "react";
import { useLocale } from "next-intl";


const AsksSection = ({questions= []}) => {
  const locale = useLocale()
  return (
    <div className="asks-container col-9 mb50">
      {questions.map((que ,idx)=>(
      <div className="ask" key={idx}>
        <div className="question">{locale == "ar" ? que.textAR :que.textEN }</div>
        <div className="answer">{locale == "ar" ? que.answerTextAR :que.answerTextEN }</div>
      </div>
      ))}
      {/* <div className="ask">
        <div className="question">What is your favorite food?</div>
        <div className="answer">I love pizza!</div>
      </div> */}
      {/* Add more questions and answers as needed */}
    </div>
  );
};

export default AsksSection;
