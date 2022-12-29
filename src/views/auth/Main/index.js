import React, { useRef } from "react";
import Page from "src/component/Page";
import "src/scss/main.css";
import Banner from "./Banner";
import { makeStyles } from "@material-ui/core";
import WebsiteSecurity from "./WebsiteSecurity";
import ApproachToSecurity from "./ApproachToSecurity";
import Nav from "./nav";
// import UpcomingPools from "./UpcomingPools";
import CompanyRoadmap from "./CompanyRoadmap";
import ContactForm from "./ContactForm";
import Info from "./info";
import Footer from "./footer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    marginTop: "65px",
  },
  body: { backgroundColor: "#fff" },
}));
function LoginMain(props) {
  const classes = useStyles();
  const refs = {
    home: useRef(null),
    about: useRef(null),
    features: useRef(null),
    faq: useRef(null),
    roadmap: useRef(null),
    contact: useRef(null),
  };

  const onButtonClick = (abc) => {
    // const data = refs[abc].current;
    window.scrollTo({
      top: refs[abc].current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Page className={classes.root} title="Home">
      <Nav buttonClick={onButtonClick} />
      <div ref={refs.home}>
        <Banner />
      </div>
      <div ref={refs.about}>
        <Info />
      </div>
      <div ref={refs.features}>
        <WebsiteSecurity />
      </div>
      <div ref={refs.faq}>
        <ApproachToSecurity />
      </div>
      <div ref={refs.roadmap}>
        <CompanyRoadmap />
      </div>
      <div ref={refs.contact}>
        <ContactForm />
      </div>
      <Footer />
    </Page>
  );
}

export default LoginMain;
