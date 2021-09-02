import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';


import { editUserDetails } from '../../redux/actions/userActions';
import ModelWindow from "./ModelWindow";


const MyCommunities = ({ user: { credentials }, editUserDetails }) => {
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
            <h3>My Communities</h3>
          </div>
          {/* <div className="MyNetworks__header__right">
          <h4>23 Connections</h4>
          </div> */}
        </div>
        <div className="MyNetworks__body">
        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/java.jpeg?alt=media&token=127a730b-0dd1-46ea-8eaa-3cbbd98b9655"
              />
              <p>Java </p>
        </div>
        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/react.png?alt=media&token=723800b7-3bb2-4359-870c-83ad781b88cb"
              />
              <p>React Js</p>
        </div>

        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/Angular.png?alt=media&token=a86fc996-34da-4555-b94f-6445ee8d29a7"
              />
              <p>Angular Js</p>
        </div>
        {/* <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/118419803318.jpeg?alt=media&token=98436f12-ad5b-43d3-9b3e-d8a321b9c109"
              />
              <p>BinilRaj</p>
        </div> */}
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

MyCommunities.propTypes = {

}

const mapStateToProps = (state) => ({
    user :state.user
   });
   const mapDispatchToProps = { editUserDetails };
   
   export default connect(mapStateToProps, mapDispatchToProps) (MyCommunities);
