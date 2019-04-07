import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Lock from "@material-ui/icons/Lock";
// contexts
import { UserContext } from "contexts/User";
// hoc
import withAuth from "hoc/withAuth";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
// core views
import ProfileContent from 'views/Settings/Contents/Profile';
import MessagesContent from 'views/Settings/Contents/Messages';
import PasswordContent from 'views/Settings/Contents/Password';

import settingsPageStyle from "assets/jss/material-kit-pro-react/views/settingsPageStyle.jsx";

import image from "assets/img/bg7.jpg";

class Components extends React.Component {
  static contextType = UserContext
  constructor(props) {
    super(props);
    this.state = {
      checked: [1]
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={8}>
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Profile",
                      tabIcon: Face,
                      tabContent: <ProfileContent />
                    },
                    {
                      tabName: "Messages",
                      tabIcon: Chat,
                      tabContent: <MessagesContent classes={classes} />
                    },
                    {
                      tabName: "Password",
                      tabIcon: Lock,
                      tabContent: <PasswordContent />
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withAuth(withStyles(settingsPageStyle)(Components));