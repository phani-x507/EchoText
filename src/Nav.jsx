import { useEffect, useState } from "react";
import "./App.css";
export default function Nav() {
  const [theme, setThame] = useState("🌓 dark");
  const ButtonHandler = () => {
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");
    console.log(theme);
    if (theme == "light") {
      html.setAttribute("data-theme", "dark");
      setThame("☀️ light");
    } else {
      html.setAttribute("data-theme", "light");
      setThame("🌓 dark");
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
            <button onClick={ButtonHandler}>{theme}</button>

            <button>Render</button>
            <button type="">Print</button>
            <button type="">Help</button>
            <button type="">preview</button>
          </center>
        </div>
      </div>
    </>
  );
}
