import { useState } from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(null);

  const resetTheme = () => {
    setTheme(null);
  };

  return (
    <div className="mb-2">
     <h1>Hello</h1>
    </div>
  );
};

export default ThemeSwitcher;