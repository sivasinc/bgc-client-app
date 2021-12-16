import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ReportPostStep2 = () => {
  return (
    <div className="__reportstep2__section__">
      <CheckCircleIcon color="primary" className="step7_section__checkBar" />
      <p>The report has been submitted.</p>
      <p>The post will be reviewed to ensure that the Alumnae</p>
      <p>Portal Guidelines are being followed.</p>
    </div>
  );
};

ReportPostStep2.propTypes = {};

export default ReportPostStep2;
