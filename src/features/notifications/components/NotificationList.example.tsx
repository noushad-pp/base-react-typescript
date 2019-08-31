/* tslint:disable:jsx-no-lambda */
import React from 'react';
import { ComponentExample } from '../../../utils/ComponentExample';
import NotificationList from './NotificationList';

export default [
  new ComponentExample(
    'Simple message',
    (
      <>
        <NotificationList
          notifications={[
            { type: 'success', text: 'oh yes' },
            { type: 'warning', text: 'oh no' },
            { type: 'error', text: 'oh shi' },
          ]}
          onClose={() => null}
        />
      </>
    )
  ),
];
