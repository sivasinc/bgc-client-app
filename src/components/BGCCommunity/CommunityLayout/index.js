import React, { Component } from "react";
import CommunityTable from "../CommunityTable";
import CommunityCardList from "../CardList";
import "./CommunityLayout.css";
import styled from "styled-components";

export default class CommunityLayout extends Component {
  render() {
    return (
      <Layout>
        <CommunityCardList />
        <CommunityTable />
      </Layout>
    );
  }
}

const Layout = styled.div`
    @media (max-width: 768px) {
        display:  flex;
        flex-direction: column;
    }
`;
