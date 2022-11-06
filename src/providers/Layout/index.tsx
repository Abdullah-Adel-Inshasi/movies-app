import React, { FC } from "react";
import Header from "../../Components/Header";

const LayoutProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LayoutProvider;
