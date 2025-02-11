import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { db } from "./db";
import { users } from "@shared/schema";
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdminUser() {
  const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD || "drowssap1234k");

  await db.insert(users).values({
    username: process.env.ADMIN_USERNAME || "admin",
    password: hashedPassword,
    isAdmin: true
  }).execute();

  console.log("Admin user created successfully");
}

createAdminUser().catch(console.error);