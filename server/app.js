const express = require("express");
const cors = require("cors");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const authMiddleware = require("./middlewares/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
const albumRoutes = require("./routes/albumRoutes");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/build"));
app.use("/api/v1/users", authMiddleware, userRoutes);
app.use("/api/v1/attachments", authMiddleware, attachmentRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/orderitem", authMiddleware, orderItemRoutes);
app.use("/api/v1/attachments", authMiddleware, attachmentRoutes);
app.use("/api/v1/ablums", authMiddleware, albumRoutes);
app.use("/api/v1/auth", authRoutes);
app.all("*", (req, res, next) => {
  return next(new AppError(`${req.path} not exists`, 404));
});
app.use(errorController);
module.exports = app;
