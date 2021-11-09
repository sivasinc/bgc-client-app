import React from 'react'
import PropTypes from 'prop-types'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Step7 = ({userProfile: { email } = "" }) => {
    return (
        <div className="step7_section">
            <CheckCircleIcon color="primary" className="step7_section__checkBar"/>
            <h4>Thank you</h4>
            <p>An activation email has been sent to <span style={{ fontWeight: 'bold' }}>{email}</span>.</p>
            <p>The link will expires in 6 hours.</p>
            <p>Please follow the instructions on the email to complete your profile registration.</p>
        </div>
    )
}

Step7.propTypes = {

}

export default Step7
