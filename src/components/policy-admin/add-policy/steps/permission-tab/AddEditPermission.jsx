import ModalPopup from 'britive-design-system/core/components/modal-popup';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import Select from 'britive-design-system/core/components/select';
import Textfield from 'britive-design-system/core/components/textfield';
import Textarea from 'britive-design-system/core/components/textarea';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Spinner from 'britive-design-system/core/components/spinner';
import Typography from 'britive-design-system/core/components/typography/typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { classes, appsConsumer } from './constants';
import { isLoading, isSuccess } from '../../../../../utils/common-utils';

const AddEditPermission = ({
  addPermissionHook,
  permissionActionsList,
  permissionActionsListStatus,
  fetchConsumersList,
  consumersList,
  fetchPermissionActions,
  saveHandler,
  cancelHandler,
  resetHandler,
  permissionFilterLoading,
  resetActionsData,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  translatedStrings,
}) => {
  const { description, consumer, resources, actions, name, applications } = addPermissionHook.names;
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  useEffect(() => {
    resetActionsData();
    const { isExistingInline, consumer } = addPermissionHook.values;
    fetchConsumersList();
    if (consumer?.name || isExistingInline) {
      resetActionsData();
      fetchPermissionActions(consumer?.name);
    }
  }, []);

  const CancelBtn = {
    text: translatedStrings.cancelBtn,
    variant: 'secondary',
    onClick: () => {
      setCancelModalOpen(true);
    },
    size: 'large',
  };

  const EditActionButtons = [
    {
      text: translatedStrings.saveBtn,
      variant: 'primary',
      onClick: () => {
        if (addPermissionHook.isValid()) {
          setSaveModalOpen(true);
        } else {
          addPermissionHook.handleSubmit();
        }
      },
      size: 'large',
    },
    {
      text: translatedStrings.resetBtn,
      variant: 'secondary',
      onClick: () => {
        setResetModalOpen(true);
      },
      size: 'large',
    },
    {
      ...CancelBtn,
    },
  ];

  const AddActionButtons = [
    {
      text: 'Add',
      variant: 'primary',
      onClick: () => {
        addPermissionHook.handleSubmit();
      },
      size: 'large',
    },
    {
      ...CancelBtn,
    },
  ];
  return (
    <>
      <ModalPopup
        width={512}
        title={
          addPermissionHook.values.isInline
            ? translatedStrings.editPermissionTitle
            : translatedStrings.addNewPermissionTitle
        }
        buttons={addPermissionHook.values.isInline ? EditActionButtons : AddActionButtons}
        onCancel={() => {
          setCancelModalOpen(true);
        }}
      >
        <div className={classes.addPolicyWrapper}>
          <div className={classes.addPolicyFieldWrapper}>
            <div className={classes.formNameLoaderWrapper}>
              <div className={classes.permissionNameFieldContainer}>
                <Textfield
                  name="name"
                  value={addPermissionHook.values.name}
                  onChange={(e) => {
                    addPermissionHook.handleChange(name, e.target.value);
                  }}
                  onBlur={() => addPermissionHook.handleBlur(name)}
                  label={translatedStrings.permissionNameLabel}
                  type="text"
                  width={'420px'}
                  error={addPermissionHook.touched.name && Boolean(addPermissionHook.errors.name)}
                  errorMsg={addPermissionHook.errors.name}
                />
                <div className={classes.formPermissionNameCheckLoader}>
                  {permissionFilterLoading && <Spinner size="small" />}
                </div>
              </div>
            </div>
            <div className={classes.addPolicyFieldWrapper}>
              <Textarea
                name="description"
                value={addPermissionHook.values.description}
                onChange={(e) => {
                  addPermissionHook.handleChange(description, e.target.value);
                }}
                onBlur={() => addPermissionHook.handleBlur(description)}
                label={translatedStrings.descriptionLabel}
                helperText={translatedStrings.descriptionHelperLabel}
                type="text"
                width={'420px'}
                height={'72px'}
                error={
                  addPermissionHook.touched.description &&
                  Boolean(addPermissionHook.errors.description)
                }
                errorMsg={addPermissionHook.errors.description}
              />
            </div>
            <div className={classes.addPolicyFieldWrapper}>
              {!addPermissionHook.values.isExistingInline && (
                <div className={classes.consumerWrapper}>
                  <Select
                    placeholder={translatedStrings.consumerPlaceholder}
                    options={consumersList}
                    value={addPermissionHook.values.consumer}
                    label={translatedStrings.consumerLabel}
                    width={'420px'}
                    onChange={(_, value) => {
                      const previous = addPermissionHook.values.consumer;
                      if (value !== previous) {
                        resetActionsData();
                        fetchPermissionActions(value?.name);
                        addPermissionHook.handleChange(actions, []);
                        addPermissionHook.handleChange(consumer, value);
                        addPermissionHook.handleChange(applications, '');
                        addPermissionHook.handleChange(resources, '');
                        value?.name === appsConsumer && getApplicationsList();
                      }
                    }}
                    onBlur={() => addPermissionHook.handleBlur(consumer)}
                    errorMessage={
                      addPermissionHook.touched.consumer &&
                      Boolean(addPermissionHook.errors.consumer)
                        ? addPermissionHook.errors.consumer
                        : ''
                    }
                    error={
                      addPermissionHook.touched.consumer &&
                      Boolean(addPermissionHook.errors.consumer)
                    }
                    getOptionLabel={(option) => option?.description || option.name}
                  />
                  <div className={classes.consumerSideLoader}>
                    {(isLoading(applicationsListStatus) ||
                      isLoading(permissionActionsListStatus)) && <Spinner size="small" />}
                  </div>
                </div>
              )}
              {addPermissionHook.values.isExistingInline && (
                <>
                  <Typography variant="label2">{translatedStrings.consumerLabel}</Typography>
                  <div className={classes.readOnlyConsumer}>
                    <Typography variant="label1">
                      {addPermissionHook.values.consumer?.description}
                    </Typography>
                  </div>
                </>
              )}
            </div>
            <div className={classes.addPolicyFieldWrapper}>
              {addPermissionHook?.values?.consumer?.name === appsConsumer ? (
                <>
                  {!isLoading(applicationsListStatus) && (
                    <Autocomplete
                      options={applicationsListData ?? []}
                      label={translatedStrings.resourceLabel}
                      multiple={true}
                      width={'420px'}
                      value={
                        addPermissionHook.values.resources?.length
                          ? applicationsListData.filter((app) =>
                              addPermissionHook.values.resources.includes(app.appContainerId)
                            )
                          : []
                      }
                      onInputChange={() => {}}
                      getOptionLabel={(option) => option.applicationName || option}
                      onChange={(event, value) => {
                        addPermissionHook.handleChange(addPermissionHook.names.applications, value);
                        addPermissionHook.handleChange(
                          addPermissionHook.names.resources,
                          value.map((v) => v.appContainerId).join(',')
                        );
                      }}
                      onBlur={() => {
                        addPermissionHook.handleBlur(addPermissionHook.names.applications);
                      }}
                      error={
                        addPermissionHook.touched.resources &&
                        Boolean(addPermissionHook.errors.resources)
                      }
                      errorMessage={
                        addPermissionHook.touched.resources &&
                        Boolean(addPermissionHook.errors.resources)
                          ? addPermissionHook.errors.resources
                          : ''
                      }
                    />
                  )}
                </>
              ) : (
                <Textarea
                  label={translatedStrings.resourceLabel}
                  name="resources"
                  helperText={translatedStrings.resourceHelperLabel}
                  type="text"
                  value={addPermissionHook.values.resources}
                  width={'420px'}
                  height={'72px'}
                  onChange={(e) => {
                    addPermissionHook.handleChange(resources, e.target.value);
                  }}
                  onBlur={() => addPermissionHook.handleBlur(resources)}
                  error={
                    addPermissionHook.touched.resources &&
                    Boolean(addPermissionHook.errors.resources)
                  }
                  errorMsg={addPermissionHook.errors.resources}
                />
              )}
            </div>
            {Boolean(permissionActionsList?.length) &&
              Boolean(addPermissionHook.values.consumer) &&
              isSuccess(permissionActionsListStatus) && (
                <div className={classes.addPolicyFieldWrapper}>
                  <Autocomplete
                    options={permissionActionsList.map((action) => action.name)}
                    value={addPermissionHook.values.actions}
                    label={translatedStrings.actionLabel}
                    multiple={true}
                    width={'420px'}
                    onBlur={() => addPermissionHook.handleBlur(actions)}
                    onInputChange={() => {}}
                    onChange={(e, value) => {
                      addPermissionHook.handleChange(actions, value);
                    }}
                    getOptionLabel={(option) => option}
                    error={
                      addPermissionHook.touched.actions && Boolean(addPermissionHook.errors.actions)
                    }
                    errorMessage={addPermissionHook.errors.actions}
                  />
                </div>
              )}
          </div>
        </div>
      </ModalPopup>
      {saveModalOpen && (
        <DialogPopup
          type="alert"
          title={translatedStrings.saveModalTitle}
          message={translatedStrings.saveModalMessage}
          primaryButtonText={translatedStrings.saveModalPrimaryBtn}
          secondaryButtonText={translatedStrings.noBtn}
          onSubmit={saveHandler}
          onCancel={() => {
            setSaveModalOpen(false);
          }}
        />
      )}
      {resetModalOpen && (
        <DialogPopup
          type="alert"
          title={translatedStrings.resetModalTitle}
          message={translatedStrings.resetModalMessage}
          primaryButtonText={translatedStrings.resetModalPrimaryBtn}
          secondaryButtonText={translatedStrings.resetModalSecondaryBtn}
          onSubmit={() => {
            resetHandler(addPermissionHook.values);
            setResetModalOpen(false);
          }}
          onCancel={() => setResetModalOpen(false)}
        />
      )}

      {cancelModalOpen && (
        <DialogPopup
          type="alert"
          title={translatedStrings.cancelModalTitle}
          message={translatedStrings.permissionCancelModalMessage}
          primaryButtonText={translatedStrings.cancelModalPrimaryBtn}
          secondaryButtonText={translatedStrings.noBtn}
          onSubmit={() => {
            cancelHandler();
          }}
          onCancel={() => {
            setCancelModalOpen(false);
          }}
        />
      )}
    </>
  );
};

AddEditPermission.propTypes = {
  addPermissionHook: PropTypes.any,
  validationHook: PropTypes.any,
  fetchPermissionActions: PropTypes.func,
  permissionActionsList: PropTypes.any,
  permissionActionsListStatus: PropTypes.string,
  fetchConsumersList: PropTypes.func,
  consumersList: PropTypes.any,
  saveHandler: PropTypes.func,
  cancelHandler: PropTypes.func,
  editModeOn: PropTypes.bool,
  resetHandler: PropTypes.func,
  permissionFilterLoading: PropTypes.bool,
  resetActionsData: PropTypes.func,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  translatedStrings: PropTypes.object,
};

export default AddEditPermission;
