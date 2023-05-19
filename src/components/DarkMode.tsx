import React, { ReactElement, useState } from "react";
import { FC } from "react";
import "../style/App.css";

const DarkMode: FC<{ initialValue?: string }> = ({
  initialValue = "light",
}): ReactElement => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  console.log(darkMode);
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* Your PDF highlighter component and other content */}
      <button onClick={toggleMode}>Toggle Mode</button>
    </div>
  );
};

export default DarkMode;
