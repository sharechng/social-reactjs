import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {} from "react-feather";
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#ffffff",
    padding: 30,
    boxShadow: "0 0 20px 3px rgb(0 0 0 / 5%)",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      display: "block",
    },
  },

  iconBox: {
    background: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
export default function ApproachToSecurity() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Container maxWidth="lg" className="sectionPadding">
      <Box textAlign="center">
        <Container maxWidth="sm" data-aos="zoom-in-up">
          <Typography variant="h4" paragraph>
            FAQ's
          </Typography>
          <Typography>
            The ICO crypto team combines a passion for esports, industry
            experise & proven record in finance, development, marketing.
          </Typography>
        </Container>
      </Box>
      <Box my={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className="text-center">
            <img src="images/home_img.png" alt="" width="300px" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mb={3} data-aos="fade-up" data-aos-delay={0}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>
                    What cryptocurrencies can I use to purchase?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Artificial intelligence based on neural networks, built
                    using the newest algorithms for self learning, analysis and
                    comparison of neurons in which will be self-corrected.
                  </Typography>
                  <Typography>
                    Artificial intelligence based on neural networks, built
                    using the newest algorithms for self learning, analysis and
                    comparison of neurons in which will be self-corrected.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography className={classes.heading}>
                    How do I benefit from the ICO token?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Artificial intelligence based on neural networks, built
                    using the newest algorithms for self learning, analysis and
                    comparison of neurons in which will be self-corrected.
                  </Typography>
                  <Typography>
                    Artificial intelligence based on neural networks, built
                    using the newest algorithms for self learning, analysis and
                    comparison of neurons in which will be self-corrected.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography className={classes.heading}>
                    What curling irons are the best ones
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Artificial intelligence based on neural networks, built
                    using the newest algorithms for self learning, analysis and
                    comparison of neurons in which will be self-corrected.
                  </Typography>
                  <Typography>
                    Artificial intelligence based on neural networks, built
                    using the newest algorithms for self learning, analysis and
                    comparison of neurons in which will be self-corrected.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography className={classes.heading}>
                    Personal data
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                    Integer sit amet egestas eros, vitae egestas augue. Duis vel
                    est augue.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
