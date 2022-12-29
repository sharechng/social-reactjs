import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Box } from "@material-ui/core";
import PostCard from "src/component/PostCard";
import PromotedPostCard from "src/component/PromotedPostCard";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { FaLessThanEqual } from "react-icons/fa";
import { Pagination } from "@material-ui/lab";
import InfiniteScroll from "react-infinite-scroll-component";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Posts(props) {
  const [dataList, setDataList] = useState([]);
  const [isLoadingContent, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(5);
  const listPublicExclusiveHandler = async () => {
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
      if (res.data.responseCode === 200) {
        const temp = [...dataList, ...res.data.result.docs];

        setDataList(temp);

        // setscrollmessageDataCount(res.data.result.total);
        setNoOfPages(res.data.result.total);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   listPublicExclusiveHandler();
  // }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);

    // setTimeout(() => {
    //   setPage(page + 1);
    // }, 1500);
    console.log("page", page + 1);
  };

  return (
    <>
      {/* <Grid container direction={"column"} spacing={2}> */}
      <InfiniteScroll
        dataLength={dataList?.length - 1}
        next={fetchMoreData}
        hasMore={dataList?.length < noOfPages}
        // hasMore={dataList.length < 200}
        loader={
          <Box
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "end",
            }}
            ml={1}
            mr={1}
          >
            {" "}
            <ButtonCircularProgress />
          </Box>
        }
      >
        {dataList &&
          dataList?.map((data, i) => {
            return (
              <>
                {data?.type === "POST" ? (
                  <>
                    <Box mb={2}>
                      <PostCard
                        data={data}
                        type="card"
                        listPublicExclusiveHandler={listPublicExclusiveHandler}
                        key={i}
                      />
                    </Box>
                  </>
                ) : (
                  <Box mb={2}>
                    <PromotedPostCard
                      data={data}
                      type="card"
                      listPublicExclusiveHandler={listPublicExclusiveHandler}
                      key={i}
                    />
                  </Box>
                )}
              </>
            );
          })}
      </InfiniteScroll>

      {!isLoadingContent && dataList && dataList.length === 0 && (
        <Box ml={2}>Data Not Found</Box>
      )}
      {isLoadingContent && <ButtonCircularProgress />}
    </>
  );
}
export default Posts;
