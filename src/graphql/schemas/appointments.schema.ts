import { gql } from 'apollo-server';

export const AppointmentsSchema = gql`
    scalar DateTime

    type Appointment {
        AppointmentId: ID!
        AppointmentDate: DateTime!
        PatientId: ID!
        DoctorId: ID!
        StatusId: ID!
        CreatedAt: DateTime
        UpdatedAt: DateTime
        
        Patient: Patient!
        Doctor: Doctor!
        Status: Status!
        Consultation: Consultation
    }

    input CreateAppointmentInput {
        AppointmentDate: DateTime!
        PatientId: ID!
        DoctorId: ID!
        StatusId: ID!
    }

    input UpdateAppointmentInput {
        AppointmentDate: DateTime
        PatientId: ID
        DoctorId: ID
        StatusId: ID
    }

    extend type Query {
        allAppointments: [Appointment!]!
        appointment (id: ID!): Appointment
    }

    extend type Mutation {
        createAppointment(input: CreateAppointmentInput!): Appointment!
        updateAppointment(id: ID!, input: UpdateAppointmentInput!): Appointment!
        deleteAppointment(id: ID!): Boolean!
    }
`