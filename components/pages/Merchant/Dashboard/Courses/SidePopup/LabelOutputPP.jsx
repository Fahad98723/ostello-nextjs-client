import React from "react";

const LabelOutputPP = ({
  title = "",
  className = "w-full",
  text = "Example text",
}) => {
  return (
    <div className={`${className} flex-col flex my-4 transition-all`}>
      <h2 className="font-medium mb-2 text-sm">{title}</h2>
      <p className="text slate text-gray text-base">{text}</p>
    </div>
  );
};

export default LabelOutputPP;
