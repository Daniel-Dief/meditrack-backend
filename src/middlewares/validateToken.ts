import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const operationsAllowed = ['IntrospectionQuery', 'loginUser'];

interface Props {
  operation: string;
  authHeader: string | undefined;
}

interface ResponseProps {
  status: boolean;
  message: string;
}

export async function validateToken( { operation, authHeader} : Props ) : Promise<ResponseProps> {
  const isAllowed = operationsAllowed.some(op => op === operation);

  if (isAllowed) {
    return {
      status: true,
      message: ""
    };
  }

  try {
    if (!authHeader) {
      return {
        status: false,
        message: "Token não fornecido"
      }
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return {
        status: false,
        message: "Erro no formato do token"
      }
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return {
        status: false,
        message: "Token mal formatado"
      }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const userId = parseInt(decoded.id, 2);

    const user = await prisma.users.findUnique({
      where: { UserId: userId}
    });

    if (!user) {
      return {
        status: false,
        message: "Usuário não encontrado"
      };
    }

    
    return {
      status: true,
      message: "",
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        status: false,
        message: "Token expirado"
      }
    } else {
      console.log(error)
      return {
        status: false,
        message: "Token inválido"
      }
    }
  }
};