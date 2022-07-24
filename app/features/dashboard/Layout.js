import { Box, Container, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/User/slice";
import HeadTag from "../../components/HeadTag";
import Drawer from "./Drawer";
import Header from "./Header";

const Layout = ({ children }) => {
  const user = useSelector(selectUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.authenticated) router.replace("/");
  }, [user]);

  return (
    <>
      <HeadTag />
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
