import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import decodeCredentials from '../../utils/decodeCredentials';

export const AuthResolver = {
  Mutation: {
    loginUser: async(_: any, args: { hash: string }, context: { prisma: PrismaClient }) => {
        const { hash } = args;
  
        const { login, password } = decodeCredentials(hash);

        const user = await context.prisma.users.findUnique({
          select: {
            UserId: true,
            Login: true,
            PasswordHash: true,
            status: {
              select: {
                Name: true
              }
            },
            usertypes: {
              select: {
                Name: true
              }
            }
          },
          where: {
            Login: login,
          }
        });

        if (!user) {
          throw new Error('User not found');
        }

        const token = jwt.sign(
            { id: user.UserId.toString() },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        return {
          user: {
            UserId: user.UserId,
            Login: user.Login,
            Status: user.status.Name,
            UserType: user.usertypes.Name
          },
          token: token
        }
      }
  },
};