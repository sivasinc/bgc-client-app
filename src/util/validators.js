const isEmail = (email) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    // https://website.com
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};

exports.validateStep5 = (data) => {
  let error1 = {};

  if (!data.participatedChapter.trim()) {
    error1.participatedChapter = "Chapter must not be empty";
  }
  if (data.participatedChapter === "Other") {
    if (!data.state.trim()) {
      error1.state = "Must not be empty";
    }
  }
  if (data.eventsAttended.length <= 2) {
    error1.eventsAttended = "Please select at least 3 events";
  }
  if (data.interestField.length === 0) {
    error1.interestField = "Please select at least one interest";
  }

  return {
    error1,
    valid: Object.keys(error1).length === 0 ? true : false,
  };
};

exports.validateStep4 = (data, selectedProfile) => {
  let error1 = {};

  if (selectedProfile.trim() === "college") {
    if (!data["college-0"].trim()) {
      error1["college-0"] = "Must not be empty";
    }
    if (!data["college-1"].trim()) {
      error1["college-1"] = "Must not be empty";
    }
    if (data.startYear === "") {
      error1.startYear = "Must not be empty";
    }
    if (!data.startMonth.trim()) {
      error1.startMonth = "Must not be empty";
    }
    if (data.endDateCheckBox) {
      if (!data.endMonth.trim()) {
        error1.endMonth = "Must not be empty";
      }
      if (data.endYear === "") {
        error1.endYear = "Must not be empty";
      }
      if (data.endYear < data.startYear) {
        error1.endYear = "end year must be greater than start year";
      }
    }
  }

  if (selectedProfile.trim() === "workforce") {
    if (!data["workforce-0"].trim()) {
      error1["workforce-0"] = "Must not be empty";
    }
    if (!data["workforce-1"].trim()) {
      error1["workforce-1"] = "Must not be empty";
    }
    if (!data["workforce-2"].trim()) {
      error1["workforce-2"] = "Must not be empty";
    }
    if (data.startYear === "") {
      error1.startYear = "Must not be empty";
    }
    if (!data.startMonth.trim()) {
      error1.startMonth = "Must not be empty";
    }
  }
  if (selectedProfile.trim() === "timeoff") {
    if (!data["timeoff-0"].trim()) {
      error1["timeoff-0"] = "Must not be empty";
    }
  }
  if (selectedProfile.trim() === "figureout") {
    if (!data["figureout-0"].trim()) {
      error1["figureout-0"] = "Must not be empty";
    }
  }

  return {
    error1,
    valid: Object.keys(error1).length === 0 ? true : false,
  };
};
exports.validateStep6 = (data) => {
  let error1 = {};

  if (!data.visibility.trim()) {
    error1.visibility = "Please select an option";
  }

  return {
    error1,
    valid: Object.keys(error1).length === 0 ? true : false,
  };
};
