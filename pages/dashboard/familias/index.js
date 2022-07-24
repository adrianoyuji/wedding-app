import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../app/features/dashboard/Layout";

import { AddIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFamily,
  fetchFamilies,
  selectFamilies,
} from "../../../store/Family/slice";
import Card from "../../../app/features/dashboard/familias/Card";
import FormModal from "../../../app/features/dashboard/familias/FormModal";

const Families = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFamily, setSelectedFamily] = useState(null);
  const families = useSelector(selectFamilies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFamilies());
  }, []);

  useEffect(() => {
    if (selectedFamily) {
      const foundFamily = families.list.find(
        (family) => family.id === selectedFamily.id
      );

      foundFamily && setSelectedFamily(foundFamily);
    }
  }, [families, selectedFamily]);

  const handleCloseModal = useCallback(() => {
    setSelectedFamily(null);
    onClose();
  }, []);

  const handleSelectFamily = useCallback((selectedItem) => {
    setSelectedFamily(selectedItem);
    onOpen();
  }, []);

  const handleDeleteFamily = useCallback(
    (id) => {
      dispatch(deleteFamily(id));
    },
    [dispatch]
  );

  return (
    <Layout>
      <Flex>
        <Heading pr="4">Famílias</Heading>
        <IconButton
          onClick={onOpen}
          colorScheme="green"
          aria-label="Nova família"
          icon={<AddIcon />}
        />
      </Flex>
      <Flex my="8" direction="column">
        {families.list.map((family) => (
          <Card
            key={family.id}
            handleDelete={handleDeleteFamily}
            family={family}
            handleSelect={handleSelectFamily}
          />
        ))}
      </Flex>
      <FormModal
        selectedFamily={selectedFamily}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

export default Families;
