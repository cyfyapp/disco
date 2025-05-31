import { WorkspaceItem } from "../types";

interface BrowserPanelProps {
  selectedItem: WorkspaceItem | null;
  isActive: boolean;
}

export function BrowserPanel({ selectedItem, isActive }: BrowserPanelProps) {
  if (!selectedItem) {
    return (
      <div className={`browser-panel ${isActive ? "active" : ""}`}>
        <div className="panel-header">Content Viewer</div>
        <div className="empty-state">
          <div className="empty-icon">📖</div>
          <div className="empty-text">Select an item to view content</div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (selectedItem.type) {
      case "file":
        return (
          <div className="file-viewer">
            <div className="file-info">
              <h3>{selectedItem.title}</h3>
              <p>File: {selectedItem.path}</p>
            </div>
            <div className="file-content">
              File content will be displayed here
            </div>
          </div>
        );
      case "feed":
        return (
          <div className="feed-viewer">
            <div className="feed-info">
              <h3>{selectedItem.title}</h3>
              <p>Feed: {selectedItem.path}</p>
            </div>
            <div className="feed-content">
              RSS/Atom feed content will be displayed here
            </div>
          </div>
        );
      case "web":
        return (
          <div className="web-viewer">
            <div className="web-info">
              <h3>{selectedItem.title}</h3>
              <p>URL: {selectedItem.path}</p>
            </div>
            <div className="web-content">
              Web content will be displayed here
            </div>
          </div>
        );
      default:
        return <div>Unknown content type</div>;
    }
  };

  return (
    <div className={`browser-panel ${isActive ? "active" : ""}`}>
      <div className="panel-header">Content Viewer</div>
      <div className="content-area">{renderContent()}</div>
    </div>
  );
}