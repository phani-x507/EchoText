import { useState } from "react";
import "./App.css";
export default function Nav() {
  const [theme, setThame] = useState("light");

  const ButtonHandler = () => {
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");
    console.log(theme);
    if (theme == "light") {
      html.setAttribute("data-theme", "dark");
      setThame("dark");
    } else {
      html.setAttribute("data-theme", "light");
      setThame("light");
    }
  };

  return (
    <>
      <button onClick={ButtonHandler}>{theme}</button>
      <h1>Hello World</h1>
    </>
  );
}
