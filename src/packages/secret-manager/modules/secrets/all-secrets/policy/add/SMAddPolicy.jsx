import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from 'britive-design-system/core/components/snackbar';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMetadataRequest } from '../../../../../../../components/policy/metadata/actions';
import useValidation from '../../../../../../../components/use-validation-hook';
import {
  ALLOW,
  allSecretsPath,
  createPolicyAction,
  errorNotificationDuration,
  medium,
  smConsumer,
} from '../../../../../../../utils/common-constants';
import {
  isError,
  isSuccess,
  resetMembers,
  useQuery,
} from '../../../../../../../utils/common-utils';
import { areMembersEmpty, massagePolicyBeforeSave } from '../utils';
import AddPolicyForm from './add-policy-form/SMAddPolicyForm';
import AddPolicyJSONForm from '../../../../../../../components/policy-admin/add-policy/policy-json-editor';
import './SMAddPolicy.scss';
import {
  classes,
  pathSeparator,
  rootNodePath,
  translatedStrings,
  getPolicyActions,
  SECRET,
} from './constants';
import { addString } from '../../constants';
import { getJSONValidationSchema, getValidationSchema } from './validation.rules';
import { useLocation } from 'react-router';
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
  history,
  addPolicyErrors,
  addPolicyStatus,
  editPolicy,
  initSpinnerOverlay,
  nodeSecretMetadataState,
}) => {
  const isEditMode = Boolean(editPolicy);
  const [isJSON, setIsJSON] = useState(false);
  const [showNoMembersDialog, setShowNoMembersDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [switchForm, setSwitchForm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const buttonText = translatedStrings.switchMode(isJSON);
  const resourcePath = useQuery().get('path');
  let { state: { allAncestorItems = [] } = {} } = useLocation();
  const dispatch = useDispatch();
  const {
    result: nodeSecretMetadata,
    loading: nodeSecretMetadataLoading,
    error: nodeSecretMetadataError,
  } = nodeSecretMetadataState;

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
    !Object.keys(nodeSecretMetadata).length &&
      !nodeSecretMetadataLoading &&
      dispatch(getMetadataRequest(getPolicyActions(resourcePath), resourcePath));
  }, []);

  useEffect(() => {
    if (nodeSecretMetadataLoading) {
      initSpinnerOverlay({
        open: nodeSecretMetadataLoading,
        size: medium,
        message: translatedStrings.loadingMetadata,
      });
    }
  }, [nodeSecretMetadataLoading]);

  useEffect(() => {
    if (nodeSecretMetadataError) {
      openNotification(
        'error',
        translatedStrings.getMetadataErrorMessage(nodeSecretMetadataError),
        errorNotificationDuration
      );
      history.push({ pathname: allSecretsPath, state: { previousPath: addString } });
    }
  }, [nodeSecretMetadataError]);

  useEffect(() => {
    if (
      !nodeSecretMetadataLoading &&
      Object.keys(nodeSecretMetadata).length &&
      nodeSecretMetadata[createPolicyAction] !== ALLOW
    ) {
      openNotification('error', translatedStrings.noAccessToAddPolicy, errorNotificationDuration);
      history.push({ pathname: allSecretsPath, state: { previousPath: addString } });
    }
  }, [nodeSecretMetadata, nodeSecretMetadataLoading]);

  useEffect(() => {
    if (isEditMode) {
      if (isSuccess(editPolicy?.editPolicyStatus)) {
        setValidationErrors(null);
      } else if (isError(editPolicy?.editPolicyStatus)) {
        setValidationErrors(editPolicy?.editPolicyErrors?.split('|'));
      }
    } else {
      if (isSuccess(addPolicyStatus)) {
        setValidationErrors(null);
      } else if (isError(addPolicyStatus)) {
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

  const submitPolicyJSON = (policyJSON) => {
    setValidationErrors(null);
    isEditMode
      ? editPolicy?.updatePolicy(
          {
            ...policyJSON,
            id: editPolicy?.loadedPolicy.id,
          },
          history,
          policyJSON?.resource || '/*',
          editPolicy?.loadedPolicy.name,
        )
      : createPolicy(
          {
            data: { ...policyJSON },
          },
          history,
          policyJSON?.resource || '/*'
        );
  };

  const jsonValidationHook = useValidation({
    initialValues: {
      JSONInputData: '',
    },
    validationSchema: getJSONValidationSchema(),
    onSubmit: ({ JSONInputData }) => {
      submitPolicyJSON({ ...JSON.parse(JSONInputData) });
    },
  });

  const submitPolicy = (values, isDraft) => {
    setValidationErrors(null);
    let policy = massagePolicyBeforeSave(
      { ...values, name: values.name.trim(), isDraft },
      {
        placeHolderCondition: translatedStrings.placeHolderCondition,
        inlineType: translatedStrings.inlineType,
      },
      false
    );

    const getUpdatedPolicyObj = () => {
      if (policy) {
        if (areMembersEmpty(validationHook.values)) {
          policy['members'] = {
            users: [],
            tags: [],
            tokens: [],
            serviceIdentities: [],
          };
        }

        const {
          name,
          description,
          members,
          condition,
          isDraft,
          isActive,
          accessLevel,
          consumer,
          resource,
        } = policy;
        const id = editPolicy?.loadedPolicy?.id;

        if (editPolicy?.loadedPolicy?.isReadOnly) {
          return {
            id,
            isActive,
            isDraft,
            members,
            accessLevel,
            consumer,
            resource,
          };
        } else {
          return {
            id,
            name,
            description,
            members,
            isActive: areMembersEmpty(validationHook.values) ? false : isActive,
            condition,
            isDraft,
            accessLevel,
            consumer,
            resource,
          };
        }
      }
    };
    isEditMode
      ? editPolicy?.updatePolicy(
          getUpdatedPolicyObj(),
          history,
          policy?.resource,
          isJSON ? editPolicy?.loadedPolicy.name : editPolicy?.loadedPolicy?.id
        )
      : createPolicy(
          {
            data: { ...policy, isDraft },
          },
          history,
          policy?.resource
        );
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
      approverType: 'users',
      approvers: [],
      accessLevel: 'SM_View',
      consumer: smConsumer,
      isReadOnly: false,
      isActive: true,
      isDraft: false,
      resource: resourcePath === pathSeparator ? rootNodePath : resourcePath,
      includeHierarchy: resourcePath === pathSeparator ? true : false,
    },
    validationSchema: getValidationSchema(editPolicy),
    onSubmit: (values) => submitPolicy(values, false),
  });

  useEffect(() => {
    const getPageHeader = () => {
      return resourcePath
        ? isEditMode
          ? translatedStrings.editPageTitle +
            ` @ ${resourcePath === pathSeparator ? rootNodePath : resourcePath}`
          : translatedStrings.pageTitle +
            ` @ ${resourcePath === pathSeparator ? rootNodePath : resourcePath}`
        : isEditMode
        ? translatedStrings.editPageTitle
        : translatedStrings.pageTitle;
    };
    setPageHeader(getPageHeader(), []);
  }, []);

  const switchHandler = () => {
    const orgIsJSON = isJSON;
    setSubmit(false);
    setSwitchForm(true);
    setIsJSON(!isJSON);
    if (isEditMode) {
      if (!orgIsJSON) {
        const jsonPolicy = editPolicy.loadedPolicyJSON;
        jsonValidationHook.resetValues(jsonPolicy);
      } else {
        validationHook.resetValues(editPolicy?.loadedPolicy);
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
    validationErrors,
    editReadOnly: editPolicy?.editReadOnly,
    isEditMode,
    initSpinnerOverlay,
    hideIncludeBelowHierarchyOption:
      allAncestorItems[allAncestorItems.length - 1]?.details?.entityType === SECRET,
  };

  const addPolicyJSONProps = {
    validationHook: jsonValidationHook,
    openNotification,
    editReadOnly: editPolicy?.editReadOnly,
    validationErrors,
    translatedStrings,
  };

  const cancelHandler = () => {
    history.push({ pathname: allSecretsPath, state: { previousPath: addString } });
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
          {isEditMode && (
            <div className={classes.addPolicyButtonContainerLeft}>
              <Button
                size="medium"
                variant="secondary"
                onClick={() => {
                  if (isEditMode) {
                    editPolicy?.resetHandler();
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
  match: PropTypes.any,
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
  editPolicy: PropTypes.any,
  initSpinnerOverlay: PropTypes.func,
  vaultDetailsData: PropTypes.any,
  nodeSecretMetadataState: PropTypes.any,
};

export default AddPolicy;
