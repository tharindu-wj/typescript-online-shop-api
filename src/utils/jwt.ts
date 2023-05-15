import jwt from "jsonwebtoken";
import config from "config";
import log from "../utils/logger";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  // TODO:: Use RSA keys
  return jwt.sign(object, "asdf1234", {
    ...(options && options),
    // algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );

  try {
    // TODO:: Use RSA keys
    const decoded = jwt.verify(token, "asdf1234");
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    log.debug({ message: e.message }, "Token expired");
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
