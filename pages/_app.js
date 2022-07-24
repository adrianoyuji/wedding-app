import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../store/store";
import theme from "../app/styles/theme";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
