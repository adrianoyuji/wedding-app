import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import convertToReal from "../../../app/utils/convertToReal";
import React from "react";

const CardPresente = ({ gift, onOpen }) => {
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
          objectFit={"cover"}
          borderRadius="4"
          src={gift.image_url}
          alt={gift.name}
        />
      </Flex>
      <Flex px="4" flex="3" direction={"column"}>
        <Heading textAlign={"center"} size={"md"} as="h3" my="4">
          {gift.name}
        </Heading>
        <Text>
          <b>Valor:</b> {convertToReal(gift.price)}
        </Text>
        <Text>
          <b>Presenteado:</b>{" "}
          {gift.gifted ? (
            <CheckIcon color="green" />
          ) : (
            <CloseIcon color="red" />
          )}
        </Text>
        <Button
          //as="a"
          //target="_blank"
          //href={`https://api.whatsapp.com/send?phone=556796548529&text=Oi! Quero presentear ${gift.name}`}
          onClick={onOpen}
          disabled={gift.gifted}
          my="4"
          colorScheme={"yellow"}
        >
          Presentear
        </Button>
      </Flex>
    </Flex>
  );
};

export default React.memo(CardPresente);
