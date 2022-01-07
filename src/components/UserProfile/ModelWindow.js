
import React,{ useState } from 'react'
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
import { MenuItem } from "@mui/material";
import { years, months, experience, educations } from "../../util/constant";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const ModelWindow = ({profile, handleChange, setOpenModel, openModel, handleSubmit, type, errorMessage }) => {
    const { updatedStartMonth, updatedStartYear, updatedEndMonth, updatedEndYear, updatedDescription,updatedLocaion  } = profile;
    const [isPresent, setIsPresent] = useState(false);
    let items = [...experience];
    let heading = "Add your experience details..";
    if(type === 'education') {
        items = [...educations];
        heading = "Add your education details..";
    } else if (type ==='summary') {
        items = [];
        heading = "Add your summary";
    }
    const onPresentChange=(value)=>{
      setIsPresent(value);
      // handleChange({
      //   target:{name:'updatedEndMonth',''}
      // })
      // handleChange({
      //   target:{name:'updatedEndYear',value}
      // })
      

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
              (<div className="startDateSelection_Exp"><TextField
              name={item.value}
              id="outlined-required"
              variant="outlined"
              tpye="text"
              label={item.name}
              value={profile[item.value]}
              onChange={handleChange}
              fullWidth
            />
            
         </div> ))  }
        
          
            { ["workforce", "summary"].includes(type) && (<div className="startDateSelection_Exp"> <TextField
               
                id="outlined-required"
                name="updatedDescription"
                tpye="text"
                label="Short description about your work"
                variant="outlined"
                multiline
                rows="3"
                color='#ffffff'
                value={updatedDescription}
                onChange={handleChange}
                fullWidth
                className="frms"
              /></div> )}
              

            { ["workforce", "education"].includes(type) && (<React.Fragment><div className="startDateSelection_Exp">
              <FormControl className="step4__section_Selection">
                
                <TextField
                
                fullWidth
                id="step4_startYear"
                className="step4__section_Month_mdw"                
                select
                name="updatedStartMonth"
                value={updatedStartMonth}
                onChange={handleChange}
                variant="outlined"
                label="Start Month"
                InputLabelProps={{ shrink: updatedStartMonth ? true : false }}                
              >
                {months.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </TextField>

              </FormControl>
              <FormControl className="step4__section_Selection">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="Year"
                  value={updatedStartYear? new Date(`${updatedStartYear}-06-01`) : null}
                  onChange={(value) => handleChange({
                    target:{name:'updatedStartYear',value}
                  })}
                  renderInput={(params) => (
                    <TextField                   
                      fullWidth
                      variant="outlined"
                      className="step4__section_Year"
                      {...params}
                      InputLabelProps={{ shrink: updatedStartYear ? true : false }}                
                    />
                  )}
                />
              </LocalizationProvider>
              </FormControl>
            </div>
            <div className="startDateSelection_Exp">
            
           
              <FormControl className="step4__section_Selection">
              <TextField
                
                fullWidth
                id="step4_startYear"
                className="step4__section_Month_mdw"
                select
                name="updatedEndMonth"
                value={updatedEndMonth}
                onChange={handleChange}
                variant="outlined"
                label="EndMonth"
                InputLabelProps={{ shrink: updatedEndMonth ? true : false }}
                
              >
                {months.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </TextField>

              </FormControl>
              <FormControl className="step4__section_Selection">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="Year"
                  value={updatedEndYear? new Date(`${updatedEndYear}-06-01`) : null}
                  onChange={(value) => handleChange({
                    target:{name:'updatedEndYear',value}
                  })}
                  renderInput={(params) => (
                    <TextField
                     
                      fullWidth
                      variant="outlined"
                      className="step4__section_Year"
                      {...params}
                      InputLabelProps={{ shrink: updatedEndYear ? true : false }}
                      helperText={errorMessage && errorMessage.updatedEndYear}
                   
                    />
                  )}
                />
              </LocalizationProvider>
              

              </FormControl>
     
            
            </div>
            </React.Fragment>)  }
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModel(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={errorMessage && errorMessage.updatedEndYear}>
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
