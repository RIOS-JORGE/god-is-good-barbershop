import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading, Text, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { format } from 'date-fns';
import { addAppointment } from '../firebase/firestore';
import { auth } from '../firebase';

registerLocale('es', es);

const horariosDisponibles = {
  manana: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  tarde: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'],
};

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [service, setService] = useState('');
  const toast = useToast();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser && selectedTime && service) {
      const appointmentDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      appointmentDate.setHours(parseInt(hours), parseInt(minutes));

      try {
        await addAppointment(auth.currentUser.uid, appointmentDate, service);
        setSelectedDate(new Date());
        setSelectedTime(null);
        setService('');
        toast({
          title: "Turno reservado",
          description: "Tu turno ha sido reservado con éxito.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error al reservar el turno:", error);
        toast({
          title: "Error",
          description: "No se pudo reservar el turno. Por favor, intenta de nuevo.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Por favor, selecciona una fecha, hora y servicio.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const TimeButton = ({ time }) => (
    <Button
      onClick={() => handleTimeSelect(time)}
      colorScheme={selectedTime === time ? "blue" : "gray"}
      variant={selectedTime === time ? "solid" : "outline"}
    >
      {time}
    </Button>
  );

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Button onClick={onClick} ref={ref} width="100%">
      {value}
    </Button>
  ));

  return (
    <Box width="100%" maxWidth="600px">
      <VStack spacing={8} align="stretch" as="form" onSubmit={handleSubmit}>
        <Heading size="lg">Reservar Turno</Heading>
        <Text>Selecciona la fecha y hora para reservar tu turno.</Text>

        <Box>
          <Text mb={2}>Seleccionar fecha:</Text>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            locale="es"
            customInput={<CustomInput />}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={2}>
                <Button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} size="sm">&lt;</Button>
                <Text fontWeight="bold">{format(date, 'MMMM yyyy', { locale: es })}</Text>
                <Button onClick={increaseMonth} disabled={nextMonthButtonDisabled} size="sm">&gt;</Button>
              </Box>
            )}
          />
        </Box>

        <Box>
          <Text mb={4}>Turno mañana:</Text>
          <SimpleGrid columns={2} spacing={4}>
            {horariosDisponibles.manana.map(time => (
              <TimeButton key={time} time={time} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Text mb={4}>Turno tarde:</Text>
          <SimpleGrid columns={2} spacing={4}>
            {horariosDisponibles.tarde.map(time => (
              <TimeButton key={time} time={time} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Text mb={2}>Servicio:</Text>
          <SimpleGrid columns={3} spacing={4}>
            <Button
              onClick={() => setService('corte')}
              colorScheme={service === 'corte' ? "blue" : "gray"}
              variant={service === 'corte' ? "solid" : "outline"}
            >
              Corte de pelo
            </Button>
            <Button
              onClick={() => setService('barba')}
              colorScheme={service === 'barba' ? "blue" : "gray"}
              variant={service === 'barba' ? "solid" : "outline"}
            >
              Arreglo de barba
            </Button>
            <Button
              onClick={() => setService('completo')}
              colorScheme={service === 'completo' ? "blue" : "gray"}
              variant={service === 'completo' ? "solid" : "outline"}
            >
              Corte y barba
            </Button>
          </SimpleGrid>
        </Box>

        <Button type="submit" colorScheme="blue" size="lg">
          Reservar turno
        </Button>
      </VStack>
    </Box>
  );
}