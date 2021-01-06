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
import NumberInput from "components/NumberInput";
import Textarea from "components/TextArea";
import Select from "components/Select";
import Button from "components/button";
import Loader from "components/loader";
import Alert from "components/Alert";

import { saveProduct, initializeProduct } from "action/product";
import { getAllDeficiency } from "action/deficiency";
import { ASYNC_STATUS } from "constants/async";
import { isEmpty } from "shared/utils";

import "./styles.scss";

type AddProductsPageProps = {
  initializeProduct: Function,
  saveProduct: Function,
  status: AsyncStatusType,
  notification: NotificationType,
  getAllDeficiency: Function,
  deficiencyStatus: AsyncStatusType,
  deficiencies: Array<any>,
  researchCenter: string,
};

class AddProductsPage extends Component<AddProductsPageProps> {
  constructor(props) {
    super(props);

    this.state = {
      productCode: "",
      productName: "",
      vendor: "",
      unitPrice: "",
      applicationMethod: "",
      deficiency: "",
      errors: {
        productCode: null,
        productName: null,
        vendor: null,
        unitPrice: null,
        applicationMethod: null,
        deficiency: null,
      },
    };
  }

  componentDidMount() {
    const { getAllDeficiency, initializeProduct, researchCenter } = this.props;

    initializeProduct();
    getAllDeficiency({ researchCenter });
  }

  onChangeFormField = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  resetProductField = () => {
    this.setState({
      productCode: "",
      productName: "",
      vendor: "",
      unitPrice: "",
      applicationMethod: "",
      deficiency: "",
    });
  };

  validateProduct = () => {
    const {
      productCode,
      productName,
      vendor,
      unitPrice,
      deficiency,
      applicationMethod,
    } = this.state;

    this.resetFormErrors();
    let hasError = false;

    if (isEmpty(productCode)) {
      this.setFormErrors("productCode", "ProductCode is required.");
      hasError = true;
    }

    if (isEmpty(productName)) {
      this.setFormErrors("productName", "ProductName is required.");
      hasError = true;
    }

    if (isEmpty(vendor)) {
      this.setFormErrors("vendor", "Vendor is required.");
      hasError = true;
    }

    if (isEmpty(unitPrice)) {
      this.setFormErrors("unitPrice", "Unit price is required.");
      hasError = true;
    }

    if (isEmpty(deficiency)) {
      this.setFormErrors("deficiency", "Deficiency is required.");
      hasError = true;
    }

    if (isEmpty(applicationMethod)) {
      this.setFormErrors(
        "applicationMethod",
        "Application method is required."
      );
      hasError = true;
    }

    return hasError;
  };

  setFormErrors = (field, message) => {
    this.setState(({ errors }) => {
      return {
        errors: {
          ...errors,
          [field]: message,
        },
      };
    });
  };

  resetFormErrors = () => {
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        productCode: null,
        productName: null,
        vendor: null,
        unitPrice: null,
        applicationMethod: null,
        deficiency: null,
      },
    }));
  };

  onSubmit = () => {
    const {
      productCode,
      productName,
      vendor,
      unitPrice,
      applicationMethod,
      deficiency,
    } = this.state;

    if (!this.validateProduct()) {
      this.props.saveProduct({
        productCode,
        productName,
        vendor,
        unitPrice: parseFloat(unitPrice),
        applicationMethod,
        deficiency,
        researchCenter: this.props.researchCenter,
      });
      this.resetProductField();
    }
  };

  render() {
    const { status, notification, deficiencies, deficiencyStatus } = this.props;
    const {
      productCode,
      productName,
      vendor,
      unitPrice,
      applicationMethod,
      deficiency,
      errors,
    } = this.state;

    const deficiencyOptions = deficiencies.map(({ deficiency }) => deficiency);

    return (
      <Layout
        breadcrumbs={["Add Products"]}
        actions={
          <Fragment>
            <Button type={Button.TYPE.DANGER} onClick={this.resetProductField}>
              Reset Product
            </Button>
            <Button type={Button.TYPE.SUCCESS} onClick={this.onSubmit}>
              Add Product
            </Button>
          </Fragment>
        }
      >
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {status === ASYNC_STATUS.LOADING ||
        deficiencyStatus === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
          <div className="add-products">
            <div className="add-products-container">
              <Row>
                <Col>
                  <div className="field-label">Product Code</div>
                </Col>
                <Col>
                  <Input
                    id="productCode"
                    text={productCode}
                    onChange={(productCode) =>
                      this.onChangeFormField({ productCode })
                    }
                    error={errors.productCode}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="field-label">Product Name</div>
                </Col>
                <Col>
                  <Input
                    id="productName"
                    text={productName}
                    onChange={(productName) =>
                      this.onChangeFormField({ productName })
                    }
                    error={errors.productName}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="field-label">Vendor</div>
                </Col>
                <Col>
                  <Input
                    id="vendor"
                    text={vendor}
                    onChange={(vendor) => this.onChangeFormField({ vendor })}
                    error={errors.vendor}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="field-label">Unit Price</div>
                </Col>
                <Col>
                  <NumberInput
                    min="0"
                    id="UnitPrice"
                    text={unitPrice}
                    onChange={(unitPrice) =>
                      this.onChangeFormField({ unitPrice })
                    }
                    error={errors.unitPrice}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="field-label">Application Method</div>
                </Col>
                <Col>
                  <Textarea
                    id="applicationLabel"
                    text={applicationMethod}
                    onChange={(applicationMethod) =>
                      this.onChangeFormField({ applicationMethod })
                    }
                    error={errors.applicationMethod}
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
                      this.onChangeFormField({ deficiency })
                    }
                    error={errors.deficiency}
                  />
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.product.status,
    notification: state.product.notification,
    deficiencies: state.deficiency.deficiencies,
    deficiencyStatus: state.deficiency.status,
    researchCenter: state.auth.researchCenter,
  };
}

const Actions = {
  saveProduct,
  initializeProduct,
  getAllDeficiency,
};

export default connect(mapStateToProps, Actions)(AddProductsPage);
