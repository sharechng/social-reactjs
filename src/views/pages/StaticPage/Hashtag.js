import React, { useEffect, useState } from "react";
import { Box, makeStyles, Button, Typography, Grid } from "@material-ui/core";
import HashtagPost from "./HashtagPost";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import NoDataFound from "src/component/NoDataFound";
import { useHistory, useLocation } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";

const useStyles = makeStyles((theme) => ({
  imagebox: {
    "& .figure": {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      overflow: "hidden",
    },
  },
  Post: {
    "& h5": {
      fontSize: "14px",
      marginBottom: "5px",
    },
  },
  hashtagImage: {
    "& .postImg": {
      width: "100%",
      margin: "16px 0",
      borderRadius: "20px",
      backgroundColor: "#000",
      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        margin: "5px 0",
        borderRadius: "10px",
      },
      "& img": {
        width: "100%",
        maxHeight: "380px",
        objectFit: "cover",
      },
    },
  },
}));

export default function Hashtag() {
  const classes = useStyles();
  const location = useLocation();

  //   const isVideo = data?.mediaUrl.includes(".mp4");
  const [dataList, setDataList] = useState([]);
  const [itagName, setIdd] = useState();
  const [loader, setLoader] = useState(true);

  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const listPublicExclusiveHandler = async () => {
    // setLoader(true)
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.postListByHashTag,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          search: itagName,
          limit: 10,
          page: page,
        },
      });
      if (res.data.responseCode === 200) {
        setLoader(false);

        setDataList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
    } catch (error) {
      setLoader(false);

      setDataList([]);
    }
  };
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
    if (location.search.substring(1, location.search.length)) {
      listPublicExclusiveHandler();
    }
  }, [location.search, itagName]);

  return (
    <>
      <Box
        mt={4}
        style={{ display: "flex", justifyContent: "center", color: "white" }}
      >
        <Typography variant="h2">Tag Posts</Typography>
        {/* <Box className={classes.imagebox}>
          <figure>
            <img src="./images/Might.png" />
          </figure>
        </Box>
        <Box className={classes.Post}>
          <Typography variant="h5">12M Post</Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"

            // onClick={() => {
            //   setOpen3(false);
            // }}
            // disabled={isLoading}
          >
            Folllow
          </Button>
          &nbsp;
          <Typography variant="h6" color="textSecondary">
            See a few Top Post each week
          </Typography>
        </Box> */}
      </Box>
      <Box mt={4}>
        {loader ? (
          <DataLoading />
        ) : (
          <>
            {dataList && dataList?.length > 0 ? (
              <Grid container spacing={2}>
                {dataList &&
                  dataList?.map((data, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <HashtagPost
                          listPublicExclusiveHandler={
                            listPublicExclusiveHandler
                          }
                          data={data}
                          type="card"
                          key={i}
                        />
                      </Grid>
                    );
                  })}
                {/* {dataList && dataList?.length === 0 && <NoDataFound />} */}
              </Grid>
            ) : (
              <NoDataFound />
            )}
          </>
        )}

        {dataList && dataList?.length >=10 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
