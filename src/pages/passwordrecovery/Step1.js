import React from 'react'
import PropTypes from 'prop-types'
import TextField from "@mui/material/TextField";


const Step1 = ({ emailValidationMessage, setEmail }) => {
    return (
        <div>
            <TextField
            error ={emailValidationMessage}
            label="Email Address"
            id="outlined-start-adornment"
            className="directory__header_searchBar"
            onChange={(e) => setEmail(e.target.value)}
            helperText={emailValidationMessage}
          />
        </div>
    )
}

Step1.propTypes = {

}

export default Step1
