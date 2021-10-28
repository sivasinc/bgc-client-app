import React, { Item, Component } from "react";
import CommunityTable from "../CommunityTable";
import CommunityCardList from "../CardList";
import "./CommunityLayout.css";

export default class CommunityLayout extends Component {
  render() {
    return (
      <div>
        <CommunityCardList />
        <CommunityTable />
      </div>
    );
  }
}