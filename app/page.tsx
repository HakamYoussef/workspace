import { MailList } from "./components/mail/MailList";
import { MailPreviewProps } from "./components/mail/MailPreview";
import { Sidebar, WorkspaceItem } from "./components/layout/Sidebar";
import { WorkspacePanel, Note } from "./components/workspace/WorkspacePanel";

const mailItems: MailPreviewProps[] = [
  {
    id: "1",
    sender: "Haley Rowan",
    subject: "Sprint planning deck",
    preview: "Updated the ritual agenda with the new staffing plan and blockers.",
    time: "08:45",
    tag: "Product",
    unread: true,
    attachments: 2,
  },
  {
    id: "2",
    sender: "Lucas Mendez",
    subject: "Customer feedback rollup",
    preview: "Condensed the AMER interviews and flagged the recurring friction points.",
    time: "08:12",
    tag: "Research",
    attachments: 1,
  },
  {
    id: "3",
    sender: "Finance Ops",
    subject: "Q3 budget checkpoint",
    preview: "Please confirm headcount changes before Thursday so we can freeze forecasts.",
    time: "Yesterday",
    tag: "Finance",
  },
  {
    id: "4",
    sender: "Maya Chen",
    subject: "Design system tokens",
    preview: "Shared the new elevation tokens with examples for mail and docs surfaces.",
    time: "Yesterday",
    tag: "Design",
    attachments: 4,
  },
];

const navigation: WorkspaceItem[] = [
  { name: "Inbox" },
  { name: "Priorities" },
  { name: "Meet" },
  { name: "Docs" },
  { name: "Tasks" },
];

const projects: WorkspaceItem[] = [
  { name: "Horizon" },
  { name: "Nexus", badge: "active" },
  { name: "Client support" },
];

const labels: WorkspaceItem[] = [
  { name: "Product" },
  { name: "Design" },
  { name: "Finance", badge: "3" },
  { name: "Follow-up", badge: "7" },
];

const workspaceNotes: Note[] = [
  {
    title: "Outlook → Inbox migration plan",
    detail:
      "Three-phase rollout with weekend cutover and auto-archive. Draft status page copy included.",
    badge: "Doc",
  },
  {
    title: "Weekly customer insights",
    detail: "Pinned highlights from London sessions with quick links to transcripts.",
    badge: "Note",
  },
  {
    title: "Meeting notes: Core squad",
    detail: "Decisions on notification cadence plus owners for beta cohort outreach.",
    badge: "Minutes",
  },
];

export default function Home() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="logo">Workdesk</div>
        <div className="search">
          <span aria-hidden>🔍</span>
          <input aria-label="Search" placeholder="Search mail, docs, people" />
        </div>
        <div className="topbar__actions">
          <button className="ghost-btn" type="button">
            Compose
          </button>
          <button className="ghost-btn" type="button">
            New page
          </button>
          <div className="avatar" aria-label="User avatar">
            HC
          </div>
        </div>
      </header>

      <div className="workspace">
        <Sidebar
          navItems={navigation.map((item, index) => ({
            label: item.name,
            icon: ["📥", "⭐", "🎥", "📄", "✅"][index] ?? "•",
            active: index === 0,
          }))}
          labels={labels}
          spaces={projects}
        />

        <section className="column column--mail">
          <div className="section-header">
            <div>
              <p className="eyebrow">Mail</p>
              <h2>Stay aligned</h2>
            </div>
            <div className="section-actions">
              <button className="ghost-btn" type="button">
                Filter
              </button>
              <button className="ghost-btn ghost-btn--primary" type="button">
                Add to doc
              </button>
            </div>
          </div>
          <MailList items={mailItems} />
        </section>

        <section className="column column--panel">
          <WorkspacePanel
            header="Team workspace"
            description="Turn threads into living pages, assign owners, and keep the ritual notes close to the inbox."
            notes={workspaceNotes}
          />

          <div className="task-board">
            <div className="task-board__header">
              <div>
                <p className="eyebrow">Action items</p>
                <h3>Linked tasks</h3>
              </div>
              <button className="ghost-btn" type="button">
                Add task
              </button>
            </div>
            <ul className="task-list">
              <li className="task-card">
                <div>
                  Prep Q&A doc for migration webinar
                  <p className="muted">Due tomorrow · Assigned to Haley</p>
                </div>
                <span className="chip chip--outline">Open</span>
              </li>
              <li className="task-card">
                <div>
                  Confirm billing policy changes with finance
                  <p className="muted">Due Friday · Assigned to Lucas</p>
                </div>
                <span className="chip chip--muted">In review</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
