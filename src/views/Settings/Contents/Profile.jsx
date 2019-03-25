import React, { Fragment } from "react";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
// apollo
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
// final form
import { Form, Field, FormSpy } from 'react-final-form';

const PROFILE_QUERY = gql`
	query Profile {
		profile {
			user {
				username
			},
			avatar, role, firstName, lastName, twitter, linkeden, biography
		}
	}
`

const UPDATE_PROFILE_MUTATION = gql`
	mutation UpdateProfile(
		$avatar: String!,
		$role: String!,
		$firstName: String!,
		$lastName: String!,
		$twitter: String!,
		$linkeden: String!,
		$biography: String!
	) {
		updateProfile(
			avatar: $avatar,
			role: $role,
			firstName: $firstName,
			lastName: $lastName,
			twitter: $twitter,
			linkeden: $linkeden,
			biography: $biography
		) {
			avatar, role, firstName, lastName, twitter, linkeden, biography
		}
	}
`

const Profile = (props) => {
	return (
		<Mutation mutation={UPDATE_PROFILE_MUTATION}>
			{(updateProfile, { loading: mLoading, data: mData }) => (
				<Query query={PROFILE_QUERY}>
					{({ loading, error, data }) => (
						<Form
							onSubmit={async (fields, form) => {
								console.log(form.getState())
								const dirtyFields = form.getState().dirtyFields
								const result = await updateProfile({
									variables: {
										...fields
									},
									optimisticResponse: {
										updateProfile: {
											...fields,
											__typename: "Profile",
										},
									},
									update: (proxy, { data: { updateProfile: { ...fields } } }) => {
										const data = proxy.readQuery({ query: PROFILE_QUERY })
										const newData = Object.assign({}, data, {
											profile: {
												...fields,
												__typename: "Profile"
											}
										})
										proxy.writeQuery({ query: PROFILE_QUERY, data: newData })
									}
								})
								window.scrollTo(0, 0);
								document.body.scrollTop = 0;
							}}
							subscription={{
								submitting: true
							}}
							initialValues={(!loading && data ? {
								avatar: data.profile.avatar,
								role: data.profile.role,
								firstName: data.profile.firstName,
								lastName: data.profile.lastName,
								twitter: data.profile.twitter,
								linkeden: data.profile.linkeden,
								biography: data.profile.biography
							} : {})}
							render={({ handleSubmit, pristine, dirtyFields, invalid }) => (
								<form onSubmit={handleSubmit}>
									{!mLoading && mData &&
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
									<GridContainer justify="center">
										<GridItem xs={12} sm={10} md={8}>
											<Field
												name="avatar"
												parse={null}
												render={({ input }) => (
													<ImageUpload
														avatar
														input={input}
														addButtonProps={{ round: true }}
														changeButtonProps={{ round: true }}
														removeButtonProps={{ round: true, color: "danger" }} />
												)} />
										</GridItem>
										{
											!loading && data &&
											<GridItem xs={12} sm={10} md={8}>
												<a href={`${window.location.origin}/${data.profile.user.username}`} target="_blank">
													<h5 style={{ textAlign: "center" }}>
														{`${window.location.origin}/${data.profile.user.username}`}
													</h5>
												</a>
											</GridItem>
										}
										<GridItem xs={12} sm={10} md={8}>
											<Field
												name="firstName"
												parse={null}
												render={({ input }) => (
													<CustomInput
														labelText="First Name"
														id="float"
														formControlProps={{
															fullWidth: true
														}}
														inputProps={{
															...input
														}} />
												)} />
										</GridItem>
										<GridItem xs={12} sm={10} md={8}>
											<Field
												name="lastName"
												parse={null}
												render={({ input }) => (
													<CustomInput
														labelText="Last Name"
														id="float"
														formControlProps={{
															fullWidth: true
														}}
														inputProps={{
															...input
														}} />
												)} />
										</GridItem>
										<GridItem xs={12} sm={10} md={8}>
											<Field
												name="role"
												parse={null}
												render={({ input }) => (
													<CustomInput
														labelText="Role"
														id="float"
														formControlProps={{
															fullWidth: true
														}}
														inputProps={{
															...input
														}} />
												)} />
										</GridItem>
										<GridItem xs={12} sm={10} md={8}>
											<Field
												name="linkeden"
												parse={null}
												render={({ input }) => (
													<CustomInput
														labelText="Linkeden"
														id="float"
														formControlProps={{
															fullWidth: true
														}}
														inputProps={{
															...input
														}} />
												)} />
										</GridItem>
										<GridItem xs={12} sm={10} md={8}>
											<Field
												name="twitter"
												parse={null}
												render={({ input }) => (
													<CustomInput
														labelText="Twitter"
														id="float"
														formControlProps={{
															fullWidth: true
														}}
														inputProps={{
															...input
														}} />
												)} />
										</GridItem>
										<GridItem xs={12} sm={10} md={8}>
											<Field
												name="biography"
												parse={null}
												render={({ input }) => (
													<Fragment>
														<CustomInput
															labelText="Biography"
															id="textarea-input"
															formControlProps={{
																fullWidth: true
															}}
															inputProps={{
																...input,
																multiline: true,
																rows: 5
															}} />
													</Fragment>
												)} />
										</GridItem>
										<GridItem xs={12} sm={10} md={8}>
											<FormSpy subscription={{ values: true }}>
												{({ form }) => {
													const { pristine, invalid, errors } = form.getState()
													return (
														<Button
															type="submit"
															disabled={pristine || invalid || mLoading}
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
				</Query>
			)}
		</Mutation>
	)
}

export default Profile