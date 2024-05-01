const catchAsyn = require("../utils/catchAsync");
const Albums = require("../models/Albums");

exports.getAllAlbumsByOrderId = catchAsyn(async (req, res, next) => {
  let allAlbums = await Albums.findAndCountAll({
    where: { productId: req.params.id },
  });
  res.json({
    status: "success",
    message: "",
    data: {
      allAlbums,
    },
  });
});

exports.createAlbums = catchAsyn(async (req, res) => {
  const Albums = await Albums.create(req.body);
  res.json({
    status: "success",
    message: "Album yaratildi",
    data: {
      Albums,
    },
  });
});
