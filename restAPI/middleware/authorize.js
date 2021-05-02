import jwt from "express-jwt";
import { UnathorizedError } from "../common/errorTypes.js";

export const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return [
    jwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
    (req, res, next) => {
      if (!req.user || (roles.length && !roles.includes(req.user.role))) {
        return next(UnathorizedError("Unauthorized"));
      }
      next();
    },
  ];
};
