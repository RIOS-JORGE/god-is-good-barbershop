import React, { useEffect, useState } from 'react';
import { VStack, Heading, Text, Button, Select } from "@chakra-ui/react";
import { getAllAppointments, updateAppointment, deleteAppointment } from '../firebase/firestore';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const allAppointments = await getAllAppointments();
    setAppointments(allAppointments);
  };

  const handleStatusChange = async (id, status) => {
    await updateAppointment(id, { status });
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    fetchAppointments();
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Panel de Administración</Heading>
      {appointments.map((appointment) => (
        <VStack key={appointment.id} p={4} borderWidth={1} borderRadius="md" align="stretch">
          <Text>Usuario ID: {appointment.userId}</Text>
          <Text>Nombre: {appointment.name}</Text>
          <Text>Fecha: {new Date(appointment.date.seconds * 1000).toLocaleString()}</Text>
          <Text>Servicio: {appointment.service}</Text>
          <Select 
            value={appointment.status} 
            onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
          >
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmado</option>
            <option value="cancelled">Cancelado</option>
          </Select>
          <Button onClick={() => handleDelete(appointment.id)} colorScheme="red" size="sm">
            Eliminar
          </Button>
        </VStack>
      ))}
    </VStack>
  );
}