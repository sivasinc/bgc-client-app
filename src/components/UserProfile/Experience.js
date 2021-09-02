import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { editUserDetails } from '../../redux/actions/userActions';


import ModelWindow from "./ModelWindow";

const Experience = ({ user: { credentials }, editUserDetails }) => {
  const [profile, setProfile] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const [modeType, setModeType] = useState('add');

  const handleChange = (event) => {
    setProfile({ ...profile , [event.target.name]: event.target.value, });
  };

  const handleAddModel = (value, mode) => {
    setOpenModel(value);
    setModeType('add');
    setProfile({})
  }
  const handleModelChange = (value, item, index) => {
    const { jobTtile, company, department, startMonth, startYear, endMonth, endYear
    } = item;

    setProfile({
        updatedJobTtile: jobTtile, 
        updatedCompany: company, 
        updatedDepartment: department,
        updatedStartMonth: startMonth, 
        updatedStartYear: startYear, 
        updatedEndMonth: endMonth, 
        updatedEndYear: endYear,
        itemIndex : index
    });
    setOpenModel(value);
    setModeType('edit');
  };
  const handleSubmit = () => {
    const {
        updatedCompany,
        updatedDepartment,
        updatedJobTtile,
        updatedStartMonth, updatedStartYear, updatedEndMonth, updatedEndYear,
        updatedDescription,
        itemIndex
    } = profile;
    const userDetails = {
      company: updatedCompany !== undefined ? updatedCompany : '',
      department: updatedDepartment !== undefined ? updatedDepartment : '',
      jobTtile: updatedJobTtile !== undefined ? updatedJobTtile : '',
      description: updatedDescription !== undefined ? updatedDescription : '',
      startMonth: updatedStartMonth !== undefined ? updatedStartMonth : '',
      startYear: updatedStartYear !== undefined ? updatedStartYear : '',
      endMonth: updatedEndMonth !== undefined ? updatedEndMonth : '',
      endYear: updatedEndYear !== undefined ? updatedEndYear : ''
    };
    const tempProfileInfo = [...credentials.profileInfo];
    const tempInfo = tempProfileInfo.filter(item => item.type === "workforce");
    if(tempInfo.length > 0) {
        tempProfileInfo.forEach(item => {
            if(item.type === "workforce") {
                if(modeType === 'edit') {
                    item.details.splice(itemIndex, 1, userDetails);
                } else {
                    item.details.push(userDetails)
                }
                
            }
        });
    } else {
        const details = [ { ...userDetails }];
        tempProfileInfo.push({ type : "workforce", details });
    }
    const request = { ...credentials, profileInfo : [...tempProfileInfo] };
    editUserDetails(request);
    setOpenModel(false);
  };
  const { profileInfo } = credentials;
  const { updatedStartMonth, updatedStartYear, updatedEndMonth, updatedEndYear, updatedCompany, updatedDepartment, updatedJobTtile } = profile;
  let educationInfo = (
    <div className="experience__item">
      <p className="experience__subheader__p">No Data exists</p>
    </div>
  );
  let info = [];
  if(profileInfo) {
      info = profileInfo.filter(item => item.type === 'workforce');
  }

  if (profileInfo && info.length > 0) {
    educationInfo = info[0].details.map((item, index) => {

      return (
        <div className="experience__item">
          <div className="experiance__item__body">
            <h4 className="experience__subheader">{item.jobTtile}</h4>
            <p className="experience__subheader__p">{item.company}</p>
            <p className="experience__subheader__p">{item.department}</p>
            <p className="experience__subheader__p">{`${item.startMonth}  ${item.startYear} - ${item.endMonth ? item.endMonth + '' +  item.endYear : 'Present' }`}</p>
            {item.description && <p className="experience__description__p">
              {item.description}
            </p>}
          </div>

          <div className="experience__edit__icon">
            <EditIcon color="primary" onClick={() => handleModelChange(true, item, index)} />
          </div>
        </div>
      );
    });
  }
  return (
    <div className="experience">
      <div className="experience__heading">
        <div className="experience__header">
          <h3>Experience</h3>
        </div>
        <div className="experience__add__icon">
          <AddIcon color="primary" onClick={() => handleAddModel(true)} />
        </div>
      </div>

      {educationInfo}

      <ModelWindow handleChange={handleChange} profile={profile} setOpenModel= {setOpenModel} openModel={openModel} 
      handleSubmit={handleSubmit} type ="workforce" />
    </div>
  );
};

Experience.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { editUserDetails };

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
