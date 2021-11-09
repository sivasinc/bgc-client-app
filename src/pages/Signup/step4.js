import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select from "@material-ui/core/Select";
import "./step4.css";

import { profileQuestionsInit, years, months } from "../../util/constant";

const Step4 = ({
  selectedProfile,
  handleSelectChange,
  year,
  value,
  handleRadioChange,
  handleInputChange,
  userProfile,
}) => {
  const { startMonth, startYear, endMonth, endYear } = userProfile;
  const [shrink1, setShrink1] = useState(false);
  const selectedProfileInfo = profileQuestionsInit.filter(
    (item) => item.type === selectedProfile
  );
  console.log("selectedProfileInfo", selectedProfileInfo);
  return (
    <div className="step4__section">
      <h3>Please,tell us more</h3>
      {selectedProfileInfo[0].values.map((item, index) => (
        <TextField
          className="step4__section_element"
          name={selectedProfileInfo[0].type + "-" + index}
          id={selectedProfileInfo[0].type + "-" + index}
          label={item}
          value={userProfile[selectedProfileInfo[0].type + "-" + index]}
          onChange={handleInputChange}
          variant="outlined"
        />
      ))}
      {["college", "workforce"].includes(selectedProfileInfo[0].type) && (
        <React.Fragment>
          {/* <InputLabel className="step4_inputLabel">Start Date</InputLabel>
           */}
          <div className="endDateCheckBox">
            <FormGroup className="step4__section_checkBox">
              <InputLabel className="step4_inputLabel">Start Date</InputLabel>
            </FormGroup>
          </div>
          {/* <Box
            component="form"
            // sx={{
            //   "& .MuiTextField-root": { },
            // }}
            
            
          > */}
          <Grid container>
            <Grid item md={6} xs={6}>
              <TextField
                fullWidth
                id="step4_startYear"
                size="small"
                className="step4__section_Month"
                select
                name="startMonth"
                value={startMonth}
                onChange={handleInputChange}
                variant="outlined"
                label="Month"
                InputLabelProps={{ shrink: startMonth ? true : false }}
              >
                {months.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                id="step4_startYear"
                size="small"
                select
                fullWidth
                className="step4__section_Year"
                variant="outlined"
                value={startYear}
                label="Year"
                onChange={handleInputChange}
                name="startYear"
                InputLabelProps={{ shrink: startYear ? true : false }}
              >
                {years.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <div className="endDateCheckBox">
            <FormGroup className="step4__section_checkBox">
              <FormControlLabel
                control={<Checkbox />}
                label="Expected Graduation Date"
                name="endDateCheckBox"
                size="small"
                onChange={handleInputChange}
              />
            </FormGroup>
          </div>
          <Grid container>
            <Grid item md={6} xs={6}>
              <TextField
                id="step4_startYear"
                size="small"
                disabled={!userProfile.endDateCheckBox}
                className="step4__section_Month"
                select
                name="endMonth"
                value={endMonth}
                onChange={handleInputChange}
                variant="outlined"
                label="Month"
                fullWidth
                InputLabelProps={{ shrink: endMonth ? true : false }}
              >
                {months.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                id="step4_startYear"
                size="small"
                disabled={!userProfile.endDateCheckBox}
                select
                className="step4__section_Year"
                variant="outlined"
                value={endYear}
                label="Year"
                onChange={handleInputChange}
                name="endYear"
                fullWidth
                InputLabelProps={{ shrink: endYear ? true : false }}
              >
                {years.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {/* </div>
            
          </div> */}
        </React.Fragment>
      )}
      {selectedProfileInfo[0].type === "workforce" && (
        <div className="step4__section_element">
          <h3>Do you work Full time or Part time ?</h3>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="workType"
              name="workType"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="fulltime"
                control={<Radio color="default" />}
                label="Full Time"
              />
              <FormControlLabel
                value="partTime"
                control={<Radio color="default" />}
                label="Part Time"
              />
            </RadioGroup>
          </FormControl>
        </div>
      )}
    </div>
  );
};

Step4.propTypes = {};

export default Step4;
