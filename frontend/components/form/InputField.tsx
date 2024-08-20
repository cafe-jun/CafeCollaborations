import { FormControl, FormLabel, Input } from '@chakra-ui/react';

const InputField = ({ fieldName, props }) => {
  return (
    <FormControl id={fieldName}>
      <Input {...props} />
    </FormControl>
  );
};

export default InputField;
