import {
  Text,
  Link,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalContentProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const MotionModalContent = motion<ModalContentProps>(ModalContent);

const modalVariants = {
  hidden: {
    scale: 0.75,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.75,
      type: 'spring',
      bounce: 0.6,
    },
  },
};

export function ModalHelpButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        size='xs'
        fontSize={['xs', 'sm']}
        _focus={{ outline: 'none' }}
      >
        Help
      </Button>

      <Modal
        motionPreset='none'
        scrollBehavior={'inside'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <MotionModalContent
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          mx='2'
        >
          <ModalHeader>How To Play</ModalHeader>
          <ModalBody>
            The goal of the game is to successfully short the stock for two
            weeks below $1 by week 35, while never getting margin called. To
            avoid a margin call, the value of your short position must never
            exceed your cash balance.
            <br />
            <br />
            To short a stock you can borrow shares from what is available, or
            borrow naked shares from a Market Maker. The cost of borrowing
            shares is calculated weekly based on the borrow rate and your short
            position. The cost of buying naked shares is calculated by a premium
            and the ability to deliver the shares within 35 days. BUT, we don't
            deliver/buy shares here, so either use the "Hide FTD" strategy or
            allow them to fail. Keep in mind that naked shorting a stock is
            technically illegal for a non Market Maker, so in this game the risk
            is only available every other week. But with much risk comes much
            reward, naked shorting a stock is more effective than shorting via
            borrowed shares.
            <br />
            <br />
            Once you submit your position, you will no longer be able to change
            it, so choose wisely.
            <Divider mt='8' mb='2' />
            Statistics:
            <Divider mb='8' mt='2' />
            Borrow Fee – The percentage of the share price you will pay to
            borrow a new share. The fee is calculated based upon how many shares
            you borrowed the week prior.
            <br />
            <br />
            Days Until FTD – Days left before a forced delivery of shares that
            were sold naked. When you open a naked short position, you have 35
            days to deliver those shares or they will fail to deliver which will
            cause the Clearinghouse to forcibly cover. You can hide these using
            the “Hide FTD’s” strategy, resetting the delivery time back to 35
            days.
            <br />
            <br />
            Float – The number of shares available for trading of the stock.
            Short interest is calculated against this value. Reported Short
            Position – This is your borrowed short interest which can influence
            investors on whether or not they will try to squeeze your short
            position. Any reported interest over 40% is considered high. And
            anything over 60% may start a build up in price to initiate a
            squeeze. This is reported every 4 weeks and can be hidden with a
            strategy.
            <br />
            <br />
            Gamma Squeeze Price – This is the price at which Market Makers will
            begin to hedge themselves buying more shares as calls get closer to
            being ITM, causing a gamma squeeze which drastically drives the
            price up.
            <br />
            <br />
            Investor Rank – The overall market sentiment of investors of the
            stock.
            <br />
            <br />
            Margin – This is the required amount of capital needed to prevent a
            margin call. To open a short position, brokers require margin to
            hedge their potential losses.
            <br />
            <br />
            Price Support – This is the price at which you will meet resistance
            from those long the stock. If they see the price drop below this
            level they may see it as a buying opportunity and purchase more
            shares, driving the price up. Whenever you see this price change,
            expect a positive movement in price support the upcoming week.
            <br />
            <br />
            Reported Short Position – This is your borrowed short interest which
            can influence investors on whether or not they will try to squeeze
            your short position. Any reported interest over 40% is considered
            high. And anything over 60% may start a build up in price to
            initiate a squeeze. Your position is reported every 4 weeks but can
            be hidden with a strategy.
            <Divider mt='8' mb='2' />
            Why did the price spike?
            <Divider mb='8' mt='2' />
            There can be a combination of reasons to cause a spike in price,
            however you can typically narrow it down to a few.
            <br />
            <br />
            Zero FTD days - If you fail to reset your FTD's within 35 days, the
            price will spike exponentially depending on the number naked shares
            failed.
            <br />
            <br />
            Reported Interest - Every 4 weeks your short interest will be
            revealed. If you fail to your hide reported interest and it is above
            40%, the price spike can be exponential.
            <br />
            <br />
            Price Support - Each time the stock price drops below the price
            support level, expect a moderate amount of resistance from
            investors. This can bump the price up anywhere from 15% to 20%.
            <br />
            <br />
            Investor Suspicion - The more you utilize strategies and naked
            shorting, the more suspicious investors become. Any suspicion
            between 60% and 80% can yield a price jump of 10% to 20%. And
            anything above 80% will cause a jump around 40% to 50%.
            <br />
            <br />
            Low Price Support - If you are able to short the stock price under
            $2, the stock will be supported with a greater force, as traders
            seek to protect their investment.
            <br />
            <br />
            Gamma Squeeze - If the stock price ever exceeds the gamma squeeze
            price. The stock price will spike around 75% or more.
            <br />
            <br />
            Bull Flag Pattern - This indicator may not be quite precise, but
            whenever a bull flag forms, the stock price may spike anywhere from
            15% and 45%.
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onClose}
              colorScheme='blue'
              _focus={{ outline: 'none' }}
            >
              Close
            </Button>
          </ModalFooter>
        </MotionModalContent>
      </Modal>
    </>
  );
}

export function ModalStoryButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        variant='ghost'
        colorScheme='blue'
        fontSize={['sm', 'md']}
        _focus={{ outline: 'none' }}
      >
        What Story?
      </Button>

      <Modal
        motionPreset='none'
        scrollBehavior={'inside'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <MotionModalContent
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          mx='2'
        >
          <ModalHeader>Glad You Asked!</ModalHeader>
          <ModalBody>
            To learn the full story you can check out these Reddit threads:{' '}
            <br />
            <br />
            <Link
              href='https://www.reddit.com/r/Superstonk/comments/p1ep8g/3_major_reasons_why_i_am_all_in_gme/?utm_source=share&utm_medium=web2x&context=3'
              isExternal
            >
              A Non-Exhaustive New User Intro to GME
              <ExternalLinkIcon mx='2px' />
            </Link>
            <br />
            <Link
              href='https://www.reddit.com/r/Superstonk/comments/p4aa7o/a_nonexhaustive_new_user_intro_to_gme_pinception/?utm_source=share&utm_medium=web2x&context=3'
              isExternal
            >
              3 Major Reasons Why I am All in GME
              <ExternalLinkIcon mx='2px' />
            </Link>
            <br />
            <br />
            <Text>
              But here's the TL;DR:
              <br />
              Retail investors saw that GME was being massively shorted by Hedge
              Funds and forced them into a short squeeze. A short squeeze is
              when those who shorted a stock (borrow shares and sell them on the
              market with the hope to buy them back at a lower price) are forced
              to buy shares at a higher price to cover their position. Shorting
              a stock has an infinite loss potential since buying the shorted
              shares back drive the price up even further.
              <br />
              <br />
              However, shortly after the short squeeze began, Robinhood
              prevented their users from purchasing the stock. This removed
              buying pressure from the squeeze and gave Hedge Funds more time to
              strategize. Following the Robinhood debacle, institutions shorting
              the stock have resorted to various loopholes and illegal
              strategies to hide their short interest and suppress the stock
              price.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </MotionModalContent>
      </Modal>
    </>
  );
}
