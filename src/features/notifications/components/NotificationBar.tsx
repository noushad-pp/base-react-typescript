import React from 'react';
import {
  Notification,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_NEUTRAL,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_WARNING,
} from '../types';
import styles from './NotificationBar.module.scss';

type ComponentProps = Notification & {
  onClose: () => void;
};

export default class NotificationBar extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { type, text, details, onClose } = this.props;
    const styleMap = {
      [NOTIFICATION_TYPE_NEUTRAL]: styles.neutralBar,
      [NOTIFICATION_TYPE_ERROR]: styles.errorBar,
      [NOTIFICATION_TYPE_WARNING]: styles.warningBar,
      [NOTIFICATION_TYPE_SUCCESS]: styles.successBar,
    };

    return (
      <div className={styleMap[type]}>
        <div className={styles.text}>
          {text}
          {details && <p className={styles.details}>{details}</p>}
        </div>
        <i className={styles.close} onClick={onClose} />
      </div>
    );
  }
}
