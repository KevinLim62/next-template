import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = process.env.NEXTAUTH_SECRET; // Ensure this is 32 bytes long for aes-256-cbc
const iv = crypto.randomBytes(16);

export function encrypt(payload: any) {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey!, "base64"),
    iv
  );
  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(payload: any) {
  const [ivHex, encryptedText] = payload.split(":");
  const ivBuffer = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey!, "base64"),
    ivBuffer
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
}
