import { AppointmentResolvers } from './appointments.resolver';
import { AttachmentsResolvers } from './attachments.resolver';
import { ConsultationResolvers } from './consultations.resolver';
import { DoctorsResolvers } from './doctors.resolver';
import { PatientsResolvers } from './patients.resolver';
import { StatusResolvers } from './status.resolver';
import { UsersResolvers } from './users.resolver';
import { UserTypesResolvers } from './usertypes.resolver';

export const resolvers = [
    AppointmentResolvers,
    AttachmentsResolvers,
    ConsultationResolvers,
    DoctorsResolvers,
    PatientsResolvers,
    StatusResolvers,
    UsersResolvers,
    UserTypesResolvers,
]