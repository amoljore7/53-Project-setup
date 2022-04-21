import React from 'react';
import PropTypes from 'prop-types';
import { getSecretDetails } from '../../../../../services/secret-manager-service';
import ApprovalModal from '../../../../../common-widgets/approval-modal/ApprovalModal';
import { translatedStringsForApprovalsModal } from '../all-secrets/secret-list/constants';

const SecretApprovalModal = ({
  vaultId,
  selectedItemAncestors,
  handleApprovalModal,
  approversDetails,
  secretName,
}) => {
  const fetchSecretDetails = async (values) => {
    const ancestors = [...selectedItemAncestors];
    ancestors.push({
      label: secretName,
      details: { entityType: 'secret' },
    });
    const payload = {
      parents: ancestors.slice(1),
      vaultId,
      data: values,
    };
    const secretDetails = await getSecretDetails(payload);
    return secretDetails;
  };

  return (
    <ApprovalModal 
      entityName={secretName}
      approversDetails={approversDetails}
      onSubmit={fetchSecretDetails} 
      onModalClose={handleApprovalModal}
      action={translatedStringsForApprovalsModal.viewAction}
    />
  );
};

SecretApprovalModal.propTypes = {
  vaultId: PropTypes.string,
  selectedItemAncestors: PropTypes.array,
  secretName: PropTypes.string,
  handleApprovalModal: PropTypes.func,
  approversDetails: PropTypes.object,
  translatedStringsForApprovalsModal: PropTypes.object,
};

export default SecretApprovalModal;
