import React from "react";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// apollo
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
// final form
import { Form, Field, FormSpy } from "react-final-form";

const UPDATE_PASSWORD_MUTATION = gql`
	mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
		updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
			id
		}
	}
`

const required = value => (value ? undefined : 'Required')

const validate = (values) => {
	const errors = {}
	if (values.newPassword !== values.repeatNewPassword) {
		errors.repeatNewPassword = "Password Doesn't match"
	}
	return errors
}

const Password = (props) => {
	return (
		<Mutation mutation={UPDATE_PASSWORD_MUTATION}>
			{(updatePassword, { loading, data, error }) => (
				<Form
					onSubmit={async (fields) => {
						await updatePassword({
							variables: {
								currentPassword: fields.currentPassword,
								newPassword: fields.newPassword
							}
						})
					}}
					validate={validate}
					subscription={{
						submitting: true
					}}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							{!loading && data &&
								<SnackbarContent
									message={
										<span>
											<b style={{ verticalAlign: "middle" }}>Saved successfully</b>
										</span>
									}
									close
									color="success"
									icon={Check}
								/>
							}
							{!loading && error && error.graphQLErrors.length > 0 &&
								<SnackbarContent
									message={
										<span>
											<b style={{ verticalAlign: "middle" }}>{error.graphQLErrors[0].message}</b>
										</span>
									}
									close
									color="danger"
									icon="info_outline"
								/>
							}
							<GridContainer justify="center">
								<GridItem xs={12} sm={10} md={8}>
									{error && console.log(error.graphQLErrors[0].message)}
									<Field
										name="currentPassword"
										validate={required}
										render={({ input, meta }) => (
											<CustomInput
												labelText="Current password"
												error={meta.touched && meta.invalid}
												inputProps={{
													...input,
													type: "password"
												}}
												formControlProps={{
													fullWidth: true
												}}
											/>
										)} />
								</GridItem>
								<GridItem xs={12} sm={10} md={8}>
									<Field
										name="newPassword"
										validate={required}
										render={({ input, meta }) => (
											<CustomInput
												labelText="New password"
												error={meta.touched && meta.invalid}
												inputProps={{
													...input,
													type: "password"
												}}
												formControlProps={{
													fullWidth: true
												}}
											/>
										)} />
								</GridItem>
								<GridItem xs={12} sm={10} md={8}>
									<Field
										name="repeatNewPassword"
										validate={required}
										render={({ input, meta }) => (
											<CustomInput
												labelText="Repeat New password"
												error={meta.invalid && meta.touched}
												inputProps={{
													...input,
													type: "password"
												}}
												formControlProps={{
													fullWidth: true
												}}
											/>
										)} />
								</GridItem>
								<GridItem xs={12} sm={10} md={8}>
									<FormSpy subscription={{ values: true }}>
										{({ form }) => {
											const { pristine, invalid } = form.getState()
											return (
												<Button
													type="submit"
													disabled={pristine || invalid || loading}
													style={{ float: "right" }}
													round
													color="primary">
													Save
												</Button>
											)
										}}
									</FormSpy>
								</GridItem>
							</GridContainer>
						</form>
					)}>
				</Form>
			)}
		</Mutation>
	)
}

export default Password