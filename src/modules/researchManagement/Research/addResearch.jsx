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
import Checkbox from "components/checkbox";
import Loader from "components/loader";

import { getAllDeficiency } from "action/deficiency";
import { ASYNC_STATUS } from "constants/async";
import { serviceManager } from "services/manager";
import { isEmpty } from "shared/utils";
import { saveResearch, initializeResearch } from "action/research";

import "./styles.scss";
import Alert from "components/Alert";

type AddResearchPageProps = {
  getAllDeficiency: Function,
  deficiencyStatus: AsyncStatusType,
  deficiencies: Array<any>,
  researchCenter: string,
  saveResearch: Function,
  initializeResearch: Function,
  status: AsyncStatusType,
  notification: NotificationType,
};

class AddResearchPage extends Component<AddResearchPageProps> {
  constructor() {
    super();

    this.state = {
      researchId: "",
      deficiency: "",
      findings: "",
      products: [],
      loading: false,
      errors: {
        researchId: null,
        deficiency: null,
        findings: null,
      },
    };
  }

  componentDidMount() {
    const { researchCenter, getAllDeficiency, initializeResearch } = this.props;

    initializeResearch();
    getAllDeficiency({ researchCenter });

    this.setState({
      ...this.state,
      loading: true,
    });

    let researchService = serviceManager.get("ResearchService");

    researchService.getNewResearchId().then(({ data }) => {
      this.setState({
        ...this.state,
        researchId: data,
        loading: false,
      });
    });
  }

  onFormFieldChange = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  onSelectDeficiency = (deficiency) => {
    const { researchCenter } = this.props;

    this.setState({
      ...this.state,
      deficiency,
      loading: true,
    });

    const productService = serviceManager.get("ProductService");

    productService
      .getProductsByDeficiency({ deficiency, researchCenter })
      .then(({ success, data }) => {
        if (success) {
          this.setState({
            ...this.state,
            products:
              data.products &&
              data.products.map((product) => {
                return { ...product, verified: false };
              }),
            loading: false,
          });
        }
      });
  };

  onChangeProductVerify = (code) => {
    const { products } = this.state;

    let updatedProducts = products.map((product) => {
      if (product.productCode === code) {
        return {
          ...product,
          verified: !product.verified,
        };
      }
      return product;
    });

    this.setState({
      ...this.state,
      products: updatedProducts,
    });
  };

  resetFormFields = () => {
    this.props.initializeResearch();
    this.setState({
      ...this.state,
      loading: true,
    });

    let researchService = serviceManager.get("ResearchService");

    researchService.getNewResearchId().then(({ data }) => {
      this.setState({
        ...this.state,
        researchId: data,
        deficiency: "",
        findings: "",
        products: [],
        loading: false,
      });
    });
  };

  validateResearch = () => {
    const { researchId, deficiency, findings } = this.state;

    this.resetFormErrors();
    let hasError = false;

    if (isEmpty(researchId)) {
      this.setFormErrors("researchId", "ResearchId is required.");
      hasError = true;
    }

    if (isEmpty(deficiency)) {
      this.setFormErrors("deficiency", "Deficiency is required.");
      hasError = true;
    }

    if (isEmpty(findings)) {
      this.setFormErrors("findings", "Please add findings.");
      hasError = true;
    }

    return hasError;
  };

  resetFormErrors = () => {
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        researchId: null,
        deficiency: null,
        findings: null,
      },
    }));
  };

  onSubmit = () => {
    const { researchCenter, saveResearch } = this.props;
    const { researchId, deficiency, findings, products } = this.state;

    if (!this.validateResearch()) {
      saveResearch({
        researchId,
        deficiency,
        findings,
        products,
        researchCenter,
      });
    }
  };

  render() {
    const { deficiencies, deficiencyStatus, status, notification } = this.props;

    const {
      researchId,
      deficiency,
      findings,
      products,
      loading,
      errors,
    } = this.state;

    const deficiencyOptions = deficiencies.map(({ deficiency }) => deficiency);

    return (
      <Layout
        breadcrumbs={["Add Research"]}
        actions={
          <Fragment>
            <Button type={Button.TYPE.DANGER} onClick={this.resetFormFields}>
              Reset Research
            </Button>
            <Button type={Button.TYPE.SUCCESS} onClick={this.onSubmit}>
              Add Research
            </Button>
          </Fragment>
        }
      >
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {loading ||
        deficiencyStatus === ASYNC_STATUS.LOADING ||
        status === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
          <div className="add-researches">
            <div className="add-researches-container">
              <Row>
                <Col>
                  <div className="field-label">Research Id</div>
                </Col>
                <Col>
                  <Input
                    id="researchId"
                    text={researchId}
                    disabled
                    error={errors.researchId}
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
                    placeholder="select"
                    selected={deficiency}
                    onChange={(deficiency) =>
                      this.onSelectDeficiency(deficiency)
                    }
                    error={errors.deficiency}
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
                    text={findings}
                    onChange={(findings) =>
                      this.onFormFieldChange({ findings })
                    }
                    error={errors.findings}
                  />
                </Col>
              </Row>
              <Row>
                <Col size="6">
                  <div className="field-label">Verify Products</div>
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
                      {products.length > 0 &&
                        products.map((product) => {
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
                                      this.onChangeProductVerify(
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
    deficiencies: state.deficiency.deficiencies,
    deficiencyStatus: state.deficiency.status,
    researchCenter: state.auth.researchCenter,
    status: state.research.status,
    notification: state.research.notification,
  };
}

const Actions = {
  getAllDeficiency,
  saveResearch,
  initializeResearch,
};

export default connect(mapStateToProps, Actions)(AddResearchPage);
