import React, { useEffect, useState } from 'react';
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import { getUserAppointments, deleteAppointment } from '../firebase/firestore';
import { auth } from '../firebase';

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      fetchAppointments();
    }
  }, []);

  const fetchAppointments = async () => {
    const userAppointments = await getUserAppointments(auth.currentUser.uid);
    setAppointments(userAppointments);
  };

  const handleCancel = async (id) => {
    await deleteAppointment(id);
    fetchAppointments();
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Mis turnos</Heading>
      {appointments.map((appointment) => (
        <VStack key={appointment.id} p={4} borderWidth={1} borderRadius="md" align="stretch">
          <Text>Fecha: {new Date(appointment.date.seconds * 1000).toLocaleString()}</Text>
          <Text>Servicio: {appointment.service}</Text>
          <Text>Estado: {appointment.status}</Text>
          <Button onClick={() => handleCancel(appointment.id)} colorScheme="red" size="sm">
            Cancelar
          </Button>
        </VStack>
      ))}
    </VStack>
  );
}