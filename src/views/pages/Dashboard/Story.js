import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import StoryCard from "src/component/StoryCard";
import { Box, makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 0",
    "& .slick-cloned": {
      display: "none",
    },
  },
}));

function Story() {
  const classes = useStyles();
  const [storyLists, setStoryList] = useState([]);
  const auth = useContext(AuthContext);
  const settings = {
    dots: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    loop: false,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const allstoryDeleteHandler = async () => {
    try {
      const res = await axios.get(ApiConfig.expiredStory, {});
      if (res.data.responseCode === 200) {
        // setAuctionList(res.data.result.docs);
        // setNoOfPages(res.data.result.pages);
      }
      //   setIsLoading(false);
    } catch (error) {
      //   setIsLoading(false);
    }
  };
  const listStory = async () => {
    await axios({
      method: "GET",
      url: ApiConfig.listFollowingUserStoryVisible,

      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then(async (response) => {
        setStoryList(
          response.data.result.following.filter((data) => data?.isStory)
        );

        if (response.data.responseCode === 200) {
          setStoryList(
            response.data.result.following.filter((data) => data?.isStory)
          );
        }
      })
      .catch((error) => {
        if (error.response) {
          // toast.error(error.response.data.responseMessage)
        } else {
        }
      });
  };
  useEffect(() => {
    allstoryDeleteHandler();
    listStory();
  }, []);
  return (
    <>
      {storyLists && storyLists.length > 0 && (
        <Paper className={classes.root} elevation={2}>
          <Slider {...settings}>
            {storyLists &&
              storyLists.map((data, i) => {
                // if (data.status !== "ACTIVE") {
                //   return;
                // }
                return (
                  <Box data={data} key={i} style={{ margin: "0 5px" }}>
                    <StoryCard
                      storyLists={storyLists}
                      data={data}
                      i={i}
                      type="card"
                    />
                  </Box>
                );
              })}
          </Slider>
        </Paper>
      )}
    </>
  );
}

export default Story;
