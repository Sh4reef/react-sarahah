import React, { Fragment } from "react";

// material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
// apollo
import {withApollo} from "react-apollo";
// contexts
import { UserConsumer } from 'contexts/User';
// @material-ui/icons
import Logout from "@material-ui/icons/PowerSettingsNew";
import Settings from '@material-ui/icons/Settings';
import Signup from '@material-ui/icons/Create';
import Login from '@material-ui/icons/ExitToApp';

import headersStyle from "assets/jss/material-kit-pro-react/views/headerStyle.jsx";

const CustomHeader = ({ classes, history, client }) => {
	return (
		<UserConsumer>
			{({ token, removeToken }) => (
				<Header
					absolute
					brand="Sarahah"
					color="transparent"
					links={
						<List className={classes.list + " " + classes.mlAuto}>
							{!token ?
								<Fragment>
									<ListItem className={classes.listItem}>
										<Button
											href="#pablo"
											className={classes.navLink}
											onClick={e => {
												e.preventDefault()
												history.push("/login")
											}}
											color="transparent">
											<Login /> Login
								</Button>
									</ListItem>
									<ListItem className={classes.listItem}>
										<Button
											href="#pablo"
											className={classes.navLink}
											onClick={e => {
												e.preventDefault()
												history.push("/signup")
											}}
											color="transparent">
											<Signup /> Signup
									</Button>
									</ListItem>
								</Fragment> :
								<Fragment>
									<ListItem className={classes.listItem}>
										<Button
											href="#pablo"
											className={classes.navLink}
											onClick={async e => {
												e.preventDefault()
												removeToken()
												client.resetStore()
												history.push("/login")
											}}
											color="transparent">
											<Logout /> Logout
										</Button>
									</ListItem>									
									<ListItem className={classes.listItem}>
										<Button
											href="#pablo"
											className={classes.navLink}
											onClick={e => {
												e.preventDefault()
												history.push("/settings")
											}}
											color="transparent">
											<Settings /> Settings
									</Button>
									</ListItem>
								</Fragment>
							}
						</List>
					} />
			)}
		</UserConsumer>
	)
}

export default withStyles(headersStyle)(withApollo(CustomHeader))