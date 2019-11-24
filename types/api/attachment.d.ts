import { Callback, AttachmentMetadata } from "types";

export class Attachment {
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
    opts?: any,
    callback?: Callback<void>
  ): Promise<void>;
}
