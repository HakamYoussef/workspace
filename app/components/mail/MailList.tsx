import React from "react";
import { MailPreview, MailPreviewProps } from "./MailPreview";

type MailListProps = {
  items: MailPreviewProps[];
};

export function MailList({ items }: MailListProps) {
  return (
    <div className="mail-list">
      <div className="mail-list__filters">
        <button className="ghost-btn ghost-btn--primary" type="button">
          Focused
        </button>
        <button className="ghost-btn" type="button">
          Inbox
        </button>
        <button className="ghost-btn" type="button">
          Teams
        </button>
        <div className="chip chip--outline">Updated 8m ago</div>
      </div>
      <div className="mail-list__cards">
        {items.map((item) => (
          <MailPreview key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
