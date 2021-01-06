// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import SubMenu from "components/subMenu";
import Link from "components/Link";

import { USER_ROLES } from "constants/user";

import "./styles.scss";

type sidebarProps = {
  role: string,
};
class sidebar extends Component<sidebarProps> {
  render() {
    const { role } = this.props;
    return (
      <div className="sidebar">
        <div className="home">
          <Link to="">
            <div className="home-link">Plant Protector</div>
          </Link>
        </div>
        <div className="menu">
          {role === USER_ROLES.VENDOR && (
            <SubMenu
              title="Products"
              icon="disk"
              items={[
                { title: "Add Products", link: "/add-products" },
                { title: "View Products", link: "/view-products" },
              ]}
            />
          )}
          {role === USER_ROLES.RESEARCHER && (
            <SubMenu
              title="Researches"
              icon="bar-chart"
              items={[
                { title: "Add Research", link: "/add-researches" },
                { title: "View Researches", link: "/view-researches" },
              ]}
            />
          )}
          {role === USER_ROLES.RESEARCHER && (
            <SubMenu
              title="Deficiencies"
              icon="boxes"
              items={[{ title: "Manage Deficiency", link: "/view-deficiency" }]}
            />
          )}
          {role === USER_ROLES.RESEARCHER && (
            <SubMenu
              title="Verify Requests"
              icon="tag"
              items={[
                { title: "View Verify Requests", link: "/view-verifications" },
              ]}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    role: state.auth.role,
  };
}

const Actions = {};

export default connect(mapStateToProps, Actions)(sidebar);
