import { Box, Container, useDisclosure } from "@chakra-ui/react";
import Header from "./Header";
import React from "react";
import NavigatorDrawer from "./NavigatorDrawer";
import HeadTag from "./HeadTag";
const Layout = ({ children, direction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HeadTag />
      <Box bgColor={"background"} minH="100vh" height="auto">
        <Header onOpenNavDrawer={onOpen} />
        <Container
          paddingInlineStart="0"
          paddingInlineEnd="0"
          p="4"
          maxW="container.lg"
          flexDirection={direction}
        >
          {children}
        </Container>
        <NavigatorDrawer isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default Layout;
