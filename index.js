const request = require("request");
const cheerio = require("cheerio");
const $ = cheerio.load('<h2 class="title">Hello world</h2>');
//add your url here
const url = "";

console.log("fetching data ....");

request(url, { json: false }, (err, res, body) => {
  if (err) {
    return console.log(err);
  }

  let categories = {};

  const $ = cheerio.load(body);
  let l = $(body)
    .find(".menu-item")
    .each((n, v) => {
      let t = $(v)
        .find(".nav-subTxt")
        .text();
      if (!categories[t]) {
        categories[t] = [];
      }

      let subcategory = {};
      $(v)
        .find(".categories")
        .each((num, val) => {
          let title = $(val)
            .find(".category")
            .text();
          if (!subcategory[title]) {
            subcategory[title] = [];
          }
          $(v)
            .find(".subcategory")
            .each((n1, v1) => {
              let value = $(v1).text();
              subcategory[title].push(value);
            });
        });

      categories[t].push(subcategory);
    });

  const fs = require("fs");

  fs.writeFile("./output.json", JSON.stringify(categories), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The categories were generated .... You're welcome!");
  });
});
