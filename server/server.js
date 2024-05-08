const dotenv = require("dotenv");
dotenv.config();
const db = require("./utils/db");
const app = require("./app");
const PORT = process.env.PORT || 8080;
const initialData = require("./utils/initialData");
/**
 * Starts the server and listens on the specified port.
 *
 * @return {Promise<void>} - A promise that resolves when the server starts successfully.
 */
const start = async () => {
  try {
    await db.authenticate();
    await db.sync({
      // force: true,
      // alter: true,
    });
    app.listen(PORT, () => {
      console.log(`Server ${process.env.NODE_ENV} started on port ${PORT}`);
    });
    initialData();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
