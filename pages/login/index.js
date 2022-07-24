import React, { useRef, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, selectUser } from "../../store/User/slice";
import Layout from "../../app/components/Layout";
import { useRouter } from "next/router";
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectUser);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (auth.authenticated) {
      router.push("/dashboard");
    }
  }, [auth]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(
      authenticateUser({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  return (
    <Layout>
      <Container as="form" onSubmit={handleSubmitForm}>
        <Heading color="gray.800">Login</Heading>
        <Box my="4">
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input ref={usernameRef} backgroundColor={"white"} id="username" />
        </Box>
        <Box my="4">
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input
            ref={passwordRef}
            backgroundColor={"white"}
            id="password"
            type="password"
          />
        </Box>
        {auth.status === "failed" && (
          <Text color="red.800">Senha ou Login incorretos</Text>
        )}
        <Button
          isLoading={auth.status === "loading"}
          type="submit"
          background={"primary"}
          w="100%"
          color="white"
        >
          Enviar
        </Button>
      </Container>
    </Layout>
  );
};

export default Login;
