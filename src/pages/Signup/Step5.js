import { TextField } from "@material-ui/core";
import React from "react";
import "./step5.css";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { eventsData } from "../../util/constant";
import { chapterValue } from "../../util/constant";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Step5 = ({
  chipData,
  userProfile,
  handleInputChange,
  selectChip,
  addNewData,
}) => {
  const {
    eventsAttended,
    participatedChapter,
    interestField,
    connections,
    likeToLearn,
  } = userProfile;
  return (
    <div className="step5">
      <h4>Almost done.Just a few more questions ?</h4>
      <h5>Black Girls Code</h5>
      <div className="step5_section_element">
        <TextField
          className="step5__section_element"
          select
          value={participatedChapter}
          onChange={handleInputChange}
          variant="outlined"
          label="Which Black Girls Code chapter have you participated in?"
          name="participatedChapter"
        >
          {chapterValue.map((item) => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
        </TextField>

        <TextField
          className="step5__section_element"
          select
          name="eventsAttended"
          id="outlined-required"
          variant="outlined"
          label="Which events have you attended ?"
          helperText="Must have attended at least 3 events to join the Alumnae Portal"
          SelectProps={{
            multiple: true,
            value: eventsAttended,
            onChange: handleInputChange,
          }}
        >
          {eventsData.map((item) => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
        </TextField>
      </div>

      <div className="step5_interest_div">
        <h5>Your interests</h5>
        <h6>
          Select all that apply.We will use these to recommend you relevent
          content
        </h6>
        <div className="paper_element">
          {chipData.map((item, index) => (
            <ListItem key={index}>
              <Chip
                clickable={true}
                icon={item.itemSelected ? <DoneIcon /> : ""}
                label={item.label}
                variant={item.itemSelected ? "" : "outlined"}
                onClick={() => selectChip(item.key)}
              />
            </ListItem>
          ))}
        </div>
      </div>
      <TextField
        id="step_interest"
        className="step_interest"
        label="Add Something else"
        name="interestField"
        type="text"
        variant="outlined"
        value={interestField}
        onChange={handleInputChange}
        InputProps={{
          // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                disabled={!interestField}
                onClick={addNewData}
              >
                {<ControlPointIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="step5__interest_field">
        <TextField
          name="likeToLearn"
          label="I'd like to learn more about..."
          value={likeToLearn}
          onChange={handleInputChange}
          variant="outlined"
          helperText="Skills,Industries,Technologies,etc"
        />
        <TextField
          className="step5_connect_div"
          name="connections"
          id="outlined-required"
          label="I'd like to connect with..."
          value={connections}
          onChange={handleInputChange}
          variant="outlined"
          helperText="Leaders, Entrepreneurs,upperclass man , etc"
        />
      </div>
    </div>
  );
};

Step5.propTypes = {};
export default Step5;