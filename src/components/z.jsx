import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Simulación de base de datos de turnos
const turnosTomados = [
  { fecha: new Date(2024, 7, 26), hora: '09:00' },
  { fecha: new Date(2024, 7, 26), hora: '14:30' },
];

// Configuración de horarios disponibles
const horariosDisponibles = {
  manana: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  tarde: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'],
};

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const toast = useToast();

  const esTurnoTomado = (fecha, hora) => {
    return turnosTomados.some(turno => 
      turno.fecha.toDateString() === fecha.toDateString() && turno.hora === hora
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleReservar = () => {
    if (selectedTime) {
      toast({
        title: "Turno reservado",
        description: `Has reservado un turno para el ${selectedDate.toLocaleDateString()} a las ${selectedTime}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor, selecciona un horario",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const TimeButton = ({ time, isManana }) => (
    <Button
      onClick={() => handleTimeSelect(time)}
      isDisabled={esTurnoTomado(selectedDate, time)}
      colorScheme={selectedTime === time ? "blue" : esTurnoTomado(selectedDate, time) ? "red" : "gray"}
      variant={selectedTime === time ? "solid" : "outline"}
    >
      {time}
    </Button>
  );

  return (
    <Box width="100%" maxWidth="600px">
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Reservar Turno</Heading>
        <Text>Selecciona la fecha y hora para reservar tu turno.</Text>

        <Box>
          <Text mb={2}>Seleccionar fecha:</Text>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            customInput={<Button width="100%">{selectedDate.toLocaleDateString()}</Button>}
          />
        </Box>

        <Box>
          <Text mb={4}>Turno mañana:</Text>
          <SimpleGrid columns={2} spacing={4}>
            {horariosDisponibles.manana.map(time => (
              <TimeButton key={time} time={time} isManana={true} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Text mb={4}>Turno tarde:</Text>
          <SimpleGrid columns={2} spacing={4}>
            {horariosDisponibles.tarde.map(time => (
              <TimeButton key={time} time={time} isManana={false} />
            ))}
          </SimpleGrid>
        </Box>

        <Button colorScheme="blue" size="lg" onClick={handleReservar}>
          ¡Reservar turno!
        </Button>
      </VStack>
    </Box>
  );
}