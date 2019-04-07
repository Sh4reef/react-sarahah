/* eslint-disable */
import React, { Fragment } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// contexts
import { UserContext } from 'contexts/User';
// final form
import { Form, Field, FormSpy } from 'react-final-form';
// apollo
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import Success from "components/Typography/Success.jsx";

import christian from "assets/img/faces/christian.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.jsx";

const PROFILE_QUERY = gql`
	query Profile($username: String!) {
		profileByUsername(username: $username) {
			avatar, role, firstName, lastName, biography, twitter, linkeden
		}
	}
`

const CREATE_MESSAGE_MUTATION = gql`
	mutation CreateMessage($username: String!, $content: String!) {
		createMessage(username: $username, content: $content) {
			content
		}
	}
`

class ProfilePage extends React.Component {
	static contextType = UserContext
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
	}
	render() {
		const { classes, match } = this.props;
		const imageClasses = classNames(
			classes.imgRaised,
			classes.imgRoundedCircle,
			classes.imgFluid
		);
		const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
		return (
			<Fragment>
				<Parallax
					image={require("assets/img/examples/city.jpg")}
					filter="dark"
					className={classes.parallax} />
				<Mutation mutation={CREATE_MESSAGE_MUTATION}>
					{(createMessage, { loading: mLoading, error: mError, data: mData }) => (
						<div className={classNames(classes.main, classes.mainRaised)}>
							<Query query={PROFILE_QUERY} variables={{ username: match.params.username }}>
								{({ loading, error, data }) => (
									<Form
										onSubmit={(e, form) => {
											createMessage({
												variables: {
													username: match.params.username,
													content: e.message
												}
											})
										}}
										subscription={{
											submitting: true,
										}}
										render={({ handleSubmit }) => (
											<form onSubmit={handleSubmit}>
												<div className={classes.container}>
													<GridContainer justify="center">
														<GridItem xs={12} sm={12} md={6}>
															<div className={classes.profile}>
																<div>
																	<img src={!loading && data && data.profileByUsername.avatar ? christian : defaultAvatar} alt="..." className={imageClasses} />
																</div>
																{!loading && data ?
																	<div className={classes.name}>
																		<h3 className={classes.title}>{data.profileByUsername.firstName}</h3>
																		<h6>{data.profileByUsername.role}</h6>
																		<Button
																			justIcon
																			simple
																			color="dribbble"
																			className={classes.margin5}>
																			<i className={classes.socials + " fab fa-dribbble"} />
																		</Button>
																		<a href="https://twitter.com" target="_blank">
																			<Button
																				justIcon
																				simple
																				color="twitter"
																				className={classes.margin5}>
																				<i className={classes.socials + " fab fa-twitter"} />
																			</Button>
																		</a>
																		<Button
																			justIcon
																			simple
																			color="pinterest"
																			className={classes.margin5}>
																			<i className={classes.socials + " fab fa-pinterest"} />
																		</Button>
																	</div> :
																	loading ?
																		<CustomLinearProgress
																			variant="indeterminate"
																			color="gray"
																			style={{ margin: "50px 30%" }} /> :
																		<h2 style={{ marginBottom: "100px" }}>
																			{error && error.graphQLErrors.length > 0 ?
																				error.graphQLErrors[0].message :
																				"Something wrong"}
																		</h2>
																}
															</div>
															{/* <div className={classes.follow}>
																<Tooltip
																	id="tooltip-top"
																	title="Follow this user"
																	placement="top"
																	classes={{ tooltip: classes.tooltip }}>
																	<Button
																		justIcon
																		round
																		color="primary"
																		className={classes.followButton}>
																		<Add className={classes.followIcon} />
																	</Button>
																</Tooltip>
															</div> */}
														</GridItem>
													</GridContainer>
													{!loading && data ?
														<div
															className={classNames(classes.description, classes.textCenter)}>
															<p>{data.profileByUsername.biography}</p>
														</div> :
														loading && <CustomLinearProgress
															variant="indeterminate"
															color="gray"
															style={{ margin: "50px 25%" }} />
													}
													{!loading && data &&
														<Fragment>
															{!mLoading && mData &&
																<GridContainer justify="center">
																	<GridItem xs={10} md={6} style={{ textAlign: "center" }}>
																		<Success>
																			<h3>
																				The message has been sent
																			</h3>
																		</Success>
																	</GridItem>
																</GridContainer>
															}
															{!mData &&
																<Fragment>
																	<GridContainer justify="center">
																		<GridItem xs={10} md={6}>
																			<Field
																				name="message"
																				render={({ input }) => (
																					<CustomInput
																						labelText="You can write your text here..."
																						id="textarea-input"
																						formControlProps={{
																							fullWidth: true
																						}}
																						inputProps={{
																							...input,
																							multiline: true,
																							rows: 5
																						}}
																					/>
																				)} />
																		</GridItem>
																	</GridContainer>
																	<GridContainer justify="center">
																		<GridItem xs={10} md={6}>
																			<FormSpy subscription={{ values: true }}>
																				{({ form }) => (
																					<Button
																						type="submit"
																						disabled={form.getState().pristine || mLoading}
																						color="primary"
																						className={classes.floatRight}
																						round>
																						Send
																			</Button>
																				)}
																			</FormSpy>
																		</GridItem>
																	</GridContainer>
																</Fragment>
															}
														</Fragment>
													}
													<Clearfix />
												</div>
											</form>
										)} />
								)}
							</Query>
							{mLoading &&
								<CustomLinearProgress
									variant="indeterminate"
									color="primary" />
							}
						</div>
					)}
				</Mutation>
				<br />
			</Fragment>
		);
	}
}

export default withStyles(profilePageStyle)(ProfilePage);