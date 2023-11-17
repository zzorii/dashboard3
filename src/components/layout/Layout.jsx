import React, { useRef } from 'react';
import Header from './header/Header';
import Title from '../common/Tilte';
import History from '../common/History';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(30px at 40px 40px)',
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const Layout = (props) => {
    const { pagename, children, title } = props;
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    return (
        <Box display="flex" flexDirection="column" pl={{ base: '0', lg: '290px' }} background="globalBg">
            <Header />
            <Box as="main" id="main" minH={'100vh'} p={'140px 30px 20px'}>
                <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} custom={height} ref={containerRef}>
                    <motion.div className="background" variants={sidebar} />
                    <Navigation />
                    <MenuToggle toggle={() => toggleOpen()} />
                </motion.nav>
                <Flex
                    pos={'fixed'}
                    top={'20px'}
                    left={{ base: '20px', lg: '310px' }}
                    right={'20px'}
                    zIndex={1}
                    h={'90px'}
                    px={'30px'}
                    alignItems={'center'}
                    bg={'rgba(255, 255, 255, 0.8)'}
                    borderRadius={'90px'}
                    backdropFilter={'saturate(180%) blur(8px)'}
                    transition={'all 0.2s ease-in-out'}
                >
                    <Box>
                        <History pagename={pagename} />
                        <Title title={title} />
                    </Box>
                    <Box ml={'auto'}>
                        <Text variant={'txt145'}></Text>
                    </Box>
                </Flex>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
