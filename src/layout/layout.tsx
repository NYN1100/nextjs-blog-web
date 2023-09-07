import React from "react";
import { LaoyoutProps } from "./layout.props";
import { Footer, Navbar } from "@/components";
import { Box } from "@mui/system";
const Layout = ({ children }: LaoyoutProps): JSX.Element => {
  return (
    <>
      <Navbar></Navbar>
      <Box minHeight={"90vh"}>{children}</Box>
      <Footer></Footer>
    </>
  );
};

export default Layout;
