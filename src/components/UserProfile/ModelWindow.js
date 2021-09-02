import React from 'react'
import PropTypes from 'prop-types'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

import { years, months, experience, educations } from "../../util/constant";

const ModelWindow = ({profile, handleChange, setOpenModel, openModel, handleSubmit, type}) => {
    const { updatedStartMonth, updatedStartYear, updatedEndMonth, updatedEndYear, updatedDescription } = profile;
    let items = [...experience];
    let heading = "Add your experience details..";
    if(type === 'education') {
        items = [...educations];
        heading = "Add your education details..";
    } else if (type ==='summary') {
        items = [];
        heading = "Add your summary";
    }
    return (
        <div>
            <Dialog
        open={openModel}
        onClose={() => setOpenModel(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <form>
          {items.map((item) => 
              (<TextField
              name={item.value}
              className ="model__text_field"
              tpye="text"
              label={item.name}
              value={profile[item.value]}
              onChange={handleChange}
              fullWidth
            />
          ))}
            { ["workforce", "summary"].includes(type) && ( <TextField
                name="updatedDescription"
                tpye="text"
                label="Short description about your work"
                multiline
                rows="3"
                value={updatedDescription}
                onChange={handleChange}
                fullWidth
              /> )}
            { ["workforce", "education"].includes(type) && (<React.Fragment><div className="startDateSelection">
              <FormControl className="step4__section_Selection">
                <InputLabel htmlFor="age-native-simple">
                  Start Date ?
                </InputLabel>
                <Select
                  native
                  value={updatedStartMonth}
                  onChange={handleChange}
                  inputProps={{
                    name: "updatedStartMonth",
                    id: "age-native-simple",
                  }}
                >
                  {months.map((item) => (
                    <option value={item.value}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="step4__section_Selection">
                <InputLabel htmlFor="age-native-simple"></InputLabel>
                <Select
                  native
                  value={updatedStartYear}
                  onChange={handleChange}
                  inputProps={{
                    name: "updatedStartYear",
                    id: "age-native-simple",
                  }}
                >
                  {years.map((item) => (
                    <option value={item.value}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="endDateSelection">
              <FormControl className="step4__section_Selection">
                <InputLabel htmlFor="age-native-simple">End Date ?</InputLabel>
                <Select
                  native
                  value={updatedEndMonth}
                  onChange={handleChange}
                  inputProps={{
                    name: "updatedEndMonth",
                    id: "age-native-simple",
                  }}
                >
                  {months.map((item) => (
                    <option value={item.value}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="step4__section_Selection">
                <InputLabel htmlFor="age-native-simple"></InputLabel>
                <Select
                  native
                  value={updatedEndYear}
                  onChange={handleChange}
                  inputProps={{
                    name: "updatedEndYear",
                    id: "age-native-simple",
                  }}
                >
                  {years.map((item) => (
                    <option value={item.value}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
            </div> </React.Fragment>)  }
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModel(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

ModelWindow.propTypes = {

}

export default ModelWindow
