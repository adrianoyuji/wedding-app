import {
  Box,
  Container,
  Flex,
  Text,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import Link from "next/link";
import navList from "../common/navigation.json";
const Header = ({ onOpenNavDrawer }) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box as="header" bgColor="primary" p="4">
      <Container
        maxW="container.lg"
        paddingInlineStart="0"
        paddingInlineEnd="0"
      >
        {!isLargerThan800 ? (
          <Button leftIcon={<HamburgerIcon />} onClick={onOpenNavDrawer}>
            Menu
          </Button>
        ) : (
          <Flex as="nav" direction="row" justifyContent={"space-around"}>
            {navList.map((navItem) => (
              <Link href={navItem.href} key={navItem.label} passHref>
                <Text color="gray.50" fontWeight="bold" as="a">
                  {navItem.label}
                </Text>
              </Link>
            ))}
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default Header;
