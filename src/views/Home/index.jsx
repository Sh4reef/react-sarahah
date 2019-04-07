import React, { Fragment } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import headersStyle from "assets/jss/material-kit-pro-react/views/headerStyle.jsx";

import office2 from "assets/img/examples/office2.jpg";

function SectionHeaders({ ...props }) {
    const { classes } = props;
    return (
        // we've set the className to cd-section so we can make smooth scroll to it
        <Fragment>
            <div
                className={classes.pageHeader}
                style={{ backgroundImage: `url("${office2}")` }}
            >
                <div className={classes.conatinerHeader2}>
                    <GridContainer>
                        <GridItem
                            xs={12}
                            sm={8}
                            md={8}
                            className={classNames(
                                classes.mlAuto,
                                classes.mrAuto,
                                classes.textCenter
                            )}
                        >
                            <h1 className={classes.title}>About us</h1>
                            <h4>
                                Sarahah helps you in discovering your strengths and areas for improvement by receiving honest constructive feedback from your employees and your friends
                                </h4>
                        </GridItem>
                        {/* <GridItem
                            xs={12}
                            sm={10}
                            md={10}
                            className={classNames(classes.mlAuto, classes.mrAuto)}
                        >
                            <Card raised className={classes.card}>
                                <CardBody formHorizontal>
                                    <form>
                                        <GridContainer>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <CustomInput
                                                    id="name"
                                                    inputProps={{
                                                        placeholder: "Company name"
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <Button
                                                    block
                                                    color="primary"
                                                    className={classes.button}
                                                >
                                                    Sign up
                                                    </Button>
                                            </GridItem>
                                        </GridContainer>
                                    </form>
                                </CardBody>
                            </Card>
                        </GridItem> */}
                    </GridContainer>
                </div>
            </div>
        </Fragment>
    );
}

export default withStyles(headersStyle)(SectionHeaders);