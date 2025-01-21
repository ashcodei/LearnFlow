export interface CustomJwtPayload {
    id: string;  // User ID from the database
    email: string;  // User's email
    role: "student" | "educator";  // User's role
  }
  