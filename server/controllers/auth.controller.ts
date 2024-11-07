import { Request, Response } from "express";

const logOutAdmin = (req: Request, res: Response) => {
  req.session.destroy(function (err) {
    res.redirect("/auth/admin/login");
  });
};

export default { logOutAdmin };
