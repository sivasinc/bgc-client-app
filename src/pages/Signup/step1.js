import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import SelectElement from "./SelectElement";
import "./step1.css";

const Step1 = ({
  handleSelectChange,
  securityQuestions,
  handleInputChange,
  userProfile,
  handleSecurityInputChange
}) => {
  const {firstName, lastName, email, password, confirmPassword } = userProfile;
  return (
    <div className="step1">
      <h4>Create your account</h4>
      <div className="signUp__form_names">
        <TextField
          className="signUp__form__page"
          required
          name="firstName"
          id="outlined-required"
          label="First Name"
          value={firstName}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          className="signUp__form__page"
          required
          id="outlined-required"
          label="Last Name"
          name="lastName"
          value={lastName}
          variant="outlined"
          onChange={handleInputChange}
        />
      </div>
      <div className="signup__loginInfo">
        <h4>Login Information</h4>
        <div className="signUp__form_login">
          <TextField
            className="signUp__form__email"
            required
            name="email"
            id="outlined-required"
            label="Email Address"
            value={email}
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            className="signUp__form__password"
            required
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={handleInputChange}
          />
          <TextField
            className="signUp__form__password"
            required
            id="outlined-password-input"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={confirmPassword}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="signup__password_recovery">
        <h4>Password recovery questions</h4>
        <div className="signUp__form_password_recovery">
          {securityQuestions.map((question, index) => (
            <React.Fragment>
              <SelectElement
                label={question.name}
                id={question.id}
                elementName="recovery1"
                selectedItem={question.selectedItem}
                handleSelectChange={handleSelectChange}
                selectItems={question.answerOptions}
              />
              <TextField
                className="security_answer"
                required
                name={question.id}
                id="outlined-required"
                label="Security Answer"
                type="password"
                value={question.selectedItemValue}
                variant="outlined"
                onChange={handleSecurityInputChange}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

Step1.propTypes = {};

export default Step1;
