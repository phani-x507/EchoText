import { Tokenizer } from "./Tokenizer";

export function Parser(text) {
  text = text.split("\n");
  let parsed = [];

  for (let i = 0; i < text.length; i++) {
    // console.log(text[i])
    parsed.push(Tokenizer(text[i]));
  }
  return {
    type: "document",
    children: parsed,
  };
}
