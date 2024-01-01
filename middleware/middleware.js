const multer = require("multer");

/* //Multer config for image upload
const storage = multer.diskStorage({
  //Destination for files
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}); */

//10MB
let maxSize = 10000000;

//upload parameters
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//Check if Admin is signed in
function checkAuthenticationAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  next();
}

//check which user has authorization for each page
const authPage = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (role === userRole) {
      next();
    } else {
      res.status(403).json("Unauthorized access");
    }
  };
};
module.exports = {
  upload,
  checkAuthenticationAdmin,
  authPage,
};
