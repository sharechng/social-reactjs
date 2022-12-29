import {
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  Typography,
} from "@material-ui/core";

import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";

import axios from "axios";

import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import moment from "moment";

import Apiconfigs from "src/ApiConfig/ApiConfig";
import { tokenName } from "src/utils";
const useStyles = makeStyles((theme) => ({
  root2: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:420px)": {
      display: "block",
    },
  },
  heading: {
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      // color: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  tablesection: {
    "& td": {
      color: "#fff",
    },
  },
  colorbox: {
    borderRadius: "15px",
    // padding: "20px",
  },
  main: {
    padding: "15px",
    "& .content": {
      backgroundColor: "#101010",
      // width: "100%",
      padding: "15px",
      "& .heading": {
        paddingBottom: "15px",
      },
    },
  },
  cell: {
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export default function CreatorList() {
  const history = useHistory();
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [network, setNetwork] = useState({
    name: "select",
  });
  const [feeListTable, setFeeListTable] = useState("");

  const Tabledata = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.feeList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setFeeListTable(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Tabledata();
  }, [page]);

  return (
    <Box>
      <Box className={classes.colorbox} mt={2}>
        <Box className={classes.main}>
          <Box className="content">
            {isLoading ? (
              <DataLoading />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead component={Paper} className="headingcell">
                    <TableRow>
                      <TableCell align="Center" className={classes.cell}>
                        S.No.
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Status
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        UserId
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Amount
                      </TableCell>

                      <TableCell align="Center" className={classes.cell}>
                        Type
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Created
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Updated
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Updated
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {feeListTable?.map((data, i) => {
                    return (
                      <TableBody key={i}>
                        <TableRow className={classes.tbody}>
                          <TableCell align="Center" component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          <TableCell align="Center">{data?.status}</TableCell>
                          <TableCell align="Center">{data?._id}</TableCell>
                          <TableCell align="Center">
                            {data?.amount}&nbsp;
                            {tokenName}
                          </TableCell>
                          <TableCell align="Center">{data?.type}</TableCell>
                          <TableCell align="Center">
                            {moment(data?.createdAt).local().fromNow()}
                          </TableCell>
                          <TableCell align="Center">
                            {moment(data?.updatedAt).local().fromNow()}
                          </TableCell>
                          <TableCell align="Center">{data?.__v}</TableCell>
                        </TableRow>
                      </TableBody>
                    );
                  })}
                </Table>
              </TableContainer>
            )}
            {!isLoading && feeListTable && feeListTable.length === 0 && (
              <NoDataFound />
            )}

            {feeListTable && feeListTable.length >= 10 && (
              <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
