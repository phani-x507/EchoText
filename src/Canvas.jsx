import { useEffect, useState } from "react";
import { Data } from "./Data";
import { Render } from "./RichTextEngine/Renderer";
import parse from "html-react-parser";

export default function Canvas() {
  const [text, setText] = useState("");
  useEffect(() => {
    let data = Data.text;

    console.log(data);
    let RenderedData = Render(data);
    setText(RenderedData);
    console.log(RenderedData);
  }, []);

  return <div id="CanvasDiv">{parse(text)}</div>;
}
