const multer = require("multer");

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

//on admin routes
//Check if Admin is signed in
function checkAuthenticationAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/auth/admin/login");
}

//on login routes
function checkNotAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  next();
}

//check which user has authorization for each page
const authPage = (role) => {
  return (req, res, next) => {
    // Check if req.user exists before accessing its properties
    if (!req.user) {
      return res.status(403).render("403", {
        title: "Forbidden",
      });
    }

    const userRole = req.user.role;

    // Handle both undefined and "USER" roles
    if (role !== userRole && userRole !== "USER") {
      return res.status(403).render("403", {
        title: "Forbidden",
      });
    }

    next();
  };
};

module.exports = {
  upload,
  checkAuthenticationAdmin,
  checkNotAuthenticatedAdmin,
  authPage,
};
