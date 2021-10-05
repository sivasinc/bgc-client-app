import React from 'react'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "./signup.css";

const Step6 = ({handleRadioChange, value}) => {
    return (
        <div className="step6__section">
          <h3>One last thing ?</h3>
            <h4>Would you like your profile to be searchable and visible by other community members ?</h4>
            <FormControl component="fieldset">
      <RadioGroup aria-label="linkedInOption" name="linkedInOption" value={value} onChange={handleRadioChange}>
        <FormControlLabel value="yes" control={<Radio color="default"/>} label="Yes" />
        <FormControlLabel value="no" control={<Radio color="default"/>} label="No" />
      </RadioGroup>
    </FormControl>
        </div>
    )
}

Step6.propTypes = {

}

export default Step6