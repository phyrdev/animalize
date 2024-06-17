var pdfcrowd = require("pdfcrowd");
const fs = require("fs");

export async function GET(req, res) {
  // create the API client instance

  let id = "D7CUEJMRXU";
  var client = new pdfcrowd.HtmlToPdfClient(
    "demo",
    "ce544b6ea52a5621fb9d55f8b542d14d"
  );

  // run the conversion and write the result to a file
  client.convertUrlToFile(
    "https://animalize.io/final-report/D7CUEJMRXU/download",
    `public/${id}.pdf`,
    function (err, fileName) {
      if (err) return console.error("Pdfcrowd Error: " + err);
      console.log("Success: the file was created " + fileName);
    }
  );

  return Response.redirect(`https://animalize.io/${id}.pdf`);
}
