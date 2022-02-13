import fs from "fs";

module.exports = () =>
  Object.fromEntries(fs.readdirSync(__dirname).filter((post) => {
    if (post === "index.js") return false;
    return true;
}).map(post => {
    return [post, require("./" + post)]
}));

