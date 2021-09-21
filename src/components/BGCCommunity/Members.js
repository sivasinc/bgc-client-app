import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";


import { editUserDetails } from '../../redux/actions/userActions';


const Members = ({ user: { credentials }, editUserDetails }) => {
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
            <h3>Members</h3>
          </div>
          <div className="MyNetworks__header__right">
          <h4>23 Members</h4>
          </div>
        </div>
        <div className="MyNetworks__body">
        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/tech-women2.png?alt=media&token=d4c1fda4-6d0d-4c58-84aa-d2bb4b88443b"
              />
              <p>Elizabeth</p>
        </div>
        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/black-tech-women-4.jpeg?alt=media&token=99a063e0-3424-4129-98ab-f03406c390cf"
              />
              <p>Sunnie</p>
        </div>

        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/black-tech-women3.jpeg?alt=media&token=f061ddf8-d32b-47df-baa1-1a5fd5d1a850"
              />
              <p>Mary</p>
        </div>
        <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/tech-women6.jpeg?alt=media&token=c0085437-23a0-496d-92d3-fd189a5ee2df"
              />
              <p>Karen</p>
        </div>
        </div>
        <div className="MyNetworks__body__footer">
        <Typography
          variant="h6"
          component={Link}
          color="primary"
          className="recommended__communityBox_community_join_button"
        >
         View All
        </Typography>
      </div>
      </div>);
}

Members.propTypes = {

}

const mapStateToProps = (state) => ({
    user :state.user
   });
   const mapDispatchToProps = { editUserDetails };
   
   export default connect(mapStateToProps, mapDispatchToProps) (Members);
