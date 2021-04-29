import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cryptoRandomString from "crypto-random-string";
import queryBuilder from "../common/db/queryBuilder.js";
import { usersService } from "./usersService";
import redis from "redis";

const client = redis.createClient()

const authenticate = async ({ login, password, ipAddress }) => {
  const sql = queryBuilder.select("Users");
  const user = await usersService.getUserByLogin(login);
  if (!user || !bcrypt.compare(password, user.password)) {
    throw "Username or password is incorrect";
  }

  const jwtToken = generateJwtToken(user);
  const refreshToken = generateRefreshToken(user, ipAddress);

  return {
    user,
    jwtToken,
    refreshToken: refreshToken.token,
  };
};

const refreshToken = async ({ token, ipAddress }) => {
  const refreshToken = await getRefreshToken(token);
  const { user } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken(user, ipAddress);
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
};

const revokeToken = async ({ token, ipAddress }) => {
  const refreshToken = await getRefreshToken(token);

  if (await this.redis.exists(accessToken)) {}
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();

}

const getRefreshTokens = (userId) => {
  // check that user exists
  const user = await usersService.getUser(userId);
  if (!user) throw "User not found";

  // return refresh tokens for user
  const refreshTokens = await db.RefreshToken.find({ user: userId });
  return refreshTokens;
}

const getRefreshToken = async (token) => {
  const refreshToken = await db.RefreshToken.findOne({ token }).populate(
    "user"
  );
  if (!refreshToken || !refreshToken.isActive) throw "Invalid token";
  return refreshToken;
}

const generateJwtToken = (user) => {
  return jwt.sign({ sub: user.id, id: user.id }, config.secret, {
    expiresIn: "15m",
  });
}

const generateRefreshToken  = async (user, ipAddress) => {
  // create a refresh token that expires in 7 days
  return new db.RefreshToken({
    user: user.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
}

const randomTokenString = () => {
  return cryptoRandomString({ length: 40 });
}
