// import {
//   Typography,
//   Box,
//   Paper,
//   Grid,
//   Button,
//   TextField,
//   IconButton,
// } from "@material-ui/core";
// import React, { useState } from "react";
// import UserProfile from "./UserProfile";
// import CommentBox from "./CommentBox";
// import MultyUser from "./MultyUser";
// import SendIcon from "@material-ui/icons/Send";
// import { makeStyles } from "@material-ui/core/styles";
// import { AiOutlineHeart } from "react-icons/ai";
// import { BiCommentDots } from "react-icons/bi";
// import { RiShareForwardLine } from "react-icons/ri";
// import { withStyles } from "@material-ui/core/styles";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import MuiAccordion from "@material-ui/core/Accordion";
// import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
// import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
// // import SendIcon from "@material-ui/icons/Send";
// import { Link, useHistory } from "react-router-dom";
// import { FaEllipsisH } from "react-icons/fa";

// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// const Accordion = withStyles({
//   root: {
//     boxShadow: "none",
//     "&:not(:last-child)": {
//       borderBottom: 0,
//     },
//     "&:before": {
//       display: "none",
//     },
//     "&$expanded": {
//       margin: "0",
//     },
//   },
//   expanded: {},
// })(MuiAccordion);
// const AccordionSummary = withStyles({
//   root: {
//     marginBottom: -1,
//     minHeight: "auto",
//     "&$expanded": {
//       minHeight: "auto",
//     },
//   },
//   content: {
//     margin: "0px 0 ",
//     justifyContent: "center",
//     "&$expanded": {
//       margin: "0px 0 ",
//     },
//   },
//   expanded: {},
// })(MuiAccordionSummary);
// const AccordionDetails = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//     [theme.breakpoints.down("xs")]: {
//       padding: "10px 0 !important",
//     },
//   },
// }))(MuiAccordionDetails);
// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     "&:focus": {
//       backgroundColor: theme.palette.primary.main,
//       "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
//         color: theme.palette.common.white,
//       },
//     },
//   },
// }))(MenuItem);
// const StyledMenu = withStyles({
//   paper: {
//     border: "1px solid #484849 !important",
//     backgroundColor: "#101010 !important",
//     minWidth: "120px !important",
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "center",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "center",
//     }}
//     {...props}
//   />
// ));
// const useStyles = makeStyles((theme) => ({
//   PostBox: {
//     backgroundColor: "theme",
//     position: "relative",
//     padding: "25px",

//     [theme.breakpoints.down("xs")]: {
//       padding: "10px",
//     },
//     "& p": {
//       [theme.breakpoints.down("xs")]: {
//         fontSize: "12px",
//       },
//     },
//     "& .price": {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       "& .text": {
//         display: "flex",
//         alignItems: "center",
//         "& h6": {
//           fontWeight: "700",
//         },
//       },
//     },
//     "& .postImg": {
//       width: "100%",
//       margin: "16px 0",
//       borderRadius: "20px",

//       overflow: "hidden",
//       [theme.breakpoints.down("xs")]: {
//         margin: "5px 0",
//         borderRadius: "10px",
//       },
//       "& img": {
//         width: "100%",
//         maxHeight: "380px",
//       },
//     },
//     "& label": {
//       color: "#BFBFBF",
//       [theme.breakpoints.down("xs")]: {
//         fontSize: "10px",
//       },
//     },
//     "& .commentBox": {
//       borderTop: "0.5px solid #737373",
//       borderBottom: "0.5px solid #737373",
//       marginTop: "16px",
//       padding: "5px 0",
//       [theme.breakpoints.down("xs")]: {
//         padding: "0px 0",
//         marginTop: "10px",
//       },
//       "& button": {
//         [theme.breakpoints.down("xs")]: {
//           fontSize: "10px !important",
//         },
//         "& svg": {
//           fontSize: "20px",
//           marginRight: "5px",
//           [theme.breakpoints.down("xs")]: {
//             fontSize: "15px",
//           },
//         },
//       },
//     },
//     "& .searchaddress": {
//       paddingTop: "16px",
//       "& .figure": {
//         margin: "0",
//         marginRight: "15px",
//         position: "relative",
//         "& .profileimage": {
//           height: "50px",
//           width: "50px",
//           borderRadius: "50%",
//           overflow: "hidden",
//           backgroundColor: "#101010",
//           [theme.breakpoints.down("xs")]: {
//             height: "30px",
//             width: "30px",
//           },
//           "& img": {
//             width: "auto",
//             maxWidth: "100%",
//             maxHeight: "50px",
//             [theme.breakpoints.down("xs")]: {
//               maxHeight: "30px",
//             },
//           },
//         },
//       },
//       "& button": {
//         backgroundColor: "#373636",
//         height: "48px",
//         borderRadius: "5px",
//         [theme.breakpoints.down("xs")]: {
//           height: "30px",
//           "& svg": {
//             fontSize: "16px",
//           },
//         },
//       },
//     },
//     "& .UserBox": {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "16px",
//       [theme.breakpoints.down("xs")]: {
//         marginBottom: "10px",
//       },
//       "& a": {
//         textDecoration: "none",
//         "& h6": {
//           fontWeight: "600",
//           color: "#fff",
//           [theme.breakpoints.down("xs")]: {
//             fontSize: "12px",
//           },
//         },
//       },
//       "& small": {
//         color: "#BFBFBF",
//         [theme.breakpoints.down("xs")]: {
//           fontSize: "10px",
//         },
//       },
//       "& figure": {
//         margin: "0",
//         marginRight: "15px",
//         height: "60px",
//         width: "60px",
//         borderRadius: "50%",
//         overflow: "hidden",
//         backgroundColor: "#101010",
//         [theme.breakpoints.down("xs")]: {
//           height: "40px",
//           width: "40px",
//         },
//         "& img": {
//           width: "auto",
//           maxWidth: "100%",
//           maxHeight: "60px",
//           [theme.breakpoints.down("xs")]: {
//             maxHeight: "40px",
//           },
//         },
//       },
//     },
//   },
//   menuShare: {
//     position: "absolute",
//     right: "16px",
//     top: "16px",
//     [theme.breakpoints.down("xs")]: {
//       right: "0px",
//       top: "0px",
//     },
//   },

//   sharemodal: {
//     "& button": {
//       textAlign: "center",
//       "& svg": {
//         fontSize: "25px",
//       },
//     },
//   },

//   cancelBtn: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//   },
// }));

// export default function LoadingSkeleton(props) {
//   const classes = useStyles();

//   return (
//     <Paper>
//       <Box className={classes.PostBox}>
//         <IconButton
//           aria-controls="customized-menu"
//           aria-haspopup="true"
//           className={classes.menuShare}
//         >
//           <FaEllipsisH />
//         </IconButton>
//         <StyledMenu id="customized-menu" keepMounted>
//           <StyledMenuItem>
//             <ListItemText primary="Share" />
//           </StyledMenuItem>
//           <StyledMenuItem>
//             <ListItemText primary="Hide" />
//           </StyledMenuItem>
//           <StyledMenuItem>
//             <ListItemText primary="Report" />
//           </StyledMenuItem>
//         </StyledMenu>
//         <Box className="UserBox">
//           <figure>
//             {/* <img src={""} /> */}
//             <SkeletonTheme baseColor="#202020" highlightColor="#444">
//               <Skeleton count={3} />
//             </SkeletonTheme>
//           </figure>
//           <Box>
//             <Link to="#">
//               {" "}
//               <Typography variant="h6">
//                 <Skeleton count={1} />
//               </Typography>
//             </Link>
//             <Typography variant="body2" component="small">
//               <Skeleton count={1} />
//             </Typography>
//           </Box>
//         </Box>
//         <Typography variant="body2">{""}</Typography>
//         <Box mt={1} mb={1} className="price">
//           <Box className="text">
//             <Typography variant="h6" color="secondary.main">
//               Price :
//             </Typography>
//             &nbsp;&nbsp;
//             <Typography variant="h6" color="secondary.main">
//               <Skeleton count={1} />
//             </Typography>
//           </Box>
//           <Button variant="contained" color="secondary">
//             Buy
//           </Button>
//         </Box>
//         <Link>
//           <figure className="postImg">
//             <SkeletonTheme baseColor="#202020" highlightColor="#444">
//               <Skeleton count={8} />
//             </SkeletonTheme>
//           </figure>
//         </Link>
//         <Box>
//           <Grid container alignItems="center">
//             <Grid item xs={5}>
//               {" "}
//               <MultyUser data={9} />
//             </Grid>
//             <Grid item xs={7} align="right">
//               <label>8 Comments</label> &nbsp; &nbsp; &nbsp; &nbsp;
//               <label>17 Share</label>
//             </Grid>
//           </Grid>
//         </Box>
//         <Accordion
//           square
//           // expanded={expanded === "panel1"}
//         >
//           <Box className="commentBox">
//             <Grid container>
//               <Grid item xs={4}>
//                 <Button color="primary" size="large">
//                   <AiOutlineHeart /> Like
//                 </Button>
//               </Grid>
//               <Grid item xs={4} align="center">
//                 <AccordionSummary
//                   aria-controls="panel1d-content"
//                   id="panel1d-header"
//                 >
//                   <Button color="primary" size="large">
//                     {" "}
//                     <BiCommentDots />
//                     Comments
//                   </Button>
//                 </AccordionSummary>
//               </Grid>
//               <Grid item xs={4} align="right">
//                 <Button color="primary" size="large">
//                   {" "}
//                   <RiShareForwardLine />
//                   Share
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>

//           <AccordionDetails>
//             <CommentBox />
//           </AccordionDetails>
//         </Accordion>
//         <Box className="searchaddress">
//           <Grid container spacing={1} alignItems="center">
//             <Grid item xs={2} sm={1}>
//               <Box className="figure">
//                 <Box className="profileimage">
//                   <img src="images/user.png" alt="user data" />
//                 </Box>
//               </Box>
//             </Grid>
//             <Grid item xs={8} sm={10}>
//               <TextField
//                 id="outlined-basic"
//                 variant="outlined"
//                 name="Text Field"
//                 placeholder="Write here..."
//                 type="text"
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={2} sm={1} align="center">
//               <Button size="large" color="primary" fullWidth>
//                 <SendIcon style={{ color: "#E31A89" }} />
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Paper>
//   );
// }

import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Typography>
        <Skeleton count={3} />
      </Typography>

      <Typography variant="h1">
        <Skeleton count={3} />
      </Typography>
      <Typography variant="h2">
        <Skeleton count={3} />
      </Typography>
      <Typography variant="h4">
        <Skeleton count={3} />
      </Typography>
      <Typography variant="h3">
        <Skeleton count={3} />
      </Typography>
      <Typography variant="h5">
        <Skeleton count={3} />
      </Typography>
    </SkeletonTheme>
  );
}
