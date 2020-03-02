import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: '#F74646',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: '#F74646',
  },
};

const SavingOverlay = ({ className, submitting }) => {
  return (
    <div
      style={{ display: submitting ? 'flex' : 'none' }}
      className={className}
    >
      <div style={{ height: '15rem' }}>
        {submitting && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="trees"
          >
            <motion.path
              d="M25.74 9.24 7.15 27.83 0 34.98 7.15 42.13 25.74 60.73 32.89 53.58 14.3 34.98 32.89 16.39 25.74 9.24z"
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 2, ease: 'easeInOut' },
                fill: { duration: 2, ease: [1, 0, 0.8, 1] },
              }}
            />
            <motion.path
              d="M151.62,50.67,136.15,26h5.71L125.46,0l-16.4,26h5.71L100,49.58,85.21,26h5.71L74.52,0,58.12,26h5.72L48.38,50.67h5.71L38,76.47H67.89V87.39H81.18V76.46h37.64V87.38h13.29V76.46H162l-16.11-25.8ZM95,50.67h10l-5,8Z"
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 2, ease: 'easeInOut' },
                fill: { duration: 2, ease: [1, 0, 0.8, 1] },
              }}
            />
            <motion.path
              d="M192.85 27.83 174.26 9.24 167.11 16.39 185.7 34.98 167.11 53.58 174.26 60.73 192.85 42.13 200 34.98 192.85 27.83z"
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 2, ease: 'easeInOut' },
                fill: { duration: 2, ease: [1, 0, 0.8, 1] },
              }}
            />
          </motion.svg>
        )}
      </div>
    </div>
  );
};

export default styled(SavingOverlay)`
  background-color: rgba(255, 255, 255, 0.85);
  height: calc(100% + 2rem);
  position: absolute;
  width: calc(100% + 2rem);
  z-index: 999;
  top: -1rem;
  left: -1rem;
  align-items: center;
  justify-content: center;

  .trees {
    width: 15rem;
    z-index: 1000;
  }
`;
