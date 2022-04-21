/* eslint-disable  no-extra-boolean-cast*/
import Tabs from 'britive-design-system/core/components/tabs';
import BackToTop from 'britive-design-system/core/components/backToTop';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { backToTopId, classes, pageTitle, routeToNameList, translatedStrings } from './constants';
import SecretsList from './secret-list';
import SecretsTree from './secret-tree';

import SecretView from './secret-view';
import PolicyList from './policy/list';

import './AllSecrets.scss';
import { openNotification } from '../../../../../components/notification/action';
import { useDispatch } from 'react-redux';
import {
  errorNotificationDuration,
  errorNotificationType,
} from '../../../../../utils/common-constants';
import { isError } from '../../../../../utils/common-utils';

const TabPanel = (props) => {
  const { value, index } = props;
  return value === index && <>{props.children}</>;
};

TabPanel.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.any,
};

const AllSecrets = ({
  setPageHeader,
  history,
  match,
  location,
  storeTabIndex,
  currentTabIndex,
  consumerListStatus,
  consumerListError,
}) => {
  const previousPageArray = ['add', 'edit', 'view'];
  const [selectedItemAncestors, setSelectedItemAncestors] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [initialTab, setInitialTab] = useState([
    {
      title:
        !Boolean(selectedItemAncestors?.length) ||
        selectedItemAncestors[selectedItemAncestors?.length - 1]?.details?.entityType === 'node'
          ? translatedStrings.secretTabTitle
          : translatedStrings.secretDetailsTabTitle,
    },
    { title: translatedStrings.policyTabTitle },
  ]);
  const tabContainer = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    storeTabIndex(tabIndex);
  }, [tabIndex]);

  useEffect(() => {
    if (
      location?.state?.previousPath &&
      previousPageArray.includes(location?.state?.previousPath)
    ) {
      setTabIndex(currentTabIndex);
    } else {
      setTabIndex(0);
    }
  }, []);

  useEffect(() => {
    if (currentTabIndex === 0) {
      setInitialTab([
        {
          title:
            !Boolean(selectedItemAncestors?.length) ||
            selectedItemAncestors[selectedItemAncestors?.length - 1]?.details?.entityType === 'node'
              ? translatedStrings.secretTabTitle
              : translatedStrings.secretDetailsTabTitle,
        },
        { title: translatedStrings.policyTabTitle },
      ]);
    }
  }, [currentTabIndex, selectedItemAncestors]);

  useEffect(() => {
    setPageHeader(pageTitle, routeToNameList);
  }, []);

  const handleChange = (index) => {
    setTabIndex(index);
    if (index === 1 && isError(consumerListStatus)) {
      dispatch(
        openNotification(errorNotificationType, consumerListError, true, errorNotificationDuration)
      );
    }
  };

  const selectionHandler = (ancestorsArray) => {
    setSelectedItemAncestors(ancestorsArray);
  };

  return (
    <div className={classes.secretsManagerContainer}>
      <SecretsTree
        parentsOfSelectedItem={selectedItemAncestors}
        selectionHandler={selectionHandler}
        history={history}
        match={match}
        location={location}
      />
      <div className={classes.secretsPoliciesTabsContainer} ref={tabContainer}>
        <div className={classes.secretsPoliciesTabsWrapper}>
          <Tabs value={tabIndex} handleChange={handleChange} items={initialTab} variant="auto" />
          <TabPanel value={tabIndex} index={0}>
            {!Boolean(selectedItemAncestors?.length) ||
            selectedItemAncestors[selectedItemAncestors?.length - 1]?.details?.entityType ===
              'node' ? (
              <SecretsList
                selectedItemAncestors={selectedItemAncestors}
                selectionHandler={selectionHandler}
                history={history}
                match={match}
              />
            ) : (
              <SecretView selectedItemAncestors={selectedItemAncestors} history={history} />
            )}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <PolicyList
              selectedItemAncestors={selectedItemAncestors}
              history={history}
              match={match}
            />
          </TabPanel>
        </div>
      </div>
      <BackToTop id={backToTopId} parentRef={tabContainer} />
    </div>
  );
};

AllSecrets.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  storeTabIndex: PropTypes.number,
  currentTabIndex: PropTypes.number,
  location: PropTypes.any,
  consumerListStatus: PropTypes.string,
  consumerListError: PropTypes.string,
};

export default AllSecrets;
