import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Textfield from 'britive-design-system/core/components/textfield';
import Textarea from 'britive-design-system/core/components/textarea';
import Typography from 'britive-design-system/core/components/typography';
import Button from 'britive-design-system/core/components/button';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import Spinner from 'britive-design-system/core/components/spinner';
import Select from 'britive-design-system/core/components/select';
import DialogPopup from 'britive-design-system/core/components/dialog';
import { BsTrash, BsEye } from 'react-icons/bs';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import useValidation from '../../../../../../components/use-validation-hook';
import * as yup from 'yup';
import DataTable from '../../../../../../components/data-table/DataTable';
import AddFieldInputFormModal from './AddFieldInputFormModal';
import SecretFieldDetail from './SecretFieldDetail';
import { classes, translatedStrings, keyName } from './constants';
import { getHeightFromTop } from '../../../../../../utils/common-utils';
import {
  fieldDescription,
  fieldMask,
  fieldName,
  fieldRequired,
  fieldType,
} from '../../common-validation';
import './AddSecretInputForm.scss';
import Tooltip from 'britive-design-system/core/components/tooltip';
import { fieldTypeStrings } from '../../constant';

const AddSecretInputForm = ({
  pwdPoliciesList,
  openNotification,
  nameFilterLoading,
  validationHook,
  setIsPasswordSelected,
  isPasswordSelected,
  sstFormError,
}) => {
  const [openAddFieldInputFormModal, setOpenAddFieldInputFormModal] = useState(false);
  const [openViewAddFieldInputFormModal, setOpenViewAddFieldInputFormModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [policiesNames, setPoliciesNames] = useState([]);
  const [detailsData, setDetailsData] = useState(null);
  const formContainer = useRef(null);

  useEffect(() => {
    if (pwdPoliciesList && pwdPoliciesList.length) {
      const massagePwdPoliciesList = pwdPoliciesList.map((consumer) => consumer.name);
      setPoliciesNames(massagePwdPoliciesList);
    } else {
      setPoliciesNames([]);
    }
  }, [pwdPoliciesList]);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, sstFormError]);

  const addFieldValidationSchema = yup.object({
    name: fieldName.test(
      name,
      translatedStrings?.fieldNameAlreadyExists,
      async (value, context) => {
        const contextField = context?.options?.context;
        if ((contextField === 'name' || contextField === 'all') && value !== '') {
          if (validationHook?.values?.parameters.length) {
            const isFieldNameExists = validationHook?.values?.parameters?.some((field) => {
              return field?.name.toLowerCase() === value.toLowerCase();
            });
            return !isFieldNameExists;
          }
          return true;
        } else {
          return true;
        }
      }
    ),
    description: fieldDescription,
    mask: fieldMask,
    required: fieldRequired,
    type: fieldType,
  });

  const addFieldValidationHook = useValidation({
    initialValues: {
      name: '',
      description: '',
      mask: false,
      required: true,
      type: 'singleLine',
    },
    validationSchema: addFieldValidationSchema,
    onSubmit: (values) => {
      handleAddFields(values);
    },
  });

  const handleAddFields = (values) => {
    if (values?.type === 'password') {
      setIsPasswordSelected(true);
    }
    const massagedData = getTableMassagedData(values);
    const permissionName = validationHook.names.parameters;
    validationHook.handleChange(permissionName, [
      ...validationHook.values.parameters,
      massagedData,
    ]);

    openNotification('success', translatedStrings.fieldAdded, 3000);
    resetStateHandler();
  };

  const addFieldButton = () => {
    return (
      <>
        <Typography variant="label2">{translatedStrings.fieldsLabel}</Typography>
        <div className={classes.sstAddFieldAction}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => setOpenAddFieldInputFormModal(true)}
          >
            {translatedStrings.addFieldBtn}
          </Button>
        </div>
      </>
    );
  };

  const handleDeleteTableRow = () => {
    const currentTableData = [...validationHook.values.parameters];
    const permissionName = validationHook.names.parameters;
    const filteredData = currentTableData.filter((permission) => permission.id !== currentRow.id);

    validationHook.handleChange(permissionName, filteredData);

    if (currentRow.type === 'password') {
      setIsPasswordSelected(false);
      validationHook.handleChange(validationHook.names.rotationInterval, 0);
      validationHook.handleChange(validationHook.names.passwordPolicyId, '');
    }

    openNotification('success', translatedStrings.fieldRemoved, 3000);
    setCurrentRow({});
    setShowDeleteDialog(false);
  };

  const columns = [
    {
      field: 'name',
      headerName: translatedStrings.fieldName,
      width: '20%',
      horizontalAlign: 'left',
    },
    {
      field: 'description',
      headerName: translatedStrings.descriptionLabel,
      horizontalAlign: 'left',
      width: '30%',
    },
    {
      field: 'fieldTypeDisplayValue',
      headerName: translatedStrings.fieldType,
      width: '18%',
      horizontalAlign: 'left',
    },
    {
      field: 'required',
      headerName: translatedStrings.mandatory,
      width: '16%',
      horizontalAlign: 'left',
    },
    {
      field: 'mask',
      headerName: translatedStrings.masked,
      width: '16%',
      horizontalAlign: 'left',
    },
    {
      headerName: translatedStrings.actionColumn,
      width: '100px',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes.sstTableActionIcons}>
            <div className={classes.sstTableActionView}>
              <Tooltip title={translatedStrings.viewFieldTooltip} position="left">
                <div>
                  <BsEye onClick={() => handleViewClick(row)} size={24} />
                </div>
              </Tooltip>
            </div>
            <div className={classes.sstTableActionDelete}>
              <Tooltip title={translatedStrings.deleteFieldTooltip} position="left">
                <div>
                  <BsTrash onClick={() => handleDeleteClick(row)} size={24} />
                </div>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  const handleViewClick = (row) => {
    setDetailsData(row);
    setOpenViewAddFieldInputFormModal(true);
  };
  const handleDeleteClick = (row) => {
    setCurrentRow(row);
    setShowDeleteDialog(true);
  };
  const getFieldsTableView = () => {
    return (
      <div className={classes.sstTableSpacing}>
        <DataTable rows={validationHook?.values?.parameters} columns={columns} />
      </div>
    );
  };

  const getFieldsEmptyError = () => {
    if (validationHook.touched.parameters && Boolean(validationHook.errors.parameters)) {
      return (
        <div className={classes.sstAddEmptyError}>
          <Typography variant="caption1">{validationHook.errors.parameters}</Typography>
        </div>
      );
    } else {
      return null;
    }
  };

  const getAddSSTForm = () => {
    return (
      <>
        <div className={`${classes.sstInputSpacing} ${classes.sstAlignWithLoader}`}>
          <Textfield
            value={validationHook.values.secretType}
            onChange={(e) =>
              validationHook.handleChange(validationHook.names.secretType, e.target.value)
            }
            label={translatedStrings.sstNameLabel}
            type="text"
            width={'500px'}
            onBlur={() => validationHook.handleBlur(validationHook.names.secretType)}
            error={validationHook.touched.secretType && Boolean(validationHook.errors.secretType)}
            errorMsg={validationHook.errors.secretType}
          />
          <div className={classes.sstFormLoader}>
            {nameFilterLoading ? <Spinner size="small" /> : null}
          </div>
        </div>
        <div className={classes.sstInputSpacing}>
          <Textarea
            value={validationHook.values.description}
            onChange={(e) =>
              validationHook.handleChange(validationHook.names.description, e.target.value)
            }
            label={translatedStrings.descriptionLabel}
            helperText={translatedStrings.descriptionHelperLabel}
            type="text"
            width={'500px'}
            height={'72px'}
            onBlur={() => validationHook.handleBlur(validationHook.names.description)}
            error={validationHook.touched.description && Boolean(validationHook.errors.description)}
            errorMsg={validationHook.errors.description}
          />
        </div>

        <div className={classes.sstInputSpacing}>
          <Textfield
            value={validationHook.values.rotationInterval}
            onChange={(e) =>
              validationHook.handleChange(validationHook.names.rotationInterval, e.target.value)
            }
            label={translatedStrings.rotationalInterval}
            disabled={!isPasswordSelected}
            helperText={translatedStrings.rotationalIntervalHelperText}
            type="text"
            width={'500px'}
            onBlur={() => validationHook.handleBlur(validationHook.names.rotationInterval)}
            error={
              validationHook.touched.rotationInterval &&
              Boolean(validationHook.errors.rotationInterval)
            }
            errorMsg={validationHook.errors.rotationInterval}
          />
        </div>
        <div className={classes.sstInputSpacing}>
          <Select
            options={policiesNames ?? []}
            label={translatedStrings.passwordPolicyLabel}
            disabled={!isPasswordSelected}
            width={'500px'}
            value={validationHook.values.passwordPolicyId}
            helperText={translatedStrings.policyHelperText}
            placeholder={translatedStrings.selectPolicy}
            onChange={(_, value) => {
              validationHook.handleChange(validationHook.names.passwordPolicyId, value);
            }}
            onBlur={() => validationHook.handleBlur(validationHook.names.passwordPolicyId)}
            errorMessage={
              validationHook.touched.passwordPolicyId &&
              Boolean(validationHook.errors.passwordPolicyId)
                ? validationHook.errors.passwordPolicyId
                : ''
            }
            error={
              validationHook.touched.passwordPolicyId &&
              Boolean(validationHook.errors.passwordPolicyId)
            }
            getOptionLabel={(option) => option}
            disablePortal={true}
          />
        </div>
        {addFieldButton()}
        {getFieldsEmptyError()}
        {!isEmpty(validationHook.values.parameters) && getFieldsTableView()}
      </>
    );
  };

  const getViewPermissionModal = (data) => {
    return (
      <ModalPopup
        width={512}
        title={`${translatedStrings.field} : ${data?.name}`}
        onCancel={() => {
          setCurrentRow({});
          setOpenViewAddFieldInputFormModal(false);
        }}
      >
        <div className={classes.sstModalScroll}>
          <SecretFieldDetail fieldData={data} />
        </div>
      </ModalPopup>
    );
  };

  const getDeleteModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.fieldRemove}
        message={translatedStrings.fieldDeleteMessage}
        primaryButtonText={translatedStrings.yesDelete}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={handleDeleteTableRow}
        onCancel={() => {
          setCurrentRow({});
          setShowDeleteDialog(false);
        }}
      />
    );
  };

  const resetStateHandler = () => {
    addFieldValidationHook.resetForm();
    setOpenAddFieldInputFormModal(false);
  };

  const getTableMassagedData = (fieldData) => {
    const result = {
      ...fieldData,
      id: uniqueId(`${keyName}`),
      mask: fieldData.mask ? translatedStrings.yes : translatedStrings.no,
      required: fieldData.required ? translatedStrings.yes : translatedStrings.no,
      fieldTypeDisplayValue: fieldTypeStrings[fieldData?.type],
    };
    return result;
  };

  const cancelFieldHandler = () => {
    resetStateHandler();
  };

  return (
    <>
      <div className={classes.sstInputFormContainer} ref={formContainer}>
        {getAddSSTForm()}
      </div>
      {openAddFieldInputFormModal && (
        <AddFieldInputFormModal
          addFieldValidationHook={addFieldValidationHook}
          isPasswordSelected={isPasswordSelected}
          cancelFieldHandler={cancelFieldHandler}
        />
      )}
      {openViewAddFieldInputFormModal && getViewPermissionModal(detailsData)}
      {showDeleteDialog && getDeleteModal()}
    </>
  );
};

AddSecretInputForm.propTypes = {
  pwdPoliciesList: PropTypes.object,
  openNotification: PropTypes.func,
  nameFilterLoading: PropTypes.bool,
  validationHook: PropTypes.any,
  setIsPasswordSelected: PropTypes.any,
  isPasswordSelected: PropTypes.any,
  sstFormError: PropTypes.array,
};

export default AddSecretInputForm;
