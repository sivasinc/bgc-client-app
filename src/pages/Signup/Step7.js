import React from 'react'
import PropTypes from 'prop-types'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Step7 = ({userProfile: { email } = "" }) => {
    return (
        <div className="step6_section">
            <CheckCircleIcon className="step6_section__checkBar"/>
            <h4>Thank you</h4>
            <p>An activation email has been sent to <span className="step6_section_email__label">{email}</span>. 
            Please follow the instructions on the email to complete your profile registration.</p>
        </div>
    )
}

Step7.propTypes = {

}

export default Step7
