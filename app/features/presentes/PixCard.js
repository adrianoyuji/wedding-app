import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const PixCard = ({ onOpen }) => {
  return (
    <Flex
      direction={"column"}
      p="2"
      border={"1px solid gray"}
      borderRadius="8"
      bgColor="white"
      flex="1"
    >
      <Flex flex="1" maxH={181} minH={181}>
        <Image
          objectFit={"contain"}
          borderRadius="4"
          loading="lazy"
          src="https://logospng.org/download/pix/logo-pix-icone-256.png"
          alt="PIX de qualquer valor"
        />
      </Flex>
      <Flex px="4" flex="3" direction={"column"}>
        <Heading textAlign={"center"} size={"md"} as="h3" my="4">
          PIX de qualquer valor
        </Heading>
        <Text>Aceitamos o valor que você quiser contribuir ❤️</Text>

        <Button onClick={onOpen} my="4" colorScheme={"yellow"}>
          Presentear
        </Button>
      </Flex>
    </Flex>
  );
};

export default React.memo(PixCard);
