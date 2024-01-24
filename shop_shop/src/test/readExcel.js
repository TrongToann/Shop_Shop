const fs = require("fs");
const server = require("http").createServer();
const xlsx = require("xlsx");
const mysql = require("mysql2");
let values = [];
server.on("request", (req, res) => {
  const filePath = "test.xlsx";

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream("out_test.json");

  // Pipe the read stream to the write stream
  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    inserData().catch(console.error);
    res.end("success::");
  });
});
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "alicheckcheck",
});
const inserData = async () => {
  const jsonData = parseExcelToJson("out_test.json");
  if (!jsonData.length) {
    pool.end((err) => {
      if (err) {
        console.log("error");
      }
    });
    return;
  }
  const sql = `INSERT INTO account (id, username, age, job) VALUES ? `;
  pool.query(sql, [jsonData], async function (err, result) {
    if (err) throw err;
    console.log(`Inserted ${result.affectedRows}`);
    // await inserData();
  });
};
server.listen(8080, () => {
  console.log("Server is running on port 8080");
  process.title = "node8080";
});

function parseExcelToJson(filePath) {
  const buffer = fs.readFileSync(filePath);
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];

  // Set header: 1 to use the first row as column names
  const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
    header: 1,
  });

  return jsonData;
}
