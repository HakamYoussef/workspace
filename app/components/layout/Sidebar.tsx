import React from "react";

export type NavItem = {
  label: string;
  icon: string;
  active?: boolean;
};

export type WorkspaceItem = {
  name: string;
  badge?: string;
};

type SidebarProps = {
  navItems: NavItem[];
  labels: WorkspaceItem[];
  spaces: WorkspaceItem[];
};

export function Sidebar({ navItems, labels, spaces }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__section">
        <div className="sidebar__title">Navigation</div>
        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${item.active ? "nav-item--active" : ""}`}
              type="button"
            >
              <span className="nav-item__icon" aria-hidden>
                {item.icon}
              </span>
              <span className="nav-item__label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar__section">
        <div className="sidebar__title">Projects</div>
        <div className="chip-list">
          {spaces.map((space) => (
            <div key={space.name} className="chip chip--muted">
              <span className="chip__dot" />
              <span>{space.name}</span>
              {space.badge && <span className="chip__badge">{space.badge}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar__section">
        <div className="sidebar__title">Labels</div>
        <div className="chip-list">
          {labels.map((label) => (
            <div key={label.name} className="chip">
              <span className="chip__dot" />
              <span>{label.name}</span>
              {label.badge && <span className="chip__badge">{label.badge}</span>}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
