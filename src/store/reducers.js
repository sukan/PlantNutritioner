// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import auth, { type AuthStateType } from "reducers/auth";
import deficiency, { type DeficiencyStateType } from "reducers/deficiency";
import product, { type ProductStateType } from "reducers/product";
import research, { type ResearchStateType } from "reducers/research";
import verification, {
  type VerificationStateType,
} from "reducers/verification";

export type ApplicationState = {
  auth: AuthStateType,
  deficiency: DeficiencyStateType,
  product: ProductStateType,
  research: ResearchStateType,
  verification: VerificationStateType,
};

export default (history: History) =>
  combineReducers({
    auth,
    deficiency,
    product,
    research,
    verification,
    router: connectRouter(history),
  });
