import { gql } from 'apollo-server';

import { AppointmentsSchema } from './appointments.schema';
import { AttachmentsSchema } from './attachments.schema';
import { ConsultationsSchema } from './consultations.schema';
import { DoctorsSchema } from './doctors.schema';
import { PatientsSchema } from './patients.schema';
import { StatusSchema } from './status.schema';
import { UsersSchema } from './users.schema';
import { UserTypesSchema } from './usertypes.schema';

import { AuthSchema } from './auth.schema';
import { AccountSchema } from './account.schema';

const baseSchema = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`

export const typeDefs = [
    baseSchema,
    AppointmentsSchema,
    AttachmentsSchema,
    ConsultationsSchema,
    DoctorsSchema,
    PatientsSchema,
    StatusSchema,
    UsersSchema,
    UserTypesSchema,
    
    AuthSchema,
    AccountSchema
]