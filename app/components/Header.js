import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import navList from "../common/navigation.json";
const Header = () => {
  return (
    <Box as="header" bgColor="primary" p="4">
      <Container
        maxW="container.lg"
        paddingInlineStart="0"
        paddingInlineEnd="0"
      >
        <Flex as="nav" direction="row" justifyContent={"space-around"}>
          {navList.map((navItem) => (
            <Link href={navItem.href} key={navItem.label} passHref>
              <Text color="gray.50" fontWeight="bold" as="a">
                {navItem.label}
              </Text>
            </Link>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
