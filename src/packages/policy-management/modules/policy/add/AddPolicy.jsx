import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from 'britive-design-system/core/components/snackbar';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import useValidation from '../../../../../components/use-validation-hook';
import { policyListingPath, RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { isSuccess, resetMembers } from '../../../../../utils/common-utils';
import { areMembersEmpty, massagePolicyBeforeSave } from '../utils';
import AddPolicyForm from './add-policy-form/AddPolicyForm';
import AddPolicyJSONForm from '../../../../../components/policy-admin/add-policy/policy-json-editor';
import './AddPolicy.scss';
import { classes, translatedStrings } from './constants';
import { getJSONValidationSchema, getValidationSchema } from './validation.rules';
import { isEmpty } from 'lodash';

const AddPolicy = ({
  openNotification,
  createPolicy,
  setPageHeader,
  addPolicy,
  fetchUsers,
  usersData,
  usersDataStatus,
  fetchGroups,
  groupsData,
  groupsDataStatus,
  fetchServiceIdentities,
  serviceIdentitiesData,
  serviceIdentitiesDataStatus,
  fetchTokens,
  tokensData,
  tokensDataStatus,
  fetchPermissionsList,
  permissionsList,
  fetchConsumersList,
  consumersList,
  fetchPermissionDetails,
  permissionDetails,
  fetchPermissionActions,
  permissionActionsList,
  permissionActionsListStatus,
  permissionDetailsStatus,
  fetchRolesList,
  rolesListStatus,
  fetchRoleDetails,
  rolesList,
  roleDetails,
  roleDetailsStatus,
  history,
  addPolicyErrors,
  addPolicyStatus,
  editPolicy,
  clonePolicy,
  resetActionsData,
  initSpinnerOverlay,
  permissionsListStatus,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  featureFlags,
}) => {
  const isEditMode = Boolean(editPolicy);
  const isCloneMode = Boolean(clonePolicy);
  const [isJSON, setIsJSON] = useState(false);
  const [showNoMembersDialog, setShowNoMembersDialog] = useState(false);
  const [policyFilterLoading, setPolicyFilterLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [switchForm, setSwitchForm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const buttonText = translatedStrings.switchMode(isJSON);

  useLayoutEffect(() => {
    if (
      !isEmpty(history.location.state) &&
      history.location.state.isFormMode !== undefined &&
      !history.location.state.isFormMode
    ) {
      setIsJSON(true);
    }
  }, []);

  useEffect(() => {
    if (isEditMode) {
      if (editPolicy?.editPolicyStatus === RESOURCE_STATUS.SUCCESS) {
        setValidationErrors(null);
      } else if (editPolicy?.editPolicyStatus === RESOURCE_STATUS.ERROR) {
        setValidationErrors(editPolicy?.editPolicyErrors?.split('|'));
      }
    } else {
      if (addPolicyStatus === RESOURCE_STATUS.SUCCESS) {
        setValidationErrors(null);
      } else if (addPolicyStatus === RESOURCE_STATUS.ERROR) {
        setValidationErrors(addPolicyErrors?.split('|'));
      }
    }
  }, [addPolicyErrors, editPolicy?.editPolicyErrors]);

  useEffect(() => setValidationErrors(null), [isJSON]);

  useEffect(() => {
    if (isSuccess(editPolicy?.loadedPolicyStatus)) {
      setValidationErrors(null);
      if (editPolicy?.loadedPolicy) {
        validationHook.resetValues(editPolicy?.loadedPolicy);
      }
      if (editPolicy?.loadedPolicyJSON) {
        jsonValidationHook.resetValues(editPolicy?.loadedPolicyJSON);
      }
    }
  }, [editPolicy?.loadedPolicyStatus, editPolicy?.loadedPolicy, editPolicy?.loadedPolicyJSON]);

  useEffect(() => {
    if (clonePolicy?.loadedPolicy) validationHook.resetValues(clonePolicy?.loadedPolicy);
  }, [clonePolicy?.loadedPolicy]);

  useEffect(() => {
    if (clonePolicy?.loadedPolicyJSON)
      jsonValidationHook.resetValues({ JSONInputData: clonePolicy?.loadedPolicyJSON });
  }, [clonePolicy?.loadedPolicyJSON]);

  const submitPolicyJSON = (policyJSON) => {
    setValidationErrors(null);
    isEditMode
      ? editPolicy?.updatePolicy(
          {
            ...policyJSON,
          },
          history,
          editPolicy?.loadedPolicy?.name
        )
      : createPolicy({ ...policyJSON }, history);
  };

  const jsonValidationHook = useValidation({
    initialValues: {
      JSONInputData: '',
    },
    validationSchema: getJSONValidationSchema(),
    onSubmit: ({ JSONInputData }) => submitPolicyJSON({ ...JSON.parse(JSONInputData) }),
  });

  const submitPolicy = (values, isDraft) => {
    setValidationErrors(null);
    let policy = massagePolicyBeforeSave(
      { ...values, name: values.name.trim(), isDraft },
      {
        placeHolderCondition: translatedStrings.placeHolderCondition,
        inlineType: translatedStrings.inlineType,
      }
    );

    const getUpdatedPolicyObj = () => {
      if (policy) {
        const { roles, permissions } = values;

        if (areMembersEmpty(validationHook.values)) {
          policy['members'] = {
            users: [],
            tags: [],
            tokens: [],
            serviceIdentities: [],
          };
        }

        if (roles) policy['roles'] = roles.map((role) => ({ id: role.id }));
        if (permissions)
          policy['permissions'] = permissions.map((permission) => {
            const {
              isInline,
              isExistingInline,
              id,
              name,
              description,
              actions,
              resources,
              consumer,
            } = permission;

            let inlinePermission;
            if (isInline) {
              inlinePermission = {
                name,
                description,
                actions: actions.split(','),
                resources: resources.split(','),
                consumer: consumer?.name,
              };
              if (isExistingInline) {
                return { ...inlinePermission, id };
              } else {
                return inlinePermission;
              }
            } else {
              return { id };
            }
          });

        const {
          name,
          description,
          members,
          condition,
          isDraft,
          isActive,
          permissions: newPermissions,
          roles: newRoles,
        } = policy;
        const id = editPolicy?.loadedPolicy?.id;

        if (editPolicy?.loadedPolicy?.isReadOnly) {
          return {
            id,
            isActive: !areMembersEmpty(validationHook.values) || isActive,
            isDraft,
            members,
          };
        } else {
          return {
            id,
            name,
            description,
            members,
            permissions: newPermissions,
            roles: newRoles,
            isActive: !areMembersEmpty(validationHook.values) || isActive,
            condition,
            isDraft,
          };
        }
      }
    };

    isEditMode
      ? editPolicy?.updatePolicy(getUpdatedPolicyObj(), history, editPolicy?.loadedPolicy?.id)
      : createPolicy({ ...policy, isDraft }, history);
  };

  const validationHook = useValidation({
    initialValues: {
      name: '',
      description: '',
      allowDeny: 'Allow',
      allUser: 'none',
      allServiceIdentity: 'none',
      allToken: 'none',
      allGroup: 'none',
      user: [],
      group: [],
      serviceIdentity: [],
      token: [],
      permissions: [],
      roles: [],
      isReadOnly: false,
      isActive: true,
      isDraft: false,
      isIpAddress: false,
      ipAddress: '',
      isDateTime: 'none',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      isApprovals: false,
      notificationMedium: '',
      channelList: [],
      isChannelsRequired: false,
      tagList: [],
      userList: [],
      approvalMaxTime: '',
      validFor: '',
    },
    validationSchema: getValidationSchema(
      setPolicyFilterLoading,
      isEditMode,
      editPolicy,
      openNotification
    ),
    onSubmit: (values) => submitPolicy(values, false),
  });

  useEffect(() => {
    const getPageHeader = () => {
      if (isEditMode) return translatedStrings.editPageTitle;
      else return translatedStrings.pageTitle;
    };
    setPageHeader(getPageHeader(), []);
    getApplicationsList();
  }, []);

  const switchHandler = () => {
    const orgIsJSON = isJSON;
    setSubmit(false);
    setSwitchForm(true);
    setIsJSON(!isJSON);
    if (isEditMode || isCloneMode) {
      if (!orgIsJSON) {
        const jsonPolicy = isEditMode ? editPolicy.loadedPolicyJSON : clonePolicy.loadedPolicyJSON;
        jsonValidationHook.resetValues(jsonPolicy);
      } else {
        const inputPolicy = isEditMode ? editPolicy?.loadedPolicy : clonePolicy?.loadedPolicy;
        validationHook.resetValues(inputPolicy);
      }
    } else {
      validationHook.resetForm();
      jsonValidationHook.resetForm();
    }
    setValidationErrors(null);
  };

  const allFieldsValidationErrors = () => {
    let errors = [];
    for (const key in validationHook.errors) {
      if (validationHook.errors[key]) {
        key !== 'roles' &&
          key !== 'user' &&
          key !== 'group' &&
          key !== 'serviceIdentity' &&
          errors.push(validationHook.errors[key]);
      }
    }
    return errors.length ? errors : null;
  };

  useEffect(() => {
    if (submit && !isJSON) {
      const validationErr = allFieldsValidationErrors();
      if (validationErr) {
        setValidationErrors(validationErr);
      } else {
        setValidationErrors(null);
      }
    }
  }, [validationHook.errors, submit]);
  const postPolicyHandler = () => {
    setSubmit(true);
    if (!isJSON) {
      validationHook.handleSubmit();
    } else {
      jsonValidationHook.handleSubmit();
    }
  };

  const addPolicyFormProps = {
    addPolicyErrors,
    openNotification,
    validationHook,
    addPolicy,
    fetchUsers,
    usersData,
    usersDataStatus,
    fetchGroups,
    groupsData,
    groupsDataStatus,
    fetchServiceIdentities,
    serviceIdentitiesData,
    serviceIdentitiesDataStatus,
    fetchTokens,
    tokensData,
    tokensDataStatus,
    fetchPermissionsList,
    permissionsList,
    fetchConsumersList,
    consumersList,
    fetchPermissionDetails,
    permissionDetails,
    fetchPermissionActions,
    permissionActionsList,
    permissionActionsListStatus,
    permissionDetailsStatus,
    fetchRolesList,
    rolesListStatus,
    fetchRoleDetails,
    rolesList,
    roleDetails,
    roleDetailsStatus,
    policyFilterLoading,
    validationErrors,
    editReadOnly: editPolicy?.editReadOnly,
    isEditMode,
    resetActionsData,
    initSpinnerOverlay,
    permissionsListStatus,
    getApplicationsList,
    applicationsListData,
    applicationsListStatus,
    isCloneMode,
    featureFlags,
  };

  const addPolicyJSONProps = {
    validationHook: jsonValidationHook,
    openNotification,
    editReadOnly: editPolicy?.editReadOnly,
    validationErrors,
    translatedStrings,
  };

  const cancelHandler = () => {
    history.push(policyListingPath);
    validationHook.resetForm();
    setValidationErrors(null);
  };

  const saveDraftHandler = () => {
    if (!isJSON) {
      validationHook.handleBlur(validationHook.names.name);
      submitPolicy(validationHook.values, true);
    } else {
      if (jsonValidationHook.errors.JSONInputData) {
        setValidationErrors([jsonValidationHook.errors.JSONInputData]);
      } else {
        setValidationErrors(null);
      }
      const policyJSON = JSON.parse(jsonValidationHook.values.JSONInputData);
      jsonValidationHook.resetValues({
        JSONInputData: JSON.stringify({ ...policyJSON }, null, 4),
      });
      submitPolicyJSON({ ...policyJSON }, true);
    }
  };

  return (
    <>
      <div className={classes.addPolicyButtonContainer}>
        <div className={classes.addPolicyButtonsContainerLeft}>
          <div className={classes.addPolicyButtonContainerLeft}>
            <Button
              size="medium"
              variant="primary"
              onClick={() => {
                validationHook.handleChange(validationHook.names.isDraft, false);
                if (!isJSON && areMembersEmpty(validationHook.values)) {
                  resetMembers(validationHook);
                  setShowNoMembersDialog(true);
                } else {
                  postPolicyHandler();
                }
              }}
            >
              {isEditMode || isJSON ? translatedStrings.saveBtn : translatedStrings.saveAndEnable}
            </Button>
          </div>
          {!(
            isJSON ||
            (isEditMode &&
              (editPolicy?.loadedPolicy?.isReadOnly || !editPolicy?.loadedPolicy?.isDraft))
          ) && (
            <div className={classes.addPolicyButtonContainerLeft}>
              <Button size="medium" variant="secondary" onClick={saveDraftHandler}>
                {translatedStrings.saveDraft}
              </Button>
            </div>
          )}
          {isEditMode && !editPolicy?.loadedPolicy?.isReadOnly && (
            <div className={classes.addPolicyButtonContainerLeft}>
              <Button
                size="medium"
                variant="secondary"
                onClick={() => {
                  if (isEditMode) {
                    editPolicy?.resetHandler();
                  } else {
                    clonePolicy?.resetHandler();
                  }
                }}
              >
                {translatedStrings.resetBtn}
              </Button>
            </div>
          )}

          <div className={classes.addPolicyButtonContainerLeft}>
            <Button size="medium" variant="secondary" onClick={() => setCancelModal(true)}>
              {translatedStrings.cancelBtn}
            </Button>
          </div>
        </div>
        <Button variant="secondary" size="medium" onClick={() => setSwitchForm(true)}>
          {buttonText}
        </Button>
      </div>
      {validationErrors && (
        <div className={classes.addPolicySnackbar}>
          <Snackbar title={translatedStrings.errorBarTitle} errorList={validationErrors} />
        </div>
      )}

      {isJSON ? (
        <AddPolicyJSONForm {...addPolicyJSONProps} />
      ) : (
        <AddPolicyForm {...addPolicyFormProps} />
      )}
      {cancelModal && (
        <DialogPopup
          type="alert"
          title={translatedStrings.cancelModalTitle}
          message={translatedStrings.cancelAddPolicyMessage}
          primaryButtonText={translatedStrings.cancelModalPrimaryBtn}
          secondaryButtonText={translatedStrings.noBtn}
          onSubmit={() => {
            cancelHandler();
          }}
          onCancel={() => {
            setCancelModal(false);
          }}
        />
      )}
      {switchForm && (
        <DialogPopup
          type="alert"
          title={`${buttonText}?`}
          message={translatedStrings.switchModeChangeDialogMessage(isJSON)}
          primaryButtonText={translatedStrings.switchModeChangeDialogButton(isJSON)}
          secondaryButtonText={translatedStrings.noBtn}
          onSubmit={() => {
            switchHandler();
            setSwitchForm(false);
          }}
          onCancel={() => {
            setSwitchForm(false);
          }}
        />
      )}
      {showNoMembersDialog && (
        <DialogPopup
          height="320px"
          type="alert"
          title={translatedStrings.membersDialogTitle}
          message={translatedStrings.membersDialogMessage}
          primaryButtonText={translatedStrings.membersDialogPrimaryBtnText}
          secondaryButtonText={translatedStrings.membersDialogSecondaryBtnText}
          onSubmit={() => {
            setShowNoMembersDialog(false);
            postPolicyHandler();
          }}
          onCancel={() => {
            setShowNoMembersDialog(false);
          }}
        />
      )}
    </>
  );
};

AddPolicy.propTypes = {
  history: PropTypes.any,
  addPolicyErrors: PropTypes.any,
  addPolicyStatus: PropTypes.string,
  openNotification: PropTypes.func,
  createPolicy: PropTypes.func,
  setPageHeader: PropTypes.func,
  addPolicy: PropTypes.func,
  fetchUsers: PropTypes.func,
  usersData: PropTypes.array,
  usersDataStatus: PropTypes.string,
  fetchGroups: PropTypes.func,
  groupsData: PropTypes.array,
  groupsDataStatus: PropTypes.string,
  fetchServiceIdentities: PropTypes.func,
  serviceIdentitiesData: PropTypes.array,
  serviceIdentitiesDataStatus: PropTypes.string,
  fetchTokens: PropTypes.func,
  tokensData: PropTypes.array,
  tokensDataStatus: PropTypes.string,
  fetchPermissionsList: PropTypes.func,
  permissionsList: PropTypes.array,
  fetchConsumersList: PropTypes.func,
  consumersList: PropTypes.array,
  fetchPermissionDetails: PropTypes.func,
  permissionDetails: PropTypes.any,
  fetchPermissionActions: PropTypes.func,
  permissionActionsList: PropTypes.array,
  permissionActionsListStatus: PropTypes.string,
  permissionDetailsStatus: PropTypes.string,
  fetchRolesList: PropTypes.func,
  rolesListStatus: PropTypes.any,
  fetchRoleDetails: PropTypes.func,
  rolesList: PropTypes.array,
  roleDetails: PropTypes.any,
  roleDetailsStatus: PropTypes.string,
  editPolicy: PropTypes.any,
  clonePolicy: PropTypes.any,
  resetActionsData: PropTypes.func,
  initSpinnerOverlay: PropTypes.func,
  permissionsListStatus: PropTypes.string,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  featureFlags: PropTypes.any,
};

export default AddPolicy;
