import React from "react";
import Layout from "../../app/components/Layout";
import { Text, Button } from "@chakra-ui/react";

const Informacoes = () => {
  return (
    <Layout>
      <Text
        textAlign="center"
        mb="4"
        fontWeight={"bold"}
        as="h2"
        fontSize={"3xl"}
      >
        Informações do evento
      </Text>
      <Text as="p">
        <b>Local:</b> Espaço Buritis
      </Text>
      <Text as="p">
        <b>Endereço:</b> BR-163 - São Pedro, Dourados - MS, 79804-970
      </Text>
      <Text as="p">
        <b>Data:</b> Sábado, 08 de Outubro de 2022
      </Text>
      <Text as="p">
        <b>Horário:</b> 18h00
      </Text>
      <Button
        mt="8"
        as="a"
        colorScheme={"orange"}
        href="https://www.google.com/maps/dir//espa%C3%A7o+buritis+dourados/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x94890719c8232d09:0x84549dcf15d32f0f?sa=X&ved=2ahUKEwiGk4XC4oD6AhVKrpUCHbk2DF8Q9Rd6BAhJEAU"
      >
        Abrir no Google Maps
      </Button>
      <Text as="p" mt="16">
        Lembre-se de confirmar a presença no link que recebeu dos noivos!
      </Text>
    </Layout>
  );
};

export default Informacoes;
