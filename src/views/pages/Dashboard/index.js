import React, { useState, useEffect, useContext } from "react";
import { Typography, Box, Grid, Hidden } from "@material-ui/core";
import Might from "./Might";
import Trending from "./Trending/Trending";
import Subscriber from "./Subscriber/Subscriber";
import Bundles from "./Bundles";
import Subscribe from "./Subscribe";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { MdArrowUpward, MdAdd, MdArrowDownward } from "react-icons/md";
import { useHistory, Link as RouterLink } from "react-router-dom";
import Posts from "./Posts";
import PostCard from "src/component/PostCard";
import Story from "./Story";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import LoadingSkeleton from "src/component/LoadingSkeleton";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import DataLoading from "src/component/DataLoading";
import { Pagination } from "@material-ui/lab";
import InfiniteScroll from "react-infinite-scroll-component";
import PromotedPostCard from "src/component/PromotedPostCard";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PageLoading from "src/component/PageLoading";

// const useStyles = makeStyles((theme) => ({
//   infiniteScroll: {},
// }));

export default function (props) {
  // const classes = useStyles();

  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const auth = useContext(AuthContext);

  const [dataList, setDataList] = useState([]);
  const [dataList1, setDataList1] = useState([]);
  // log
  const [isLoadingContent, setIsLoading] = useState(true);
  // console.log("isLoadingContent", isLoadingContent);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(5);
  const [serchTrending, setSearchTrendingUserList] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [datalistFollower, setDataListFollower] = useState([]);
  const [loadingFollower, setIsLoadingFollower] = useState(true);
  const [searchUserList, setSearchUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSerachValue] = useState(0);

  const listPublicExclusiveHandler = async () => {
    // setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listExclusivePublicpost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page,
          limit: 5,
        },
      });
      // console.log("res>>>>>>", res);
      if (res.data.responseCode === 200) {
        const temp = [...dataList, ...res.data.result.docs];
        setDataList1(temp);

        // console.log("page", temp);
        setDataList(temp);
        // setscrollmessageDataCount(res.data.result.total);
        setNoOfPages(res.data.result.total);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const listPublicExclusiveHandlerTrending = async () => {
    // setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listExclusivePublicpost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: 1,
          limit: 5 * page,
        },
      });
      // console.log("res>>>>>>", res);
      if (res.data.responseCode === 200) {
        // const temp = [...dataList, ...res.data.result.docs];
        setDataList1(res.data.result.docs);

        // console.log("page", temp);
        setDataList(res.data.result.docs);
        // setscrollmessageDataCount(res.data.result.total);
        setNoOfPages(res.data.result.total);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    listPublicExclusiveHandler();
  }, [page]);
  const fetchMoreData = () => {
    // console.log("I am here");
    setPage(page + 1);
    console.log("page", page + 1);
  };

  useEffect(() => {
    if (auth?.userData.userType === "User") {
      if (auth?.userData?.interest?.length > 0) {
        history.push("/explore");
      } else {
        history.push("/settings");
        toast.info("Please edit/update your interest first");
      }
    }
  }, [auth.userData]);



  const creatorListHandler = async () => {
    try {
      const res = await axios.get(Apiconfigs.migthtList, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (res.data.responseCode === 200) {
        if (res.data.result) {
          setLoading(false);
          setSearchUserList(
            res.data.result.mightUser?.filter(
              (data) => data.userType === "User"
            )
          );
        }
      } else {
        setLoading(false);
        setSearchUserList([]);
      }
    } catch (error) {
      setLoading(false);
      setSearchUserList([]);
    }
  };


  const trendingUserlistHandler = async () => {
    try {
      const res = await axios.get(Apiconfigs.trendingUserlist, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        if (res.data.result.docs) {
          setSearchTrendingUserList(
            res.data.result.docs
              .filter(
                (data) =>
                  data.userType === "User" && data._id !== auth.userData?._id
              )
              .slice(0, 3)
          );
          setLoadingTrending(false);
        }
      } else {
        // setSearchTrendingUserList([]);
        setLoadingTrending(false);
      }
    } catch (error) {
      setLoadingTrending(false);
      setSearchTrendingUserList([]);
    }
  };


  const listFollowerhandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listFollowerUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setDataListFollower(res.data.result.followers);
        setIsLoadingFollower(false);
      }
    } catch (error) {
      setIsLoadingFollower(false);
    }
  };

  useEffect(() => {
    creatorListHandler();
    trendingUserlistHandler();
    listFollowerhandler();
  }, []);

  const status = localStorage.getItem("status");

  return (
    <Page title="Dashboard">
      {isLoadingContent ? (
        <PageLoading />
      ) : (
        <Grid container spacing={2}>
          <Grid item md={8} lg={8} sm={12} xs={12}>
            <Box style={{ display: "flex", justifyContent: "center", }}>
              <Box className="scrollDiv" w>
                <Box mb={2}>
                  {" "}
                  <Bundles
                    listPublicExclusiveHandler={
                      listPublicExclusiveHandlerTrending
                    }
                  />
                </Box>
                <Box mb={2}>
                  <Story />
                </Box>
                <Box mb={2}>
                  <PostCard
                    data={dataList1 && dataList1[0]}
                    type="card"
                    listPublicExclusiveHandler={
                      listPublicExclusiveHandlerTrending
                    }
                  />
                  {/* {isLoadingContent && <ButtonCircularProgress />} */}
                </Box>
                <Box mb={2}>
                  <Subscribe />
                </Box>
                <Box mb={2}>
                  <InfiniteScroll
                    // className={classes.infiniteScroll}
                    dataLength={dataList?.length - 1}
                    next={fetchMoreData}
                    hasMore={dataList?.length < noOfPages}
                    // hasMore={dataList.length < 200}
                    loader={
                      status !== "BLOCK" && dataList?.length > 0 ? (
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          mb={2}
                        >
                          <ButtonCircularProgress />
                        </Box>
                      ) : (
                        ""
                      )
                    }
                  >
                    {dataList &&
                      dataList?.slice(1)?.map((data, i) => {
                        return (
                          <>
                            {data?.type === "POST" ? (
                              <>
                                <Box mb={2}>
                                  <PostCard
                                    data={data}
                                    type="card"
                                    listPublicExclusiveHandler={
                                      listPublicExclusiveHandlerTrending
                                    }
                                    key={i}
                                  />
                                </Box>
                              </>
                            ) : (
                              <Box mb={2}>
                                <PromotedPostCard
                                  data={data}
                                  type="card"
                                  listPublicExclusiveHandler={
                                    listPublicExclusiveHandlerTrending
                                  }
                                  key={i}
                                />
                              </Box>
                            )}
                          </>
                        );
                      })}
                  </InfiniteScroll>
                  {/* <Posts
                listPublicExclusiveHandler={listPublicExclusiveHandler}
                dataList={dataList}
              /> */}
                </Box>
              </Box>
            </Box>

          </Grid>



          <Hidden smDown>
            <Grid item md={4}>
              <Box style={{ display: "flex", }}>
                <Box className="scrollDiv1" >
                  <Grid container direction={"column"} spacing={2}>
                    {/* {loading ? (
                    <Box mt={2}>
                      <DataLoading />
                    </Box>
                  ) : ( */}
                    <>
                      {searchUserList &&
                        searchUserList[searchValue] !== undefined && (
                          <Grid item xs={12}>
                            <Might
                              searchValue={searchValue}
                              setSerachValue={setSerachValue}
                              searchUserList={searchUserList}
                              creatorListHandler={creatorListHandler}
                            />
                          </Grid>
                        )}
                    </>
                    {/* )} */}

                    {/* {loadingTrending ? (
                    <Box mt={2}>
                      <DataLoading />
                    </Box>
                  ) : ( */}
                    <>
                      {serchTrending && serchTrending.length > 0 && (
                        <Grid item xs={12}>
                          <Trending
                            serchTrending={serchTrending}
                            trendingUserlistHandler={trendingUserlistHandler}
                          />
                        </Grid>
                      )}
                    </>
                    {/* )} */}
                    {/* {loadingFollower ? (
                    <Box mt={2}>
                      <DataLoading />
                    </Box>
                  ) : ( */}
                    <>
                      {datalistFollower && datalistFollower.length > 0 && (
                        <Grid item xs={12}>
                          <Subscriber
                            datalistFollower={datalistFollower}
                            listFollowerhandler={listFollowerhandler}
                          />
                        </Grid>
                      )}
                    </>
                    {/* )} */}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      )}
    </Page>
  );
}
