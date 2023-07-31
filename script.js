const fs = require("fs");
const path = require("path");

function convertFile(filePath) {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.error(err);
    }

    let result = data.replace(
      /import ([\w*{}\s,]+) from ['"]([^'"]+)['"]/g,
      function (_, importClause, fromClause) {
        if (importClause.includes("* as")) {
          return `const ${importClause.replace(
            "* as",
            ""
          )} = require('${fromClause}');`;
        } else if (importClause.includes("{")) {
          return `const ${importClause} = require('${fromClause}');`;
        } else {
          return `const ${importClause} = require('${fromClause}');`;
        }
      }
    );

    result = result.replace(/export default ([\w]+)/g, "module.exports = $1;");
    result = result.replace(/export const ([\w]+)/g, "exports.$1");

    fs.writeFile(filePath, result, "utf8", function (err) {
      if (err) return console.log(err);
      console.log(`Converted file: ${filePath}`);
    });
  });
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else {
      if (fullPath.endsWith(".js")) {
        convertFile(fullPath);
      }
    }
  });
}

// Replace './src' with your directory
traverseDir("./src");
