/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import debug from 'debug';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import _ from 'lodash';
import ButterToast, { Cinnamon, POS_TOP, POS_RIGHT } from 'butter-toast';
import LoadingIndicator from '../../shared/LoadingIndicator';

import { sessionConstants, below } from '../../../utilities';

const dlog = debug('that:sessions:current');

const Subheading = styled.p`
  margin-top: 0;
`;

const SessionsContainer = styled.div`
  margin-top: 5rem;
`;

const SessionsGrid = styled(Grid)`
  grid-gap: 0;
  .cell {
    border-bottom: 1px solid black;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

const SessionTitle = styled(Cell)`
  font-size: 2rem;

  ${below.med`
    font-size: 1.6rem;
    line-height: 1.3;
  `};
`;

const SessionStatus = styled(Cell)`
  text-transform: capitalize;
  div {
    margin: auto;
    width: 10rem;
  }
  div.DRAFT {
    color: ${({ theme }) => theme.colors.fonts.light};
    background-color: ${({ theme }) => theme.colors.darkGray};
  }
  div.SUBMITTED {
    color: ${({ theme }) => theme.colors.fonts.light};
    background-color: ${({ theme }) => theme.colors.thatBlue};
  }
  div.APPROVED {
    color: ${({ theme }) => theme.colors.fonts.light};
    background-color: ${({ theme }) => theme.colors.success};
  }
  div.NOT_ACCEPTED {
    color: ${({ theme }) => theme.colors.fonts.light};
    background-color: ${({ theme }) => theme.colors.danger};
  }
  div.WITHDREW {
    color: ${({ theme }) => theme.colors.fonts.light};
    background-color: ${({ theme }) => theme.colors.info};
  }
  div.WAIT_LIST {
    color: ${({ theme }) => theme.colors.fonts.dark};
    background-color: ${({ theme }) => theme.colors.offWhite};
  }
  div.CANCELED {
    color: ${({ theme }) => theme.colors.fonts.light};
    background-color: ${({ theme }) => theme.colors.warning};
  }
`;

const NoSessions = styled.p`
  color: ${({ theme }) => theme.thatBlue};
`;

const GET_MY_SESSIONS = gql`
  query getMySessions {
    sessions {
      me {
        all {
          id
          title
          status
        }
      }
    }
  }
`;

const UPDATE_SESSION = gql`
  mutation updateSession($sessionId: ID!, $session: SessionUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update(session: $session) {
          id
          title
          status
        }
      }
    }
  }
`;

const CurrentSessions = ({ user, loading: loadingUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && !user) {
      router
        .push('/api/login?redirect-url=/wi/session/create')
        .then(() => window.scrollTo(0, 0));
    }
  });

  const { loading, error, data } = useQuery(GET_MY_SESSIONS);
  const [updateSession] = useMutation(UPDATE_SESSION, {
    onCompleted: () => {
      ButterToast.raise({
        sticky: true,
        content: (
          <Cinnamon.Crisp
            scheme={Cinnamon.Crisp.SCHEME_BLUE}
            content={() => (
              <div>Your session has been successfully updated</div>
            )}
            title="Session"
          />
        ),
      });
    },
    onError: createError => {
      dlog('Error updating session %o', createError);
      throw new Error(createError);
    },
  });

  if (loading || loadingUser) {
    return <LoadingIndicator />;
  }

  if (error) return null;

  const sessions = data.sessions.me.all;
  const hasCurrentSessions = sessions && sessions.length && sessions.length > 0;

  const widthdrawClick = (e, id) => {
    e.preventDefault();
    const updates = {
      status: 'WITHDREW',
    };
    updateSession({
      variables: { session: updates, sessionId: id },
    });
  };

  const noCurrentSessions = () => {
    return <NoSessions>* You haven't submitted any sessions yet.</NoSessions>;
  };

  const yesCurrentSessions = () => {
    return (
      <SessionsGrid columns={12}>
        {_.sortBy(sessions, s => s.title.toLowerCase()).map(session => {
          return (
            <React.Fragment key={session.id}>
              <SessionTitle className="cell" width={8}>
                {session.title}
              </SessionTitle>
              <SessionStatus center middle className="cell" width={2}>
                <div className={session.status}>
                  {
                    sessionConstants.SessionStatuses.find(
                      sessionStatus => sessionStatus.value === session.status,
                    ).label
                  }
                </div>
              </SessionStatus>
              <Cell center middle className="cell" width={1}>
                <a href={`/member/session-edit/${session.id}`}>Edit</a>
              </Cell>
              <Cell center middle className="cell" width={1}>
                {session.status !== 'WITHDREW' && (
                  <a href="" onClick={e => widthdrawClick(e, session.id)}>
                    Withdraw
                  </a>
                )}
              </Cell>
            </React.Fragment>
          );
        })}
      </SessionsGrid>
    );
  };

  return (
    <div>
      <h3>Submitted & Drafted</h3>
      <Subheading>
        These are sessions that you have already submitted or drafted. Please
        click the session you would like to update.
      </Subheading>
      <SessionsContainer>
        {hasCurrentSessions ? yesCurrentSessions() : noCurrentSessions()}
      </SessionsContainer>
      <ButterToast
        className="that-toast"
        position={{
          vertical: POS_TOP,
          horizontal: POS_RIGHT,
        }}
      />
    </div>
  );
};

export default CurrentSessions;
