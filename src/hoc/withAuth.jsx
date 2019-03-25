import React from "react";
import { Redirect } from "react-router-dom";
// contexts
import { UserConsumer } from "contexts/User";

export default function withAuth(WrappedComponent) {
	return (props) => (
		<UserConsumer>			
			{({ token }) => token ?				
				<WrappedComponent {...props} /> :
				<Redirect to="/login" />
			}
		</UserConsumer>
	)
}