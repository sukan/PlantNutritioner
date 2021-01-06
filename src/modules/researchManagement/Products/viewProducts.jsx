// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Layout from "components/layout";

import { getAllProducts } from "action/product";

import "./styles.scss";
import Alert from "components/Alert";
import { ASYNC_STATUS } from "constants/async";
import Loader from "components/loader";

type ViewProductsPageProps = {
  getAllProducts: Function,
  researchCenter: string,
  status: AsyncStatusType,
  notification: NotificationType,
  products: Array<any>,
};

class ViewProductsPage extends Component<ViewProductsPageProps> {
  componentDidMount() {
    const { getAllProducts, researchCenter } = this.props;
    getAllProducts({ researchCenter });
  }

  render() {
    const { status, notification, products } = this.props;
    return (
      <Layout breadcrumbs={["View Products"]}>
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {status === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
          <div className="view-products">
            <div className="view-products-table">
              <table>
                <tbody>
                  <tr className="table-heading">
                    <th>ProductCode</th>
                    <th>ProductName</th>
                    <th>Vendor</th>
                    <th>UnitPrice (Rs)</th>
                    <th>Application Method</th>
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
    researchCenter: state.auth.researchCenter,
    status: state.product.status,
    notification: state.product.notification,
    products: state.product.products,
  };
}

const Actions = {
  getAllProducts,
};

export default connect(mapStateToProps, Actions)(ViewProductsPage);
