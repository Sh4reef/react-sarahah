import React, { Component, createContext } from "react";

export const UserContext = createContext()

export class UserProvider extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: localStorage.getItem("auth-token")
		}
		this.setToken = this.setToken.bind(this)
		this.removeToken = this.removeToken.bind(this)
	}

	async setToken(token) {
		await localStorage.setItem("auth-token", token)
		this.setState({ token })
	}

	async removeToken() {
		await localStorage.removeItem("auth-token")
		this.setState({ token: null })
	}

	render() {
		return (
			<UserContext.Provider value={{
				token: this.state.token,
				setToken: this.setToken,
				removeToken: this.removeToken
			}}>
				{this.props.children}
			</UserContext.Provider>
		)
	}
}

export function UserConsumer(props) {
	return (
		<UserContext.Consumer>
			{props.children}
		</UserContext.Consumer>
	)
}