import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { backToTopId, classes } from './constants';
import SecretsTree from './secret-tree';
import SecretsList from './secret-list';
import BackToTop from 'britive-design-system/core/components/backToTop';

import './MyAllSecrets.scss';

const TabPanel = (props) => {
  const { value, index } = props;
  return value === index && <>{props.children}</>;
};

TabPanel.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.any,
};

const AllSecrets = ({ history, match }) => {
  const [selectedItemAncestors, setSelectedItemAncestors] = useState([]);
  const tabContainer = useRef(null);

  const selectionHandler = (ancestorsArray) => {
    setSelectedItemAncestors(ancestorsArray);
  };

  return (
    <div className={classes.secretsManagerContainer}>
      <SecretsTree
        parentsOfSelectedItem={selectedItemAncestors}
        selectionHandler={selectionHandler}
      />
      <div className={classes.secretsPoliciesTabsContainer} ref={tabContainer}>
        <SecretsList
          selectedItemAncestors={selectedItemAncestors}
          history={history}
          match={match}
        />
      </div>
      <BackToTop id={backToTopId} parentRef={tabContainer} />
    </div>
  );
};

AllSecrets.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
};

export default AllSecrets;
