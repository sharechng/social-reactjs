import React, { useState, useContext, useEffect } from "react";
import { Box, Paper, makeStyles } from "@material-ui/core";
import { CancelOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { toast } from "react-toastify";
import Stories, { WithSeeMore } from "react-insta-stories";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex", 
    justifyContent: "center",
    padding: "10px 0",
    "& .slick-cloned": {
      display: "none",
    },
  },
}));

const StoriesPages = (props) => {
  const { setOpenCommentBox, openCommentBoxId } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [idd, setIdd] = useState();
  const [storyData, ssetStoryData] = useState();

  const viewUserStory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.storyListWithFollowing,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          userId: openCommentBoxId,
        },
      });
      if (res.data.responseCode === 200) {
        // toast.success(res.data.responseMessage);
        ssetStoryData(
          res.data.result.map((data, i) => ({
            url: data?.story[0],
            type: data?.story[0]?.includes(".mp4") ? "video" : "image",
          }))
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
    if (openCommentBoxId) {
      viewUserStory();
    }
  }, [location.search, openCommentBoxId]);


  return (
    <Box pt={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pl={3}
        pr={3}
      >
        {/* <Typography variant="body1">ShareChing</Typography> */}
        <img src="/images/logo.png" alt="" style={{ maxWidth: "180px" }} />
        <CancelOutlined
          onClick={() => setOpenCommentBox(false)}
          style={{ cursor: "pointer", fontSize: "30px" }}
        />
      </Box>
      <Box className={classes.root} >
        {storyData && (
          <Stories
            // loop
            keyboardNavigation
            defaultInterval={5000}
            stories={storyData}
            onStoryEnd={(s, st) => console.log("story ended", s, st)}
            onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
            onStoryStart={(s, st) => console.log("story started", s, st)}
          />
        )}
      </Box>
    </Box>
  );
};

export default StoriesPages;
