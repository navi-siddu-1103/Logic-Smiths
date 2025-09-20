import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  profile?: {
    age?: number;
    preferences?: string[];
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
}

export interface UserCreateInput {
  email: string;
  password: string;
  name: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface SafeUser {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  lastLogin?: Date;
  profile?: User['profile'];
}

// Remove sensitive data from user object
export function sanitizeUser(user: User): SafeUser {
  const { password, ...safeUser } = user;
  return {
    ...safeUser,
    _id: user._id?.toString() || '',
  };
}