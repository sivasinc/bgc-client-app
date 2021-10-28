import React from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import "./Footer.css";

const Footer = ({ currentStep, formButtonHandler }) => {
  return (
    <div className="signUp__footer">
      <div className="signUp__footer__PrevBtn">
        {currentStep > 1 && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => formButtonHandler(currentStep - 1)}
          >
            Go Back
          </Button>
        )}
      </div>
      <div className="signUp__footer__nextBtn">
        <Button
          variant="contained"
          color="primary"
          onClick={() => formButtonHandler(currentStep + 1)}
        >
          {currentStep === 5 ? "Submit" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
