import React from "react";
import { Box, Container, Typography, makeStyles } from "@material-ui/core";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    boxShadow: "0 0 20px 3px rgb(0 0 0 / 5%)",
  },
  box: {
    padding: 20,
  },
}));
export default function CompanyRoadmap() {
  const classes = useStyles();
  const settings = {
    dots: false,
    slidesToShow: 4,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg" className="sectionPadding">
        <Box mb={10} textAlign="center">
          <Container maxWidth="sm">
            <Typography variant="h4" paragraph>
              Our Company roadmap
            </Typography>
            <Typography>
              ICO Crypto is developing a global data-driven platform for the
              world. Powered by blockchain and smart contracts.
            </Typography>
          </Container>
        </Box>
        <Box className="timeline">
          <Slider {...settings}>
            <Box className="slide">
              <div className="timeline-box">
                <Typography color="inherit">September 2019</Typography>
                <Typography variant="h5" color="inherit">
                  Research
                </Typography>
                <Typography variant="body2" color="inherit">
                  The ICO crypto team combines a passion for esports, industry
                  experise & proven record in finance, development, marketing.
                </Typography>
              </div>
            </Box>
            <Box className="slide">
              <div className="timeline-box">
                <Typography color="inherit">September 2019</Typography>
                <Typography variant="h5" color="inherit">
                  Research
                </Typography>
                <Typography variant="body2" color="inherit">
                  The ICO crypto team combines a passion for esports, industry
                  experise & proven record in finance, development, marketing.
                </Typography>
              </div>
            </Box>
            <Box className="slide">
              <div className="timeline-box">
                <Typography color="inherit">September 2019</Typography>
                <Typography variant="h5" color="inherit">
                  Research
                </Typography>
                <Typography variant="body2" color="inherit">
                  The ICO crypto team combines a passion for esports, industry
                  experise & proven record in finance, development, marketing.
                </Typography>
              </div>
            </Box>
            <Box className="slide">
              <div className="timeline-box">
                <Typography color="inherit">September 2019</Typography>
                <Typography variant="h5" color="inherit">
                  Research
                </Typography>
                <Typography variant="body2" color="inherit">
                  The ICO crypto team combines a passion for esports, industry
                  experise & proven record in finance, development, marketing.
                </Typography>
              </div>
            </Box>
            <Box className="slide">
              <div className="timeline-box">
                <Typography color="inherit">September 2019</Typography>
                <Typography variant="h5" color="inherit">
                  Research
                </Typography>
                <Typography variant="body2" color="inherit">
                  The ICO crypto team combines a passion for esports, industry
                  experise & proven record in finance, development, marketing.
                </Typography>
              </div>
            </Box>
          </Slider>
        </Box>
      </Container>
    </Box>
  );
}
