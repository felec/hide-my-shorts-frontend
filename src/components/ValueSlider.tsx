import {
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
} from '@chakra-ui/react';
import NumberFormat from 'react-number-format';

export const ValueSlider = ({
  cb,
  max,
  min,
  step,
  value,
  percent,
}: {
  cb: (v: number) => void;
  max: number;
  min: number;
  step: number;
  value: number;
  percent: number;
}) => {
  const handlePercentage = (percent: number) => {
    return `${(percent * 100).toFixed(2)}%`;
  };

  const newPercent = handlePercentage(percent);

  return (
    <Flex justifyContent='center' width='75%'>
      <Box
        display='flex'
        justifyContent='center'
        border='2px'
        width='20'
        borderColor='gray.700'
        borderRadius='md'
        mr='8'
        p='1'
      >
        {newPercent}
      </Box>
      <Slider
        colorScheme='blue'
        flex='1'
        focusThumbOnChange={false}
        max={max}
        maxW={['100%', '100%', '50%']}
        min={min}
        onChange={cb}
        step={step}
        value={value}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb
          fontSize='sm'
          boxSize='4'
          children={
            <NumberFormat
              value={value}
              displayType={'text'}
              thousandSeparator={true}
              style={{
                marginTop: '4rem',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            />
          }
        />
      </Slider>
    </Flex>
  );
};
