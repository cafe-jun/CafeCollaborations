import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Text,
  Collapse,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
      <Button
        onClick={() => onToggle(fieldName)}
        rightIcon={<ChevronDownIcon />}
        width="100%"
        justifyContent="space-between"
        bg="white"
        borderColor="gray.200"
        _hover={{ borderColor: "blue.500" }}
      >
        {value || placeholder}
      </Button>
      <Collapse
        in={isOpen}
        animateOpacity
        style={{ transition: "height 200ms, opacity 200ms" }}
      >
        <VStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="md"
          maxH="200px"
          overflowY="auto"
          zIndex={1}
          spacing={0}
        >
          {options.map((option) => (
            <Box
              key={option}
              as="button"
              width="100%"
              textAlign="left"
              py={2}
              px={4}
              _hover={{ bg: "gray.100" }}
              onClick={() => {
                onChange(option);
                onToggle(fieldName);
              }}
            >
              <Text>{option}</Text>
            </Box>
          ))}
        </VStack>
      </Collapse>
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
