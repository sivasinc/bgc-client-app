import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { editUserDetails } from '../../redux/actions/userActions';
import ModelWindow from "./ModelWindow";


const Education = ({ user: { userInfo } , editUserDetails}) => {
    const [profile, setProfile] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const handleChange = (event) => {
    setProfile({ ...profile , [event.target.name]: event.target.value, });
  };
  const handleModelChange = (value) => {
    // setProfile({
    //   updatedFirstName: firstName,
    //   updatedLastName: lastName,
    //   updatedHeadLine: headLine,
    //   updatedLocation,
    //   location,
    // });
    // setOpenModel(value);
  };
  const handleSubmit = () => {
    const {
        updatedUniversity,
        updatedFieldOfStudy,
        updatedStartMonth, updatedStartYear, updatedEndMonth, updatedEndYear,
    } = profile;
    const userDetails = {
      university: updatedUniversity !== undefined ? updatedUniversity : '',
      fieldOfStudy: updatedFieldOfStudy !== undefined ? updatedFieldOfStudy : '',
      startMonth: updatedStartMonth !== undefined ? updatedStartMonth : '',
      startYear: updatedStartYear !== undefined ? updatedStartYear : '',
      endMonth: updatedEndMonth !== undefined ? updatedEndMonth : '',
      endYear: updatedEndYear !== undefined ? updatedEndYear : ''
    };
    const tempProfileInfo = [...userInfo.profileInfo];
    const tempInfo = tempProfileInfo.filter(item => item.type === "education");
    if(tempInfo.length > 0) {
        tempProfileInfo.forEach(item => {
            if(item.type === "education") {
                item.details.push(userDetails)
            }
        });
    } else {
        const details = [ { ...userDetails }];
        tempProfileInfo.push({ type : "education", details });
    }
    const request = { ...userInfo, profileInfo : [...tempProfileInfo] };
    editUserDetails(request);
    setOpenModel(false);
  };
    const { profileInfo } = userInfo;
    console.log('education-profileInfo', profileInfo);
    let info = [];
    if(profileInfo) {
        info = profileInfo.filter(item => item.type === 'education');
    }
    let educationInfo = null;
    if(profileInfo && info.length > 0) {
        educationInfo =  info[0].details.map((item) => {
            return (
                <div className="experience__item">
          <div className="experiance__item__body">
                  <h4 className="education__subheader">{item.university}</h4>
                  <p className="education__subheader__p">{item.fieldOfStudy}</p>
                  <p className="education__subheader__p">{`${item.startMonth}  ${item.startYear} - ${item.endMonth} ${item.endYear}`}</p> </div>
                 <div className="experience__edit__icon">
                 <EditIcon color="primary" />
               </div>
                </div>
            )
        })
    }
    return (
    <div className="education">
    <div className="education__heading">
      <div className="education__header">
        <h3>Education</h3>
      </div>
      <div className="education_add__icon">
        <AddIcon color="primary" onClick={() => setOpenModel(true)} />
      </div>
    </div>

    {educationInfo}

    <ModelWindow handleChange={handleChange} profile={profile} setOpenModel= {setOpenModel} openModel={openModel} 
    handleSubmit={handleSubmit} type ="education" />
  </div>);
}

Education.propTypes = {

}

const mapStateToProps = (state) => ({
 user :state.user
});
const mapDispatchToProps = { editUserDetails };

export default connect(mapStateToProps, mapDispatchToProps) (Education);
