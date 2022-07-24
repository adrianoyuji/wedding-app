import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Input, Text } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createGuest, deleteGuest } from "../../../../../store/Family/slice";
import MemberItem from "./MemberItem";

const MemberList = ({ members, familyId }) => {
  const dispatch = useDispatch();
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [newGuest, setNewGuest] = useState("");

  const handleNewGuestInput = useCallback(() => setShowGuestForm(true), []);

  const handleChangeGuestName = (e) => setNewGuest(e.target.value);

  const handleSubmitNewGuest = (e) => {
    e.preventDefault();
    setNewGuest("");
    dispatch(createGuest({ familyId, member: { full_name: newGuest } }));
  };

  const handleDeleteGuest = (memberId) =>
    dispatch(deleteGuest({ memberId, familyId }));

  return (
    <Box display="flex" flexDir="column">
      <Box display="flex" flexDir="row" alignItems="center" mb="2">
        <Text as="b" flexGrow="1">
          Convidados ({members.length})
        </Text>
        {showGuestForm || (
          <IconButton
            onClick={handleNewGuestInput}
            colorScheme="green"
            aria-label="Novo"
            size="sm"
            icon={<AddIcon />}
            title="Novo convidado"
          />
        )}
      </Box>

      {showGuestForm && (
        <FormControl as="form" onSubmit={handleSubmitNewGuest}>
          <Box mb="2" w="100%" display="flex" flexDir="row" alignItems="center">
            <Input
              w="100%"
              placeholder="Nome da pessoa"
              onChange={handleChangeGuestName}
              value={newGuest}
              type="text"
              id="nome_familia"
              size="sm"
            />
            <IconButton
              ml="4"
              type="submit"
              colorScheme="green"
              aria-label="Salvar"
              size="sm"
              icon={<CheckIcon />}
              title="Salvar convidado"
            />
          </Box>
        </FormControl>
      )}

      <Box display="flex" flexDir="column" overflowY="scroll">
        {members.map((person) => (
          <MemberItem
            person={person}
            handleDeletePerson={handleDeleteGuest}
            key={person.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(MemberList);
