// @flow
import React, { Suspense, PureComponent, Fragment } from "react";
import { type AsyncStatusType } from "shared/types/General";

import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Loader from "components/loader";
import NotFoundPage from "modules/common/pages/404";

import { history } from "store";
import { type AuthStateType } from "reducers/auth";
import { isAuthenticated, isUserInitiated } from "selectors/auth";

import routes from "./routes";
import PrivateRoute from "./Private";
import PublicRoute from "./Public";
import { ASYNC_STATUS } from "constants/async";

type RoutesProps = {
  isAuthenticated: Boolean,
  isUserInitiated: Boolean,
  currentUserRole: $PropertyType<AuthStateType, "role">,
  status: AsyncStatusType,
};

class Routes extends PureComponent<RoutesProps> {
  render() {
    const {
      isAuthenticated,
      isUserInitiated,
      currentUserRole,
      status,
    } = this.props;
    return (
      <Fragment>
        {isUserInitiated && status !== ASYNC_STATUS.LOADING ? (
          // $FlowFixMe
          <ConnectedRouter history={history}>
            <Suspense fallback={<Loader />}>
              <Switch>
                {routes.map((route, i) => {
                  if (route.auth) {
                    return (
                      <PrivateRoute
                        isAuthenticated={isAuthenticated}
                        currentUserRole={currentUserRole}
                        key={i}
                        {...route}
                      />
                    );
                  }
                  return <PublicRoute key={i} {...route} />;
                })}
                <Route component={NotFoundPage} />
              </Switch>
            </Suspense>
          </ConnectedRouter>
        ) : (
          <Loader />
        )}
      </Fragment>
    );
  }
}

const Actions = {};

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated(state),
    isUserInitiated: isUserInitiated(state),
    status: state.auth.status,
    currentUserRole: state.auth.role,
  };
}

export default connect(mapStateToProps, Actions)(Routes);
