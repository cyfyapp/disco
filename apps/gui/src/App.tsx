import { useState } from "react";
import { Workspace, NavigationState } from "./types";
import { WorkspaceSidebar } from "./components/WorkspaceSidebar";
import { ParentColumn } from "./components/ParentColumn";
import { ChildColumn } from "./components/ChildColumn";
import { BrowserPanel } from "./components/BrowserPanel";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import "./components/Layout.css";
import "./App.css";

function App() {
  const [workspaces] = useState<Workspace[]>([
    {
      id: "workspace-1",
      name: "Documents",
      items: [
        {
          type: "file",
          path: "/Users/babie/Documents/README.md",
          title: "README.md",
        },
        {
          type: "feed",
          path: "https://feeds.feedburner.com/oreilly",
          title: "O'Reilly Radar",
          metadata: { unreadCount: 5 },
        },
        {
          type: "web",
          path: "https://github.com",
          title: "GitHub",
        },
      ],
    },
    {
      id: "workspace-2",
      name: "Projects",
      items: [
        {
          type: "file",
          path: "/Users/babie/Projects",
          title: "Projects Folder",
        },
      ],
    },
  ]);

  const [navigation, setNavigation] = useState<NavigationState>({
    activeWorkspace: "workspace-1",
    activePanel: "workspace",
    selectedItems: {
      parent: null,
      child: null,
    },
  });

  const activeWorkspace = workspaces.find(
    (w) => w.id === navigation.activeWorkspace
  );

  const selectedParentItem = activeWorkspace?.items.find(
    (item) => item.path === navigation.selectedItems.parent
  );

  const selectedContentItem = selectedParentItem;

  const handleWorkspaceSelect = (workspaceId: string) => {
    setNavigation((prev) => ({
      ...prev,
      activeWorkspace: workspaceId,
      selectedItems: { parent: null, child: null },
    }));
  };

  const handleParentItemSelect = (itemPath: string) => {
    setNavigation((prev) => ({
      ...prev,
      selectedItems: { ...prev.selectedItems, parent: itemPath, child: null },
    }));
  };

  const handleChildItemSelect = (itemId: string) => {
    setNavigation((prev) => ({
      ...prev,
      selectedItems: { ...prev.selectedItems, child: itemId },
    }));
  };

  // Initialize keyboard navigation
  useKeyboardNavigation({
    navigation,
    setNavigation,
    workspacesLength: workspaces.length,
    parentItemsLength: activeWorkspace?.items.length || 0,
  });

  return (
    <div className="app-layout">
      <WorkspaceSidebar
        workspaces={workspaces}
        activeWorkspace={navigation.activeWorkspace}
        isActive={navigation.activePanel === "workspace"}
        onWorkspaceSelect={handleWorkspaceSelect}
      />
      <ParentColumn
        items={activeWorkspace?.items || []}
        selectedItem={navigation.selectedItems.parent}
        isActive={navigation.activePanel === "parent"}
        onItemSelect={handleParentItemSelect}
      />
      <ChildColumn
        parentItem={selectedParentItem || null}
        selectedItem={navigation.selectedItems.child}
        isActive={navigation.activePanel === "child"}
        onItemSelect={handleChildItemSelect}
      />
      <BrowserPanel
        selectedItem={selectedContentItem || null}
        isActive={navigation.activePanel === "browser"}
      />
    </div>
  );
}

export default App;
