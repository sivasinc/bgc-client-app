import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';


import { editUserDetails } from '../../redux/actions/userActions';
import ModelWindow from "./ModelWindow";


const MyNetworks = ({ user: { credentials }, editUserDetails }) => {
    const [profile, setProfile] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const handleChange = (event) => {
    setProfile({ ...profile , [event.target.name]: event.target.value, });
  };

  const handleSubmit = () => {
    const {
        updatedDescription
    } = profile;
    const request = { ...credentials, summary: updatedDescription };
    editUserDetails(request);
    setOpenModel(false);
  };
  const { summary } = credentials;
  let summaryInfo = (
    <div className="experience__item">
      <p className="summary__subheader__p">{ summary !== undefined ? summary : 'Add a summary'}</p>
    </div>
  );

    return (
        <div className="MyNetworks">
        <div className="MyNetworks__heading">
          <div className="MyNetworks__header">
            <h3>My Networks</h3>
          </div>
          <div className="MyNetworks__header__right">
          <h4>23 Connections</h4>
          </div>
        </div>
        <div className="MyNetworks__body">
        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/women.jpeg?alt=media&token=4c9e11b1-3c88-4546-8be7-04a77244f9dc"
              />
              <p>Elizabeth</p>
        </div>
        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/women.jpeg?alt=media&token=4c9e11b1-3c88-4546-8be7-04a77244f9dc"
              />
              <p>Sunnie</p>
        </div>

        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/women.jpeg?alt=media&token=4c9e11b1-3c88-4546-8be7-04a77244f9dc"
              />
              <p>Mary</p>
        </div>
        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/women.jpeg?alt=media&token=4c9e11b1-3c88-4546-8be7-04a77244f9dc"
              />
              <p>Karen</p>
        </div>
        </div>
        <div className="MyNetworks__body__footer">
        <Button variant="outlined" color="primary">
  View All
</Button>
        </div>
        <ModelWindow handleChange={handleChange} profile={profile} setOpenModel= {setOpenModel} openModel={openModel} 
        handleSubmit={handleSubmit} type ="summary" />
      </div>);
}

MyNetworks.propTypes = {

}

const mapStateToProps = (state) => ({
    user :state.user
   });
   const mapDispatchToProps = { editUserDetails };
   
   export default connect(mapStateToProps, mapDispatchToProps) (MyNetworks);
