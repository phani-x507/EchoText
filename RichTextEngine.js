// Lets get which type of text it is. we are building a tree
// Structure
//  text -> tokenizer -> parser -> render

// Parser -> title -> subtitle -> minititle->text
function tokenize(line) {

    if (line.startsWith("###")) {
        return {
            type: 'MINITITLE',
            value: line.slice(3).trim()
        }
    }
    if (line.startsWith('##')) {
        return {
            type: 'SUBTITLE',
            value: line.slice(2).trim()
        }
    }

    if (line.startsWith('#')) {
        return {
            type: 'TITLE',
            value: line.slice(1).trim()
        }
    }
    if (line.startsWith('- ')) {
        return {
            type: 'LISTITEM',
            value: line.slice(1).trim()
        }
    }

    if (line.startsWith('img=')) {
        return {
            type: 'IMAGE',
            value: line.slice(4).trim()
        }
    }
    if (line.startsWith('imgcap=')) {
        return {
            type: 'IMGCAPTION',
            value: line.slice(7).trim()
        }

    }
    if (line.startsWith('$c') ) {
        return {
            type: 'CODESTART',
            value: line.slice(3).trim()
        }

    } if (line.endsWith('$c') ) {
        return {
            type: 'CODESTOP',
            value: line.slice(7).trim()
        }

    }

    return {
        type: 'TEXT',
        value: line.trim()
    }


}


function parser(text) {

    text = text.split('\n')

    for (let i = 0; i < text.length; i++) {

        console.log(tokenize(text[i]))
    }



}


function Parser(text) {
    text = text.split('\n')
    parsed = []

    for (let i = 0; i < text.length; i++) {
        // console.log(text[i])
        parsed.push(tokenize(text[i]))
    }
    return {
        type: 'document',
        children: parsed
    }
}


function Render(parsedText) {

    text = ''
    // console.log(parsedText)
    parsedText.children.map((line, index) => {
        if (line.type == "TITLE") {
            text += '<h1>' + line.value + '</h1> \n'
        }
        if (line.type == "SUBTITLE") {
            text += '<h2>' + line.value + '</h2> \n'
        }
        if (line.type == "MINITITLE") {
            text += '<h3>' + line.value + '</h3> \n'
        }
        if (line.type == "TEXT") {
            text += '<p>' + line.value + '</p> \n'
        }
        if (line.type == "LISTITEM") {
            text += '<p> ⟶ ' + line.value + '</p> \n'
        }
        if (line.type == "IMAGE") {
            text += '<img src="' + line.value + '"/>'
        }
        if (line.type == "IMGCAPTION") {
            text += '<p class="imgcap">' + line.value + '</p> \n'
        }
        if (line.type == "CODESTART") {
            text += '<div class = "codebox"><p>' + line.value + '</p> \n'
        }
        if (line.type == "CODESTOP") {
            text += '<p class="imgcap">' + line.value + '</p></div> \n'
        }
    })

    document.getElementById('testdiv').innerHTML = text


}

text = `##This is title
this is enter
###This is Subtitle
- Item1
- Item2
##This is another SubTitle
- This is another 
img=https://cdn-icons-png.flaticon.com/512/44/44621.png
$c sdf
dff
dff
ac $c

`

console.log(Parser(text).children)
console.log(Render(Parser(text)))
