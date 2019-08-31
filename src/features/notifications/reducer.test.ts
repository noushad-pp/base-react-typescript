import {
  addErrorNotification,
  addNeutralNotification,
  addSuccessNotification,
  addWarningNotification,
  NotificationActions,
  removeNotification,
} from './actions';
import notificationsReducer from './reducer';
import {
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_NEUTRAL,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_WARNING,
  NotificationsState,
} from './types';

const testCases: Array<{ title: string; actions: NotificationActions[]; expected: NotificationsState }> = [
  {
    title: 'handles single add action',
    actions: [addErrorNotification('oh no')],
    expected: [
      {
        type: NOTIFICATION_TYPE_ERROR,
        text: 'oh no',
        details: undefined,
      },
    ],
  },
  {
    title: 'handles four add actions',
    actions: [
      addErrorNotification('oh no'),
      addNeutralNotification('wait', 'maybe its ok'),
      addSuccessNotification('its ok actually'),
      addWarningNotification('but I am watching you'),
    ],
    expected: [
      {
        type: NOTIFICATION_TYPE_ERROR,
        text: 'oh no',
        details: undefined,
      },
      {
        type: NOTIFICATION_TYPE_NEUTRAL,
        text: 'wait',
        details: 'maybe its ok',
      },
      {
        type: NOTIFICATION_TYPE_SUCCESS,
        text: 'its ok actually',
        details: undefined,
      },
      {
        type: NOTIFICATION_TYPE_WARNING,
        text: 'but I am watching you',
        details: undefined,
      },
    ],
  },
  {
    title: 'handles remove action',
    actions: [
      addErrorNotification('oh no'),
      addNeutralNotification('wait', 'maybe its ok'),
      addSuccessNotification('its ok actually'),
      addWarningNotification('but I am watching you'),
      removeNotification(1),
    ],
    expected: [
      {
        type: NOTIFICATION_TYPE_ERROR,
        text: 'oh no',
        details: undefined,
      },
      {
        type: NOTIFICATION_TYPE_SUCCESS,
        text: 'its ok actually',
        details: undefined,
      },
      {
        type: NOTIFICATION_TYPE_WARNING,
        text: 'but I am watching you',
        details: undefined,
      },
    ],
  },
];

describe('notificationsReducer', () => {
  testCases.forEach(({ title, actions, expected }) => {
    it(title, () => {
      const state = actions.reduce<NotificationsState>(notificationsReducer, []);
      expect(state).toEqual(expected);
    });
  });
});
