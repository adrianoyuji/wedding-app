import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createGift, updateGift } from "../../../../../store/Gift/slice";

const GiftModal = ({ isOpen, onClose, selectedGift }) => {
  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [giftImage, setGiftImage] = useState("");
  const [giftGifted, setGiftGifted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedGift) {
      setGiftName(selectedGift.name);
      setGiftPrice(`${(selectedGift.price / 100).toFixed(2)}`);
      setGiftImage(selectedGift.image_url);
      setGiftGifted(selectedGift.gifted);
    } else {
      setGiftName("");
      setGiftPrice("");
      setGiftImage("");
      setGiftGifted(false);
    }
  }, [selectedGift]);

  const handleChangeGiftName = (e) => {
    setGiftName(e.target.value);
  };
  const handleChangeGiftPrice = (e) => {
    const localizedValue = Number(e.target.value).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
    setGiftPrice(localizedValue.replace(/\,/g, ""));
  };
  const handleChangeGiftImage = (e) => {
    setGiftImage(e.target.value);
  };
  const handleBrokenImage = () => {
    setGiftImage("https://bitsofco.de/content/images/2018/12/broken-1.png");
  };
  const handleChangeGifted = (e) => {
    setGiftGifted(e.target.checked);
  };

  const handleCreateGift = (e) => {
    e.preventDefault();
    if (giftName && giftPrice && giftImage) {
      dispatch(
        createGift({
          name: giftName,
          price: Number(giftPrice) * 100,
          image_url: giftImage,
        })
      );

      onClose();
    }
  };

  const handleUpdateGift = (e) => {
    if (!selectedGift) return;
    e.preventDefault();
    dispatch(
      updateGift({
        id: selectedGift.id,
        name: giftName,
        price: Number(giftPrice) * 100,
        image_url: giftImage,
        gifted: giftGifted,
      })
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>
          {selectedGift ? "Editar presente" : "Novo presente"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            as="form"
            onSubmit={selectedGift ? handleUpdateGift : handleCreateGift}
          >
            {giftImage ? (
              <Image
                borderRadius={"4"}
                onError={handleBrokenImage}
                src={giftImage}
                alt="selected gift image"
              />
            ) : null}
            <Box py="1">
              <FormLabel fontWeight={"bold"} htmlFor="presente_nome">
                Nome:
              </FormLabel>
              <Input
                onChange={handleChangeGiftName}
                value={giftName}
                type="text"
                id="presente_nome"
              />
            </Box>
            <Box py="1">
              <FormLabel fontWeight={"bold"} htmlFor="presente_preco">
                Preço (R$):
              </FormLabel>
              <Input
                onChange={handleChangeGiftPrice}
                value={giftPrice}
                type="number"
                id="presente_preco"
              />
            </Box>
            <Box py="1">
              <FormLabel fontWeight={"bold"} htmlFor="presente_image">
                Url da imagem:
              </FormLabel>
              <Input
                value={giftImage}
                onChange={handleChangeGiftImage}
                type="text"
                id="presente_image"
              />
            </Box>
            <Flex mt="1" direction="row" py="1" alignItems={"center"}>
              <FormLabel fontWeight={"bold"} htmlFor="presente_gifted" mb="0">
                Presenteado?
              </FormLabel>
              <Switch
                onChange={handleChangeGifted}
                size="md"
                isChecked={giftGifted}
                id="presente_gifted-alerts"
              />
            </Flex>
            <Flex my="4" justifyContent={"flex-end"}>
              <Button onClick={onClose} colorScheme={"red"} type="button">
                Cancelar
              </Button>
              <Button ml="4" colorScheme={"green"} type="submit">
                Salvar{" "}
              </Button>
            </Flex>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GiftModal;
