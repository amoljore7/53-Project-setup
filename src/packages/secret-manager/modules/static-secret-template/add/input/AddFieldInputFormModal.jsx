import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Textarea from 'britive-design-system/core/components/textarea';
import Textfield from 'britive-design-system/core/components/textfield';
import RadioGroup from 'britive-design-system/core/components/radio';
import { classes, translatedStrings } from './constants';
import Typography from 'britive-design-system/core/components/typography';

const AddFieldInputFormModal = ({
  addFieldValidationHook,
  cancelFieldHandler,
  isPasswordSelected,
}) => {
  const { description, name, mask, required, type } = addFieldValidationHook.names;
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const AddActionButtons = [
    {
      text: translatedStrings.addBtn,
      variant: 'primary',
      onClick: () => {
        addFieldValidationHook.handleSubmit();
      },
    },
    {
      text: translatedStrings.cancelBtn,
      variant: 'secondary',
      onClick: () => setShowCancelDialog(true),
    },
  ];

  const getCancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelModalTitle}
        message={translatedStrings.cancelModalMessage}
        primaryButtonText={translatedStrings.discardChangesModal}
        secondaryButtonText={translatedStrings.no}
        onSubmit={cancelFieldHandler}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };

  return (
    <>
      <ModalPopup
        width={512}
        title={translatedStrings.addFieldModalTitle}
        buttons={AddActionButtons}
        onCancel={() => {
          setShowCancelDialog(true);
        }}
      >
        <div className={classes.sstModalScroll}>
          <div className={classes.sstFieldInputSpacing}>
            <Textfield
              label={translatedStrings.fieldName}
              width={'448px'}
              value={addFieldValidationHook.values.name}
              placeholder={translatedStrings.name}
              onChange={(e) => {
                addFieldValidationHook.handleChange(name, e.target.value);
              }}
              onBlur={() => {
                addFieldValidationHook.handleBlur(addFieldValidationHook.names.name);
              }}
              error={
                addFieldValidationHook.touched.name && Boolean(addFieldValidationHook.errors.name)
              }
              errorMsg={addFieldValidationHook.errors.name}
            />
          </div>
          <div className={classes.sstFieldInputSpacing}>
            <Textarea
              value={addFieldValidationHook.values.description}
              onChange={(e) => addFieldValidationHook.handleChange(description, e.target.value)}
              label={translatedStrings.descriptionLabel}
              helperText={translatedStrings.descriptionHelperLabel}
              type="text"
              width={'448px'}
              height={'72px'}
              onBlur={() => {
                addFieldValidationHook.handleBlur(addFieldValidationHook.names.description);
              }}
              error={
                addFieldValidationHook.touched.description &&
                Boolean(addFieldValidationHook.errors.description)
              }
              errorMsg={addFieldValidationHook.errors.description}
            />
          </div>
          <div className={classes.sstFieldInputSpacing}>
            <RadioGroup
              label={translatedStrings.fieldType}
              defaultValue={addFieldValidationHook.values.type}
              options={[
                {
                  label: translatedStrings.singleLineChar,
                  value: 'singleLine',
                },
                {
                  label: translatedStrings.multiLineChar,
                  value: 'multiLine',
                },
                {
                  label: `${
                    isPasswordSelected
                      ? translatedStrings.passwordAlreadyExists
                      : translatedStrings.password
                  }`,
                  value: 'password',
                  disabled: isPasswordSelected,
                },
              ]}
              direction="vertical"
              name={addFieldValidationHook.names.type}
              onChange={(e) => {
                if (e.target.value === 'password') {
                  addFieldValidationHook.handleChange(required, true);
                  addFieldValidationHook.handleChange(mask, true);
                }
                addFieldValidationHook.handleChange(type, e.target.value);
              }}
            />
          </div>
          {addFieldValidationHook.values.type === 'password' && (
            <Typography variant="label2">{translatedStrings.passwordMandatoryText}</Typography>
          )}
          {addFieldValidationHook.values.type !== 'password' && (
            <>
              <div className={classes.sstFieldInputSpacing}>
                <RadioGroup
                  label={translatedStrings.mandatoryField}
                  defaultValue={addFieldValidationHook.values.required ? 'true' : 'false'}
                  options={[
                    {
                      label: translatedStrings.yes,
                      value: 'true',
                    },
                    {
                      label: translatedStrings.no,
                      value: 'false',
                    },
                  ]}
                  direction="vertical"
                  name={addFieldValidationHook.names.required}
                  onChange={(e) => {
                    if (e.target.value === 'true') {
                      addFieldValidationHook.handleChange(required, true);
                    } else {
                      addFieldValidationHook.handleChange(required, false);
                    }
                  }}
                />
              </div>
              <div className={classes.sstFieldInputSpacing}>
                <RadioGroup
                  label={translatedStrings.maskedLabel}
                  defaultValue={addFieldValidationHook.values.mask ? 'true' : 'false'}
                  options={[
                    {
                      label: translatedStrings.yes,
                      value: 'true',
                    },
                    {
                      label: translatedStrings.no,
                      value: 'false',
                    },
                  ]}
                  direction="vertical"
                  name={addFieldValidationHook.names.mask}
                  onChange={(e) => {
                    if (e.target.value === 'true') {
                      addFieldValidationHook.handleChange(mask, true);
                    } else {
                      addFieldValidationHook.handleChange(mask, false);
                    }
                  }}
                />
              </div>
            </>
          )}
        </div>
      </ModalPopup>
      {showCancelDialog && getCancelDialog()}
    </>
  );
};

AddFieldInputFormModal.propTypes = {
  addFieldValidationHook: PropTypes.object,
  isPasswordSelected: PropTypes.func,
  cancelFieldHandler: PropTypes.func,
};

export default AddFieldInputFormModal;
