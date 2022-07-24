import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";

const MemberItem = ({ person, handleDeletePerson }) => {
  return (
    <Box py="1" display="flex" flexDir="row" alignItems="center">
      <Text display="flex" flexGrow="1">
        {person.full_name}
      </Text>
      <Box pr="4">
        {person.confirmed_attendance ? (
          <Text fontWeight="bold" color="green.500">
            Confirmado
          </Text>
        ) : (
          <Text fontWeight="bold" color="red.500">
            Não confirmado
          </Text>
        )}
      </Box>
      <IconButton
        onClick={handleDeletePerson}
        colorScheme="red"
        aria-label="Deletar"
        size="sm"
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default React.memo(MemberItem);
