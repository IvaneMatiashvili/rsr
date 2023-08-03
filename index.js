const fs = require("fs");
const path = require("path");
const cors = require("cors");
const PizZip = require("pizzip");
const express = require("express");
const Docxtemplater = require("docxtemplater");

const app = express();
const wordFileName = "questions2.docx";

const WORDPath = path.join(__dirname, "./", wordFileName);
const fileContents = fs.readFileSync(WORDPath, "binary");

const zip = new PizZip(fileContents);
const doc = new Docxtemplater();
doc.loadZip(zip);

let isNumber = /^\d+$/;
let ansArr = [];
let questionsArr = [];
let result = [];

let template = doc.getFullText().split("+++++++");
const text = template[1].replaceAll("პასუხი:", "-=-=-=-=-=-=-=პასუხი:");

let splitByAnswer = text.split("-=-=-=-=-=-=-=");

for (let i = 0; i < splitByAnswer.length; i++) {
  let hasAuthor = false;
  for (let j = 0; j < splitByAnswer[i].length; j++) {
    if (splitByAnswer[i].slice(j, j + 7) === "ავტორი:") {
      hasAuthor = true;
    }
    if (hasAuthor && isNumber.test(splitByAnswer[i][j])) {
      questionsArr.push(splitByAnswer[i].slice(j, splitByAnswer[i].length));
      splitByAnswer[i] = splitByAnswer[i].replace(
        splitByAnswer[i].slice(j, splitByAnswer[i].length),
        " "
      );
      break;
    }
  }

  result.push(splitByAnswer[i]);
}

console.log(result);

questionsArr.unshift(result[0]);
for (let i = 1; i < result.length; i++) ansArr.push(result[i]);

app.use(cors());

app.get("/data", (req, res) => {
  const data = { data: [questionsArr, ansArr] };
  res.json(data);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
