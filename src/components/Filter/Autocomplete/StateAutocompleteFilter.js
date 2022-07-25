import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import optionsParser from '../../../helpers/optionsParser';
import {AsyncPaginate} from 'react-select-async-paginate';
import theme from '../../../theme';
import { api_get } from 'utils/Api';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const StateAutocompleteFilter = (props) => {
  const {className, filtersChange, field, values, ...rest} = props;
  const classes = useStyles();
  const getStates = async (search, prevData, page) => {
    const options = optionsParser(search, null, null, ['name']);
    const result = await api_get(`1/states?page=${page.page}${options}`);
    return {
      options: [...result.payload],
      hasMore: result.meta.current_page !== result.meta.last_page,
      additional: {
        page: result.meta.current_page + 1,
      },
    };
  };
  const handleChange = (value) => {
    filtersChange({
      [field.name]: value,
    });
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <AsyncPaginate
        loadOptions={getStates}
        onChange={handleChange}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        placeholder={field.label}
        isClearable={true}
        additional={{
          page: 1,
        }}
        value={values[field.name] || null}
        styles={{
          placeholder: (base) => ({
            ...base,
            color: '#000',
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
          }),
        }}
        menuPortalTarget={document.querySelector('body')}
      />
    </div>
  );
};

StateAutocompleteFilter.propTypes = {
  className: PropTypes.string,
  filtersChange: PropTypes.func,
  field: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default StateAutocompleteFilter;
