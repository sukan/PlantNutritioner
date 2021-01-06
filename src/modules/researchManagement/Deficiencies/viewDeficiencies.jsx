// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Layout from "components/layout";
import Row from "components/Row";
import Col from "components/Col";
import Button from "components/button";
import Input from "components/Input";
import Loader from "components/loader";
import Alert from "components/Alert";

import { saveDeficiency, getAllDeficiency } from "action/deficiency";
import { isEmpty } from "shared/utils";
import { ASYNC_STATUS } from "constants/async";

import "./styles.scss";

type ViewDeficiencyPageProps = {
  saveDeficiency: Function,
  getAllDeficiency: Function,
  status: AsyncStatusType,
  notification: NotificationType,
  deficiencies: Array<any>,
  researchCenter: string,
};

class ViewDeficiencyPage extends Component<ViewDeficiencyPageProps> {
  constructor(props) {
    super(props);

    this.state = {
      deficiency: "",
    };
  }

  onChangeFormField = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  componentDidMount() {
    const { researchCenter } = this.props;
    this.props.getAllDeficiency({ researchCenter });
  }

  resetField = () => {
    this.setState({
      deficiency: "",
    });
  };

  onSubmit = () => {
    const { deficiency } = this.state;
    const { researchCenter } = this.props;

    this.props.saveDeficiency({ deficiency, researchCenter });

    this.resetField();
  };

  render() {
    const { deficiency } = this.state;
    const { status, notification, deficiencies } = this.props;
    return (
      <Layout breadcrumbs={["View Deficiencies"]}>
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        <div className="view-deficiencies">
          <div className="view-deficiencies-add">
            <Row>
              <Col>
                <Row>
                  <Col>
                    <div className="field-label">Deficiency</div>
                  </Col>
                  <Col>
                    <Input
                      id="deficiency"
                      text={deficiency}
                      onChange={(deficiency) =>
                        this.onChangeFormField({ deficiency })
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col size="3">
                <Button
                  type={Button.TYPE.SUCCESS}
                  disabled={isEmpty(deficiency)}
                  onClick={this.onSubmit}
                >
                  Add Deficiency
                </Button>
              </Col>
            </Row>
          </div>
          <div className="view-deficiencies-table">
            {status === ASYNC_STATUS.LOADING ? (
              <Loader isLoading />
            ) : (
              <table>
                <tbody>
                  <tr className="table-heading">
                    <th>Deficiency</th>
                  </tr>
                  {deficiencies.map((def) => {
                    return (
                      <tr key={def}>
                        <th>{def.deficiency}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.deficiency.status,
    notification: state.deficiency.notification,
    deficiencies: state.deficiency.deficiencies,
    researchCenter: state.auth.researchCenter,
  };
}

const Actions = {
  saveDeficiency,
  getAllDeficiency,
};

export default connect(mapStateToProps, Actions)(ViewDeficiencyPage);
