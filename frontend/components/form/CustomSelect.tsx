import React, { memo } from 'react';
import { FormControl, FormLabel, Input, Box, Select } from '@chakra-ui/react';

const CustomSelect = ({
  label,
  options,
  onChange,
  placeholder,
  isOpen,
  onToggle,
  fieldName,
  props,
}) => {
  return (
    <FormControl id={fieldName}>
      <FormLabel>{label}</FormLabel>
      <Box position="relative">
        <Select
          placeholder={placeholder}
          size="md"
          borderColor="gray.500"
          _hover={{ borderColor: 'white.600' }}
          _focus={{ borderColor: 'white.600', boxShadow: 'outline' }}
          onChange={onChange}
          {...props}
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </Select>
      </Box>
    </FormControl>
  );
};

export default CustomSelect;
