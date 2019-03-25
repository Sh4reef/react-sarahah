import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
// final form
import { Form, Field } from 'react-final-form';
// contexts
import { UserContext } from 'contexts/User';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from 'components/Typography/Danger.jsx';
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
// apollo
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";

import image from "assets/img/bg7.jpg";

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

const required = (value) => (value ? undefined : "Required")

class LoginPage extends React.Component {
	static contextType = UserContext
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		if (this.context.token) {
			this.props.history.push("/")
		}
	}
	componentDidUpdate() {				
		if (this.context.token) {
			this.props.history.push("/")
		}
	}
	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<div
					className={classes.pageHeader}
					style={{
						backgroundImage: "url(" + image + ")",
						backgroundSize: "cover",
						backgroundPosition: "top center"
					}}>
					<div className={classes.container}>
						<GridContainer justify="center">
							<GridItem xs={12} sm={10} md={6} lg={4}>
								<Mutation mutation={LOGIN_MUTATION}>
									{(login, { error, loading }) => (
										<Card>
											<Form
												onSubmit={(e) => {
													login({
														variables: {
															email: e.username,
															password: e.password
														}
													}).then(result => {
														this.context.setToken(result.data.login.token)
													})
												}}												
												render={({ handleSubmit, pristine, invalid }) => (
													<form onSubmit={handleSubmit} className={classes.form}>
														<CardHeader
															color="primary"
															signup
															className={classes.cardHeader}>
															<h4 className={classes.cardTitle}>Login</h4>
														</CardHeader>
														<CardBody signup>
															<Field
																name="username"
																validate={required}
																render={({ input, meta }) => (
																	<CustomInput
																		id="first"
																		formControlProps={{
																			fullWidth: true
																		}}
																		error={meta.invalid && meta.touched}
																		inputProps={{
																			...input,
																			placeholder: "Username",
																			type: "text",
																			startAdornment: (
																				<InputAdornment position="start">
																					<Face className={classes.inputIconsColor} />
																				</InputAdornment>
																			)
																		}} />
																)} />
															<Field
																name="password"
																validate={required}
																render={({ input, meta }) => (
																	<CustomInput
																		id="pass"																		
																		formControlProps={{
																			fullWidth: true
																		}}
																		error={meta.invalid && meta.touched}
																		inputProps={{
																			...input,
																			placeholder: "Password",
																			type: "password",
																			startAdornment: (
																				<InputAdornment position="start">
																					<Icon className={classes.inputIconsColor}>
																						lock_utline
																			</Icon>
																				</InputAdornment>
																			)
																		}} />
																)} />
															{!loading && error &&
																<Danger>
																	{error.graphQLErrors[0].message}
																</Danger>
															}
														</CardBody>
														<div className={classes.textCenter}>
															<Button type="submit" simple color="primary" disabled={loading || pristine || invalid} size="lg">
																Get started
															</Button>
														</div>
													</form>
												)}>
											</Form>
											{loading &&
												<CustomLinearProgress
													variant="indeterminate"
													color="primary"
													style={{ marginBottom: 0 }} />
											}
										</Card>
									)}
								</Mutation>
							</GridItem>
						</GridContainer>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(loginPageStyle)(LoginPage);