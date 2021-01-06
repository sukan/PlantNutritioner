// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "components/dashboardLayout";
import Link from "components/Link";
import { USER_ROLES } from "constants/user";

import "./styles.scss";

type HomePageProps = {
  role: string,
};

class HomePage extends Component<HomePageProps> {
  render() {
    const { role } = this.props;

    return (
      <Layout>
        <div className="main-page">
          <div className="main-page-links">
            {role === USER_ROLES.RESEARCHER && (
              <Link to={"view-researches"}>
                <div className="main-page-links-item">Researcher Dashboard</div>
              </Link>
            )}
            {role === USER_ROLES.VENDOR && (
              <Link to={"view-products"}>
                <div className="main-page-links-item">Vendor Dashboard</div>
              </Link>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    role: state.auth.role,
  };
}

const Actions = {};

export default connect(mapStateToProps, Actions)(HomePage);
