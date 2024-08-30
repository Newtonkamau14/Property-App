import { NextFunction, Request, Response } from "express";
import multer from "multer";

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
function checkAuthenticationAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/auth/admin/login");
}

//on login routes
function checkNotAuthenticatedAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  next();
}

//check which user has authorization for each page
const authPage = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).render('403', {
        title: 'Forbidden',
      });
    }

    const userRole = req.user.role;

    if (role !== userRole && userRole !== 'USER') {
      return res.status(403).render('403', {
        title: 'Forbidden',
      });
    }

    next();
  };
};

export {
  upload,
  checkAuthenticationAdmin,
  checkNotAuthenticatedAdmin,
  authPage,
};
