import React from "react"; 
import { connect } from "react-redux"; 
import CommunityLayout from "./CommunityLayout";

const Home = (props) => {
  return <CommunityLayout />;
};
 

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Home);