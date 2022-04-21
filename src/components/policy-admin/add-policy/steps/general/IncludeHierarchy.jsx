import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import Radio from 'britive-design-system/core/components/radio';
import { rootNodePath } from './constants';

// eslint-disable-next-line react/prop-types
const IncludeHierarchy = ({ resource, includeHierarchy, classes, translatedStrings, ...rest }) => {
  return resource !== rootNodePath ? (
    <div className={classes.addPolicyFieldWrapper}>
      <Radio {...rest} />
    </div>
  ) : (
    <div className={classes.addPolicyFieldWrapper}>
      <Typography variant="label2"> {translatedStrings.includeHierarchyBelowPath} </Typography>
      <div className={classes.addPolicyFieldValueWrapper}>
        <Typography variant="label1">
          {includeHierarchy ? translatedStrings.yesLabel : translatedStrings.noLabel}
        </Typography>
      </div>
    </div>
  );
};

IncludeHierarchy.propTypes = {
  resource: PropTypes.any,
  includeHierarchy: PropTypes.string,
  classes: PropTypes.object,
  translatedStrings: PropTypes.object,
};
export default IncludeHierarchy;
