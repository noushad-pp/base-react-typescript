import React from 'react';
import { Notification } from '../types';
import memoizer from '../utils/memoizer';
import NotificationBar from './NotificationBar';

type ComponentProps = {
  notifications: Notification[];
  onClose: (index: number) => void;
};

export default class NotificationList extends React.PureComponent<ComponentProps> {
  private getOnClose = memoizer<number, () => void>();

  public render(): React.ReactNode {
    const { notifications, onClose } = this.props;

    return (
      <div>
        {notifications.map((notification, index) => (
          <NotificationBar key={index} {...notification} onClose={this.getOnClose(index, () => onClose(index))} />
        ))}
      </div>
    );
  }
}
