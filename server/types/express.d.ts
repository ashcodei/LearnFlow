import { JwtPayload } from "jsonwebtoken";

// Define the structure of the JWT payload
interface CustomJwtPayload extends JwtPayload {
  id: string;  // User ID from the database
  email: string;  // User's email
  role: "student" | "educator";  // User's role
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload; // Attach the custom payload type to the user property
    }
  }
}

export interface CustomJwtPayload extends JwtPayload {
    id: string;  // User ID from the database
    email: string;  // User's email
    role: "student" | "educator";  // User's role
  }
