import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "./ReportPost.css";

const ReportPostStep1 = ({ handleReportRadioChange, selectedReport }) => {
  console.log("selectedReport Option", selectedReport);
  return (
    <div className="__reportstep1__">
      <h4>Why are you reporting this post?</h4>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="reportOptions"
          name="reportOptions"
          value={selectedReport}
          onChange={handleReportRadioChange}
        >
          <FormControlLabel
            value="violence"
            control={<Radio color="default" />}
            label="Violence"
          />
          <FormControlLabel
            value="harassement"
            control={<Radio color="default" />}
            label="Harassement"
          />
          <FormControlLabel
            value="falseinfo"
            control={<Radio color="default" />}
            label="False Information"
          />
          <FormControlLabel
            value="unauthorized"
            control={<Radio color="default" />}
            label="Unauthorized Sales"
          />
          <FormControlLabel
            value="hatespeech"
            control={<Radio color="default" />}
            label="Hate Speech"
          />
          <FormControlLabel
            value="something"
            control={<Radio color="default" />}
            label="Something else"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

ReportPostStep1.propTypes = {};

export default ReportPostStep1;
