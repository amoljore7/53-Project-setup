import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import React from 'react';
import { papServiceConsumer } from '../../../../utils/common-constants';
import { classes } from './constants';
import Member from './Member';
import './Members.scss';
function PolicyViewMembers({ memberData, memberLabels, translatedStrings, viewPolicyHeaders, consumer }) {
  return (
    <div className={classes.container}>
      <div className={classes.headerClass}>
        <Typography variant="pageSectionHeader"> {viewPolicyHeaders?.members} </Typography>
      </div>
      <Member
        label={memberLabels?.user}
        entities={memberData?.users}
        translatedStrings={translatedStrings}
        allEntitiesLabel={translatedStrings.allUsers}
      />
      <Member
        label={memberLabels?.tags}
        entities={memberData?.tags}
        translatedStrings={translatedStrings}
        allEntitiesLabel={translatedStrings.allTags}
      />
      <Member
        label={memberLabels?.identities}
        entities={memberData?.serviceIdentities}
        translatedStrings={translatedStrings}
        allEntitiesLabel={translatedStrings.allSeviceIdentities}
      />
      {consumer !== papServiceConsumer && (
      <Member
        label={memberLabels?.tokens}
        entities={memberData?.tokens}
        translatedStrings={translatedStrings}
        allEntitiesLabel={translatedStrings.allTokens}
      />)}
    </div>
  );
}

PolicyViewMembers.propTypes = {
  translatedStrings: PropTypes.object,
  memberData: PropTypes.shape({
    users: PropTypes.oneOf([undefined, PropTypes.array]),
    tags: PropTypes.oneOf([undefined, PropTypes.array]),
    channels: PropTypes.oneOf([undefined, PropTypes.array]),
    serviceIdentities: PropTypes.oneOf([undefined, PropTypes.array]),
    tokens: PropTypes.oneOf([undefined, PropTypes.array]),
  }),
  memberLabels: PropTypes.shape({
    user: PropTypes.string,
    tags: PropTypes.string,
    identities: PropTypes.string,
    tokens: PropTypes.string,
  }),
  viewPolicyHeaders: PropTypes.shape({
    general: PropTypes.string,
    members: PropTypes.string,
    generic: PropTypes.string,
    approvals: PropTypes.string,
  }),
  consumer: PropTypes.string,
};

export default PolicyViewMembers;
