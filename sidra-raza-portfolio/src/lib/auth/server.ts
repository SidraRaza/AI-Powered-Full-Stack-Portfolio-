// Mock user data - in a real app this would come from a database
const mockUsers = [
  {
    id: '1',
    email: 'sidra@example.com',
    name: 'sidra',
    password: '1234', // In a real app, this would be hashed
  }
];

// Simple token system using base64 encoding instead of JWT
// In a real app, you'd want to use a proper authentication system

// Login function
export const login = (email: string, password: string) => {
  // Find user by email (case-insensitive for name 'sidra')
  const user = mockUsers.find(u =>
    u.email.toLowerCase() === email.toLowerCase() ||
    u.name.toLowerCase() === email.toLowerCase()
  );

  if (user && user.password === password) {
    // Create a simple token by encoding user data
    const userData = JSON.stringify({
      userId: user.id,
      email: user.email,
      name: user.name,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
    });

    // Simple base64 encoding (not secure, but works for demo)
    const token = Buffer.from(userData).toString('base64');

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name }
    };
  }

  return null;
};

// Verify token
export const verifyToken = (token: string) => {
  try {
    // Decode the token
    const decodedString = Buffer.from(token, 'base64').toString('utf-8');
    const decoded = JSON.parse(decodedString);

    // Check if token is expired
    if (decoded.exp < Date.now()) {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name
    };
  } catch (error) {
    return null;
  }
};

// Get user session from token
export const getUserFromToken = (token: string) => {
  const decoded = verifyToken(token);
  if (decoded) {
    return mockUsers.find(user => user.id === decoded.userId);
  }
  return null;
};

// Export the auth object with login function
export const auth = {
  login,
  verifyToken,
  getUserFromToken
};