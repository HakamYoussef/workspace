"use client";

import React, { FormEvent, useMemo, useState } from "react";

type TeamSpace = {
  id: string;
  name: string;
  focus: string;
  members: string[];
};

const starterTeams: TeamSpace[] = [
  {
    id: "nexus",
    name: "Nexus squad",
    focus: "Product delivery",
    members: ["haley@workdesk.io", "lucas@workdesk.io", "maya@workdesk.io"],
  },
  {
    id: "research",
    name: "Research circle",
    focus: "Customer discovery",
    members: ["bianca@workdesk.io", "charlie@workdesk.io", "nora@workdesk.io"],
  },
  {
    id: "ops",
    name: "Ops & finance",
    focus: "Run the business",
    members: ["finance.ops@workdesk.io", "leo@workdesk.io", "priya@workdesk.io"],
  },
];

function normalizeEmails(raw: string) {
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function TeamWorkspace() {
  const [teams, setTeams] = useState<TeamSpace[]>(starterTeams);
  const [selectedTeamId, setSelectedTeamId] = useState<string>(starterTeams[0]?.id ?? "");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamFocus, setNewTeamFocus] = useState("Staff workspace");
  const [newMembers, setNewMembers] = useState("");
  const [composeSubject, setComposeSubject] = useState("Weekly update: priorities & blockers");
  const [composeBody, setComposeBody] = useState(
    "Sharing the priorities for this week with owners and links to open docs."
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const selectedTeam = useMemo(
    () => teams.find((team) => team.id === selectedTeamId),
    [teams, selectedTeamId]
  );

  const handleCreateTeam = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const members = normalizeEmails(newMembers);
    if (!newTeamName.trim() || members.length === 0) {
      setStatusMessage("Add a team name and at least one member email to create a workspace.");
      return;
    }

    const id = `${newTeamName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    const newTeam: TeamSpace = {
      id,
      name: newTeamName.trim(),
      focus: newTeamFocus.trim() || "Staff workspace",
      members,
    };

    setTeams((current) => [newTeam, ...current]);
    setSelectedTeamId(id);
    setNewTeamName("");
    setNewTeamFocus("Staff workspace");
    setNewMembers("");
    setStatusMessage(`Created ${newTeam.name} with ${members.length} teammate${
      members.length === 1 ? "" : "s"
    }.`);
  };

  const handleSendToTeam = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTeam) {
      setStatusMessage("Select a team workspace to send your mail.");
      return;
    }

    const audience = selectedTeam.members.join(", ");
    setStatusMessage(
      `Ready to send \"${composeSubject}\" to ${selectedTeam.name} (${selectedTeam.members.length} teammates): ${audience}.`
    );
  };

  return (
    <div className="team-workspace">
      <div className="team-workspace__header">
        <div>
          <p className="eyebrow">Workspaces</p>
          <h3>Team broadcasts</h3>
          <p className="muted">
            Create shared spaces for staff and send one mail to the whole équipe without typing every
            address.
          </p>
        </div>
        <div className="chip chip--outline">Teams sync</div>
      </div>

      <div className="team-workspace__grid">
        <form className="card" onSubmit={handleCreateTeam}>
          <div className="card__header">
            <div>
              <p className="eyebrow">Create space</p>
              <h4>New staff workspace</h4>
            </div>
            <span className="chip chip--muted">Auto-sharing</span>
          </div>
          <label className="field">
            <span className="field__label">Team name</span>
            <input
              type="text"
              value={newTeamName}
              onChange={(event) => setNewTeamName(event.target.value)}
              placeholder="Ex: Field operations"
            />
          </label>
          <label className="field">
            <span className="field__label">Purpose</span>
            <input
              type="text"
              value={newTeamFocus}
              onChange={(event) => setNewTeamFocus(event.target.value)}
              placeholder="Hiring, onboarding, support..."
            />
          </label>
          <label className="field">
            <span className="field__label">Members (emails)</span>
            <textarea
              rows={3}
              value={newMembers}
              onChange={(event) => setNewMembers(event.target.value)}
              placeholder="team@company.com, person@company.com"
            />
            <p className="muted">Comma separated — everyone is added to the workspace automatically.</p>
          </label>
          <button className="ghost-btn ghost-btn--primary" type="submit">
            Add workspace
          </button>
        </form>

        <div className="card">
          <div className="card__header">
            <div>
              <p className="eyebrow">Team roster</p>
              <h4>Spaces ready to mail</h4>
            </div>
            <span className="chip chip--muted">{teams.length} teams</span>
          </div>
          <ul className="team-list">
            {teams.map((team) => (
              <li key={team.id} className="team-card">
                <div>
                  <div className="team-card__title">{team.name}</div>
                  <p className="muted">{team.focus}</p>
                  <div className="team-card__members">
                    {team.members.map((member) => (
                      <span key={member} className="chip chip--muted">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="chip chip--outline">{team.members.length} people</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form className="compose-card" onSubmit={handleSendToTeam}>
        <div className="compose-card__header">
          <div>
            <p className="eyebrow">Compose</p>
            <h4>Send to a team</h4>
          </div>
          <div className="select">
            <label className="field__label" htmlFor="team-select">
              Workspace
            </label>
            <select
              id="team-select"
              value={selectedTeamId}
              onChange={(event) => setSelectedTeamId(event.target.value)}
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="field">
          <span className="field__label">Subject</span>
          <input
            type="text"
            value={composeSubject}
            onChange={(event) => setComposeSubject(event.target.value)}
            placeholder="What are you sending?"
          />
        </label>

        <label className="field">
          <span className="field__label">Message</span>
          <textarea
            rows={3}
            value={composeBody}
            onChange={(event) => setComposeBody(event.target.value)}
            placeholder="Share context once — everyone in the space will receive it."
          />
        </label>

        <div className="compose-card__footer">
          <div className="recipient-list">
            {selectedTeam?.members.map((member) => (
              <span key={member} className="chip chip--muted">
                {member}
              </span>
            ))}
          </div>
          <button className="ghost-btn ghost-btn--primary" type="submit">
            Send to team
          </button>
        </div>
      </form>

      {statusMessage && <div className="status-banner">{statusMessage}</div>}
    </div>
  );
}
