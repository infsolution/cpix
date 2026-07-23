interface AskToShareNotification {
  confirm: boolean;
}

export interface AskToShareNotificationResponse {
  message: string;
  code: string;
  data: AskToShareNotification;
}

export interface AksToShareForm {
  friendId: string;
  headings: string;
  contents: string;
  data: object;
  deepLink?: string;
  urlImage?: string;
  bigPicture?: string;
  iosAttachments?: string;
}
