import React from "react";
import { Flex, Heading, Image, Text, IconButton } from "@chakra-ui/react";
import convertToReal from "../../../../app/utils/convertToReal";
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

const GiftCard = ({ gift, handleSelect, handleDelete }) => {
  return (
    <Flex
      direction={"row"}
      p="2"
      my="2"
      border={"1px solid gray"}
      borderRadius="8"
      maxH={196}
    >
      <Flex flex="1">
        <Image
          objectFit={"cover"}
          borderRadius="4"
          src={gift.image_url}
          alt={gift.name}
        />
      </Flex>
      <Flex px="4" flex="3" direction={"column"}>
        <Heading size={"md"} as="h3">
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
        <Flex direction={"row"}>
          <IconButton
            mr="4"
            onClick={() => handleSelect(gift)}
            colorScheme="teal"
            aria-label="Editar"
            size="lg"
            width={"1"}
            icon={<EditIcon />}
          />
          <IconButton
            onClick={() => handleDelete(gift.id)}
            colorScheme="red"
            aria-label="Deletar"
            size="lg"
            width={"1"}
            icon={<DeleteIcon />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default React.memo(GiftCard);
