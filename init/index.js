
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data");

main()
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log("error", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj , owner : '68bd24b8a008a9b0ef94ff90'}));
  await Listing.insertMany(initData.data); 
  console.log("data initialized!");
  //mongoose.connection.close();   //to close connection
};

initDB();
