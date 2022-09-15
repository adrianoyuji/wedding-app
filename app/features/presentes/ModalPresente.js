import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";

const ModalPresente = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>Presentear</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column">
          <Text as="b">Muitíssimo obrigado por querer nos presentear ❤️</Text>
          <Text as="p" mt="3">
            Aceitamos receber o presente tanto fisicamente como o valor dele.
          </Text>
          <Button
            as="a"
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=556796548529&text=Oi! Quero te presentear`}
            my="2"
            colorScheme={"yellow"}
          >
            Falar com a noiva
          </Button>
          <Button
            as="a"
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=5567999406324&text=Oi! Quero te presentear`}
            my="2"
            colorScheme={"yellow"}
          >
            Falar com o noivo
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalPresente;
