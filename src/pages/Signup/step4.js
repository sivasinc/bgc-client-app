import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  const selectedProfileInfo = profileQuestionsInit.filter(
    (item) => item.type === selectedProfile
  );
  console.log("selectedProfileInfo", selectedProfileInfo);
  return (
    <div className="step4__section">
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
          <div className="startDateSelection">
            <FormControl className="step4__section_Selection">
              <InputLabel htmlFor="age-native-simple">Start Date ?</InputLabel>
              <Select
                native
                value={startMonth}
                onChange={handleInputChange}
                inputProps={{
                  name: "startMonth",
                  id: "age-native-simple",
                }}
              >
                {months.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl className="step4__section_Selection">
              <InputLabel htmlFor="age-native-simple"></InputLabel>
              <Select
                native
                value={startYear}
                onChange={handleInputChange}
                inputProps={{
                  name: "startYear",
                  id: "age-native-simple",
                }}
              >
                {years.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="endDateSelection">
            <FormControl className="step4__section_Selection">
              <InputLabel htmlFor="age-native-simple">End Date ?</InputLabel>
              <Select
                native
                value={endMonth}
                onChange={handleInputChange}
                inputProps={{
                  name: "endMonth",
                  id: "age-native-simple",
                }}
              >
                {months.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl className="step4__section_Selection">
              <InputLabel htmlFor="age-native-simple"></InputLabel>
              <Select
                native
                value={endYear}
                onChange={handleInputChange}
                inputProps={{
                  name: "endYear",
                  id: "age-native-simple",
                }}
              >
                {years.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </Select>
            </FormControl>
          </div>
        </React.Fragment>
      )}
      {selectedProfileInfo[0].type === "workforce" && (
        <div className="step4__section_element">
          <h3>Do you work Fulltime or Partime ?</h3>
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