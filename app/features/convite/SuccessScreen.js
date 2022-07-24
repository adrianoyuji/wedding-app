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
      <Link href="/informacoes" passHref style={{ marginTop: "16px" }}>
        <Button as="a" colorScheme="orange">
          Saiba como chegar lá
        </Button>
      </Link>
    </Box>
  );
};

export default SuccessScreen;
