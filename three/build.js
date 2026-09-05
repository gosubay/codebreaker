// Dev-only, like verify-all-games.js and verify-i18n.js — the page never loads this.
//
// index.html is the served page and loads vendor/three.min.js as a sibling.
// It is assembled from page.src.html + app.src.js so that neither has to be
// edited inside a file with a minified library in it.
//
//   node build.js          -> writes index.html
//   node build.js --inline -> also writes codebreaker-table.html, a single
//                             self-contained file for hosts that cannot load
//                             a sibling script (Claude artifacts, email, USB)
const fs = require("fs");
const page = fs.readFileSync(__dirname + "/page.src.html", "utf8");
const app = fs.readFileSync(__dirname + "/app.src.js", "utf8");
const S = "<" + "script>", E = "<" + "/script>";

fs.writeFileSync(__dirname + "/index.html",
  page + "\n<" + "script src=\"vendor/three.min.js\">" + E + "\n" + S + "\n" + app + "\n" + E + "\n");
console.log("index.html written");

if (process.argv.includes("--inline")) {
  const three = fs.readFileSync(__dirname + "/vendor/three.min.js", "utf8");
  fs.writeFileSync(__dirname + "/codebreaker-table.html",
    page + "\n" + S + "\n" + three + "\n" + E + "\n" + S + "\n" + app + "\n" + E + "\n");
  console.log("codebreaker-table.html written (inlined)");
}
