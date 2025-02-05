import React from "react";
import PropTypes from "prop-types";
import Radio from '@mui/material/Radio';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import "./signup.css";

const Step6 = ({ handleRadioChange, value,userProfile }) => {
  const { errorMessage } = userProfile;
  return (
    <div className="step6__section">
      <h4>One last thing </h4>
      <h5>
        Would you like your profile to be searchable and visible by other
        community members?
      </h5>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="linkedInOption"
          name="visibility"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="yes"
            control={<Radio color="default" />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio color="default" />}
            label="No"
          />
        </RadioGroup>
        <FormHelperText error={!!errorMessage.visibility}>
          {errorMessage.visibility}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

Step6.propTypes = {};

export default Step6;
