import { Grid, Text, Spinner, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGifts, selectGifts } from "../../store/Gift/slice";
import Layout from "../../app/components/Layout";
import CardPresente from "../../app/features/presentes/CardPresente";
import { useEffect } from "react";

const Presentes = () => {
  const dispatch = useDispatch();
  const gifts = useSelector(selectGifts);

  useEffect(() => {
    dispatch(fetchGifts());
  }, []);

  if (gifts.status !== "success") {
    return (
      <Layout direction={"column"}>
        <Flex justifyContent="center" alignItems="center">
          <Spinner color="orange.500" />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout direction={"column"}>
      <Text
        textAlign="center"
        mb="4"
        fontWeight={"bold"}
        as="h2"
        fontSize={"3xl"}
      >
        Lista de Presentes
      </Text>
      <Grid templateColumns={{ base: "100%", md: "25% 25% 25% 25%" }} gap={4}>
        {gifts.list.map((gift) => (
          <CardPresente key={gift.id} gift={gift} />
        ))}
      </Grid>
    </Layout>
  );
};

export default Presentes;