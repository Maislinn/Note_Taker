const fs = require('fs');
const util = require('util');

//promisify fs.readFile
const readFileAsync = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file 
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} 
 */

 const writeToFile = (destination, content) =>
 fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
   err ? console.error(err) : console.info(`\nData written to ${destination}`)
 );
/**
*  Function to read data from a given a file and append some content
*  @param {object} content content appended to file
*  @param {string} file saving path
*  @returns {void} 
*/
const readAndAppend = (content, file) => {
 fs.readFile(file, (err, data) => {
   if (err) {
     console.error(err);
   } else {
     const parsedData = JSON.parse(data);
     parsedData.push(content);
     writeToFile(file, parsedData);
   }
 });
};

module.exports = { readFromFile, writeToFile, readAndAppend };