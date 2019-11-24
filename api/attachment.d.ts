import {
  AttachmentMetadata,
  Callback,
  JiraIssueType,
} from '../index';

declare class AttachmentClient {
  getAttachment(
    opts: {
      attachmentId: string;
    },
    callback?: Callback<AttachmentMetadata>,
  ): Promise<AttachmentMetadata>;

  deleteAttachment(
    opts: {
      attachmentId: string;
    },
    callback?: Callback<void>
  ): Promise<void>;

  getGlobalAttachmentMetadata(
    opts?: unknown,
    callback?: Callback<void>
  ): Promise<void>;
}

export = AttachmentClient;
