import { Box, Text } from "@chakra-ui/react";

const FailScreen = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text as="h1">Erro!</Text>
      <Text as="h2">Atualize a página e tente novamente</Text>
    </Box>
  );
};

export default FailScreen;
