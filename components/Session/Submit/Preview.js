import React from 'react';

import SessionPreview from '../../shared/SessionPreview';

const Preview = ({ session: stateSession, formCancel }) => {
  return <SessionPreview sessionId={stateSession.id} formCancel={formCancel} />;
};

export default Preview;
