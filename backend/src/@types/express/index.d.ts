import { JwtPayload } from 'jsonwebtoken';

/**
 * Extends the Express Request interface to include the authenticated user
 * attached by the AuthMiddleware.
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        username: string;
      };
    }
  }
}
