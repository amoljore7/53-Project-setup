import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../../../../../components/data-table/DataTable';
import { BsEye } from 'react-icons/bs';
import {
  classes,
  translatedStrings,
  permissionTableTestId,
  defaultButtonSize,
  asterisk,
} from '../constants';
import '../RolesView.scss';
import Tooltip from 'britive-design-system/core/components/tooltip';
import { appsConsumer } from '../../../permissions/add/constants';

const RolePermissionTable = ({
  permissionTableData,
  onClickViewPermission,
  applicationsListData,
  consumerList,
}) => {
  const getApplicationName = (resources) => {
    return resources.map((value) => {
      if (value === asterisk) return value;
      else {
        return applicationsListData?.find((application) => application?.appContainerId === value)
          ?.applicationName;
      }
    });
  };

  const permissionColumns = [
    {
      field: 'name',
      headerName: translatedStrings?.permissionName,
      width: '15%',
    },
    {
      field: 'isInline',
      headerName: translatedStrings?.source,
      width: '12%',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes?.renderClass}>
            {row?.isInline ? translatedStrings?.inlineText : translatedStrings?.predefinedText}
          </div>
        );
      },
    },
    {
      field: 'description',
      headerName: translatedStrings?.description,
      width: '18%',
    },
    {
      field: 'consumer',
      headerName: translatedStrings?.consumer,
      width: '11%',
      renderColumn: (row) => row?.consumer?.description,
    },
    {
      field: 'actions',
      headerName: translatedStrings?.actions,
      width: '19%',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return <div className={classes?.renderClass}>{row.actions.join(', ')}</div>;
      },
    },
    {
      field: 'resources',
      headerName: translatedStrings?.resources,
      width: '19%',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes?.renderClass}>
            {row?.consumer?.name === appsConsumer
              ? getApplicationName(row?.resources)?.join(', ')
              : row?.resources?.join(', ')}
          </div>
        );
      },
    },
    {
      headerName: translatedStrings?.action,
      width: '180px',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes?.renderClass}>
            <Tooltip title={translatedStrings.viewPermissionTooltip} position="left">
              <div>
                <BsEye onClick={() => onClickViewPermission(row)} size={defaultButtonSize} />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const getTableRowDataPermissions = (result) => {
    return (result || []).map(({ name, description, consumer, actions, resources, isInline }) => {
      const consumerDetails = consumerList.find((consumerItem) => consumerItem.name === consumer);
      return {
        name,
        isInline,
        description,
        consumer: consumerDetails,
        actions,
        resources,
      };
    });
  };
  return (
    <>
      <div data-testid={permissionTableTestId}>
        <DataTable
          rows={getTableRowDataPermissions(permissionTableData)}
          columns={permissionColumns}
          loadMore={false}
          loading={false}
        />
      </div>
    </>
  );
};

RolePermissionTable.propTypes = {
  permissionTableData: PropTypes.object,
  onClickViewPermission: PropTypes.func,
  applicationsListData: PropTypes.array,
  consumerList: PropTypes.array,
};

export default RolePermissionTable;
