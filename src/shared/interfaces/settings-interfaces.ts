export interface Notification {
  authorizationNotification: boolean;
  lastInteraction: string;
}

export interface Settings {
  notification: Notification;
  authorizationBackup: boolean;
}
