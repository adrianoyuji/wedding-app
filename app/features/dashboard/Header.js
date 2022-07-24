import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/User/slice";

const DashboardHeader = ({ onOpenDrawer }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogoutClick = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <Box as="header" bgColor="primary" p="4">
      <Container
        maxW="container.lg"
        paddingInlineStart="0"
        paddingInlineEnd="0"
      >
        <Flex as="nav" direction="row" justifyContent={"space-between"}>
          <Button leftIcon={<HamburgerIcon />} onClick={onOpenDrawer}>
            Menu
          </Button>
          <Button colorScheme="red" onClick={handleLogoutClick}>
            Sair
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default DashboardHeader;
