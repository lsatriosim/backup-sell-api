// middleware/authmiddleware.d.ts
import { Request, Response, NextFunction } from 'express';

// Extend the Express Request interface globally
// This allows TypeScript to know that 'req.user' can exist
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        // Add any other properties that your JWT payload might contain
      };
    }
  }
}

// Declare the CommonJS module exports
// The path/name here is how TypeScript will recognize the module.
// If your backend project root is `my-backend/` and `middleware` is a direct child,
// then the path `../middleware/authmiddleware` (relative to `routes/`) is what you'll use.
declare module "../middleware/authmiddleware" { // <--- IMPORTANT: Path relative to where it's imported
  // Declare the function that is exported
  const verifyAdminToken: (req: Request, res: Response, next: NextFunction) => void;
  export { verifyAdminToken }; // Re-export it for named imports
}