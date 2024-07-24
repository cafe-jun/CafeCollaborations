import _ from 'lodash';

export const isEmpty = (value: any): boolean => {
  return _.isEmpty(value);
};

export const isNotEmpty = (value: any): boolean => {
  return !_.isEmpty(value);
};
