import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function NoDataFound() {
  return (
    <Box align="center" mt={4} mb={5} style={{ width: "100%" }}>
      <img src="images/noresult.png" />
    </Box>
  );
}
