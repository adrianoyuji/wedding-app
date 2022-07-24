import { Box, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Header from "./Header";
import { useDisclosure } from "@chakra-ui/react";
import Drawer from "./Drawer";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/User/slice";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const user = useSelector(selectUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.authenticated) router.replace("/");
  }, [user]);

  return (
    <>
      <Header onOpenDrawer={onOpen} />
      <Box p="4">
        <Container
          maxW="container.lg"
          paddingInlineStart="0"
          paddingInlineEnd="0"
        >
          {children}
        </Container>
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Layout;
