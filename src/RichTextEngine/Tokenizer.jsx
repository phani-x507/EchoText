export function Tokenizer(line) {
  if (line.startsWith("###")) {
    return {
      type: "MINITITLE",
      value: line.slice(3).trim(),
    };
  }
  if (line.startsWith("##")) {
    return {
      type: "SUBTITLE",
      value: line.slice(2).trim(),
    };
  }

  if (line.startsWith("#")) {
    return {
      type: "TITLE",
      value: line.slice(1).trim(),
    };
  }
  if (line.startsWith("- ")) {
    return {
      type: "LISTITEM",
      value: line.slice(1).trim(),
    };
  }

  if (line.startsWith("img=")) {
    let ImgData = line.split("imgcap=");
    console.log(ImgData);
    return {
      type: "IMAGE",
      value: ImgData[0].slice(4).trim(),
      ImgCaption: ImgData[1].trim(),
    };
  }
  if (line.startsWith("imgcap=")) {
    return {
      type: "IMGCAPTION",
      value: line.slice(7).trim(),
    };
  }
  if (line.startsWith("$c")) {
    return {
      type: "CODESTART",
      value: line.slice(3).trim(),
    };
  }
  if (line.endsWith("$c")) {
    return {
      type: "CODESTOP",
      value: line.slice(3).trim(),
    };
  }

  if (line.startsWith("$table")) {
    return {
      type: "TABLETAG",
      value: "",
    };
  }

  if (line.startsWith("$th") && line.endsWith("$th")) {
    return {
      type: "THEADINGS",
      value: line.slice(3, -3).trim(),
    };
  }

  if (line.startsWith("$tv") && line.endsWith("$tv")) {
    return {
      type: "TVALUES",
      value: line.slice(3, -3).trim(),
    };
  }

  return {
    type: "TEXT",
    value: line.trim(),
  };
}
