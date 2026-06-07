import { useEffect, useState } from "react";
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
      <div className="navBar borders">
        <div className="navBar-left">
          <h1>SCSKP.</h1>
          <p>Markdown</p>
        </div>

        <div className="navBar-right">
          <center>
            <button>Render</button>
            <button type="">Print</button>
            <button type="">Help</button>
            <button type="">preview</button>
          </center>
        </div>
      </div>
      <button onClick={ButtonHandler}>{theme}</button>
    </>
  );
}
