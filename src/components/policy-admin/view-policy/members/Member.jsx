import React from 'react';
import Typography from 'britive-design-system/core/components/typography';
import Pill from 'britive-design-system/core/components/pill';
import { classes, inactiveStatus } from './constants';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import './Members.scss';

const pillClass = {
  [classes.marginTop10]: true,
  [classes.tagsContainer]: true,
};

const Member = ({ label, entities, translatedStrings, allEntitiesLabel }) => {
  return (
    <div className={classes.marginTop32}>
      <Typography variant="label2"> {label} </Typography>
      {isEmpty(entities) ? (
        <div className={classes.marginTop8}>
          <Typography variant="label1">{translatedStrings?.noneText}</Typography>
        </div>
      ) : (
        <div className={classNames({ ...pillClass })}>
          {entities?.map((entity, idx) => {
            return (
              entity && (
                <div key={entity.name || idx} className={classes.viewMembersPillContainer}>
                  <Pill
                    readOnly={true}
                    label={
                      entity === '*'
                        ? allEntitiesLabel
                        : entity.status.toLowerCase() === inactiveStatus
                        ? `${entity.name} (${translatedStrings.inactiveText})`
                        : entity.name
                    }
                  />
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

Member.propTypes = {
  label: PropTypes.string,
  allEntitiesLabel: PropTypes.string,
  entities: PropTypes.array,
  translatedStrings: PropTypes.object,
};
export default Member;
