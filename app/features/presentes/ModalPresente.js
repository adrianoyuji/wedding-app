import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import React from "react";

const ModalPresente = ({ isOpen, onClose }) => {
  const [copiedToClipboard, setCopiedToClipboard] = React.useState({
    groom: false,
    bride: false,
  });

  const copyToClipboardGroom = () => {
    navigator.clipboard.writeText("adrianoyuji@gmail.com");
    setCopiedToClipboard({
      groom: true,
      bride: false,
    });
  };

  const copyToClipboardBride = () => {
    navigator.clipboard.writeText("mayaragodoy2250@gmail.com");
    setCopiedToClipboard({
      groom: false,
      bride: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>Presentear</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column">
          <Text as="b">Muitíssimo obrigado por querer nos presentear ❤️</Text>
          <Text as="p" mt="3">
            Aceitamos receber preferencialmente o presente através do valor, mas
            fique à vontade se preferir presentear fisicamente.
          </Text>
          <Flex direction="row" alignItems="center" mt="2">
            <Text flexGrow={1}>
              <b>Chave PIX Noivo:</b> <br />
              adrianoyuji@gmail.com
            </Text>
            <Button
              size="sm"
              target="_blank"
              onClick={copyToClipboardGroom}
              mx="2"
              colorScheme={copiedToClipboard.groom ? "green" : "blue"}
            >
              {copiedToClipboard.groom ? "Copiado" : "Copiar"}
            </Button>
          </Flex>
          <Flex direction="row" alignItems="center" my="2">
            <Text flexGrow={1}>
              <b>Chave PIX Noiva:</b> mayaragodoy2250@gmail.com
            </Text>
            <Button
              size="sm"
              target="_blank"
              onClick={copyToClipboardBride}
              mx="2"
              colorScheme={copiedToClipboard.bride ? "green" : "blue"}
            >
              {copiedToClipboard.bride ? "Copiado" : "Copiar"}
            </Button>
          </Flex>

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
