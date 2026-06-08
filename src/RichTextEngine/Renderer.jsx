import { Parser } from "./Parser";

var ast = [];
console.log(ast);

function TableDivider(line) {
  let values = line.split("|");
  return values;
}

export function Render(Text) {
  var parsedText = Parser(Text);
  let text = "";
  var tableTagCounter = 0;

  let isCentered = false;

  function StyleChecker(line) {
    // Seperate with the Spaces
    // Identify Each Line has Stars
    // Apply Style to them
    // Join the String

    line = line.split(" ");

    for (let i = 0; i < line.length; i++) {
      if (line[i].startsWith("**")) {
        line[i] = "<b>" + line[i].slice(2);
        console.log(line[i]);
      }
      if (line[i].endsWith("**")) {
        line[i] = line[i].slice(0, -2) + "</b>";
        console.log(line[i]);
      }
      if (line[i].startsWith("<$i>")) {
        line[i] = "<i>" + line[i].slice(4);
        console.log(line[i]);
      }
      if (line[i].endsWith("<$i>")) {
        line[i] = line[i].slice(0, -4) + "</i>";
        console.log(line[i]);
      }
      if (line[i].startsWith("<$h>")) {
        line[i] = '<span class= "highlightedText">' + line[i].slice(4);
        console.log(line[i]);
      }
      if (line[i].endsWith("<$h>")) {
        line[i] = line[i].slice(0, -4) + "</span>";
        console.log(line[i]);
      }

      if (line[i] === "$m") {
        line[i] = isCentered ? "</center>" : "<center>";
        isCentered = !isCentered;
      }
    }

    return line.join(" ");
  }

  // console.log(parsedText)
  parsedText.children.map((line, index) => {
    // This is for Tree Structure for The Headings to Navigate
    line.value = StyleChecker(line.value);
    let HashId = "";
    if (
      line.type == "TITLE" ||
      line.type == "SUBTITLE" ||
      line.type == "MINITITLE"
    ) {
      HashId = line.value.split(" ").join("-");
      ast.push({ id: HashId, type: line.type });
    }
    if (line.type == "TITLE") {
      text += '<h1 id="' + HashId + '">' + line.value + "</h1> \n";
    }
    if (line.type == "SUBTITLE") {
      text += '<h2  id="' + HashId + '">' + line.value + "</h2> \n";
    }
    if (line.type == "MINITITLE") {
      text += '<h3 id="' + HashId + '">' + line.value + "</h3> \n";
    }
    if (line.type == "TEXT") {
      text += "<p>" + line.value + "</p> \n";
    }
    if (line.type == "LISTITEM") {
      text += "<p> ⟶ " + line.value + "</p> \n";
    }
    if (line.type == "IMAGE") {
      text += '<div class="ImgDiv">';
      text += '<img src="' + line.value + '"/>';
      text += '<p class="imgcap">' + line.ImgCaption + "</p> \n";
      text += "</div>";
    }
    if (line.type == "IMGCAPTION") {
      text += '<p class="imgcap">' + line.value + "</p> \n";
    }
    if (line.type == "CODESTART") {
      text += '<div class = "codebox"><p>' + line.value + "</p> \n";
    }
    if (line.type == "CODESTOP") {
      text += '<p class="imgcap">' + line.value + "</p></div> \n";
    }
    if (line.type == "TABLETAG") {
      if (tableTagCounter == 0) {
        text += '<table  class="tabletype" >';
        tableTagCounter += 1;
      } else {
        text += "</table>";
        tableTagCounter -= 1;
      }

      console.log(tableTagCounter);
    }

    if (line.type == "THEADINGS") {
      let headings = TableDivider(line.value);
      text += "<tr>";
      for (let i = 0; i < headings.length; i++) {
        text += "<th>" + headings[i] + "</th>";
      }
      text += "</tr>";
    }
    if (line.type == "TVALUES") {
      let values = TableDivider(line.value);
      text += "<tr>";
      for (let i = 0; i < values.length; i++) {
        text += "<td>" + values[i] + "</td>";
      }
    }
  });

  return [text, ast];
}
