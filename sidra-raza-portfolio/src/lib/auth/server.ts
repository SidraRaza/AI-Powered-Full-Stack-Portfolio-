import jwt from 'jsonwebtoken';
import { getDb, isDatabaseAvailable } from '@/lib/analytics/service';
import { users } from '@/lib/analytics/schema';
import { eq } from 'drizzle-orm';

// Secret for JWT signing - should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

// Login function
export const login = async (email: string, password: string) => {
  const database = getDb();
  if (!database || !isDatabaseAvailable) {
    console.warn('Database not configured. Authentication disabled.');
    return null;
  }

  try {
    // Dynamically import bcrypt only when needed (server-side)
    const bcrypt = await import('bcrypt');

    // Find user by email in the database
    const userResult = await database.select().from(users).where(eq(users.email, email));

    if (userResult.length === 0) {
      return null;
    }

    const user = userResult[0];

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      // Create a JWT token with user data
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          name: user.name,
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        token,
        user: { id: user.id, email: user.email, name: user.name }
      };
    }

    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

// Verify token
export const verifyToken = (token: string) => {
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      name: string;
    };

    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

// Get user session from token
export const getUserFromToken = async (token: string) => {
  const decoded = verifyToken(token);
  const database = getDb();
  if (decoded && database) {
    try {
      const userResult = await database.select().from(users).where(eq(users.id, decoded.userId));
      return userResult.length > 0 ? userResult[0] : null;
    } catch (error) {
      console.error('Get user from token error:', error);
      return null;
    }
  }
  return null;
};

// Register function
export const register = async (email: string, name: string, password: string) => {
  const database = getDb();
  if (!database || !isDatabaseAvailable) {
    console.warn('Database not configured. Registration disabled.');
    return { error: 'Database not configured' };
  }

  try {
    // Dynamically import bcrypt only when needed (server-side)
    const bcrypt = await import('bcrypt');

    // Check if user already exists
    const existingUser = await database.select().from(users).where(eq(users.email, email));

    if (existingUser.length > 0) {
      return { error: 'User with this email already exists' };
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user in the database
    const newUser = await database.insert(users).values({
      id: crypto.randomUUID(),
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    if (newUser.length > 0) {
      // Create a JWT token for the new user
      const token = jwt.sign(
        {
          userId: newUser[0].id,
          email: newUser[0].email,
          name: newUser[0].name,
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        token,
        user: { id: newUser[0].id, email: newUser[0].email, name: newUser[0].name }
      };
    }

    return { error: 'Failed to create user' };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed' };
  }
};

// Export the auth object with all functions
export const auth = {
  login,
  verifyToken,
  getUserFromToken,
  register
};