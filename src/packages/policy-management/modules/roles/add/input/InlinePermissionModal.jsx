import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import Textfield from 'britive-design-system/core/components/textfield';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Select from 'britive-design-system/core/components/select';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import Textarea from 'britive-design-system/core/components/textarea';
import Spinner from 'britive-design-system/core/components/spinner';
import Typography from 'britive-design-system/core/components/typography';
import isEmpty from 'lodash/isEmpty';
import { typeOfStatus } from '../../../../../../utils/common-constants';
import { classes, translatedStrings, spinnerSizeSmall } from './constants';
import { isLoading } from '../../../policy/utils';
import { appsConsumer } from '../../../permissions/add/constants';
import { isSuccess } from '../../../../../../utils/common-utils';

const InlinePermissionModal = ({
  consumerList,
  actionList,
  actionStatus,
  getActionData,
  newPermissionHook,
  isEditMode,
  saveInlineHandler,
  resetInlineHandler,
  cancelInlineHandler,
  resetActionData,
  nameFilterLoading,
  isEditRoleMode,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
}) => {
  const { description, consumer, resources, actions, applications } = newPermissionHook.names;
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const AddActionButtons = [
    {
      text: translatedStrings.addBtn,
      variant: 'primary',
      onClick: () => {
        newPermissionHook.handleSubmit();
      },
      size: 'large',
    },
    {
      text: translatedStrings.cancelBtn,
      variant: 'secondary',
      onClick: () => setShowCancelModal(true),
      size: 'large',
    },
  ];

  const EditActionButtons = [
    {
      text: translatedStrings.saveBtn,
      variant: 'primary',
      onClick: () => {
        if (newPermissionHook.isValid()) {
          setShowSaveModal(true);
        } else {
          newPermissionHook.handleSubmit();
        }
      },
      size: 'large',
    },
    {
      text: translatedStrings.resetBtn,
      variant: 'secondary',
      onClick: () => setShowResetModal(true),
      size: 'large',
    },
    {
      text: translatedStrings.cancelBtn,
      variant: 'secondary',
      onClick: () => setShowCancelModal(true),
      size: 'large',
    },
  ];

  const getSaveModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.saveModalTitle}
        message={translatedStrings.saveModalMessage}
        primaryButtonText={translatedStrings.saveModalPrimaryBtn}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={saveInlineHandler}
        onCancel={() => setShowSaveModal(false)}
      />
    );
  };

  const getCancelModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelModalTitle}
        message={translatedStrings.cancelModalMessage}
        primaryButtonText={translatedStrings.cancelModalPrimaryBtn}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={cancelInlineHandler}
        onCancel={() => setShowCancelModal(false)}
      />
    );
  };

  const getResetModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.resetModalTitle}
        message={translatedStrings.resetModalMessage}
        primaryButtonText={translatedStrings.resetModalPrimaryBtn}
        secondaryButtonText={translatedStrings.resetModalSecondaryBtn}
        onSubmit={() => {
          resetInlineHandler();
          setShowResetModal(false);
        }}
        onCancel={() => setShowResetModal(false)}
      />
    );
  };

  const getConsumerDropdown = () => {
    if (isEditRoleMode && newPermissionHook?.values?.isPreviousPermission) {
      return (
        <>
          <Typography variant="label2">{translatedStrings.consumerLabel}</Typography>
          <div className={classes.readOnlyConsumer}>
            <Typography variant="label1">
              {newPermissionHook.values.consumer.description}
            </Typography>
          </div>
        </>
      );
    } else {
      return (
        <div className={classes.alignWithLoader}>
          <Select
            options={consumerList?.result ?? []}
            label={translatedStrings.consumerLabel}
            width={'448px'}
            value={newPermissionHook.values.consumer}
            onChange={(_, value) => {
              resetActionData();
              getActionData(value?.name);
              newPermissionHook.handleChange(actions, []);
              newPermissionHook.handleChange(resources, '');
              newPermissionHook.handleChange(applications, '');
              newPermissionHook.handleChange(consumer, value);
              value?.name === appsConsumer && getApplicationsList();
            }}
            onBlur={() => newPermissionHook.handleBlur(consumer)}
            errorMessage={
              newPermissionHook.touched.consumer && Boolean(newPermissionHook.errors.consumer)
                ? newPermissionHook.errors.consumer
                : ''
            }
            error={newPermissionHook.touched.consumer && Boolean(newPermissionHook.errors.consumer)}
            getOptionLabel={(option) => option?.description || option?.name}
            placeholder={translatedStrings.consumerPlaceholder}
          />
          {(isLoading(actionStatus) || isLoading(applicationsListStatus)) && (
            <div className={classes.formLoaderModal}>
              <Spinner size="small" />
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <ModalPopup
        width={520}
        title={
          isEditMode
            ? translatedStrings.editPermissionTitle
            : translatedStrings.addNewPermissionTitle
        }
        buttons={isEditMode ? EditActionButtons : AddActionButtons}
        onCancel={() => {
          setShowCancelModal(true);
        }}
      >
        <div className={classes.permissionModalScroll}>
          <div className={classes.permissionInputSpacing}>
            <div className={classes.permissionNameFieldContainer}>
              <Textfield
                value={newPermissionHook.values.name}
                onChange={(e) =>
                  newPermissionHook.handleChange(newPermissionHook.names.name, e.target.value)
                }
                label={translatedStrings.permissionNameLabel}
                type="text"
                width={'448px'}
                onBlur={() => newPermissionHook.handleBlur(newPermissionHook.names.name)}
                error={newPermissionHook.touched.name && Boolean(newPermissionHook.errors.name)}
                errorMsg={newPermissionHook.errors.name}
              />
              <div className={classes.permissionNameLoaderContainer}>
                {nameFilterLoading && <Spinner size={spinnerSizeSmall} />}
              </div>
            </div>
          </div>
          <div className={classes.permissionInputSpacing}>
            <Textarea
              value={newPermissionHook.values.description}
              onChange={(e) => newPermissionHook.handleChange(description, e.target.value)}
              label={translatedStrings.descriptionLabel}
              helperText={translatedStrings.descriptionHelperLabel}
              type="text"
              width={'448px'}
              height={'72px'}
              onBlur={() => {
                newPermissionHook.handleBlur(newPermissionHook.names.description);
              }}
              error={
                newPermissionHook.touched.description &&
                Boolean(newPermissionHook.errors.description)
              }
              errorMsg={newPermissionHook.errors.description}
            />
          </div>
          <div className={classes.permissionInputSpacing}>{getConsumerDropdown()}</div>
          <div className={classes.permissionInputSpacing}>
            {newPermissionHook?.values?.consumer?.name === appsConsumer ? (
              <>
                {!isLoading(applicationsListStatus) && (
                  <Autocomplete
                    options={applicationsListData ?? []}
                    label={translatedStrings.resourceLabel}
                    multiple={true}
                    width={'448px'}
                    value={
                      newPermissionHook.values.resources?.length
                        ? applicationsListData.filter((app) =>
                            newPermissionHook.values.resources.includes(app.appContainerId)
                          )
                        : []
                    }
                    onInputChange={() => {}}
                    getOptionLabel={(option) => option.applicationName || option}
                    onChange={(event, value) => {
                      newPermissionHook.handleChange(newPermissionHook.names.resources, value);
                      newPermissionHook.handleChange(
                        newPermissionHook.names.resources,
                        value.map((v) => v.appContainerId).join(',')
                      );
                    }}
                    onBlur={() => {
                      newPermissionHook.handleBlur(newPermissionHook.names.resources);
                    }}
                    error={
                      newPermissionHook.touched.resources &&
                      Boolean(newPermissionHook.errors.resources)
                    }
                    errorMessage={
                      newPermissionHook.touched.resources &&
                      Boolean(newPermissionHook.errors.resources)
                        ? newPermissionHook.errors.resources
                        : ''
                    }
                  />
                )}
              </>
            ) : (
              <Textarea
                label={translatedStrings.resourceLabel}
                helperText={translatedStrings.resourceHelperLabel}
                type="text"
                value={newPermissionHook.values.resources}
                width={'448px'}
                height={'72px'}
                onChange={(e) => newPermissionHook.handleChange(resources, e.target.value)}
                onBlur={() => newPermissionHook.handleBlur(resources)}
                error={
                  newPermissionHook.touched.resources && Boolean(newPermissionHook.errors.resources)
                }
                errorMsg={newPermissionHook.errors.resources}
              />
            )}
          </div>
          <div className={classes.permissionInputSpacing}>
            {!isEmpty(actionList?.result) && isSuccess(actionStatus) && (
              <Autocomplete
                options={actionList?.result.map((action) => action?.name) || []}
                label={translatedStrings.actionLabel}
                multiple={true}
                width={'448px'}
                value={newPermissionHook.values.actions}
                onInputChange={() => {}}
                onChange={(_, value) => {
                  newPermissionHook.handleChange(actions, value);
                }}
                onBlur={() => newPermissionHook.handleBlur(actions)}
                error={
                  newPermissionHook.touched.actions && Boolean(newPermissionHook.errors.actions)
                }
                errorMessage={newPermissionHook.errors.actions}
                getOptionLabel={(option) => option}
                placeholder={translatedStrings.searchPlaceholder}
              />
            )}
          </div>
        </div>
      </ModalPopup>
      {/* Save Modal will get rendered only in case of Edit Mode of Inline Permission */}
      {showSaveModal && getSaveModal()}
      {showCancelModal && getCancelModal()}
      {/* Reset Modal will get rendered only in case of Edit Mode of Inline Permission */}
      {showResetModal && getResetModal()}
    </>
  );
};

InlinePermissionModal.propTypes = {
  consumerList: PropTypes.object,
  actionList: PropTypes.object,
  actionStatus: PropTypes.oneOf(typeOfStatus),
  getActionData: PropTypes.func,
  newPermissionHook: PropTypes.object,
  isEditMode: PropTypes.bool,
  saveInlineHandler: PropTypes.func,
  resetInlineHandler: PropTypes.func,
  cancelInlineHandler: PropTypes.func,
  resetActionData: PropTypes.func,
  nameFilterLoading: PropTypes.any,
  isEditRoleMode: PropTypes.bool,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
};

export default InlinePermissionModal;
