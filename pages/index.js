import React from "react";
import HomePageLayout from "../app/components/HomePageLayout";
import Image from "next/image";
import { Container, Flex, Box, Heading, Text } from "@chakra-ui/react";
const Home = () => {
  return (
    <HomePageLayout>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 480,
          backgroundColor: "#000",
        }}
      >
        <Image
          src="/images/main_banner.jpeg"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="Adriano e Mayara"
        />
      </div>
      <Container
        paddingInlineStart="0"
        paddingInlineEnd="0"
        p="4"
        maxW="container.lg"
        textAlign="center"
      >
        <Flex direction="row" justifyContent="center" alignItems="center">
          <Box
            transform="rotate(-90deg)"
            w={{ base: "32px", md: "64px" }}
            h={{ base: "96px", md: "128px" }}
            position="relative"
          >
            <Image
              objectFit="contain"
              layout="fill"
              src="/images/folha_seca.png"
            />
          </Box>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} margin="4">
            Adriano & Mayara
          </Heading>
          <Box
            transform="scaleX(-1) rotate(-90deg)"
            w={{ base: "32px", md: "64px" }}
            h={{ base: "96px", md: "128px" }}
            position="relative"
          >
            <Image
              objectFit="contain"
              layout="fill"
              src="/images/folha_seca.png"
            />
          </Box>
        </Flex>
        <Text as="p" mb="8">
          Começou a contagem regressiva, borboletas no estômago, uma mega
          ansiedade misturada com a Felicidade imensa de poder dividir com vocês
          todo esse Amor!
        </Text>
        <Text as="b">
          Será incrível ter vocês conosco para sentir ainda mais a emoção desse
          momento tão especial! 💖
        </Text>
        <Text as="p" mt="8">
          Aproveitem alguns minutos no nosso site, nele poderá encontrar
          endereço, horário, lista de presentes e muito mais!!
        </Text>
      </Container>
    </HomePageLayout>
  );
};

export default Home;
