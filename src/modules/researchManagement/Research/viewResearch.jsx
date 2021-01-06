// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Layout from "components/layout";
import Loader from "components/loader";
import Alert from "components/Alert";

import { getAllResearches } from "action/research";
import { ASYNC_STATUS } from "constants/async";

import "./styles.scss";

type ViewResearchPageProps = {
  getAllResearches: Function,
  status: AsyncStatusType,
  notification: NotificationType,
  researches: Array<any>,
  researchCenter: string,
};

class ViewResearchPage extends Component<ViewResearchPageProps> {
  componentDidMount() {
    const { researchCenter, getAllResearches } = this.props;
    getAllResearches({ researchCenter });
  }

  render() {
    const { researches, status, notification } = this.props;

    return (
      <Layout breadcrumbs={["View Researches"]}>
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {status === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
          <div className="view-researches">
            <div className="view-researches-table">
              <table>
                <tbody>
                  <tr className="table-heading">
                    <th>Research Id</th>
                    <th>Deficiency</th>
                    <th>Findings</th>
                  </tr>
                  {researches &&
                    researches.map((research) => {
                      return (
                        <tr key={research.researchId}>
                          <td>{research.researchId}</td>
                          <td>{research.deficiency}</td>
                          <td>{research.findings}</td>
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
    status: state.research.status,
    notification: state.research.notification,
    researches: state.research.researches,
    researchCenter: state.auth.researchCenter,
  };
}

const Actions = {
  getAllResearches,
};

export default connect(mapStateToProps, Actions)(ViewResearchPage);
