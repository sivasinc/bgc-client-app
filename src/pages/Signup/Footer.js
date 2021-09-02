import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import "./Footer.css";

const Footer = ({ currentStep, formButtonHandler }) => {
  return (
    <div className="signUp__footer">
      <div className="signUp__footer__PrevBtn">
        {currentStep > 1 && (
          <Button
            variant="contained"
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
          {currentStep === 4 ? "Continue To Portal" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
