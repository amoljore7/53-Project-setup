import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Secrets from "./index";
import MySecretMyApprovalsDetailsMobile from "./my-approvals/view/mobile/MySecretMyApprovalsDetailsMobile";
import MySecretMyApprovalsDetails from "./my-approvals/view/MySecretMyApprovalsDetails";
import { isMobileDevice } from "./utils";
import ApprovalRequestAcknowledgement from "./my-approvals/view/mobile/ApprovalRequestAcknowledgement";
import MySecretsMyApprovalsListMobileView from "./my-approvals/list/mobile";

const SecretsRoutes = ({ history, match, source }) => {
  return (
    <>
      {source === "notification" && isMobileDevice() ? (
        <Switch>
          <Route
            exact
            path={`${match.url}/my-approvals/view/:id`}
            component={MySecretMyApprovalsDetailsMobile}
          />
          <Route
            exact
            path={`${match.url}/my-approvals/acknowledge/:status`}
            component={ApprovalRequestAcknowledgement}
          />
          <Route
            path={`${match.url}/my-approvals`}
            render={() => (
              <MySecretsMyApprovalsListMobileView
                history={history}
                match={match}
              />
            )}
          />
          <Redirect exact path={match.url} to={`${match.url}/my-approvals`} />
        </Switch>
      ) : (
        <Switch>
          <Route
            exact
            path={`${match.url}/my-approvals/view/:id`}
            component={MySecretMyApprovalsDetails}
          />
          <Route path={`${match.url}`} component={Secrets} />
        </Switch>
      )}
    </>
  );
};

SecretsRoutes.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
  source: PropTypes.string,
};

export default SecretsRoutes;
