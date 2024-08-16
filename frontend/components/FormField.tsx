import React, { memo } from "react";
import { FormControl, FormLabel, Input, Box, Select } from "@chakra-ui/react";

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
  isOpen,
  onToggle,
  fieldName,
}) => {
  return (
    <Box position="relative">
      <Select
        placeholder={placeholder}
        size="md"
        borderColor="gray.500"
        _hover={{ borderColor: "white.600" }}
        _focus={{ borderColor: "white.600", boxShadow: "outline" }}
        onChange={onChange}
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
  );
};

const FormField = ({
  label,
  type,
  options,
  value,
  onChange,
  placeholder,
  isOpen,
  onToggle,
  fieldName,
  ...props
}) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {type === "select" ? (
        <CustomSelect
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isOpen={isOpen}
          onToggle={onToggle}
          fieldName={fieldName}
          {...props}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      )}
    </FormControl>
  );
};

export default FormField;
