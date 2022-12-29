/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import PropTypes from "prop-types";
import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  DialogContentText,
} from "@material-ui/core";
import Logo from "src/component/Logo";
import { FaUserAlt } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { MdDashboard, MdSettings } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { RiAdminLine } from "react-icons/ri";
import { RiAuctionFill } from "react-icons/ri";
import { AiOutlineControl } from "react-icons/ai";
import { CgUnblock } from "react-icons/cg";
import { SiProcessingfoundation } from "react-icons/si";
import { HiUserGroup } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { GiStaticGuard } from "react-icons/gi";
import NavItem from "./NavItem";
import { PieChart as PieChartIcon } from "react-feather";
import { AuthContext } from "src/context/Auth";

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }
  return acc;
}
const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    background: theme.palette.background.default,
  },
  desktopDrawer: {
    width: 200,
    top: 72,
    left: "30px",
    height: "100%",
    background: theme.palette.background.default,
    borderRight: "0",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    height: "45px",
    paddingLeft: "17px",
    borderRadius: "12px",
    marginTop: "-30px",
    "&:hover": {
      color: "#e31a89",
    },
    "& svg": {
      color: "#e31a89",
      fontSize: "20px",
    },
  },
  // logOutBox: {
  //   border: "1px solid #494949",
  //   borderRadius: "10px"
  // }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (auth.userLoggedIn) {
      if (auth?.userData?.userType === "Admin") {
        setSections([
          {
            items: [
              {
                title: "Dashboard",
                icon: PieChartIcon,
                href: "/dashboard",
              },
              {
                title: "Admin",
                icon: RiAdminLine,
                href: "/admin",
              },
              {
                title: "Trending Users",
                icon: FiTrendingUp,
                href: "/tranding",
              },
              {
                title: "Top Creator",
                icon: BsPeopleFill,
                href: "/top-user",
              },
              {
                title: "Active User",
                icon: HiUserGroup,
                href: "/active-user",
              },
              {
                title: "Engaing User",
                icon: HiUserGroup,
                href: "/enaging-user",
              },
              {
                title: "Analysis Trends",
                icon: HiUserGroup,
                href: "/analaysis",
              },

              {
                title: "Control",
                icon: AiOutlineControl,
                href: "/control",
              },

              {
                title: "Static",
                icon: GiStaticGuard,
                href: "/static",
              },

              {
                title: "Blocklist",
                icon: CgUnblock,
                href: "/blocklist",
              },
            ],
          },
        ]);
      } else {
        setSections([
          {
            items: [

              {
                title: "Explore",
                icon: MdDashboard,
                href: "/explore",
              },
              {
                title: "Profile",
                icon: FaUserAlt,
                href: "/profile",
              },
              {
                title: "Creators",
                icon: ImUsers,
                href: "/creators",
              },
              {
                title: "Collections",
                icon: MdLocalOffer,
                href: "/collections",
              },
              {
                title: "Auctions",
                icon: RiAuctionFill,
                href: "/auction",
              },

              {
                title: "Promotion",
                icon: SiProcessingfoundation,
                href: "/promotion",
              },
              {
                title: "Settings",
                icon: MdSettings,
                href: "/settings",
              },


            ],
          },
        ]);
      }
    } else {
      setSections([
        {
          items: [
            {
              title: "Explore",
              icon: MdDashboard,
              href: "/explore",
            },

            {
              title: "Creators",
              icon: ImUsers,
              href: "/creators",
            },
            {
              title: "Collections",
              icon: MdLocalOffer,
              href: "/collections",
            },
            {
              title: "Auctions",
              icon: RiAuctionFill,
              href: "/auction",
            },
          ],
        },
      ]);
    }
    if (auth.userLoggedIn) {
      if (
        auth?.userData?.userType === "Subadmin" &&
        auth.userData.permissions.feeManagement
      ) {
        setSections([
          {
            items: [
              {
                title: "Admin",
                icon: RiAdminLine,
                href: "/admin",
              },

              {
                title: "Control",
                icon: AiOutlineControl,
                href: "/control",
              },
            ],
          },
        ]);
      } else if (
        auth?.userData?.userType === "Subadmin" &&
        auth.userData.permissions.userManagement
      ) {
        setSections([
          {
            items: [
              {
                title: "Admin",
                icon: RiAdminLine,
                href: "/admin",
              },

              {
                title: "Control",
                icon: AiOutlineControl,
                href: "/control",
              },
              {
                title: "Blocklist",
                icon: CgUnblock,
                href: "/blocklist",
              },
            ],
          },
        ]);
      } else if (
        auth?.userData?.userType === "Subadmin" &&
        auth.userData.permissions.postManagement
      ) {
        setSections([
          {
            items: [
              {
                title: "Admin",
                icon: RiAdminLine,
                href: "/admin",
              },
              {
                title: "Blocklist",
                icon: CgUnblock,
                href: "/blocklist",
              },
            ],
          },
        ]);
      }
    }
  }, [auth.userLoggedIn, auth?.userData?.userType]);

  const handLogout = () => {
    setOpen(false);
    auth.setIsLogin(false);
    auth.getoffLineUserApi()
    history.push("/");
    auth.logout();
    localStorage.removeItem("tokens");
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("status");

    sessionStorage.removeItem("email");
    localStorage.removeItem("email");
    localStorage.removeItem("email");

    sessionStorage.removeItem("ignoreUser");
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box style={{ padding: "8px 0px 32px 0px" }}>
          {sections.map((section, i) => {
            return (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            );
          })}
        </Box>
        <Box>
          <List>
            <Button className={classes.button} onClick={() => setOpen(true)}>
              <RiLogoutCircleRFill />
              &nbsp;&nbsp;&nbsp; Logout
            </Button>
          </List>
        </Box>
      </PerfectScrollbar>
      {open &&
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          // fullWidth
          // maxWidth="sm"
          // className="logoutModal
          style={{ border: "#787878 !important" }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box className="logoutModalBox">
            <Box mb={1} mt={3} align="center">
              <Typography variant="h4">Logout</Typography>
            </Box>
            <Box my={3} align="center">
              <Typography variant="body2"> Are you sure you want to logout?</Typography>
            </Box>
            <Box mt={2} mb={3} align="center">
              <Button
                onClick={() => setOpen(false)}
                color="primary"
                variant="contained"
                size="large"
                style={{ marginRight: "8px" }}
              >
                Cancel
              </Button>
              <Button
                // onClick={() => setOpen(false)}
                color="secondary"
                variant="contained"
                size="large"
                style={{ marginLeft: "8px" }}
                onClick={handLogout}

              >
                Logout
              </Button>
            </Box>
          </Box>
          {/* <Box className={classes.logOutBox}> */}

          {/* </Box> */}
        </Dialog>
      }
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
