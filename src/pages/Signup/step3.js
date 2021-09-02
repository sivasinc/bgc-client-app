import React from 'react'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import './step3.css';

const Step3 = ({handleProfileRadioChange, selectedProfile, userProfile}) => {
  console.log('selectedProfile', selectedProfile);
  const { firstName } = userProfile;
    return (
        <div className="step3">
            <h3>{`Let's begin setting up your profile, ${firstName} ?`}</h3>
            <h4>Where are you in life right now ?</h4>
            <FormControl component="fieldset">
      <RadioGroup aria-label="lifeOptions" name="lifeOptions" value={selectedProfile} onChange={handleProfileRadioChange}>
        <FormControlLabel value="college" control={<Radio color="default"/>} label="College or Univeristy" />
        <FormControlLabel value="workforce" control={<Radio color="default"/>} label="Workforce" />
        <FormControlLabel value="timeoff" control={<Radio color="default"/>} label="Taking time off" />
        <FormControlLabel value="figureout" control={<Radio color="default"/>} label="Figuring it out" />
      </RadioGroup>
    </FormControl>
        </div>
    )
}

Step3.propTypes = {

}

export default Step3
