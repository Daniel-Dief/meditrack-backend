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
        Consultation: Consultation!
    }

    extend type Query {
        allAppointments: [Appointment!]!
        appointment (id: ID!): Appointment
    }
`