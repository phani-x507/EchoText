import { useEffect, useState } from "react";
import { Data } from "./Data";
import { Render } from "./RichTextEngine/Renderer";
import parse from "html-react-parser";
import MainCanvas from "./MainCanvas";

export default function Canvas() {
  const [editMode, SetEditMode] = useState(true);
  const [text, setText] = useState("");
  const [fontScale, setFontScale] = useState(4);

  const [Ast, setAst] = useState([
    { id: "Content-Not-Found", type: "NOTHING" },
  ]);

  useEffect(() => {
    let data = Data[0].text;

    console.log(data);
    let RenderedText = Render(data);
    let RenderedData = RenderedText[0];
    setAst(RenderedText[1]);
    setText(RenderedData);
    console.log(RenderedData);
  }, []);
  const fontIncreaseHandler = () => {
    setFontScale(fontScale + 2);
  };

  const fontDecreaseHandler = () => {
    setFontScale(fontScale - 2);
  };

  const AstComponent = () => {
    console.log(Ast);
    const GetTitleSpacing = (id, type) => {
      if (type == "TITLE") {
        return <a href={"#" + id}>{id.split("-").join(" ")}</a>;
      }

      if (type == "SUBTITLE") {
        return (
          <a href={"#" + id}>
            {" "}
            <small className="small">-</small> {id.split("-").join(" ")}
          </a>
        );
      }

      if (type == "MINITITLE") {
        return (
          <a href={"#" + id}>
            &nbsp;&nbsp; &nbsp;<small className="small">-</small>{" "}
            {id.split("-").join(" ")}
          </a>
        );
      }
    };
    return (
      <>
        {Ast.map((item, index) => (
          <>
            {GetTitleSpacing(item.id, item.type)}
            {/* <a href={"#" + item.id}>{getTitleSpacing(item.id, item.type)} </a> */}
          </>
        ))}
      </>
    );
  };

  console.log(Ast);

  if (!editMode) {
    return (
      <>
        <div className="canvas-main">
          <div className="canvas-abs">
            <p>
              <b>Abstract Syntax Tree</b>
            </p>
            <hr />

            <AstComponent />
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
  } else {
    return (
      <>
        <div className="canvas-outer">
          <MainCanvas />
        </div>
      </>
    );
  }
}
