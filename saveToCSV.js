import fs from "fs";

export const createCSV = (filename, data) => {
  // Get the headers dynamically based on the first object in the array
  const headers = Object.keys(data[0]);

  // Create a CSV string
  const csvString = data
    .map((obj) => headers.map((header) => obj[header] ?? "").join(","))
    .join("\n");

  // Write the CSV string to a file
  fs.writeFileSync(filename, `${headers.join(",")}\n${csvString}`);

  console.log("CSV file has been created!");
};
