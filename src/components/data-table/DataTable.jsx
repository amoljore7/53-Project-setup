import React, { useEffect, useState } from 'react';
import Table from 'britive-design-system/core/components/table';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import SearchInput from 'britive-design-system/core/components/search';
import Typography from 'britive-design-system/core/components/typography';
import Spinner from 'britive-design-system/core/components/spinner';
import classNames from 'classnames';
import './DataTable.scss';
import {
  nextDataButtonText,
  noDataText,
  spinnerSize,
  textOnlyBtn,
  typographyCaption,
  searchBarSize,
  mediumBtn,
} from './constants';
import { classes } from './constants';
import { isEmpty, orderBy } from 'lodash';
import {
  ascendingOrder,
  ascOrder,
  descendingOrder,
  descOrder,
  NA_TEXT,
  unsortedOrder,
} from '../../utils/common-constants';

const DataTable = ({
  loadMore,
  loadMoreHandler,
  searchBar,
  rows,
  columns,
  loading,
  loadingMessage,
  sortHandler,
  inLineSort = false,
}) => {
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [tableRows, setTableRows] = useState(null);

  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  useEffect(() => {
    if (
      inLineSort &&
      !isEmpty(rows) &&
      [ascendingOrder, descendingOrder].includes(sortOrder) &&
      !isEmpty(sortField)
    ) {
      inLineSortHandler();
    }
  }, [rows, sortOrder, sortField]);

  useEffect(() => {
    if (searchBar?.isSearchEmpty) {
      setSearchText('');
    }
  }, [searchBar?.isSearchEmpty]);

  const inLineSortHandler = () => {
    if (!isEmpty(rows)) {
      setTableRows((tableRows) =>
        orderBy(
          tableRows,
          [
            (data) => {
              const column = columns.find((column) => column?.field === sortField);
              if (column?.isNumeric) {
                if (data?.[sortField] === NA_TEXT || data?.[sortField] === '') {
                  return Number.MAX_SAFE_INTEGER;
                }
                return Number(data?.[sortField]);
              }
              if (column?.isDate) {
                if (data?.[sortField]?.trim() === '') {
                  return new Date(0);
                }
                return new Date(data?.[sortField]);
              }
              if (data?.[sortField]?.trim() === '') {
                return null;
              }
              return data?.[sortField]?.toLowerCase();
            },
          ],
          [sortOrder === ascendingOrder ? ascOrder : descOrder]
        )
      );
    }
  };

  const localSortHandler = (sortOrder, fieldName) => {
    setSortOrder(sortOrder === unsortedOrder ? null : sortOrder);
    setSortField(sortOrder === unsortedOrder ? null : fieldName);
  };

  const props = {
    loadMoreHandler,
    rows: tableRows,
    columns,
    loading,
    resizableColumns: true,
    sortHandler: inLineSort ? localSortHandler : sortHandler,
  };

  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
    searchBar?.onSearch(e.target.value);
  };

  const dataTableBottomPanelClasses = {
    [classes.dataTableBottomPanel]: true,
    [classes.noBorder]: loadMore,
  };

  return (
    <div className={classes.dataTableWrapper}>
      {loading && <Spinner size={spinnerSize} message={loadingMessage || ''} overlay={true} />}
      {searchBar && (
        <div className={classes.searchContainer}>
          <SearchInput
            value={searchText}
            onChange={onChangeSearch}
            disabled={Boolean(searchBar.isDisabled)}
            width={searchBarSize}
            placeholder={searchBar.placeholder}
          />
        </div>
      )}
      {<Table {...props} />}
      {((!loading && rows && rows.length === 0) || loadMore) && (
        <div className={classNames({ ...dataTableBottomPanelClasses })}>
          {loadMore && (
            <Button variant={textOnlyBtn} size={mediumBtn} onClick={(e) => loadMoreHandler(e)}>
              {nextDataButtonText}
            </Button>
          )}
          {!loading && rows && rows.length === 0 && (
            <Typography variant={typographyCaption}>{noDataText}</Typography>
          )}
        </div>
      )}
    </div>
  );
};
DataTable.propTypes = {
  loadMore: PropTypes.bool,
  loadMoreHandler: PropTypes.func,
  searchBar: PropTypes.shape({
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isSearchEmpty: PropTypes.bool,
  }).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      headerName: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      horizontalAlignment: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
  sortHandler: PropTypes.func,
  inLineSort: PropTypes.bool,
};
export default DataTable;
