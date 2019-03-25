import React, { Fragment, useState } from "react";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Media from "components/Media/Media.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// apollo
import gql from "graphql-tag";
import { Query } from "react-apollo";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import defaultAvatar from "assets/img/placeholder.jpg";

const USER_MESSAGES_QUERY = gql`
	query UserMessages($first: Int, $skip: Int) {
		userMessages(first: $first, skip: $skip) {
			messages {
				id content
			}
			count
		}
	}
`

const Profile = ({ classes }) => {
	const [skip, setSkip] = useState(0)
	return (
		<Query query={USER_MESSAGES_QUERY} variables={{
			first: 5,
			skip: skip * 5
		}}>
			{({ loading, error, data }) => (
				<Fragment>
					<GridContainer justify="center">
						{
							loading &&
							<GridItem xs={12}>
								<CustomLinearProgress
									variant="indeterminate"
									color="gray"
									style={{ margin: "50px 20%" }} />
							</GridItem>
						}
						{
							!loading && data &&
							data.userMessages.messages.map((message) => (
								<GridItem key={message.id} xs={12}>
									<Media
										style={{ marginBottom: "1.5rem" }}
										avatar={defaultAvatar}
										title={
											<span>
												Unknown <small>· 7 minutes ago</small>
											</span>
										}
										body={
											<p className={classes.color555}>
												{message.content}
											</p>
										} />
								</GridItem>
							))
						}
					</GridContainer>
					<GridContainer justify="center">
						{
							!loading && data &&
							<GridItem xs={12}>
								<Pagination
									pages={[
										{
											disabled: (((skip + 1) * 5) <= 5), text: "Previous",
											onClick: () => {
												setSkip(skip - 1)
											}
										},
										{
											disabled: (((skip + 1) * 5) >= data.userMessages.count), text: "Next",
											onClick: () => {
												setSkip(skip + 1)
											}
										}
									]}
								/>
							</GridItem>
						}
					</GridContainer>
				</Fragment>
			)}
		</Query>
	)
}

export default Profile