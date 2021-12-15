import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select from "@material-ui/core/Select";
import "./step4.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { profileQuestionsInit, years, months } from "../../util/constant";

const Step4 = ({
  selectedProfile,
  handleSelectChange,
  year,
  value,
  handleRadioChange,
  handleInputChange,
  userProfile,
  handleStartYearChange,
  handleEndYearChange,
}) => {
  const { startMonth, startYear, endMonth, endYear, errorMessage } =
    userProfile;
  const [shrink1, setShrink1] = useState(false);
  const selectedProfileInfo = profileQuestionsInit.filter(
    (item) => item.type === selectedProfile
  );
  console.log("selectedProfileInfo", selectedProfileInfo);
  return (
    <div className="step4__section">
      <h3>Please, tell us more</h3>
      {selectedProfileInfo[0].values.map((item, index) => (
        <TextField
          error={!!errorMessage[`${selectedProfileInfo[0].type}-${index}`]}
          className="step4__section_element"
          fullWidth
          name={selectedProfileInfo[0].type + "-" + index}
          id={selectedProfileInfo[0].type + "-" + index}
          label={item}
          value={userProfile[selectedProfileInfo[0].type + "-" + index]}
          onChange={handleInputChange}
          variant="outlined"
          helperText={errorMessage[`${selectedProfileInfo[0].type}-${index}`]}
        />
      ))}
      {["college", "workforce"].includes(selectedProfileInfo[0].type) && (
        <React.Fragment>
          <div className="endDateCheckBox">
            <FormGroup className="step4__section_checkBox">
              <InputLabel className="step4_inputLabel">Start Date</InputLabel>
            </FormGroup>
          </div>

          <Grid container>
            <Grid item md={6} xs={6}>
              <TextField
                error={!!errorMessage.startMonth}
                fullWidth
                id="step4_startYear"
                className="step4__section_Month"
                select
                name="startMonth"
                value={startMonth}
                onChange={handleInputChange}
                variant="outlined"
                label="Month"
                InputLabelProps={{ shrink: startMonth ? true : false }}
                helperText={errorMessage.startMonth}
              >
                {months.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="Year"
                  value={startYear ? startYear : null}
                  onChange={handleStartYearChange}
                  helperText={errorMessage.startYear}
                  renderInput={(params) => (
                    <TextField
                      error={!!errorMessage.startYear}
                      fullWidth
                      variant="outlined"
                      className="step4__section_Year"
                      {...params}
                      InputLabelProps={{ shrink: startYear ? true : false }}
                      helperText={errorMessage.startYear}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          {["college"].includes(selectedProfileInfo[0].type) && (
            <div>
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
                    error={!!errorMessage.endMonth}
                    id="step4_startYear"
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
                    helperText={errorMessage.endMonth}
                  >
                    {months.map((item) => (
                      <MenuItem value={item.value}>{item.name}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={["year"]}
                      label="Year"
                      disabled={!userProfile.endDateCheckBox}
                      value={endYear ? endYear : null}
                      onChange={handleEndYearChange}
                      helperText={errorMessage.endYear}
                      renderInput={(params) => (
                        <TextField
                          error={!!errorMessage.endYear}
                          fullWidth
                          variant="outlined"
                          className="step4__section_Year"
                          {...params}
                          InputLabelProps={{ shrink: endYear ? true : false }}
                          helperText={errorMessage.endYear}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </div>
          )}
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
