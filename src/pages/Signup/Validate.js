exports.validateInfo = (values, currentStep) => {
  let errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name required";
  } else {
    if (!values.firstName.trim().match(/^[a-zA-Z]+$/)) {
      errors.firstName = "Only letters are allowed";
    }
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name required";
  } else {
    if (!values.lastName.trim().match(/^[a-zA-Z]+$/)) {
      errors.lastName = "Only letters are allowed";
    }
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
