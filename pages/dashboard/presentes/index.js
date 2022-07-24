import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../app/features/dashboard/Layout";
import { deleteGift, fetchGifts, selectGifts } from "../../../store/Gift/slice";
import Card from "../../../app/features/dashboard/presentes/Card";
import FormModal from "../../../app/features/dashboard/presentes/FormModal";

const Gifts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGift, setSelectedGift] = useState(null);
  const gift = useSelector(selectGifts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGifts());
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedGift(null);
    onClose();
  }, []);

  const handleSelectGift = useCallback((selectedItem) => {
    setSelectedGift(selectedItem);
    onOpen();
  }, []);

  const handleDeleteGift = useCallback(
    (id) => {
      dispatch(deleteGift(id));
    },
    [dispatch]
  );

  if (gift.status !== "success") {
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center">
          <Spinner color="orange.500" />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex>
        <Heading pr="4">Presentes</Heading>
        <IconButton
          onClick={onOpen}
          colorScheme="green"
          aria-label="Novo Presente"
          icon={<AddIcon />}
        />
      </Flex>
      <Flex my="8" direction="column">
        {gift.list.map((gift) => (
          <Card
            handleDelete={handleDeleteGift}
            handleSelect={handleSelectGift}
            key={gift.id}
            gift={gift}
          />
        ))}
      </Flex>
      <FormModal
        selectedGift={selectedGift}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

export default Gifts;
