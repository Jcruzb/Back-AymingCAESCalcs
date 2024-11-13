
require("../config/db.config");

console.log("Seeding files...");

const mongoose = require("mongoose");
const File = require("../models/File.model");
const files = require("./json/files.json");

const seedFiles = async () => {
  try {
    // Eliminar la colección si existe
    await mongoose.connection.dropCollection("files").catch(() => {
      console.log("No collection to drop. Continuing...");
    });
    console.log("DB cleared");

    // Crear las fichas
    const fileDB = await File.create(files);
    fileDB.forEach((file) =>
      console.log(`${file.name} has been created`)
    );

    console.log(`${fileDB.length} files have been created`);
  } catch (err) {
    console.error("Error while seeding files:", err);
  } finally {
    mongoose.disconnect();
  }
};

// Ejecución directa de la semilla
if (require.main === module) {
  mongoose.connection.once("open", seedFiles);
}

module.exports = seedFiles;