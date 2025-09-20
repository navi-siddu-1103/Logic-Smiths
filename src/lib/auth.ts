import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getDatabase } from '@/lib/mongodb';
import { User, sanitizeUser } from '@/types/user';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const db = await getDatabase();
          const usersCollection = db.collection<User>('users');

          // Find user by email
          const user = await usersCollection.findOne({ 
            email: credentials.email.toLowerCase() 
          });
          
          if (!user) {
            throw new Error('Invalid email or password');
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            throw new Error('Invalid email or password');
          }

          // Update last login
          await usersCollection.updateOne(
            { _id: user._id },
            { 
              $set: { 
                lastLogin: new Date(),
                updatedAt: new Date()
              } 
            }
          );

          // Return sanitized user
          const safeUser = sanitizeUser({
            ...user,
            lastLogin: new Date()
          });

          return {
            id: safeUser._id,
            email: safeUser.email,
            name: safeUser.name,
            image: null, // You can add profile images later
          };

        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    // signUp is not a standard NextAuth page, we handle it manually
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};