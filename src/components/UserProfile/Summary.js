import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { editUserDetails } from '../../redux/actions/userActions';
import ModelWindow from "./ModelWindow";


const Summary = ({ user: { userInfo }, editUserDetails }) => {
    const [profile, setProfile] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const handleChange = (event) => {
    setProfile({ ...profile , [event.target.name]: event.target.value, });
  };

  const handleSubmit = () => {
    const {
        updatedDescription
    } = profile;
    const request = { ...userInfo, summary: updatedDescription };
    editUserDetails(request);
    setOpenModel(false);
  };
  const { summary } = userInfo;
  let summaryInfo = (
    <div className="experience__item">
      <p className="summary__subheader__p">{ summary !== undefined ? summary : 'Add a summary'}</p>
    </div>
  );

    return (
        <div className="summary">
        <div className="summary__heading">
          <div className="summary__header">
            <h3>About</h3>
          </div>
          <div className="Summary_add__icon">
            <AddIcon color="primary" onClick={() => setOpenModel(true)} />
          </div>
        </div>
    
        {summaryInfo}
    
        <ModelWindow handleChange={handleChange} profile={profile} setOpenModel= {setOpenModel} openModel={openModel} 
        handleSubmit={handleSubmit} type ="summary" />
      </div>);
}

Summary.propTypes = {

}

const mapStateToProps = (state) => ({
    user :state.user
   });
   const mapDispatchToProps = { editUserDetails };
   
   export default connect(mapStateToProps, mapDispatchToProps) (Summary);
