import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

const tokenGenerate = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .sign(secret);
};

const tokenVerify = async (payload: any) => {
  return await jwtVerify(payload, secret);
};

export { tokenGenerate, tokenVerify };

