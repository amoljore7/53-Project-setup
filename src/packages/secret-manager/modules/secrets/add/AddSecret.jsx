import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import useValidation from '../../../../../components/use-validation-hook';
import pickBy from 'lodash/pickBy';
import {
  errorNotificationDuration,
  errorNotificationType,
} from '../../../../../utils/common-constants';
import { fetchSecretList } from '../all-secrets/secret-list/service';
import { classes, translatedStrings, na } from './constants';
import { requestStaticSecretTemplateList } from '../../static-secret-template/list/action';
import { resetStaticSecretTemplateView } from '../../static-secret-template/view/action';
import { openNotification } from '../../../../../components/notification/action';
import * as yup from 'yup';
import './AddSecret.scss';
import { name, description, secretType } from '../common-validation';
import AddSecretForm from './AddSecretForm';

const AddSecret = ({
  setPageHeader,
  location,
  staticSecretTemplateList,
  staticSecretTemplateListStatus,
  secretTemplateDetails,
  secretTemplateDetailsStatus,
  createSecret,
  newSecretError,
  vaultId,
  history,
  resetSecretData,
}) => {
  const [dynamicValues, setDynamicValues] = useState({});
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [secretFilterLoading, setSecretFilterLoading] = useState(false);
  const [passwordPolicyName, setPasswordPolicyName] = useState(translatedStrings.noneValue);
  const dispatch = useDispatch();
  let newParents = [];
  if (location?.state?.parents) {
    newParents = [...location?.state?.parents];
  }
  const parentsForNameCheck = newParents.slice(1);
  let pageTitle = '';
  let nameCheckPath = '';
  for (let i in newParents) {
    pageTitle += ` / ${newParents[i].label}`;
  }
  for (let i in parentsForNameCheck) {
    nameCheckPath += `/${parentsForNameCheck[i].label}`;
  }
  pageTitle = pageTitle.substring(2);

  useEffect(() => {
    setPageHeader(`Add Secret @ ${pageTitle}`, []);
    dispatch(requestStaticSecretTemplateList('', ''));
    dispatch(resetStaticSecretTemplateView());
    return () => {
      addSecretHook.resetForm();
      setDynamicValues({});
      resetSecretData();
    };
  }, []);

  const addSecretValidationSchema = yup.object({
    name: name.test(name, translatedStrings.nameExistValidationMessage, async (value, context) => {
      const contextField = context?.options?.context;
      if ((contextField === 'name' || contextField === 'all') && value !== '') {
        setSecretFilterLoading(true);
        const completePath = nameCheckPath
          ?.split('/')
          .filter((path) => (path ? true : false))
          .map((path) => ({ label: path }));
        try {
          const response = await fetchSecretList({
            parents: completePath,
            vaultId,
            search: value,
            filter: 'eq',
          });
          setSecretFilterLoading(false);
          return response?.result?.length === 0;
        } catch ({ response }) {
          const reason = response?.data?.message || '';
          setSecretFilterLoading(false);
          openNotification(errorNotificationType, reason, errorNotificationDuration);
          return true;
        }
      } else {
        return true;
      }
    }),
    description,
    secretType,
  });

  const addSecretHook = useValidation({
    initialValues: {
      name: '',
      description: '',
      secretType: '',
    },
    validationSchema: addSecretValidationSchema,
    onSubmit: (values) => {
      const payloadBody = getRequestBody(values);
      createSecret(payloadBody, newParents, history);
    },
  });

  const getRequestBody = ({ name, description, secretType }) => {
    return {
      entityType: 'secret',
      name,
      description,
      staticSecretTemplateId: getSecretId(secretType),
      secretMode: 'shared',
      secretNature: 'static',
      value: {
        ...pickBy(dynamicValues),
      },
    };
  };

  const getSecretId = (secretType) => {
    if (staticSecretTemplateList && staticSecretTemplateList.length) {
      const secretID = staticSecretTemplateList.find((secret) => secret.secretType === secretType);
      return secretID ? secretID.id : na;
    } else {
      return na;
    }
  };

  const addSecretHeader = () => {
    return (
      <div className={classes.addSecretActionsContainer}>
        <div className={classes.addSecretSaveButton}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              addSecretHook.handleSubmit();
            }}
          >
            {translatedStrings.saveButtonText}
          </Button>
        </div>
        <Button
          variant="secondary"
          size="medium"
          onClick={() => {
            setCancelDialogOpen(true);
          }}
        >
          {translatedStrings.cancelButtonText}
        </Button>
      </div>
    );
  };

  return (
    <>
      {addSecretHeader()}
      <AddSecretForm
        addSecretHook={addSecretHook}
        staticSecretTemplateList={staticSecretTemplateList}
        secretTemplateDetailsStatus={secretTemplateDetailsStatus}
        secretTemplateDetails={secretTemplateDetails}
        secretFilterLoading={secretFilterLoading}
        passwordPolicyName={passwordPolicyName}
        setPasswordPolicyName={setPasswordPolicyName}
        secretSubmitError={newSecretError}
        dynamicValues={dynamicValues}
        setDynamicValues={setDynamicValues}
        openNotification={openNotification}
        staticSecretTemplateListStatus={staticSecretTemplateListStatus}
        isCancelDialogOpen={isCancelDialogOpen}
        setCancelDialogOpen={setCancelDialogOpen}
        history={history}
      />
    </>
  );
};

AddSecret.propTypes = {
  setPageHeader: PropTypes.func,
  location: PropTypes.any,
  staticSecretTemplateList: PropTypes.array,
  secretTemplateDetails: PropTypes.any,
  secretTemplateDetailsStatus: PropTypes.string,
  staticSecretTemplateListStatus: PropTypes.string,
  createSecret: PropTypes.func,
  history: PropTypes.any,
  newSecretError: PropTypes.any,
  vaultId: PropTypes.string,
  resetSecretData: PropTypes.func,
};

export default AddSecret;
