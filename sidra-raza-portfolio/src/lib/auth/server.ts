import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/analytics/service';
import { users } from '@/lib/analytics/schema';
import { eq } from 'drizzle-orm';

// Secret for JWT signing - should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

// Login function
export const login = async (email: string, password: string) => {
  try {
    // Find user by email in the database
    const userResult = await db.select().from(users).where(eq(users.email, email));

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
  if (decoded) {
    try {
      const userResult = await db.select().from(users).where(eq(users.id, decoded.userId));
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
  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));

    if (existingUser.length > 0) {
      return { error: 'User with this email already exists' };
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user in the database
    const newUser = await db.insert(users).values({
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