import { WorkspaceItem } from "../types";

interface ChildColumnProps {
  parentItem: WorkspaceItem | null;
  selectedItem: string | null;
  isActive: boolean;
  onItemSelect: (itemId: string) => void;
}

export function ChildColumn({
  parentItem,
  selectedItem,
  isActive,
  onItemSelect,
}: ChildColumnProps) {
  if (!parentItem) {
    return (
      <div className={`child-column ${isActive ? "active" : ""}`}>
        <div className="column-header">Details</div>
        <div className="empty-state">Select an item to view details</div>
      </div>
    );
  }

  const getChildItems = (item: WorkspaceItem) => {
    switch (item.type) {
      case "file":
        return [];
      case "feed":
        return [];
      case "web":
        return [];
      default:
        return [];
    }
  };

  const childItems = getChildItems(parentItem);

  return (
    <div className={`child-column ${isActive ? "active" : ""}`}>
      <div className="column-header">{parentItem.title}</div>
      <div className="child-list">
        {childItems.length === 0 ? (
          <div className="empty-state">No sub-items available</div>
        ) : (
          childItems.map((child: any) => (
            <div
              key={child.id}
              className={`child-item ${
                child.id === selectedItem ? "selected" : ""
              }`}
              onClick={() => onItemSelect(child.id)}
            >
              <div className="child-title">{child.title}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}