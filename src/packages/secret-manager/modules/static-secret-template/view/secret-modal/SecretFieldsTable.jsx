import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../../../../../components/data-table/DataTable';
import { BsEye } from 'react-icons/bs';
import { classes, translatedStrings, viewFieldsTableTestId, defaultButtonSize } from '../constants';
import '../StaticSecretTemplateView.scss';
import Tooltip from 'britive-design-system/core/components/tooltip';
import { fieldTypeStrings } from '../../constant';

const SecretFieldsTable = ({ secretTableData, onClickViewField }) => {
  const fieldsColumns = [
    {
      field: 'name',
      headerName: translatedStrings?.fieldName,
      width: '20%',
    },
    {
      field: 'description',
      headerName: translatedStrings?.fieldDescription,
      width: '30%',
    },
    {
      field: 'fieldType',
      headerName: translatedStrings?.fieldType,
      width: '18%',
    },
    {
      field: 'isMandatory',
      headerName: translatedStrings?.isMandatory,
      width: '16%',
    },
    {
      field: 'isMask',
      headerName: translatedStrings?.isMasked,
      width: '16%',
    },
    {
      headerName: translatedStrings?.action,
      width: '80px',
      renderColumn: (row) => {
        return (
          <div className={classes?.renderClass}>
            <Tooltip title={translatedStrings.viewTooltip} position="left">
              <div>
                <BsEye onClick={() => onClickViewField(row)} size={defaultButtonSize} />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const getTableRowDataFields = (result) => {
    return (result || []).map(({ name, description, type, required, mask }) => ({
      name,
      description,
      fieldType: fieldTypeStrings[type],
      isMandatory: required ? translatedStrings?.yes : translatedStrings?.no,
      isMask: mask ? translatedStrings?.yes : translatedStrings?.no,
    }));
  };
  return (
    <>
      <div data-testid={viewFieldsTableTestId}>
        <DataTable
          rows={getTableRowDataFields(secretTableData)}
          columns={fieldsColumns}
          loadMore={false}
          loading={false}
        />
      </div>
    </>
  );
};
SecretFieldsTable.propTypes = {
  secretTableData: PropTypes.object,
  onClickViewField: PropTypes.func,
};
export default SecretFieldsTable;
