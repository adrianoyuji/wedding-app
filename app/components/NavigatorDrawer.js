import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import routes from "../common/navigation.json";

const DBDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={onClose} />
        <DrawerHeader>Menu de Navegação</DrawerHeader>

        <DrawerBody>
          <Flex as="nav" direction="column">
            {routes.map((route) => (
              <Link href={route.href} key={route.label} passHref>
                <Text
                  as="a"
                  onClick={onClose}
                  my="1"
                  color="black"
                  fontWeight="bold"
                >
                  {route.label}
                </Text>
              </Link>
            ))}
          </Flex>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default React.memo(DBDrawer);
