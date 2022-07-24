import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";

const MemberItem = ({ person, handleDeletePerson }) => {
  return (
    <Box py="1" display="flex" flexDir="row">
      <Text display="flex" flexGrow="1">
        {person.full_name}
      </Text>

      <IconButton
        onClick={() => handleDeletePerson(person.id)}
        colorScheme="red"
        aria-label="Deletar"
        size="sm"
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default React.memo(MemberItem);
