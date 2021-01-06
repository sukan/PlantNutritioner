// @flow
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Layout from "components/layout";
import Row from "components/Row";
import Col from "components/Col";
import Input from "components/Input";
import Select from "components/Select";
import Textarea from "components/TextArea";
import Button from "components/button";
import Loader from "components/loader";
import Checkbox from "components/checkbox";
import Alert from "components/Alert";

import {
  initializeVerification,
  getSingleVerification,
  updateVerification,
  onChangeFields,
  onChangeProduct,
} from "action/verification";
import { getAllDeficiency } from "action/deficiency";
import { ASYNC_STATUS } from "constants/async";
import { serviceManager } from "services/manager";

import "./styles.scss";

type AddVerificationPageProps = {
  initializeVerification: Function,
  getSingleVerification: Function,
  updateVerification: Function,
  status: AsyncStatusType,
  notification: NotificationType,
  verification: null | Object,
  getAllDeficiency: Function,
  deficiencyStatus: AsyncStatusType,
  deficiencies: Array<any>,
  researchCenter: String,
  match: {
    params: {
      verificationId: string,
    },
  },
  onChangeFields: Function,
  onChangeProduct: Function,
};

class AddVerificationPage extends Component<AddVerificationPageProps> {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const {
      researchCenter,
      getAllDeficiency,
      initializeVerification,
      getSingleVerification,
      match: {
        params: { verificationId },
      },
    } = this.props;

    initializeVerification();
    getAllDeficiency({ researchCenter });
    getSingleVerification({ researchCenter, verificationId });
  }

  onChangeFormFields = (field) => {
    this.props.onChangeFields(field);
  };

  onSelectDeficiency = (deficiency) => {
    const { researchCenter, onChangeFields } = this.props;

    this.setState({
      ...this.state,
      loading: true,
    });

    const productService = serviceManager.get("ProductService");

    productService
      .getProductsByDeficiency({ deficiency, researchCenter })
      .then(({ success, data }) => {
        if (success) {
          this.setState({
            ...this.state,
            loading: false,
          });
          onChangeFields({
            deficiency,
            products:
              data.products &&
              data.products.map((product) => {
                return { ...product, verified: false };
              }),
          });
        }
      });
  };

  onSubmit = () => {
    const { verification, updateVerification } = this.props;

    updateVerification({ ...verification });
  };

  render() {
    const {
      status,
      notification,
      verification,
      deficiencyStatus,
      deficiencies,
    } = this.props;

    const { loading } = this.state;

    const deficiencyOptions = deficiencies.map(({ deficiency }) => deficiency);

    return (
      <Layout
        breadcrumbs={["Add Verification"]}
        actions={
          <Fragment>
            <Button type={Button.TYPE.SUCCESS} onClick={this.onSubmit}>
              Verify Request
            </Button>
          </Fragment>
        }
      >
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {status === ASYNC_STATUS.LOADING ||
        deficiencyStatus === ASYNC_STATUS.LOADING ||
        loading ? (
          <Loader isLoading />
        ) : (
          <div className="add-verification">
            <div className="add-verification-container">
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <div className="field-label">Verification Id</div>
                    </Col>
                    <Col>
                      <Input
                        id="verificationId"
                        text={
                          verification && verification.verificationId
                            ? verification.verificationId
                            : ""
                        }
                        disabled
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="field-label">Deficiency</div>
                    </Col>
                    <Col>
                      <Select
                        id="deficiency"
                        options={deficiencyOptions}
                        selected={
                          verification && verification.deficiency
                            ? verification.deficiency
                            : ""
                        }
                        onChange={(deficiency) =>
                          this.onSelectDeficiency(deficiency)
                        }
                        placeholder="select"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="field-label">Findings</div>
                    </Col>
                    <Col>
                      <Textarea
                        id="findings"
                        text={
                          verification && verification.findings
                            ? verification.findings
                            : ""
                        }
                        onChange={(findings) =>
                          this.onChangeFormFields({ findings })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="field-label">Verification Note</div>
                    </Col>
                    <Col>
                      <Textarea
                        id="verificationNote"
                        text={
                          verification && verification.verificationNote
                            ? verification.verificationNote
                            : ""
                        }
                        onChange={(verificationNote) =>
                          this.onChangeFormFields({ verificationNote })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col size="6">
                      <div className="field-label">Verify Products</div>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <div className="field-label">Image</div>
                    </Col>
                    <Col>
                      <div className="product-image">
                        {verification && verification.image && (
                          <img src={verification.image} alt="product" />
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="field-label">Stage</div>
                    </Col>
                    <Col>
                      <Input
                        id="stage"
                        text={verification ? verification.stage : ""}
                        onChange={(stage) => this.onChangeFormFields({ stage })}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <div className="productContainer">
                  <table>
                    <tbody>
                      <tr className="table-heading">
                        <th>ProductCode</th>
                        <th>ProductName</th>
                        <th>Vendor</th>
                        <th>UnitPrice (Rs)</th>
                        <th>Application Method</th>
                        <th>Verified</th>
                      </tr>
                      {verification &&
                        verification.products &&
                        verification.products.length > 0 &&
                        verification.products.map((product) => {
                          return (
                            <tr key={product.productCode}>
                              <td>{product.productCode}</td>
                              <td>{product.productName}</td>
                              <td>{product.vendor}</td>
                              <td>{product.unitPrice}</td>
                              <td>{product.applicationMethod}</td>
                              <td>
                                <div className="checkbox-container">
                                  <Checkbox
                                    isChecked={product.verified}
                                    onChange={() =>
                                      this.props.onChangeProduct(
                                        product.productCode
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
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
    verification: state.verification.verification,
    deficiencies: state.deficiency.deficiencies,
    deficiencyStatus: state.deficiency.status,
    researchCenter: state.auth.researchCenter,
  };
}

const Actions = {
  initializeVerification,
  getSingleVerification,
  updateVerification,
  getAllDeficiency,
  onChangeFields,
  onChangeProduct,
};

export default connect(mapStateToProps, Actions)(AddVerificationPage);
