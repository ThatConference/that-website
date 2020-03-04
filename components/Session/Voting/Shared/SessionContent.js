import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { GlobalHotKeys } from 'react-hotkeys';
import { below, sessionConstants } from '../../../../utilities';
import SavingOverlay from '../../../shared/SavingOverlay';
import { ThumbsUpIcon, ThumbsDownIcon } from './Icons';

const MarkdownIt = require('markdown-it');

const keyMap = {
  VOTE_YES: 'y',
  VOTE_NO: 'n',
};

const GlobalHotKeyStyled = styled(GlobalHotKeys)`
  &:focus {
    outline: none;
  }
`;

const BodyDiv = styled.div`
  max-width: 80rem;
  p {
    margin-top: 0;
  }
`;

const SideColumn = styled.div`
  min-width: 4rem;
  padding-left: 8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${below.large`
    display: none;
  `};
`;

const SessionDetails = styled.div`
  display: flex;
  flex-direction: row;

  ${below.large`
    flex-direction: column;
  `};
`;

const ThumbRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;
`;

const TypeRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  ${below.small`
    flex-direction: column;
  `};

  p {
    margin: 0;
  }
`;

const Content = ({
  currentVote,
  handlers,
  notes,
  session,
  setNotes,
  submitting,
}) => {
  if (session) {
    const converter = new MarkdownIt();
    const { category, longDescription, takeaways, title, type } = session;

    const audience = sessionConstants.SessionFors.find(
      sf => sf.value === category,
    ).label;

    const sessionType = sessionConstants.SessionTypes.find(
      st => st.value === type,
    ).label;

    return (
      <div style={{ position: 'relative' }}>
        <SavingOverlay submitting={submitting} />
        {!submitting && (
          <GlobalHotKeyStyled
            keyMap={keyMap}
            handlers={handlers}
            allowChanges
          />
        )}

        <h3 style={{ marginBottom: '2rem' }}>{title}</h3>
        <TypeRow>
          <p>
            <strong>Category:</strong> {audience}
          </p>
          <p>
            <strong>Type:</strong> {sessionType}
          </p>
        </TypeRow>
        <SessionDetails>
          <BodyDiv>
            {longDescription && parse(converter.render(longDescription))}
            {session.takeaways && (
              <>
                <h4 style={{ marginBottom: 0 }}>Key Takeaways</h4>
                <ul>
                  {takeaways.map(s => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            )}
          </BodyDiv>
          <SideColumn>
            <h4 style={{ margin: 0 }}>Organizer Feedback</h4>
            <form className="input-form">
              <textarea
                rows="5"
                value={notes}
                style={{ width: '100%' }}
                onChange={event => setNotes(event.target.value)}
              />
            </form>
            <ThumbRow>
              <ThumbsUpIcon
                clickHandler={handlers.VOTE_YES}
                currentVote={currentVote}
                color="primary"
              />
              <ThumbsDownIcon
                clickHandler={handlers.VOTE_NO}
                currentVote={currentVote}
                color="primary"
              />
            </ThumbRow>
          </SideColumn>
        </SessionDetails>
      </div>
    );
  }

  return <p>You have voted for all the sessions! Thank You - THAT Crew</p>;
};

export default Content;
