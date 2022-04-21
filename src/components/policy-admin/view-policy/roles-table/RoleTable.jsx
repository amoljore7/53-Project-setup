import React from 'react';
import Typography from 'britive-design-system/core/components/typography';
import Tooltip from 'britive-design-system/core/components/tooltip';
import DataTable from '../../../data-table/DataTable';
import { BsEye } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { classes } from './constants';
import './RoleTable.scss';

const PolicyViewRolesTable = ({
  rolesData,
  onClickRoles,
  translatedStrings,
  policyConstantLabels,
}) => {
  const rolesColumns = [
    {
      field: 'name',
      headerName: translatedStrings?.roleName,
      width: '30%',
    },
    {
      field: 'description',
      headerName: translatedStrings?.description,
      width: '40%',
    },
    {
      headerName: translatedStrings?.permissionText,
      width: '30%',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        const permissionsValues = row?.permissions?.map((data) => data?.name).join(',');
        return (
          <div className={classes.addRoleTablePermissions} title={permissionsValues}>
            {permissionsValues}
          </div>
        );
      },
    },
    {
      headerName: translatedStrings?.actionText,
      width: '80px',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes.renderClass}>
            <Tooltip title={translatedStrings.viewTooltip} position="left">
              <div>
                <BsEye
                  onClick={() => onClickRoles(row)}
                  size={policyConstantLabels?.defaultButtonSize}
                />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const getTableRowDataRoles = (result) => {
    return (result || []).map(({ name, description, permissions }) => ({
      name,
      description,
      permissions,
    }));
  };
  return (
    <div className={classes.container}>
      <div className={classes.headerClass}>
        <Typography variant="pageSectionHeader"> {translatedStrings?.rolesLabel} </Typography>
      </div>
      <div className={classes.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.rolesLabel} </Typography>
        <div className={classes.marginTop8}>
          <div data-testid={policyConstantLabels?.roleTableTestId}>
            <DataTable
              rows={getTableRowDataRoles(rolesData)}
              columns={rolesColumns}
              loadMore={false}
              loading={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
PolicyViewRolesTable.propTypes = {
  rolesData: PropTypes.array,
  onClickRoles: PropTypes.func,
  translatedStrings: PropTypes.object,
  policyConstantLabels: PropTypes.shape({
    defaultButtonSize: PropTypes.string,
    viewPolicyButtonTestId: PropTypes.string,
    permissionTableTestId: PropTypes.string,
    roleTableTestId: PropTypes.string,
  }),
};
export default PolicyViewRolesTable;
