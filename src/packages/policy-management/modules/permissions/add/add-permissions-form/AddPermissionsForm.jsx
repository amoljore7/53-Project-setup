import React from 'react';
import PropTypes from 'prop-types';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';
import Textfield from 'britive-design-system/core/components/textfield';
import Textarea from 'britive-design-system/core/components/textarea';
import Select from 'britive-design-system/core/components/select';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import Spinner from 'britive-design-system/core/components/spinner';
import Typography from 'britive-design-system/core/components/typography';
import {
  classes,
  spinnerSizeMedium,
  spinnerSizeSmall,
  defaultWidth,
  permissionNameLabel,
  permissionDescriptionLabel,
  permissionConsumerLabel,
  permissionResourcesLabel,
  permissionActionsLabel,
  errorAndHelperText,
  noneText,
} from './constants';
import './AddPermissionsForm.scss';
import { appsConsumer } from '../constants';

const AddPermissionForm = ({
  validationHook,
  getActionsList,
  getApplicationsList,
  consumerList,
  consumerListStatus,
  actionListData,
  actionListStatus,
  applicationsListData,
  applicationsListStatus,
  addPermissionStatus,
  nameFilterLoading,
  viewPermissionStatus,
  isEditMode,
}) => {
  return (
    <>
      {viewPermissionStatus == RESOURCE_STATUS.LOADING ||
      actionListStatus == RESOURCE_STATUS.LOADING ||
      consumerListStatus == RESOURCE_STATUS.LOADING ||
      applicationsListStatus == RESOURCE_STATUS.LOADING ||
      addPermissionStatus == RESOURCE_STATUS.LOADING ? (
        <Spinner size={spinnerSizeMedium} overlay={true} />
      ) : (
        <>
          <div className={classes.permissionAddContainer}>
            <div className={classes.permissionNameLoaderWrapper}>
              <Textfield
                label={permissionNameLabel}
                width={defaultWidth}
                value={validationHook.values.name}
                onChange={(e) => {
                  validationHook.handleChange(validationHook.names.name, e.target.value);
                }}
                onBlur={() => {
                  validationHook.handleBlur(validationHook.names.name);
                }}
                error={validationHook.touched.name && Boolean(validationHook.errors.name)}
                errorMsg={validationHook.errors.name}
              />
              <div className={classes.permissionNameLoader}>
                {nameFilterLoading && <Spinner size={spinnerSizeSmall} />}
              </div>
            </div>

            <div className={classes.permissionAddFiledTopMargin}>
              <Textarea
                label={permissionDescriptionLabel}
                helperText={errorAndHelperText.descriptionHelperTxt}
                width={defaultWidth}
                value={validationHook.values.description}
                onChange={(e) => {
                  validationHook.handleChange(validationHook.names.description, e.target.value);
                }}
                error={
                  validationHook.touched.description && Boolean(validationHook.errors.description)
                }
                errorMsg={validationHook.errors.description}
                onBlur={() => {
                  validationHook.handleBlur(validationHook.names.description);
                }}
              />
            </div>
            {isEditMode ? (
              <div className={classes.permissionAddFiledTopMargin}>
                <Typography variant="label2"> {permissionConsumerLabel} </Typography>
                <div className={classes?.marginTop8}>
                  <Typography variant="label1">
                    {validationHook.values.consumer?.description ||
                      validationHook.values.consumer?.name ||
                      noneText}
                  </Typography>
                </div>
              </div>
            ) : (
              <div className={classes.permissionAddFiledTopMargin}>
                <Select
                  label={permissionConsumerLabel}
                  placeholder={errorAndHelperText.consumerPlaceholder}
                  width={defaultWidth}
                  options={consumerList?.result ?? []}
                  value={validationHook.values.consumer}
                  getOptionLabel={(option) => option?.description || option?.name}
                  onChange={(event, value) => {
                    validationHook.handleChange(validationHook.names.consumer, value);
                    validationHook.handleChange(validationHook.names.actions, []);
                    validationHook.handleChange(validationHook.names.resources, '');
                    getActionsList(value?.name);
                    value?.name === appsConsumer && getApplicationsList();
                  }}
                  onBlur={() => {
                    validationHook.handleBlur(validationHook.names.consumer);
                  }}
                  error={validationHook.touched.consumer && Boolean(validationHook.errors.consumer)}
                  errorMessage={
                    validationHook.touched.consumer && Boolean(validationHook.errors.consumer)
                      ? validationHook.errors.consumer
                      : ''
                  }
                />
              </div>
            )}

            <div className={classes.permissionAddFiledTopMargin}>
              {validationHook?.values?.consumer?.name === appsConsumer ? (
                applicationsListData && (
                  <Autocomplete
                    options={applicationsListData ?? []}
                    label={permissionResourcesLabel}
                    placeholder={errorAndHelperText.actionsPlaceholder}
                    multiple={true}
                    width={defaultWidth}
                    value={
                      validationHook.values.resources?.length
                        ? applicationsListData.filter((app) =>
                            validationHook.values.resources.includes(app.appContainerId)
                          )
                        : []
                    }
                    onInputChange={() => {}}
                    getOptionLabel={(option) => option.applicationName || option}
                    onChange={(event, value) => {
                      validationHook.handleChange(validationHook.names.applications, value);
                      validationHook.handleChange(
                        validationHook.names.resources,
                        value.map((v) => v.appContainerId).join(',')
                      );
                    }}
                    onBlur={() => {
                      validationHook.handleBlur(validationHook.names.applications);
                    }}
                    error={
                      validationHook.touched.applications &&
                      Boolean(validationHook.errors.applications)
                    }
                    errorMessage={
                      validationHook.touched.applications &&
                      Boolean(validationHook.errors.applications)
                        ? validationHook.errors.applications
                        : ''
                    }
                  />
                )
              ) : (
                <Textfield
                  label={permissionResourcesLabel}
                  width={defaultWidth}
                  helperText={errorAndHelperText.resourcesHelperTxt}
                  value={validationHook.values.resources}
                  onChange={(e) => {
                    validationHook.handleChange(validationHook.names.resources, e.target.value);
                  }}
                  onBlur={() => {
                    validationHook.handleBlur(validationHook.names.resources);
                  }}
                  error={
                    validationHook.touched.resources && Boolean(validationHook.errors.resources)
                  }
                  errorMsg={validationHook.errors.resources}
                />
              )}
            </div>
            <div className={classes.permissionAddFiledTopMargin}>
              {actionListData?.result?.length && (
                <Autocomplete
                  options={actionListData?.result.map((action) => action.name)}
                  label={permissionActionsLabel}
                  placeholder={errorAndHelperText.actionsPlaceholder}
                  multiple={true}
                  width={defaultWidth}
                  value={validationHook.values.actions}
                  onInputChange={() => {}}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    validationHook.handleChange(validationHook.names.actions, value);
                  }}
                  onBlur={() => {
                    validationHook.handleBlur(validationHook.names.actions);
                  }}
                  error={validationHook.touched.actions && Boolean(validationHook.errors.actions)}
                  errorMessage={
                    validationHook.touched.actions && Boolean(validationHook.errors.actions)
                      ? validationHook.errors.actions
                      : ''
                  }
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

AddPermissionForm.propTypes = {
  validationHook: PropTypes.object,
  getActionsList: PropTypes.func,
  getApplicationsList: PropTypes.func,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
  consumerListError: PropTypes.object,
  actionListData: PropTypes.array,
  actionListStatus: PropTypes.string,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  addPermissionStatus: PropTypes.string,
  nameFilterLoading: PropTypes.bool,
  viewPermissionStatus: PropTypes.string,
  isEditMode: PropTypes.bool,
};
export default AddPermissionForm;
