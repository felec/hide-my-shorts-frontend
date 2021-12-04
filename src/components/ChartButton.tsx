import { Box, useRadio } from '@chakra-ui/react';

export function ChartButton(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        px='4'
        fontSize='xs'
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        aria-label='range'
        _hover={{ opacity: 0.75 }}
        _checked={{
          bg: '#3A6877',
          color: 'white',
          borderColor: '#3A6877',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
