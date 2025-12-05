import React from "react";

export type MailPreviewProps = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  tag?: string;
  unread?: boolean;
  attachments?: number;
};

export function MailPreview({
  sender,
  subject,
  preview,
  time,
  tag,
  unread,
  attachments = 0,
}: MailPreviewProps) {
  return (
    <article className={`mail-card ${unread ? "mail-card--unread" : ""}`}>
      <div className="mail-card__line">
        <div className="mail-card__meta">
          <span className="mail-card__sender">{sender}</span>
          <span className="mail-card__subject">{subject}</span>
        </div>
        <div className="mail-card__time">{time}</div>
      </div>
      <div className="mail-card__line">
        <p className="mail-card__preview">{preview}</p>
        <div className="mail-card__tags">
          {tag && <span className="chip chip--outline">{tag}</span>}
          {attachments > 0 && <span className="chip chip--muted">{attachments} files</span>}
        </div>
      </div>
    </article>
  );
}
