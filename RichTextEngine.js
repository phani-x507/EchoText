// Lets get which type of text it is. we are building a tree
// Structure
//  text -> tokenizer -> parser -> render

// Parser -> title -> subtitle -> minititle->text
function tokenize(line) {
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

/*
functionnction parser(text) {

  text = text.split('\n')

  for (let i = 0; i < text.length; i++) {

    console.log(tokenize(text[i]))
  }



}

*/
function Parser(text) {
  text = text.split("\n");
  let parsed = [];

  for (let i = 0; i < text.length; i++) {
    // console.log(text[i])
    parsed.push(tokenize(text[i]));
  }
  return {
    type: "document",
    children: parsed,
  };
}

function TableDivider(line) {
  values = line.split("|");
  return values;
}

var ast = [];
console.log(ast);

function Render(parsedText) {
  text = "";
  tableTagCounter = 0;

  let isCentered = false;

  function StyleChecker(line) {
    centerCounter = 0;
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
      text += '<h1 id=" ' + HashId + '">' + line.value + "</h1> \n";
    }
    if (line.type == "SUBTITLE") {
      text += '<h2  id=" ' + HashId + '">' + line.value + "</h2> \n";
    }
    if (line.type == "MINITITLE") {
      text += '<h3 id=" ' + HashId + '">' + line.value + "</h3> \n";
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
        text += '<table border=1 class="tabletype" >';
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
      values = TableDivider(line.value);
      text += "<tr>";
      for (let i = 0; i < values.length; i++) {
        text += "<td>" + values[i] + "</td>";
      }
    }
  });

  document.getElementById("testdiv").innerHTML = text;
}

text = `#This is
this is **enter <$i>and<$i>  this is the bold text** but from **here it should be bold**  
$m
###This is Subtitle
$m
- Item1                              
- Item2
##This is another SubTitle
- This <$h>is<$h> <$h>another<$h> 
img=https://cdn-icons-png.flaticon.com/512/44/44621.png imgcap= This is the Image Caption
$c sdf
dff
dff
ac $c

$table 
$th Heading1 | Heading2 | Heading3 $th
$tv Value1 | **Value2** | Value6 $tv
$tv Value4 | Value5 | Value6 $tv
$tv Value6 | Value7 | Value8 $tv
$table


#This is 2nd Introduction Title



`;

console.log(Parser(text).children);
console.log(Render(Parser(text)));
