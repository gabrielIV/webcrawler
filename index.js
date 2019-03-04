const request = require("request");

const cheerio = require("cheerio");
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

console.log("fetching data ....");
url = "";

request(url, { json: false }, (err, res, body) => {
  if (err) {
    return console.log(err);
  }

  let categories = {};

  const $ = cheerio.load(body);
  let l = $(body)
    .find(".menu-item")
    .each((n, v) => {
      let t = $(".nav-subTxt").text();
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
  console.log(categories);
});
