import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
// final form
import { Form, Field, FormSpy } from "react-final-form";
// apollo
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
// contexts
import { UserContext } from "contexts/User";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from 'components/Typography/Danger.jsx';
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/bg7.jpg";

const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
    }
  }
`

const required = (value) => (value ? undefined : "Required")

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
    const { classes, ...rest } = this.props;
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
              <GridItem xs={12} sm={10}>
                <Mutation mutation={SIGNUP_MUTATION}>
                  {(signUp, { error, loading }) => (
                    <Card className={classes.cardSignup} style={loading ? {paddingTop: "0"} : {}}>
                      {loading &&
                        <CustomLinearProgress
                          variant="indeterminate"
                          color="primary"
                          style={{ marginBottom: "40px" }} />
                      }
                      <h2 className={classes.cardTitle}>Register</h2>
                      <CardBody>
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={10} lg={8}>
                            <Form
                              onSubmit={(e) => {                                
                                signUp({
                                  variables: {
                                    username: e.username,
                                    email: e.email,
                                    password: e.password
                                  }
                                }).then((result) => {
                                  this.context.setToken(result.data.signup.token)
                                })
                              }}
                              subscription={{
                                submitting: true
                              }}
                              render={({ handleSubmit }) => (
                                <form
                                  onSubmit={handleSubmit}
                                  className={classes.form}>
                                  {!loading && error &&
                                    <Danger>
                                      {error.graphQLErrors[0].message}
                                    </Danger>
                                  }
                                  <Field
                                    name="username"
                                    validate={required}
                                    render={({ input, meta }) => (
                                      <CustomInput
                                        formControlProps={{
                                          fullWidth: true,
                                          className: classes.customFormControlClasses
                                        }}
                                        error={meta.touched && meta.invalid}
                                        inputProps={{
                                          ...input,
                                          startAdornment: (
                                            <InputAdornment
                                              position="start"
                                              className={classes.inputAdornment}
                                            >
                                              <Face
                                                className={classes.inputAdornmentIcon}
                                              />
                                            </InputAdornment>
                                          ),
                                          placeholder: "Email..."
                                        }} />
                                    )} />
                                  <Field
                                    name="email"
                                    validate={required}
                                    render={({ input, meta }) => (
                                      <CustomInput
                                        formControlProps={{
                                          fullWidth: true,
                                          className: classes.customFormControlClasses
                                        }}
                                        error={meta.touched && meta.invalid}
                                        inputProps={{
                                          ...input,
                                          type: "email",
                                          startAdornment: (
                                            <InputAdornment
                                              position="start"
                                              className={classes.inputAdornment}
                                            >
                                              <Email
                                                className={classes.inputAdornmentIcon}
                                              />
                                            </InputAdornment>
                                          ),
                                          placeholder: "Email..."
                                        }} />
                                    )} />
                                  <Field
                                    name="password"
                                    validate={required}
                                    render={({ input, meta }) => (
                                      <CustomInput
                                        formControlProps={{
                                          fullWidth: true,
                                          className: classes.customFormControlClasses
                                        }}
                                        error={meta.touched && meta.invalid}
                                        inputProps={{
                                          ...input,
                                          type: "password",
                                          startAdornment: (
                                            <InputAdornment
                                              position="start"
                                              className={classes.inputAdornment}
                                            >
                                              <Icon className={classes.inputAdornmentIcon}>
                                                lock_outline
                                            </Icon>
                                            </InputAdornment>
                                          ),
                                          placeholder: "Password..."
                                        }} />
                                    )} />
                                  {/* <Field
                                    name="agreement"
                                    render={({ input }) => (
                                      <FormControlLabel
                                        classes={{
                                          label: classes.label
                                        }}
                                        control={
                                          <Checkbox
                                            tabIndex={-1}
                                            onClick={() => input.onChange(!input.value)}
                                            checkedIcon={
                                              <Check className={classes.checkedIcon} />
                                            }
                                            icon={
                                              <Check className={classes.uncheckedIcon} />
                                            }
                                            classes={{
                                              checked: classes.checked,
                                              root: classes.checkRoot
                                            }}
                                            checked={input.value} />
                                        }
                                        label={
                                          <span>
                                            I agree to the{" "}
                                            <a href="#pablo">terms and conditions</a>.
                                        </span>
                                        } />
                                    )} /> */}
                                  <div className={classes.textCenter}>
                                    <FormSpy subscription={{ values: true }}>
                                      {({ form }) => {
                                        const { pristine, invalid } = form.getState()                                        
                                        return (
                                          <Button type="submit" disabled={pristine || invalid || loading} round color="primary">
                                            Get started
                                          </Button>
                                        )
                                      }}
                                    </FormSpy>
                                  </div>
                                </form>
                              )}>
                            </Form>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
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

export default withStyles(signupPageStyle)(Components);