import { useEffect, useState } from "react";
import { Data } from "./Data";
import { Render } from "./RichTextEngine/Renderer";
import parse from "html-react-parser";

export default function Canvas() {
  const [text, setText] = useState("");
  const [fontScale, setFontScale] = useState(4);
  useEffect(() => {
    let data = Data.text;

    console.log(data);
    let RenderedData = Render(data);
    setText(RenderedData);
    console.log(RenderedData);
  }, []);
  const fontIncreaseHandler = () => {
    setFontScale(fontScale + 2);
  };

  const fontDecreaseHandler = () => {
    setFontScale(fontScale - 2);
  };
  return (
    <>
      <div className="canvas-main">
        <div className="canvas-abs">
          <p>This is the title 1</p>
          <p>This is the Second Title and this is Long</p>
          <p>
            This is the Mini Title and this is highly long and may have more
            context
          </p>
        </div>
        <div className="canvas-outer">
          <div className="canvas-fontscale">
            <button onClick={fontIncreaseHandler} type="">
              +
            </button>
            <button onClick={fontDecreaseHandler} type="">
              -
            </button>
          </div>
          {/* Remember this when we need to change the font variable value in css, we can directly include varname in style tag and assign value to it */}

          <div
            id="CanvasDiv"
            style={{ "--font-scale": fontScale + "px" }}
            className="canvasDiv"
          >
            {parse(text)}
          </div>
        </div>
      </div>
    </>
  );
}
