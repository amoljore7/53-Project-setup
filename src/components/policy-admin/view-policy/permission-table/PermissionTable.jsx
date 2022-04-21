import React from 'react';
import Typography from 'britive-design-system/core/components/typography';
import Tooltip from 'britive-design-system/core/components/tooltip';
import DataTable from '../../../data-table/DataTable';
import { BsEye } from 'react-icons/bs';
import { classes, appsConsumer } from './constants';
import PropTypes from 'prop-types';
import { getApplicationName } from '../../../../utils/common-utils';
import './PermissionTable.scss';

const PolicyViewPermissionTable = ({
  permissionData,
  onClickPermission,
  consumerList,
  applicationsListData,
  translatedStrings,
  policyConstantLabels,
}) => {
  const permissionColumns = [
    {
      field: 'name',
      headerName: translatedStrings?.permissionName,
      width: '15%',
    },
    {
      headerName: translatedStrings?.sourceName,
      width: '12%',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes.renderClass}>
            {row?.isInline ? translatedStrings?.inlineText : translatedStrings?.preDefinedText}
          </div>
        );
      },
    },
    {
      field: 'description',
      headerName: translatedStrings?.description,
      width: '23%',
    },
    {
      field: 'consumer',
      headerName: translatedStrings?.consumer,
      width: '12%',
      renderColumn: (row) => {
        const consumer = row?.consumer?.description || row?.consumer?.name;
        return (
          <div className={classes.addRoleTablePermissions} title={consumer}>
            {consumer}
          </div>
        );
      },
    },
    {
      headerName: translatedStrings?.actions,
      width: '19%',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        const actionValues = row?.actions?.map((data) => data).join(',');
        return (
          <div className={classes.addRoleTablePermissions} title={actionValues}>
            {actionValues}
          </div>
        );
      },
    },
    {
      headerName: translatedStrings?.resources,
      width: '19%',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        if (row?.consumer?.name === appsConsumer) {
          return (
            <div className={classes.renderClass}>
              {getApplicationName(row.resources, applicationsListData).join(', ') ||
                row.resources.join(', ')}
            </div>
          );
        }
        return <div className={classes.renderClass}>{row.resources.join(', ')}</div>;
      },
    },
    {
      headerName: translatedStrings?.actionText,
      width: '80px',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes.renderClass}>
            <Tooltip title={translatedStrings.viewPermissionTooltip} position="left">
              <div>
                <BsEye
                  onClick={() => onClickPermission(row)}
                  size={policyConstantLabels?.defaultButtonSize}
                />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const getTableRowDataPermissions = (result) => {
    return (result || []).map(({ name, isInline, description, consumer, actions, resources }) => ({
      name,
      isInline,
      description,
      consumer: consumerList?.find((consumerItem) => consumerItem.name === consumer) ?? {
        name: consumer,
      },

      actions,
      resources,
    }));
  };
  return (
    <div className={classes.container}>
      <div className={classes.headerClass}>
        <Typography variant="pageSectionHeader"> {translatedStrings?.permissionText} </Typography>
      </div>
      <div className={classes.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.permissionText} </Typography>
        <div className={classes.marginTop8}>
          <div data-testid={policyConstantLabels?.permissionTableTestId}>
            <DataTable
              rows={getTableRowDataPermissions(permissionData)}
              columns={permissionColumns}
              loadMore={false}
              loading={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PolicyViewPermissionTable.propTypes = {
  permissionData: PropTypes.array,
  onClickPermission: PropTypes.func,
  consumerList: PropTypes.array,
  applicationsListData: PropTypes.array,
  translatedStrings: PropTypes.object,
  policyConstantLabels: PropTypes.shape({
    defaultButtonSize: PropTypes.string,
    viewPolicyButtonTestId: PropTypes.string,
    permissionTableTestId: PropTypes.string,
    roleTableTestId: PropTypes.string,
  }),
};

export default PolicyViewPermissionTable;
