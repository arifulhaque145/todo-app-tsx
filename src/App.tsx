import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import Home from "./Pages/Home";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Home />
  </ChakraProvider>
);
