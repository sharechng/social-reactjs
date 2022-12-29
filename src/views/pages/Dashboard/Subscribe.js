import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SubscribeCard from "src/component/SubscribeCard";
import { Grid, makeStyles, Paper, Box } from "@material-ui/core";
import ApiConfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";

import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 0",
    height: "auto",
  },
}));

function Story(props) {
  const classes = useStyles();
  const [collectionlistAll, setCollectionlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const collectionList = async () => {
    // setIsLoading(true)
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.listCollection,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (response.data.responseCode === 200) {
        setCollectionlist(response.data.result.docs);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    collectionList();
  }, []);

  const settings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: false,
    centerMode: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          arrows: false,
          autoplay: false,
          centerMode: false,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          arrows: false,
          autoplay: false,
          centerMode: false,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          arrows: false,
          autoplay: false,
          centerMode: false,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Box style={{ position: "relative", width: "100%" }}>
          {collectionlistAll.length >= 3 ? (
            <Slider {...settings}>
              {collectionlistAll &&
                collectionlistAll.map((data, i) => {
                  return (
                    <SubscribeCard
                      calBackFunc={collectionList}
                      data={data}
                      type="card"
                      key={i}
                    />
                  );
                })}{" "}
              {/* {isLoading && <ButtonCircularProgress />} */}
            </Slider>
          ) : (
            <Grid container spacing={2}>
              {collectionlistAll &&
                collectionlistAll.map((data, i) => {
                  return (
                    <Grid item lg={4} xs={12} sm={4} md={4}>
                      <SubscribeCard
                        calBackFunc={collectionList}
                        data={data}
                        type="card"
                        key={i}
                      />
                    </Grid>
                  );
                })}{" "}
              {isLoading && <ButtonCircularProgress />}
            </Grid>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default Story;
