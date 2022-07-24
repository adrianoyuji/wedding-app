import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import agent from "../../../services/agent";

const ConviteForm = ({ family, handleChangeStep }) => {
  const [guestList, setGuestList] = useState(family.members);
  const handleCheckboxChange = useCallback(
    (e) => {
      setGuestList((prev) =>
        prev.map((guest) => {
          if (guest.id !== e.target.id) return guest;
          return { ...guest, confirmed_attendance: e.target.checked };
        })
      );
    },
    [setGuestList]
  );

  const handleSubmit = async () => {
    try {
      await agent.Families.updateGuests({
        members: guestList,
        familyId: family._id.toString(),
      });

      handleChangeStep("success");
    } catch (error) {
      console.log(error);
      handleChangeStep("fail");
    }
  };
  return (
    <>
      <Text as="h2" fontSize={{ base: "2xl", md: "4xl" }}>
        {family?.family_name}
      </Text>
      <Text as="h3">Texto de boas vindas</Text>
      <Text as="h4">Selecione as pessoas para confirmar o convite!</Text>
      <CheckboxGroup colorScheme={"orange"}>
        <Stack spacing={4} direction="column">
          {guestList.map((guest) => (
            <Checkbox
              borderColor={"orange.400"}
              id={guest.id}
              onChange={handleCheckboxChange}
              key={guest.id}
              checked={guest.confirmed_attendance}
              defaultChecked={guest.confirmed_attendance}
            >
              {guest.full_name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={{ base: "flex-end", md: "flex-start" }}
      >
        <Button colorScheme="orange" mt="4" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </>
  );
};

export default ConviteForm;
