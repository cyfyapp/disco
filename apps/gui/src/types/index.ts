export interface Workspace {
  id: string;
  name: string;
  items: WorkspaceItem[];
}

export interface WorkspaceItem {
  type: "file" | "feed" | "web";
  path: string;
  title: string;
  metadata?: {
    lastRead?: Date;
    unreadCount?: number;
  };
}

export interface NavigationState {
  activeWorkspace: string | null;
  activePanel: "workspace" | "parent" | "child" | "browser";
  selectedItems: {
    parent: string | null;
    child: string | null;
  };
}