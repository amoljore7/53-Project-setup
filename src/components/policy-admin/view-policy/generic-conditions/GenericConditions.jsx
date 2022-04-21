import React from 'react';
import Typography from 'britive-design-system/core/components/typography';
import { classes, DATE, dateFormat, TIME } from './constants';
import PropTypes from 'prop-types';
import {
  getFormattedLocalDateString,
  getFormattedLocalTimeString,
} from '../../../../utils/common-utils';
import './GenericConditions.scss';

function PolicyGenericConditions({
  policyViewData = {},
  translatedStrings,
  conditionsLabels,
  viewPolicyHeaders,
}) {
  const { condition } = policyViewData ?? {};
  const conditionJSON = condition ? JSON.parse(condition) : null;
  const isDateTime = conditionJSON?.timeOfAccess
    ? conditionJSON?.timeOfAccess.from.includes('-')
      ? DATE
      : TIME
    : 'none';

  const getDateTime = (isStartDate) => {
    if (policyViewData?.condition) {
      if (isDateTime === DATE)
        return getFormattedLocalDateString(
          conditionJSON?.timeOfAccess[isStartDate ? 'from' : 'to'],
          dateFormat
        );
      else if (isDateTime === TIME)
        return getFormattedLocalTimeString(
          `01/01/1970 ${conditionJSON?.timeOfAccess[isStartDate ? 'from' : 'to']}`,
          dateFormat
        );
      else return null;
    } else return null;
  };

  const getDateTimeLabel = (isStartDate) => {
    if (isDateTime === TIME) return conditionsLabels[isStartDate ? 'startTime' : 'endTime'];
    else return isStartDate ? conditionsLabels.startDate : conditionsLabels.endDate;
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.headerClass}>
          <Typography variant="pageSectionHeader"> {viewPolicyHeaders?.generic} </Typography>
        </div>
        <div className={classes.marginTop32}>
          <Typography variant="label2"> {conditionsLabels?.ip} </Typography>
          <div className={classes.marginTop8}>
            <Typography variant="label1">
              {(policyViewData?.condition && JSON.parse(policyViewData?.condition)?.ipAddress) ||
                translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
        <div className={classes.marginTop32}>
          <Typography variant="label2"> {getDateTimeLabel(true)} </Typography>
          <div className={classes.marginTop8}>
            <Typography variant="label1">
              {getDateTime(true) || translatedStrings.noneText}
            </Typography>
          </div>
        </div>
        <div className={classes.marginTop32}>
          <Typography variant="label2"> {getDateTimeLabel(false)} </Typography>
          <div className={classes.marginTop8}>
            <Typography variant="label1">
              {getDateTime(false) || translatedStrings.noneText}
            </Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

PolicyGenericConditions.propTypes = {
  policyViewData: PropTypes.object,
  translatedStrings: PropTypes.object,
  conditionsLabels: PropTypes.shape({
    ip: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  viewPolicyHeaders: PropTypes.shape({
    general: PropTypes.string,
    members: PropTypes.string,
    generic: PropTypes.string,
    approvals: PropTypes.string,
  }),
};
export default PolicyGenericConditions;
