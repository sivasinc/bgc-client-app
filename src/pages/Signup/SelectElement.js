import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './SelectElement.css'

const styles = (theme) => ({
    ...theme
  });
const SelectElement = ({ label, id, selectedItem, handleSelectChange, selectItems}) => {
    return (
        <React.Fragment>
<FormControl className="recoveryForm">
        <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
        <Select
          native
          variant="outlined"
          value={selectedItem}
          onChange={handleSelectChange}
          inputProps={{
            name: id,
            id: 'id',
          }}
        >
             {selectItems.map((item) => <option value={item.value}>{item.name}</option>)}
         
        </Select>
      </FormControl>
        </React.Fragment>
    )
}

SelectElement.propTypes = {

}


export default (withStyles(styles)(SelectElement));