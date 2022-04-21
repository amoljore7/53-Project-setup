import React, { useEffect, useState } from 'react';
import Typography from 'britive-design-system/core/components/typography';
import { classes } from './constants';
import PropTypes from 'prop-types';
import Pill from 'britive-design-system/core/components/pill';
import classNames from 'classnames';
import Spinner from 'britive-design-system/core/components/spinner';
import { IS_SLACK, medium, papServiceConsumer } from '../../../../utils/common-constants';
import { isEmpty } from 'lodash';
import { getMembers, getTimeInHMFromMinutes, isLoading } from '../../../../utils/common-utils';
import './ViewApprovals.scss';

const pillClass = {
  [classes.marginTop10]: true,
  [classes.tagsContainer]: true,
};

function PolicyViewApprovals({
  policyViewData,
  fetchedUsers,
  fetchedGroups,
  notificationMediumData,
  notificationMediumDataStatus,
  channelListStatus,
  channelListData,
  translatedStrings,
  approvalLabels,
  viewPolicyHeaders,
  consumer,
}) {
  const { approval: approvalData = {} } = JSON.parse(policyViewData || '{}');
  const [approvalMembersData, setApprovalMembersData] = useState(null);

  useEffect(() => {
    if (
      !isEmpty(approvalData) &&
      !isLoading(notificationMediumDataStatus) &&
      !isLoading(channelListStatus)
    ) {
      const fetchedMembers = {
        users: fetchedUsers,
        groups: fetchedGroups,
        channels: channelListData,
      };
      const data = {
        users: approvalData?.approvers?.userIds,
        tags: approvalData?.approvers?.tags,
        channels: approvalData?.approvers?.channelIds,
      };
      const members = getMembers(data, fetchedMembers, true);
      setApprovalMembersData(members);
    }
  }, [fetchedUsers, fetchedGroups, notificationMediumDataStatus, channelListStatus]);

  return (
    <div className={classes.container}>
      <div className={classes.headerClass}>
        <Typography variant="pageSectionHeader"> {viewPolicyHeaders?.approvals} </Typography>
      </div>
      {isLoading(channelListStatus) || isLoading(notificationMediumDataStatus) ? (
        <div className={classes.approvalLoaderContainer}>
          <Spinner size={medium} />
        </div>
      ) : (
        <>
          <div className={classes.marginTop32}>
            <Typography variant="label2"> {approvalLabels.approvalRequired} </Typography>
            <div className={classes.marginTop8}>
              <Typography variant="label1">
                {notificationMediumData?.name
                  ? translatedStrings.yesText
                  : translatedStrings.noText}
              </Typography>
            </div>
          </div>
          <div className={classes.marginTop32}>
            <Typography variant="label2"> {approvalLabels.notification} </Typography>
            <div className={classes.marginTop8}>
              <Typography variant="label1">
                {notificationMediumData?.name || translatedStrings.noneText}
              </Typography>
            </div>
          </div>
          <div className={classes.marginTop32}>
            <Typography variant="label2"> {approvalLabels.userListLabel} </Typography>
            <div className={classes.marginTop8}>
              <div className={classNames({ ...pillClass })}>
                {approvalMembersData?.users ? (
                  approvalMembersData?.users?.map((item) => {
                    return (
                      <div key={item} className={classes.viewPolicyPermissionActionPillContainer}>
                        <Pill readOnly={true} key={item.name} label={item.name} />
                      </div>
                    );
                  })
                ) : (
                  <Typography variant="label1"> {translatedStrings.noneText} </Typography>
                )}
              </div>
            </div>
          </div>
          <div className={classes.marginTop32}>
            <Typography variant="label2"> {approvalLabels.tagListLabel} </Typography>
            <div className={classes.marginTop8}>
              <div className={classNames({ ...pillClass })}>
                {approvalMembersData?.tags ? (
                  approvalMembersData?.tags?.map((item) => {
                    return (
                      <div key={item} className={classes.viewPolicyPermissionActionPillContainer}>
                        <Pill readOnly={true} key={item.name} label={item.name} />
                      </div>
                    );
                  })
                ) : (
                  <Typography variant="label1"> {translatedStrings.noneText} </Typography>
                )}
              </div>
            </div>
          </div>
          {notificationMediumData?.type === IS_SLACK && (
            <div className={classes.marginTop32}>
              <Typography variant="label2"> {approvalLabels.channelListLabel} </Typography>
              <div className={classNames({ ...pillClass })}>
                {approvalMembersData?.channels ? (
                  approvalMembersData?.channels?.map((item) => {
                    return (
                      <div key={item} className={classes.viewPolicyPermissionActionPillContainer}>
                        <Pill readOnly={true} key={item.name} label={item.name} />
                      </div>
                    );
                  })
                ) : (
                  <Typography variant="label1"> {translatedStrings.noneText} </Typography>
                )}
              </div>
            </div>
          )}
          <div className={classes.marginTop32}>
            <Typography variant="label2"> {approvalLabels.time} </Typography>
            <div className={classes.marginTop8}>
              <Typography variant="label1">
                {isNaN(Number(approvalData?.timeToApprove))
                  ? translatedStrings.noneText
                  : getTimeInHMFromMinutes(approvalData?.timeToApprove, translatedStrings)}
              </Typography>
            </div>
          </div>
          {consumer !== papServiceConsumer && (
            <div className={classes.marginTop32}>
              <Typography variant="label2"> {approvalLabels.maxValidTimeLabel} </Typography>
              <div className={classes.marginTop8}>
                <Typography variant="label1">
                  {isNaN(Number(approvalData?.validFor))
                    ? translatedStrings.noneText
                    : getTimeInHMFromMinutes(approvalData?.validFor, translatedStrings)}
                </Typography>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
PolicyViewApprovals.propTypes = {
  policyViewData: PropTypes.string,
  fetchedGroups: PropTypes.array,
  fetchedUsers: PropTypes.array,
  notificationMediumData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    referenceCount: PropTypes.number,
    connectionParameters: PropTypes.object,
  }),
  notificationMediumDataStatus: PropTypes.string,
  channelListStatus: PropTypes.string,
  channelListData: PropTypes.array,
  translatedStrings: PropTypes.object,
  approvalLabels: PropTypes.shape({
    approvalRequired: PropTypes.string,
    notification: PropTypes.string,
    type: PropTypes.string,
    approvers: PropTypes.string,
    time: PropTypes.string,
    userListLabel: PropTypes.string,
    tagListLabel: PropTypes.string,
    channelListLabel: PropTypes.string,
    maxValidTimeLabel: PropTypes.string,
  }),
  viewPolicyHeaders: PropTypes.shape({
    general: PropTypes.string,
    members: PropTypes.string,
    generic: PropTypes.string,
    approvals: PropTypes.string,
  }),
  consumer: PropTypes.string,
};

export default PolicyViewApprovals;
