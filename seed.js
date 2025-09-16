const mongoose = require("mongoose");
const Listing = require("./models/listing");
const { data } = require("./init/data"); // ✅ correct path

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("Database seeded!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    mongoose.connection.close(); // ✅ always close DB connection
  }
};

initDB();

