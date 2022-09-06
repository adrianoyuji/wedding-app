import { Box, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import HeadTag from "./HeadTag";
import NavigatorDrawer from "./NavigatorDrawer";
const HomePageLayout = ({ children, direction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HeadTag />
      <Box bgColor={"background"} minH="100vh" height="auto">
        <Header onOpenNavDrawer={onOpen} />
        {children}
        <NavigatorDrawer isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default HomePageLayout;
