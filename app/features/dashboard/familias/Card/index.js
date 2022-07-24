import { CopyIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import React from "react";

const FamilyCard = ({ family, handleSelect, handleDelete }) => {
  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.hostname}/convite/${family.id}`
    );
  };

  return (
    <Flex
      direction={"row"}
      p="2"
      my="2"
      border={"1px solid gray"}
      borderRadius="8"
      maxH={196}
    >
      <Flex px="4" flex="3" direction={"column"}>
        <Heading size={"md"} as="h3">
          {family.family_name}
        </Heading>
        <Text>
          <b>Total de pessoas:</b> {family.members.length}
        </Text>
      </Flex>
      <Flex direction={"row"}>
        <IconButton
          mr="4"
          onClick={copyUrlToClipboard}
          colorScheme="blue"
          aria-label="Copiar"
          size="lg"
          width={"1"}
          icon={<CopyIcon />}
        />
        <IconButton
          mr="4"
          onClick={() => handleSelect(family)}
          colorScheme="teal"
          aria-label="Editar"
          size="lg"
          width={"1"}
          icon={<EditIcon />}
        />
        <IconButton
          onClick={() => handleDelete(family.id)}
          colorScheme="red"
          aria-label="Deletar"
          size="lg"
          width={"1"}
          icon={<DeleteIcon />}
        />
      </Flex>
    </Flex>
  );
};

export default React.memo(FamilyCard);
