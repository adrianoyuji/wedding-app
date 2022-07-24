import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import React from "react";

const Layout = ({ children, direction }) => {
  return (
    <Box bgColor={"background"} minH="100vh" height="auto">
      <Header />
      <Container
        paddingInlineStart="0"
        paddingInlineEnd="0"
        p="4"
        maxW="container.lg"
        flexDirection={direction}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
