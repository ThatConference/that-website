/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import { connect } from 'react-redux';
import ButterToast, { Cinnamon, POS_TOP, POS_RIGHT } from 'butter-toast';

import { sessionConstants } from '../../../utilities';

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
  div.DENIED {
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
        }
      }
    }
  }
`;

const CurrentSessions = () => {
  const { loading, error, data } = useQuery(GET_MY_SESSIONS, {
    variables: {},
  });

  if (loading) return null;
  if (error) return null;

  const sessions = data.sessions.me.all;
  const hasCurrentSessions = sessions && sessions.length && sessions.length > 0;
  const [updateSession] = useMutation(UPDATE_SESSION);

  const editClick = (e, id) => {
    e.preventDefault();
    console.log(id);
    Router.push('/member/session-edit');
  };

  const widthdrawClick = (e, id) => {
    e.preventDefault();
    const updates = {
      status: 'WITHDREW',
    };
    updateSession({
      variables: { session: updates, sessionId: id },
    }).then(
      () => {
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
        Router.push('/');
      },
      err => {
        // ToDo: Appropriately log and handle error
        // eslint-disable-next-line no-console
        console.log(`Error: ${err}`);
      },
    );
  };

  const noCurrentSessions = () => {
    return <NoSessions>* You haven't submitted any sessions yet.</NoSessions>;
  };

  const yesCurrentSessions = () => {
    return (
      <SessionsGrid columns={12}>
        {sessions.map(s => {
          return (
            <React.Fragment key={s.id}>
              <SessionTitle className="cell" width={8}>
                {s.title}
              </SessionTitle>
              <SessionStatus center middle className="cell" width={2}>
                <div className={s.status}>
                  {
                    sessionConstants.SessionStatuses.find(
                      ss => ss.value === s.status,
                    ).label
                  }
                </div>
              </SessionStatus>
              <Cell center middle className="cell" width={1}>
                <a href="" onClick={e => editClick(e, s.id)}>
                  Edit
                </a>
              </Cell>
              <Cell center middle className="cell" width={1}>
                {s.status !== 'WITHDREW' && (
                  <a href="" onClick={e => widthdrawClick(e, s.id)}>
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
