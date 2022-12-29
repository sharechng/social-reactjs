import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  IconButton,
} from "@material-ui/core";
import React from "react";
import UserProfile from "./UserProfile";
import MultyUser from "./MultyUser";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
// import SendIcon from "@material-ui/icons/Send";
import { FaEllipsisH } from "react-icons/fa";
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const useStyles = makeStyles((theme) => ({
  PostBox: {
    backgroundColor: "theme",
    position: "relative",
    "& .postImg": {
      width: "100%",
      margin: "16px 0",
      borderRadius: "20px",
      overflow: "hidden",
      backgroundColor: "#000",
      "& img": {
        width: "100%",
      },
    },
    "& label": {
      color: "#BFBFBF",
    },
    "& .commentBox": {
      borderTop: "0.5px solid #737373",
      borderBottom: "0.5px solid #737373",
      marginTop: "16px",
      padding: "5px 0",
      "& button": {
        "& svg": {
          fontSize: "20px",
          marginRight: "5px",
        },
      },
    },
    "& .searchaddress": {
      paddingTop: "16px",
      "& .figure": {
        margin: "0",
        marginRight: "15px",
        position: "relative",
        "& .profileimage": {
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          "& img": {
            width: "auto",
            maxWidth: "100%",
            maxHeight: "50px",
          },
        },
      },
    },
  },
  menuShare: {
    position: "absolute",
    right: "16px",
    top: "16px",
  },
}));

export default function (props) {
  const { data } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper>
      <Box className={classes.PostBox} p={2}>
        <IconButton
          onClick={handleClick}
          aria-controls="customized-menu"
          aria-haspopup="true"
          className={classes.menuShare}
        >
          <FaEllipsisH />
        </IconButton>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            {/* <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon> */}
            <ListItemText primary="Share" />
          </StyledMenuItem>
          <StyledMenuItem>
            {/* <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon> */}
            <ListItemText primary="Block" />
          </StyledMenuItem>
          <StyledMenuItem>
            {/* <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon> */}
            <ListItemText primary="Report" />
          </StyledMenuItem>
        </StyledMenu>
        <Box mb={2}>
          <UserProfile />
        </Box>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing
          tincidunt ac sed egestas. Ultrices Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Adipiscing tincidunt ac sed egestas.
          Ultrices...
        </Typography>
        <figure className="postImg">
          <img src="images/postImg.png" />
        </figure>
        <Box>
          <Grid container alignItems="center">
            <Grid item xs={7}>
              {" "}
              <MultyUser />
            </Grid>
            <Grid item xs={5} align="right">
              <label>3 Comments</label> &nbsp; &nbsp; &nbsp; &nbsp;
              <label>17 Share</label>
            </Grid>
          </Grid>
        </Box>
        <Box className="commentBox">
          <Grid container>
            <Grid item xs={4}>
              <Button color="primary" size="large">
                {/* <AiOutlineHeart /> Like */}
              </Button>
            </Grid>
            <Grid item xs={4} align="center">
              <Button color="primary" size="large">
                {" "}
                <BiCommentDots />
                Comments
              </Button>
            </Grid>
            <Grid item xs={4} align="right">
              <Button color="primary" size="large">
                {" "}
                <RiShareForwardLine />
                Share
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box className="searchaddress">
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <Box className="figure">
                <Box className="profileimage">
                  <img src="images/user.png" alt="user data" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="Text Field"
                placeholder="Write here..."
                type="text"
                fullWidth
                style={{ height: "50px" }}
              />
            </Grid>
            <Grid item xs={2} align="center">
              <Button size="large" color="primary">
                <SendIcon style={{ color: "#E31A89" }} />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}
