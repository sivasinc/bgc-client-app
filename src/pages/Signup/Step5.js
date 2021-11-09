import { TextField } from "@material-ui/core";
import React from "react";
import "./step5.css";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { eventsData } from "../../util/constant";
import Typography from "@mui/material/Typography";
import { chapterValue } from "../../util/constant";
import Grid from "@material-ui/core/Grid";

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
    connections,
    likeToLearn,
    errorMessage,
    tempInterestField,
  } = userProfile;
  return (
    <div className="step5">
      <Typography variant="h3">
        Almost done. Just a few more questions
      </Typography>
      <Typography variant="h4">Black Girls Code</Typography>
      <div className="step5_section_element">
        <Typography
          variant=" "
          sx={{
            marginLeft: "5px",
            fontSize: "1rem",
            color: "rgba(0, 0, 0, 0.74)",
          }}
        >
          Which Black Girls Code Chapter have you participated in?
        </Typography>
        <TextField
          fullwidth
          className="step_state"
          select
          value={participatedChapter}
          onChange={handleInputChange}
          variant="outlined"
          label="Select participated chapter?"
          name="participatedChapter"
          size="small"
        >
          {chapterValue.map((item) => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
        </TextField>
        {userProfile.participatedChapter === "Other" && (
          <TextField
            id="step_interest"
            disabled={
              userProfile.participatedChapter === "Other" ? false : true
            }
            fullwidth
            className="step_state"
            label="Add State"
            name="state"
            type="text"
            variant="outlined"
            value={
              userProfile.participatedChapter === "Other"
                ? userProfile.state
                : null
            }
            onChange={handleInputChange}
          />
        )}

        <TextField
          className="step_state"
          select
          fullwidth
          name="eventsAttended"
          id="outlined-required"
          variant="outlined"
          label="Which events have you attended"
          helperText="Must have attended at least 3 events to join the Alumnae Portal"
          SelectProps={{
            multiple: true,
            value: eventsAttended,
            onChange: handleInputChange,
          }}
        >
          {/* <Menu> */}
          {eventsData.map((item) => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
          {/* </Menu> */}
        </TextField>
      </div>

      <div className="step5_interest_div">
        <Typography variant="h4">Your interests</Typography>
        <h6>
          Select all that apply.We will use these to recommend you relevant
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
      <Grid container>
        <Grid sm={12} md={6}>
          <TextField
            error={errorMessage.interestField}
            id="step_interest"
            className="step_interest"
            label="Add Some Interests"
            name="tempInterestField"
            type="text"
            variant="outlined"
            value={tempInterestField}
            onChange={handleInputChange}
            helperText={errorMessage.interestField}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    disabled={!tempInterestField}
                    onClick={addNewData}
                  >
                    {<ControlPointIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <div className="step5__interest_field">
        <TextField
          name="likeToLearn"
          className="step5_connect_div"
          label="I'd like to learn more about..."
          value={likeToLearn}
          onChange={handleInputChange}
          variant="outlined"
          helperText="Skills, Industries, Technologies, etc"
        />
        <TextField
          className="step5_connect_div"
          name="connections"
          id="outlined-required"
          label="I'd like to connect with..."
          value={connections}
          onChange={handleInputChange}
          variant="outlined"
          helperText="Leaders, Entrepreneurs, Upperclass Man , etc"
        />
      </div>
    </div>
  );
};

Step5.propTypes = {};
export default Step5;
