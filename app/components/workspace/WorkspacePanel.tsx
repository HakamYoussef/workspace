import React from "react";

export type Note = {
  title: string;
  detail: string;
  badge?: string;
};

type WorkspacePanelProps = {
  header: string;
  description: string;
  notes: Note[];
};

export function WorkspacePanel({ header, description, notes }: WorkspacePanelProps) {
  return (
    <div className="workspace-panel">
      <div className="workspace-panel__header">
        <div>
          <p className="eyebrow">Notes & Docs</p>
          <h2>{header}</h2>
          <p className="muted">{description}</p>
        </div>
        <div className="workspace-panel__actions">
          <button className="ghost-btn" type="button">
            New doc
          </button>
          <button className="ghost-btn" type="button">
            Share
          </button>
        </div>
      </div>
      <div className="workspace-panel__grid">
        {notes.map((note) => (
          <article key={note.title} className="workspace-note">
            <div className="workspace-note__title">{note.title}</div>
            <p className="workspace-note__body">{note.detail}</p>
            {note.badge && <span className="chip chip--outline">{note.badge}</span>}
          </article>
        ))}
      </div>
    </div>
  );
}
