import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { Button, VStack, Heading, Text } from "@chakra-ui/react";

export default function Login() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // El usuario ha iniciado sesión correctamente
        console.log(result.user);
      })
      .catch((error) => {
        // Manejar errores aquí
        console.error(error);
      });
  };

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh">
      <Heading className="god">Bienvenido a God is Good Barbershop</Heading>
      <Text>Inicia sesión para solicitar un turno</Text>
      <Button onClick={signInWithGoogle} colorScheme="blue">
        Iniciar sesión con Google
      </Button>
    </VStack>
  );
}
