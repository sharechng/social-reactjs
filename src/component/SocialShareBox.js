import React from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  InstapaperShareButton,
} from "react-share";

import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
const useStyles = makeStyles((theme) => ({
  sharemodal: {
    "& button": {
      textAlign: "center",
      "& svg": {
        fontSize: "25px",
      },
    },
  },
}));
export default function SocialShareBox({ url }) {
  const classes = useStyles();
  return (
    <Box className={classes.sharemodal} align='center' mt={3} mb={2}>
      <FacebookShareButton url={url} target='_blank'>
        <Button>
          <Box>
            <BsFacebook /> <br />
            Facebook
          </Box>
        </Button>
      </FacebookShareButton>
      <InstapaperShareButton url={url} title={`frontend`} description=''>
        <Button>
          <Box>
            <AiFillInstagram /> <br />
            Instagram
          </Box>
        </Button>
      </InstapaperShareButton>
      <TelegramShareButton
        url={url}
        title={"CampersTribe - World is yours to explore"}
      >
        <Button>
          <Box>
            <RiSendPlaneFill /> <br />
            Telegram
          </Box>
        </Button>
      </TelegramShareButton>

      <TwitterShareButton url={url} title={`frontend`} hashtag='#camperstribe'>
        <Button>
          <Box>
            <AiFillTwitterCircle /> <br />
            Twitter
          </Box>
        </Button>
      </TwitterShareButton>
    </Box>
  );
}
