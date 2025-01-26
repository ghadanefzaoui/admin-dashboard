import React from "react";

interface Props {
  icon: string;
  displayText: string;
  subText: string;
}

/**
 * Display a box content with icon, A display text, and a sub text
 */
const DisplaySection: React.FC<Props> = ({ icon, displayText, subText }, i) => {
  return (
    <div
      className={`min-w-max min-h-[160px] p-5 text-left rounded`}
      style={{ border: "1px solid #c3c0c0" }}
    >
      <div>
        <img src={icon} alt="Total sales" className="w-14 h-14" />
      </div>
      <div className="text-2xl mt-5">{displayText}</div>
      <div className="text-base">{subText}</div>
    </div>
  );
};

export default DisplaySection;
