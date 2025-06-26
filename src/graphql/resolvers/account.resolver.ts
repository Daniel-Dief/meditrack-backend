import { createHash } from 'crypto';
import { PrismaClient } from '@prisma/client';

interface AccountDoctor {
    Name: string
    Specialty?: string
    BirthDate: Date
    Email?: string
    Phone?: string
    CRM: string
    Login: string
    Password: string
}

interface AccountPatient {
    Name: string
    Document: string
    BirthDate: Date
    Gender: boolean
    Phone?: string
    Login: string
    Password: string
}

export const AccountResolvers = {
    Mutation: {
        createDoctorAccount: async (_: any, args: { input: AccountDoctor }, context: { prisma: PrismaClient }) => {
            const { input } = args;
            const { prisma } = context;
    
            const hashedPassword = createHash("md5").update(input.Password).digest("hex").toUpperCase();
    
            const newUser = await prisma.users.create({
                data: {
                    Login: input.Login,
                    PasswordHash: hashedPassword,
                    UserTypeId: 2,
                    StatusId: 1
                }
            })
    
            const newDoctor = await prisma.doctors.create({
                data: {
                    Email: input.Email,
                    Name: input.Name,
                    BirthDate: input.BirthDate,
                    Phone: input.Phone,
                    CRM: input.CRM,
                    Specialty: input.Specialty,
                    UserId: newUser.UserId
                }
            })
    
            return {
                DoctorId: newDoctor.DoctorId,
                Name: newDoctor.Name,
                Specialty: newDoctor.Specialty,
                BirthDate: newDoctor.BirthDate,
                Email: newDoctor.Email,
                Phone: newDoctor.Phone,
                CRM: newDoctor.CRM,
                Login: newUser.Login
            }
        },
        createPatientAccount: async (_: any, args: { input: AccountPatient }, context: { prisma: PrismaClient }) => {
            const { input } = args;
            const { prisma } = context;
    
            const hashedPassword = createHash("md5").update(input.Password).digest("hex").toUpperCase();
    
            const newUser = await prisma.users.create({
                data: {
                    Login: input.Login,
                    PasswordHash: hashedPassword,
                    UserTypeId: 3,
                    StatusId: 1
                }
            })
    
            const newPatient = await prisma.patients.create({
                data: {
                    Name: input.Name,
                    Document: input.Document,
                    BirthDate: input.BirthDate,
                    Gender: input.Gender,
                    Phone: input.Phone,
                    UserId: newUser.UserId
                }
            })
    
            return {
                PatientId: newPatient.PatientId,
                Name: newPatient.Name,
                Document: newPatient.Document,
                BirthDate: newPatient.BirthDate,
                Gender: newPatient.Gender,
                Phone: newPatient.Phone,
                Login: newUser.Login
            }
        }
    }
};