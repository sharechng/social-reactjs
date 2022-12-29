import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

import {} from "react-feather";
const useStyles = makeStyles((theme) => ({
  infoBox: {
    [theme.breakpoints.down("sm")]: {
      "& .box1": {
        order: 2,
      },
      "& .box2": {
        order: 1,
      },
    },
  },
  name: {
    color: theme.palette.primary.main,
  },
}));
export default function Info() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className="sectionPadding">
      <Box className={classes.infoBox}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} className="box1" data-aos="fade-up">
            <Typography variant="h5" gutterBottom></Typography>
            <Typography variant="h5" paragraph>
              Popular Crypto Revolution begins from here & support.
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio aperiam beatae, possimus quisquam id eos culpa quam
              earum repellendus architecto fugit minus soluta molestiae corporis
              cupiditate recusandae eveniet fugiat. Eius Lorem ipsum dolor sit,
              amet consectetur adipisicing elit.
            </Typography>
            <Typography paragraph>
              Mining should be fair & easy! We do not allow ASICs on our
              network. The development team is wholly committed to keeping it
              that way. Mining should be fair & easy. minus soluta molestiae
              corporis cupiditate recusandae eveniet fugiat. Eius Lorem ipsum
              dolor sit, amet consectetur adipisicing elit.
            </Typography>
            <Typography>
              minus soluta molestiae corporis cupiditate recusandae eveniet
              fugiat. Eius Lorem ipsum dolor sit, amet consectetur adipisicing
              elit.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className="box2"
            data-aos="fade-up"
            className="text-center"
          >
            <img
              src="images/ico.png"
              alt=""
              width="100%"
              className="hoverimage"
              style={{ maxWidth: "300px" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={8}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            data-aos="fade-up"
            data-aos-delay={200}
            className="text-center"
          >
            <img
              src="images/ico.png"
              alt=""
              width="100%"
              className="hoverimage"
              style={{ maxWidth: "300px" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <Typography variant="h5" gutterBottom></Typography>
            <Typography variant="h5" paragraph>
              Efficient computing services and blockchain features.
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio aperiam beatae, possimus quisquam id eos culpa quam
              earum repellendus architecto fugit minus soluta molestiae corporis
              cupiditate recusandae eveniet fugiat. Eius Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Blanditiis omnis et velit porro
              totam voluptas ex neque, deleniti inventore nesciunt quas atque
              provident a dicta quaerat! Repudiandae sunt harum error.
            </Typography>
            <Typography>
              Mining should be fair & easy! We do not allow ASICs on our
              network. The development team is wholly committed to keeping it
              that way. Mining should be fair & easy.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
