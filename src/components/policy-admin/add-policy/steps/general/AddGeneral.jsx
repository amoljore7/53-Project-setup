import DialogPopup from 'britive-design-system/core/components/dialog';
import Radio from 'britive-design-system/core/components/radio';
import Spinner from 'britive-design-system/core/components/spinner';
import Textarea from 'britive-design-system/core/components/textarea';
import TextField from 'britive-design-system/core/components/textfield';
import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ALLOW, DENY, papServiceConsumer } from '../../../../../utils/common-constants';
import { rootNodePath, classes } from './constants';
import IncludeHierarchy from './IncludeHierarchy';
import './AddGeneral.scss';

const General = ({
  validationHook,
  policyFilterLoading,
  isEditMode,
  hideIncludeBelowHierarchyOption,
  translatedStrings,
  isSMPolicy,
  consumer,
}) => {
  const [showDenyDialog, setShowDenyDialog] = useState(false);

  const [changedToDeny, setChangeToDeny] = useState(false);

  useEffect(() => {
    consumer === papServiceConsumer && validationHook.handleChange(validationHook.names.allowDeny, ALLOW);
  }, [])
  useEffect(() => {
    changedToDeny && setShowDenyDialog(validationHook.values.allowDeny === DENY);
  }, [validationHook.values.allowDeny, changedToDeny]);

  const allowOptions = [
    { label: translatedStrings.allow, value: 'Allow' },
    { label: translatedStrings.deny, value: 'Deny' },
  ];
  const includeHierarchyOptions = [
    { label: translatedStrings.yesLabel, value: true },
    { label: translatedStrings.noLabel, value: false },
  ];

  const nameProps = {
    width: '512px',
    label: translatedStrings.policyNameLabel,
    value: validationHook.values.name,
    onBlur: () => validationHook.handleBlur(validationHook.names.name),
    onChange: (e) => validationHook.handleChange(validationHook.names.name, e.target.value),
    error: validationHook.touched.name && Boolean(validationHook.errors.name),
    errorMsg: validationHook.errors.name,
  };

  const descriptionProps = {
    width: '512px',
    height: '70px',
    label: translatedStrings.description,
    helperText: translatedStrings.descriptionHelperLabel,
    value: validationHook.values.description,
    onBlur: () => validationHook.handleBlur(validationHook.names.description),
    onChange: (e) => validationHook.handleChange(validationHook.names.description, e.target.value),
    error: validationHook.touched.description && Boolean(validationHook.errors.description),
    errorMsg: validationHook.errors.description,
  };

  const accessTypeProps = {
    defaultValue: validationHook.values.allowDeny,
    label: translatedStrings.accessType,
    name: 'access-type',
    direction: 'vertical',
    onChange: (e) => {
      if (e.target.value === DENY) {
        setChangeToDeny(true);
      }
      validationHook.handleChange(validationHook.names.allowDeny, e.target.value);
    },
    options: allowOptions,
  };

  const includeHierarchyProps = {
    defaultValue: validationHook.values.includeHierarchy,
    label: translatedStrings.includeHierarchyBelowPath,
    name: 'resource-type',
    direction: 'vertical',
    onChange: (e) => {
      const isIncludeHierarchy = e.target.value === 'true';
      validationHook.handleChange(validationHook.names.includeHierarchy, isIncludeHierarchy);
      let newResource;
      if (isIncludeHierarchy) {
        if (!(validationHook.values.resource || '').includes(rootNodePath)) {
          newResource = validationHook.values.resource.concat(rootNodePath);
          validationHook.handleChange(
            validationHook.names.resource,
            validationHook.values.resource.concat(rootNodePath)
          );
        }
      } else {
        newResource = validationHook.values.resource.replace(rootNodePath, '');
        validationHook.handleChange(
          validationHook.names.resource,
          validationHook.values.resource.replace(rootNodePath, '')
        );
      }
      validationHook.handleChange(
        validationHook.names.permissions,
        validationHook.values.permissions?.map((permission) => ({
          ...permission,
          resources: newResource,
        }))
      );
    },
    options: includeHierarchyOptions,
    includeHierarchy: validationHook.values.includeHierarchy,
    resource: validationHook.values.resource,
    classes,
    translatedStrings,
  };

  return (
    <div className={classes.stepperMainContainer}>
      <div className={classes.addPolicyFieldWrapper}>
        <div className={classes.formNameLoaderWrapper}>
          <TextField {...nameProps} />
          <div className={classes.formNameCheckLoader}>
            {policyFilterLoading && <Spinner size="small" />}
          </div>
        </div>
      </div>
      <div className={classes.addPolicyFieldWrapper}>
        <Textarea {...descriptionProps} />
      </div>
      {consumer !== papServiceConsumer && (
        <> 
          {!isEditMode && (
            <div className={classes.addPolicyFieldWrapper}>
              <Radio {...accessTypeProps} />
            </div>
          )}
          {isEditMode && (
            <div className={classes.addPolicyFieldWrapper}>
              <Typography variant="label2">{translatedStrings.accessType}</Typography>
              <div className={classes.addPolicyFieldValueWrapper}>
                <Typography variant="label1">{validationHook.values.allowDeny}</Typography>
              </div>
            </div>
          )}
          <div className={classes.addPolicyFieldWrapper}>
            <Typography variant="label2">{translatedStrings.resource}</Typography>
            <div className={classes.addPolicyFieldValueWrapper}>
              <Typography variant="label1">{validationHook.values.resource}</Typography>
            </div>
          </div>
          {isSMPolicy && !isEditMode && !hideIncludeBelowHierarchyOption && (
            <IncludeHierarchy {...includeHierarchyProps} />
          )}
          {showDenyDialog && (
            <DialogPopup
              type="alert"
              title={translatedStrings.removeApprovalsTitle}
              message={translatedStrings.removeApprovalsMessage}
              primaryButtonText={translatedStrings.yesRemoveApprovals}
              secondaryButtonText={translatedStrings.noLabel}
              onSubmit={() => {
                const {
                  isApprovals,
                  notificationMedium,
                  channelList,
                  isChannelsRequired,
                  tagList,
                  userList,
                  approvalMaxTime,
                  validFor,
                  allowDeny,
                } = validationHook.names;

                validationHook.handleChange(allowDeny, DENY);
                validationHook.handleChange(isApprovals, false);
                validationHook.handleChange(notificationMedium, '');
                validationHook.handleChange(tagList, []);
                validationHook.handleChange(userList, []);
                validationHook.handleChange(isChannelsRequired, false);
                validationHook.handleChange(channelList, []);
                validationHook.handleChange(approvalMaxTime, '');
                validationHook.handleChange(validFor, '');
                setShowDenyDialog(false);
              }}
              onCancel={() => {
                validationHook.handleChange(validationHook.names.allowDeny, ALLOW);
                setShowDenyDialog(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

General.propTypes = {
  policyFilterLoading: PropTypes.bool,
  validationHook: PropTypes.object,
  isEditMode: PropTypes.bool,
  hideIncludeBelowHierarchyOption: PropTypes.bool,
  translatedStrings: PropTypes.object,
  isSMPolicy: PropTypes.bool,
  consumer: PropTypes.string,
};
export default General;
