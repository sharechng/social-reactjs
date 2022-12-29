import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import BundlesCard from "src/component/BundlesCard";
import Auction from "../Auction/Auction";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import Subscriber from "../Dashboard/Subscriber/Subscriber";
import NoDataFound from "src/component/NoDataFound";
import MyPost from "src/component/MyPost";
import TransactionData from "src/component/TransactionData";
import MyBoughtPost from "src/component/MyBoughtPost";
import DataLoading from "src/component/DataLoading";
import MyPostPromotion from "../Promotion/MyPostPromotion";
import SuscriberProfile from "../Dashboard/Subscriber/SubscriberProfile";
import SubscriptionProfile from "../Dashboard/Subscriber/SubscriptionProfile";


import MyAuctionCard from "src/component/MyAuctionCard";
import { useHistory } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .topcontent": {
      padding: "25px 0px",
      [theme.breakpoints.down("xs")]: {
        padding: "10px",
      },
      "& . rightselector": {
        display: "flex",
        alignItems: "center",
      },
    },
    "& .topbox": {
      padding: "25px 0px",
    },
    "& .filter": {
      "& .checkdata": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& p": {
          marginLeft: "5px",
        },
      },
    },
    "& .basebox": {
      marginTop: "15px",
    },
  },
  rightselector: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      fontSize: "24px",
      margin: "0px 15px",
    },
  },
}));

function Bundles() {
  const classes = useStyles();
  const history = useHistory()
  const [mycollectionList, setMycollectionList] = useState();
  const [myAuctionList, setMyAuctionList] = useState();
  const [dataList, setDataList] = useState([]);
  const [mySubscribers, setMySubscribers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tabview, setTabView] = useState("collection");
  const [boughtList, setBoughtPostList] = useState([]);
  const [myBoughtAuctionList, setMyBoughtAuctionList] = useState([]);
  const [tagPostList, setTagPost] = useState([]);
  const [myPromotionDataList, setMyPromotionDataList] = useState();

  const myCollection = async () => {
    // setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.myCollectionList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setMycollectionList(res.data.result.docs);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMycollectionList([]);
    }
  };

  const myAuction = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.myAuctionList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setMyAuctionList(res.data.result.docs);
      }
    } catch (error) {
      setMyAuctionList([]);
    }
  };

  const myCollectionSubscription = async () => {
    // setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.collectionSubscriptionList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setMySubscribers(res.data.result);
      }
    } catch (error) {
      setMySubscribers([]);
      if (error.response) {
      } else {
        toast.error(error?.response?.data?.responseMessage);
      }
      toast.error(error?.res?.data?.responseMessage);
      setIsLoading(false);
    }
  };

  const listPublicExclusiveHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.postList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setDataList(res.data.result.docs);
      }
    } catch (error) {
      setDataList([]);
    }
  };

  const buyPostList = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.buypostList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setBoughtPostList(res.data.result.docs);
      }
    } catch (error) {
      setBoughtPostList([]);
    }
  };

  const myBoughtAuction = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.buyAuctionList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setMyBoughtAuctionList(res.data.result.docs);
      }
    } catch (error) {
      setMyBoughtAuctionList([]);
    }
  };

  const listTagPostHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.tagPostlist,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setTagPost(res.data.result.docs);
      }
    } catch (error) {
      setTagPost([]);
    }
  };


  const MyPostPromotionList = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.myPostPromotionList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setMyPromotionDataList(res.data.result.docs);
      }
    } catch (error) {
      setMyPromotionDataList([]);
    }
  };

  useEffect(() => {
    fetchAllData();
    myBoughtAuction();
  }, []);

  const fetchAllData = () => {
    buyPostList();
    listPublicExclusiveHandler();
    myCollectionSubscription();
    myAuction();
    myCollection();
    listTagPostHandler();
    MyPostPromotionList();
  };

  return (
    <>
      <Box className={classes.root}>
        <Box style={{ display: "flex", justifyContent: "end" }}>

          <Button
            variant="outlined"
            color="secandary"

            onClick={() => history.push("/transaction-history")}
            style={{ marginBottom: "8px", background: "#373636", borderRadius: "10px", padding: "10px 10px" }}
          >
            <BsClockHistory />
            &nbsp;Transaction History
          </Button>
        </Box>
        <Box className='topcontent'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={8} lg={8}>
              <Typography variant='h5' color='primary.main'>
                {tabview === "collection" ? "My Collections" : ""}
                {tabview === "subscription" ? "My Subscription" : ""}
                {tabview === "Feed" ? " My Post" : ""}
                {tabview === "Auction" ? " My Auctions" : ""}
                {/* {tabview === "Bid" ? "  My Bids" : ""} */}
                {/* {tabview === "UserSubscibers" ? " User Subscribers" : ""} */}
                {tabview === "Mysubscriptioncollection"
                  ? "My Subscribers Collection"
                  : ""}
                {/* {tabview === "SupporterList" ? " Supporter List" : ""} */}
                {tabview === "MyPromotionPost" ? " My Post Promotion" : ""}
                {/* {tabview === "SoldAuction" ? "Sold Auctions NFT" : ""} */}
                {/* {tabview === "BoughtAuction" ? "Bought Auctions NFT" : ""} */}
                {tabview === "TransactionHistory" ? "Wallet Transaction " : ""}
                {tabview === "boughtPostList" ? " My Bought Post" : ""}
                {tabview === "boughtAuctionList" ? " My Bought Auction" : ""}

                {tabview === "tagPostlist" ? " Tag Post List" : ""}
                {/* {tabview === "WalletTransaction" ? " Wallet Transaction" : ""} */}

                {/* {tabview === "MyBoughtAuction" ? "  My Bought" : ""} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} align='right'>
              <Box className={classes.rightselector}>
                <Select
                  name='addressAttachmentType'
                  labelId='label'
                  id='select'
                  fullWidth
                  value={tabview}
                  onChange={(e) => setTabView(e.target.value)}
                >
                  <MenuItem
                    value='collection'
                    className={tabview === "collection" ? "active" : ""}
                  >
                    My Collections
                  </MenuItem>
                  <MenuItem
                    value='subscription'
                    className={tabview === "subscription" ? "active" : ""}
                  >
                    My Subscription
                  </MenuItem>
                  <MenuItem
                    value='tagPostlist'
                    className={tabview === "tagPostlist" ? "active" : ""}
                  >
                    Tag Post List
                  </MenuItem>
                  <MenuItem
                    value='Feed'
                    className={tabview === "Feed" ? "active" : ""}
                  >
                    My Post
                  </MenuItem>
                  <MenuItem
                    value='boughtPostList'
                    className={tabview === "boughtPostList" ? "active" : ""}
                  >
                    Own Bought Post
                  </MenuItem>
                  <MenuItem
                    value='boughtAuctionList'
                    className={tabview === "boughtAuctionList" ? "active" : ""}
                  >
                    Own Bought Auction
                  </MenuItem>
                  <MenuItem
                    value='Auction'
                    className={tabview === "Auction" ? "active" : ""}
                  >
                    My Auctions
                  </MenuItem>
                  {/* <MenuItem
                    value="Bid"
                    className={tabview === "Bid" ? "active" : ""}
                  >
                    My Bids
                  </MenuItem> */}
                  {/* <MenuItem
                    value="UserSubscibers"
                    className={tabview === "UserSubscibers" ? "active" : ""}
                  >
                    User Subscribers
                  </MenuItem> */}
                  {/* <MenuItem
                    value="Mysubscriptioncollection"
                    className={
                      tabview === "Mysubscriptioncollection" ? "active" : ""
                    }
                  >
                    My Subscribers Collection
                  </MenuItem> */}
                  {/* <MenuItem
                    value="SupporterList"
                    className={tabview === "SupporterList" ? "active" : ""}
                  >
                    Supporter List
                  </MenuItem> */}
                  {/* <MenuItem
                    value="SoldAuction"
                    className={tabview === "SoldAuction" ? "active" : ""}
                  >
                    Sold Auctions NFT
                  </MenuItem> */}
                  {/* <MenuItem
                    value="BoughtAuction"
                    className={tabview === "BoughtAuction" ? "active" : ""}
                  >
                    Bought Auctions NFT
                  </MenuItem> */}
                  <MenuItem
                    value='TransactionHistory'
                    className={tabview === "TransactionHistory" ? "active" : ""}
                  >
                    Wallet Transaction
                  </MenuItem>
                  <MenuItem
                    value='MyPromotionPost'
                    className={tabview === "MyPromotionPost" ? "active" : ""}
                  >
                    My Post Promotion
                  </MenuItem>
                  {/* <MenuItem
                    value="WalletTransaction"
                    className={tabview === "walletTransaction" ? "active" : ""}
                  >
                    Wallet Transaction
                  </MenuItem> */}
                </Select>
                {/* <IconButton onClick={() => setOpen(!open)}>
                  <FilterListIcon />
                </IconButton> */}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className='basebox'>
          <Grid container spacing={2}>
            {isLoading && <DataLoading />}

            {tabview === "tagPostlist" && (
              <>
                {tagPostList &&
                  tagPostList.map((data, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MyPost
                          data={data}
                          type='card'
                          key={index}
                          index={index}
                          listPublicExclusiveHandler={listTagPostHandler}
                        />
                      </Grid>
                    );
                  })}
                {tagPostList && tagPostList.length === 0 && <NoDataFound />}
              </>
            )}

            {tabview === "collection" && (
              <>
                {mycollectionList &&
                  mycollectionList.map((data, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <BundlesCard
                          data={data}
                          type='card'
                          key={i}
                          calBackFunc={fetchAllData}
                        />
                      </Grid>
                    );
                  })}
                {mycollectionList && mycollectionList.length === 0 && (
                  <NoDataFound />
                )}
              </>
            )}
            {tabview === "Auction" && (
              //   <Auction
              //   myAuctionList={myAuctionList}
              //   type="card"
              //   // key={i}
              //   calBackFunc={fetchAllData}
              // />
              <Grid container spacing={2}>
                {myAuctionList &&
                  myAuctionList.map((data, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MyAuctionCard
                          data={data}
                          type='card'
                          key={i}
                          myAuction={myAuction}
                          calBackFunc={fetchAllData}
                        />
                      </Grid>
                    );
                  })}
                {myAuctionList && myAuctionList.length === 0 && <NoDataFound />}
              </Grid>
            )}
            {tabview === "boughtAuctionList" && (
              //   <Auction
              //   myAuctionList={myAuctionList}
              //   type="card"
              //   // key={i}
              //   calBackFunc={fetchAllData}
              // />
              <Grid container spacing={2}>
                {myBoughtAuctionList &&
                  myBoughtAuctionList.map((data, i) => {
                    console.log("myBoughtAuctionList----", myBoughtAuctionList);
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MyBoughtPost
                          buyPostList={myBoughtAuction}
                          data={data}
                          type='card'
                          key={i}
                          isAuction={true}
                        />
                      </Grid>
                    );
                  })}
                {myBoughtAuctionList && myBoughtAuctionList.length === 0 && (
                  <NoDataFound />
                )}
              </Grid>
            )}
            {tabview === "subscription" && (
              <Grid container spacing={2}>
                {mySubscribers &&
                  mySubscribers?.map((data, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SubscriptionProfile calBackFunc={myCollectionSubscription} data={data} type='card' key={i} />
                      </Grid>
                    );
                  })}
                {mySubscribers && mySubscribers?.length === 0 && (
                  <NoDataFound />
                )}
              </Grid>
            )}
            {tabview === "Feed" && (
              <Grid container spacing={2}>
                {dataList &&
                  dataList.map((data, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MyPost
                          listPublicExclusiveHandler={
                            listPublicExclusiveHandler
                          }
                          data={data}
                          type='card'
                          key={i}
                        />
                      </Grid>
                    );
                  })}
                {dataList && dataList.length === 0 && <NoDataFound />}
              </Grid>
            )}
            {tabview === "MyPromotionPost" && (
              <Grid container spacing={2}>
                {myPromotionDataList &&
                  myPromotionDataList.map((data, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MyPostPromotion
                          data={data}
                          type='card'
                          key={i}
                          MyPostPromotionList={MyPostPromotionList}
                        />
                      </Grid>
                    );
                  })}
                {myPromotionDataList && myPromotionDataList.length === 0 && (
                  <NoDataFound />
                )}
              </Grid>
            )}
            {tabview === "boughtPostList" && (
              <Grid container spacing={2}>
                {boughtList &&
                  boughtList?.map((data, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MyBoughtPost
                          buyPostList={buyPostList}
                          data={data}
                          type='card'
                          key={i}
                        />
                      </Grid>
                    );
                  })}
                {boughtList && boughtList?.length === 0 && <NoDataFound />}
              </Grid>
            )}
            {tabview === "TransactionHistory" && (
              <Box style={{ width: "100%" }}>
                <TransactionData type='card' />
              </Box>
            )}
          </Grid>
        </Box>
        {/* {tabview === "Mysubscriptioncollection" ? <Auction /> : ""} */}

        {/* {tabview === "Auction" ? <Auction /> : ""} */}

        {/* {tabview === "Bid" ? <Auction /> : ""}
        {tabview === "UserSubscibers" ? <Auction /> : ""}
        {tabview === "SupporterList" ? <Auction /> : ""}
        {tabview === "SoldAuction" ? <Auction /> : ""}
        {tabview === "BoughtAuction" ? <Auction /> : ""} */}
      </Box>
    </>
  );
}
export default Bundles;
