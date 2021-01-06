// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Layout from "components/layout";

import { getAllVerifications } from "action/verification";

import "./styles.scss";
import Alert from "components/Alert";
import { ASYNC_STATUS } from "constants/async";
import Loader from "components/loader";
import { Link } from "react-router-dom";

type ViewVerificationPageProps = {
  getAllVerifications: Function,
  status: AsyncStatusType,
  notification: NotificationType,
  verifications: Array<any>,
  researchCenter: string,
};

class ViewVerificationPage extends Component<ViewVerificationPageProps> {
  componentDidMount() {
    const { getAllVerifications, researchCenter } = this.props;

    getAllVerifications({ researchCenter });
  }

  render() {
    const { status, notification, verifications } = this.props;

    return (
      <Layout breadcrumbs={["View Verifications"]}>
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {status === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
          <div className="view-verifications">
            <div className="view-verifications-table">
              <table>
                <tbody>
                  <tr className="table-heading">
                    <th>Deficiency</th>
                    <th>Findings</th>
                    <th>Stage</th>
                    <th>Farmer</th>
                  </tr>
                  {verifications &&
                    verifications.map((verification, index) => {
                      return (
                        <tr
                          key={index}
                          className={`${
                            verification.checked ? "" : "new-request"
                          }`}
                        >
                          <td className="link-container">
                            <Link
                              to={`/update-verifications/${verification.verificationId}`}
                            >
                              {verification.deficiency}
                            </Link>
                          </td>
                          <td>{verification.findings}</td>
                          <td>{verification.stage}</td>
                          <td>{verification.username}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.verification.status,
    notification: state.verification.notification,
    verifications: state.verification.verifications,
    researchCenter: state.auth.researchCenter,
  };
}

const Actions = {
  getAllVerifications,
};

export default connect(mapStateToProps, Actions)(ViewVerificationPage);
