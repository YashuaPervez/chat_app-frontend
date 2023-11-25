import React from "react";

type PaperProps = {
  children: React.ReactNode;
};

const Paper: React.FC<PaperProps> = ({ children }) => {
  return <div className="bg-white p-5 border border-gray-400">{children}</div>;
};

export default Paper;
