import { Workspace } from "../types";

interface WorkspaceSidebarProps {
  workspaces: Workspace[];
  activeWorkspace: string | null;
  isActive: boolean;
  onWorkspaceSelect: (workspaceId: string) => void;
}

export function WorkspaceSidebar({
  workspaces,
  activeWorkspace,
  isActive,
  onWorkspaceSelect,
}: WorkspaceSidebarProps) {
  return (
    <div className={`workspace-sidebar ${isActive ? "active" : ""}`}>
      <div className="workspace-list">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className={`workspace-item ${
              workspace.id === activeWorkspace ? "selected" : ""
            }`}
            onClick={() => onWorkspaceSelect(workspace.id)}
          >
            <div className="workspace-icon">W</div>
            <div className="workspace-name">{workspace.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}