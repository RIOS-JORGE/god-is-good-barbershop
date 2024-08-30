import React from 'react';
import { Button, VStack, Heading, Text, Box } from "@chakra-ui/react";
import { auth } from '../firebase';
import AppointmentForm from './AppointmentForm';
import UserAppointments from './UserAppointments';
import AdminDashboard from './AdminDashboard';

export default function Home() {
  const signOut = () => {
    auth.signOut();
  }

  const isAdmin = auth.currentUser?.email === 'jorgedrios86@gmail.com'; // Cambia esto por el email del administrador

  return (
    <VStack spacing={8} align="center" justify="center" padding={8}>
      <Text>Bienvenido, {auth.currentUser?.displayName}</Text>
      <Heading className="god">God is Good Barbershop</Heading>
      <Button onClick={signOut} colorScheme="red">Cerrar sesión</Button>
      
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <Box width="100%" maxWidth="500px">
          <VStack spacing={8}>
            <AppointmentForm />
            <UserAppointments />
          </VStack>
        </Box>
      )}
    </VStack>
  );
}