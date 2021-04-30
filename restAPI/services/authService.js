import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { promisify } from "util";
import { usersService } from "./usersService";
import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const jwt = { sign: jsonwebtoken.sign, verify: promisify(jsonwebtoken.verify) };

const redisClient = redis.createClient();

const authenticate = async ({ login, password, ipAddress }) => {
  const user = await usersService.getUserByLogin(login);
  if (!user || !bcrypt.compare(password, user.password)) {
    throw "Username or password is incorrect";
  }

  const jwToken = generateJwtToken(
    user.id,
    user.username || user.email,
    user.role,
    ipAddress
  );
  const refreshToken = generateRefreshToken(
    user.id,
    user.username || user.email,
    user.role,
    ipAddress
  );

  return {
    user,
    jwt: jwToken,
    refreshToken,
  };
};

const refreshToken = async ({ token, ipAddress }) => {
  const refreshToken = await verifyRefreshToken(token);

  const { sub, name, role } = refreshToken;

  const newRefreshToken = generateRefreshToken(sub, name, role, ipAddress);

  const jwToken = generateJwtToken(sub, name, role, ipAddress);

  return {
    user: { id: sub, username: name, role },
    jwt: jwToken,
    refreshToken: newRefreshToken.token,
  };
};

const revokeToken = async ({ token }) => {
  const refreshToken = await verifyRefreshToken(token);
  const expiry = refreshToken.exp - Math.floor(Date.now() / 1000);
  redisClient.set(refreshToken.jti, true, "EX", expiry);
};

const verifyToken = async (token) =>
  jwt.verify(token, process.env.TOKEN_SECRET);

const verifyRefreshToken = async (token) => {
  const refreshToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  if (redisClient.exists(accessToken)) {
    throw { status: 401, message: "Token revoked" };
  }
};

const generateJwtToken = (userId, userName, userRole, ipAddress) =>
  jwt.sign(
    { sub: userId, name: userName, role: userRole, ipAddress },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );

const generateRefreshToken = (userId, userName, userRole, ipAddress) =>
  jwt.sign(
    { sub: userId, name: userName, role: userRole, ipAddress },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
      jwtid: randomString(),
    }
  );

const randomString = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const authService = {
  verifyToken,
  verifyRefreshToken,
  authenticate,
  refreshToken,
  revokeToken,
};
