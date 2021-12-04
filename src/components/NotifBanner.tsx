import { Alert, AlertIcon, AlertDescription, Center } from '@chakra-ui/react';

import { Position } from '../types/types';

export const NotifBanner = ({ position }: { position: Position }) => {
  const renderBannerMessage = () => {
    const currentPos = position.short_position * position.price;
    const symbol = position.symbol.toUpperCase();
    let message = null;

    if (position.is_call) {
      message = `You have been margin called! Your fund has been liquidated. Game Over!`;
    } else if (position.cash < currentPos * 1.3) {
      message = `There is not enough cash to meet margin requirements.
                This is your last chance or you will be margin called!`;
    } else if (position.prev_price < 1 && position.price < 1) {
      message = `Congratulations! You have successfully shorted the company stock into bankrupcy. 
                You win!`;
    } else if (position.current_week === 0) {
      message = `${symbol} is currently trading at $6.
      Your hedge fund ${position.name} 
      has 35 weeks and 35 billion dollars to get 
      ${symbol} under $1, easy peasy.
      I mean, what could possibly go wrong?`;
    } else if (position.price >= position.gamma) {
      message = `Prepare for a large spike in price, a gamma squeeze is imminent!`;
    } else if (position.news === 1) {
      message = `We are expecting GOOD news about 
      stock ${symbol} this week,
      so we may be looking at a jump in stock price.
      Remember, we need to do everything in our power 
      to suppress the stock!`;
    } else if (position.news === 2) {
      message = `We are expecting BAD news about 
       stock ${symbol} this week,
       so we may be looking at a drop in stock price.
       This may be the perfect opportunity to suppress 
       the stock even more!`;
    }

    return message;
  };

  const message = renderBannerMessage();

  return (
    <>
      {message && (
        <Center mx='2'>
          <Alert width='2xl' borderRadius='md' boxShadow='lg' status='info'>
            <AlertIcon />
            <AlertDescription mt='2'>{message}</AlertDescription>
          </Alert>
        </Center>
      )}
    </>
  );
};
