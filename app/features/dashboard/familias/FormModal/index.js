import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
} from "@chakra-ui/react";
import { createFamily, updateFamily } from "../../../../../store/Family/slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MemberList from "./MemberList";

const FamilyModal = ({ isOpen, onClose, selectedFamily }) => {
  const [familyName, setFamilyName] = useState("");
  const [confirmedAttendance, setConfirmedAttendance] = useState(false);
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFamily) {
      setFamilyName(selectedFamily.family_name);
      setConfirmedAttendance(selectedFamily.confirmed_attendance);
      setMembers(selectedFamily.members);
    } else {
      setFamilyName("");
      setConfirmedAttendance(false);
      setMembers([]);
    }
  }, [selectedFamily]);

  const handleChangeFamilyName = (e) => {
    setFamilyName(e.target.value);
  };

  const handleChangeConfirmedAttendance = (e) => {
    setConfirmedAttendance(e.target.checked);
  };

  const handleCreateFamily = (e) => {
    e.preventDefault();
    if (familyName) {
      dispatch(
        createFamily({
          family_name: familyName,
        })
      );

      onClose();
    }
  };

  const handleUpdateFamily = (e) => {
    if (!selectedFamily) return;
    e.preventDefault();
    dispatch(
      updateFamily({
        id: selectedFamily.id,
        confirmed_attendance: confirmedAttendance,
        family_name: familyName,
        members,
      })
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>
          {selectedFamily ? "Editar família" : "Nova família"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            as="form"
            onSubmit={selectedFamily ? handleUpdateFamily : handleCreateFamily}
          >
            <Box py="1">
              <FormLabel fontWeight={"bold"} htmlFor="nome_familia">
                Nome da família:
              </FormLabel>
              <Input
                onChange={handleChangeFamilyName}
                value={familyName}
                type="text"
                id="nome_familia"
              />
            </Box>

            {selectedFamily && (
              <Flex mt="1" direction="row" py="1" alignItems={"center"}>
                <FormLabel fontWeight={"bold"} htmlFor="attendance" mb="0">
                  Confirmado?
                </FormLabel>
                <Switch
                  onChange={handleChangeConfirmedAttendance}
                  size="md"
                  isChecked={confirmedAttendance}
                  id="attendance"
                />
              </Flex>
            )}

            <Flex my="4" justifyContent={"flex-end"}>
              <Button onClick={onClose} colorScheme={"red"} type="button">
                Cancelar
              </Button>
              <Button ml="4" colorScheme={"green"} type="submit">
                Salvar{" "}
              </Button>
            </Flex>
          </FormControl>
          {selectedFamily && (
            <MemberList familyId={selectedFamily.id} members={members} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FamilyModal;
