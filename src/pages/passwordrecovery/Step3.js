import React from 'react'
import PropTypes from 'prop-types'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Step3 = ({ email }) => {
    return (
        <div className="step6_section">
            <CheckCircleIcon className="step6_section__checkBar"/>
            <h4>Thank you</h4>
            <p>The password reset email has been sent to <span className="step6_section_email__label">{email}</span>. 
            Please follow the instructions on the email to complete the password recovery.</p>
        </div>
    )
}

Step3.propTypes = {

}

export default Step3
