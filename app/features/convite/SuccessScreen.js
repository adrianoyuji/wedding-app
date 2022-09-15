import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

const SuccessScreen = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text as="h1" fontSize="3xl">
        Sucesso!
      </Text>
      <Text as="h2">
        Tudo certo, nos vemos no dia 08 de outubro para celebrarmos!
      </Text>
      <Link href="/presentes" passHref>
        <Button as="a" colorScheme="orange" mt="4">
          Lista de Presentes
        </Button>
      </Link>
      <Link href="/informacoes" passHref>
        <Button as="a" colorScheme="orange" mt="4">
          Saiba como chegar lá
        </Button>
      </Link>
    </Box>
  );
};

export default SuccessScreen;
