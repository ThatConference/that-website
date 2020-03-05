import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { above } from '../../../../utilities/breakpoint';
import { ThumbsUpIcon, ThumbsDownIcon, NotesIcon } from './Icons';

const SessionActions = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
  margin-top: 0.3rem;
`;

const NotesDrawer = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  font-size: 1.5em;
  position: absolute;
  height: 20rem;
  top: 100rem;
  width: 100vw;
  padding: 1rem;
  left: 0;
  @extend .box-shadow;

  &.on {
    animation: slideIn 0.5s ease-in-out both;
  }

  &.off {
    animation: slideOut 0.5s ease-in-out both;
  }

  h4 {
    color: ${({ theme }) => theme.colors.fonts.light};
    margin: 0;
  }

  .input-form {
    font-size: 1.5rem;
  }
`;

const Overlay = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 999;
  top: 0;
  left: 0;
`;

const VotingFooter = ({
  className,
  currentVote,
  handlers,
  notes,
  setNotes,
  submitting,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const reset = () => {
    setDrawerOpen(false);
  };

  return (
    <div className={className}>
      <Overlay style={{ display: submitting ? 'flex' : 'none' }} />
      <SessionActions>
        <motion.div
          whileHover={{ scale: 1.4, rotate: 45 }}
          whileTap={{
            scale: 1,
            rotate: -45,
          }}
        >
          <ThumbsUpIcon
            clickHandler={() => {
              reset();
              handlers.VOTE_YES();
            }}
            color="lightGray"
            currentVote={currentVote}
            size={45}
          />
        </motion.div>
        <NotesIcon clickHandler={() => setDrawerOpen(!drawerOpen)} size={45} />
        <motion.div
          whileHover={{ scale: 1.4, rotate: -45 }}
          whileTap={{
            scale: 1,
            rotate: 45,
          }}
        >
          <ThumbsDownIcon
            clickHandler={() => {
              reset();
              handlers.VOTE_NO();
            }}
            color="lightGray"
            currentVote={currentVote}
            size={45}
          />
        </motion.div>
      </SessionActions>

      <NotesDrawer className={drawerOpen === true ? 'on' : 'off'}>
        <h4>Organizer Notes</h4>
        <form className="input-form">
          <textarea
            rows="7"
            value={notes}
            onChange={event => setNotes(event.target.value)}
            style={{ width: '100%' }}
          />
        </form>
      </NotesDrawer>
    </div>
  );
};

export default styled(VotingFooter)`
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 10rem;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-right: 7rem;
  padding-left: 5rem;
  display: flex;
  align-items: center;

  ${above.large`
    display: none;
  `};
`;
