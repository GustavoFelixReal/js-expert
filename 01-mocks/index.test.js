const assert = require("assert");
const { error } = require("./src/constants");
const File = require("./src/file");


;(async () => {
  {
    const filePath = './mock/emptyFile-invalid.csv';
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mock/invalid-header.csv';
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }
  
  {
    const filePath = './mock/threeItems-valid.csv';
    const expected = [
      {
        id: 1,
        name: "xuxa da silva",
        profession: "developer",
        age: 120
      },
      {
        id: 2,
        name: "jose da silva",
        profession: "manager",
        age: 30
      },
      {
        id: 3,
        name: "zezin",
        profession: "QA",
        age: 28
      }
    ];
    const result = await File.csvToJSON(filePath);
    await assert.deepEqual(result, expected);
  }
})();