import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Box, Typography, makeStyles } from "@material-ui/core";
import axios from "axios";
import { sortAddress } from "src/utils";
import { useHistory, useLocation } from "react-router-dom";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import { FiSearch } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    left: 0,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 2000,
  },
  btnfollcollectionCssow2: {
    "&:hover": {
      color: "#EC167F;",
    },
  },
}));
export default function SearchBox({
  search,
  searchIcon,
  inputRoot,
  inputInput,
}) {
  const [searchText, setSearchText] = useState("");

  const [searchResult, setSearchResult] = useState();
  const classes = useStyles();

  const [serchdata, setSerchdata] = useState("");
  const history = useHistory();
  const [searchLoading, setSearchLoading] = useState(false);

  const [searchData, setSearchData] = useState("");
  const searchTextRef = React.useRef(null);

  const searchHandler = async (cancelTokenSource) => {
    if (searchText.length > 2) {
      try {
        // setSearchLoading(true);

        const res = await axios.get(Apiconfigs.globalSearch, {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          params: {
            search: searchText,
          },
        });
        if (res.data.responseCode == 200) {
          setSearchResult(res.data.result);
          setSearchLoading(false);
        } else {
          setSearchResult();
          setSearchLoading(false);
        }
      } catch (error) {
        setSearchLoading(false);
        setSearchResult("");
      }
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (searchText) {
      searchHandler(cancelTokenSource);
    } else {
      setSearchResult();
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchText]);

  return (
    <div className={"searchField customSearch"}>
      <div className={search}>
        <TextField
          id="outlined-basic"
          // variant="outlined"
          name="Text Field"
          placeholder="Search"
          type="search"
          fullWidth
          ref={searchTextRef}
          value={searchText}
          autoFocus={true}
          style={{ border: "none" }}
          // InputProps={{
          //   startAdornment: (
          //     <FiSearch
          //       position="start"
          //       style={{ fontSize: "18px" }}
          //     />
          //   ),
          // }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      {searchResult && (
        <SearchResults
          searchResult={searchResult}
          history={history}
          setSearchText={() => setSearchText()}
          setSearchResult={() => setSearchResult()}
          searchLoading={() => searchLoading()}
        />
      )}
    </div>
  );
}

export function SearchResults({
  searchResult,
  history,
  setSearchText,
  setSearchResult,
  searchLoading,
}) {
  const classes = useStyles();

  return (
    <>
      {searchResult?.collection?.length > 0 ||
        searchResult?.user.length > 0 ||
        searchResult?.post?.length > 0 ||
        searchResult?.auctions?.length > 0 ? (
        <ul className="list-group text-dark" id="search-list">
          {searchResult?.collection?.length > 0 && (
            <>
              <Box
                className="list-group-item"
                style={{ textAlign: "left", zIndex: 999 }}
              >
                <Box display={"flex"} justifyContent="space-between">
                  <Box display={"flex"}>
                    <Typography variant="h6">Collections</Typography>
                  </Box>
                </Box>
              </Box>
              {searchResult?.collection?.map((data, i) => {
                return (
                  <li
                    // className={classes.collectionCss}
                    key={i}
                    className="list-group-item1"
                    style={{ textAlign: "left", zIndex: 999 }}
                    onClick={() => {
                      history.push({
                        pathname: "/bundles-details",
                        search: data._id,
                        state: data,
                      });
                      setSearchText();
                      setSearchResult();
                    }}
                  >
                    <Box display={"flex"} justifyContent="space-between">
                      <Box display={"flex"}>
                        <img src={data.image} alt="" />
                        <Typography> {data.name}</Typography>
                      </Box>
                    </Box>
                  </li>
                );
              })}
            </>
          )}

          {searchResult?.user.length > 0 && (
            <>
              <Box
                className="list-group-item"
                style={{ textAlign: "left", zIndex: 999 }}
              >
                <Box display={"flex"} justifyContent="space-between">
                  <Box display={"flex"}>
                    <Typography variant="h6" style={{ color: "#FFFFFF" }}>User's</Typography>
                  </Box>
                </Box>
              </Box>
              {searchResult?.user.map((data, i) => {
                return (
                  <li
                    key={i}
                    className="list-group-item"
                    style={{ textAlign: "left", zIndex: 999 }}
                    onClick={() => {
                      history.push({
                        pathname: "/about-creators",
                        search: data._id,
                      });
                      setSearchText();
                      setSearchResult();
                    }}
                  >
                    <Box display={"flex"} justifyContent="space-between">
                      <Box display={"flex"}>
                        <img
                          src={
                            data.profilePic
                              ? data.profilePic
                              : "/images/user.png"
                          }
                          alt=""
                        />
                        <Typography>
                          {" "}
                          {data?.userName
                            ? data?.userName
                            : data?.name
                              ? data?.name
                              : sortAddress(data?.walletAddress)}
                        </Typography>
                      </Box>
                    </Box>
                  </li>
                );
              })}
            </>
          )}
          {searchResult?.post?.length > 0 && (
            <>
              <Box
                className="list-group-item"
                style={{ textAlign: "left", zIndex: 999 }}
              >
                <Box display={"flex"} justifyContent="space-between">
                  <Box display={"flex"}>
                    <Typography variant="h6">Post's</Typography>
                  </Box>
                </Box>
              </Box>
              {searchResult?.post.map((data, i) => {
                return (
                  <li
                    key={i}
                    className="list-group-item"
                    style={{ textAlign: "left", zIndex: 999 }}
                    onClick={() => {
                      history.push({
                        pathname: "/details",
                        search: data._id,
                      });
                    }}
                  >
                    <Box display={"flex"} justifyContent="space-between">
                      <Box display={"flex"}>
                        <img src={data.mediaUrl} alt="" />
                        <Typography> {data.postTitle}</Typography>
                      </Box>
                    </Box>
                  </li>
                );
              })}
            </>
          )}
          {searchResult?.auctions?.length > 0 && (
            <>
              <Box
                className="list-group-item"
                style={{ textAlign: "left", zIndex: 999 }}
              >
                <Box display={"flex"} justifyContent="space-between">
                  <Box display={"flex"}>
                    <Typography variant="h6">Auctions's</Typography>
                  </Box>
                </Box>
              </Box>
              {searchResult?.auctions.map((data, i) => {
                return (
                  <li
                    key={i}
                    className="list-group-item"
                    style={{ textAlign: "left", zIndex: 999 }}
                    onClick={() => {
                      history.push({
                        pathname: "/about-auction",
                        search: data._id,
                      });
                    }}
                  >
                    <Box display={"flex"} justifyContent="space-between">
                      <Box display={"flex"}>
                        <img src={data.mediaUrl} alt="" />
                        <Typography> {data.title}</Typography>
                      </Box>
                    </Box>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      ) : (
        <ul className="list-group text-dark" id="search-list">
          <Typography variant="h4">Search result not found</Typography>
        </ul>
      )}
    </>
  );
}
