import { WorkspaceItem } from "../types";

interface ParentColumnProps {
  items: WorkspaceItem[];
  selectedItem: string | null;
  isActive: boolean;
  onItemSelect: (itemId: string) => void;
}

export function ParentColumn({
  items,
  selectedItem,
  isActive,
  onItemSelect,
}: ParentColumnProps) {
  return (
    <div className={`parent-column ${isActive ? "active" : ""}`}>
      <div className="column-header">Items</div>
      <div className="item-list">
        {items.map((item) => (
          <div
            key={item.path}
            className={`item ${item.path === selectedItem ? "selected" : ""}`}
            onClick={() => onItemSelect(item.path)}
          >
            <div className="item-icon">
              {item.type === "file" && "📄"}
              {item.type === "feed" && "📰"}
              {item.type === "web" && "🌐"}
            </div>
            <div className="item-content">
              <div className="item-title">{item.title}</div>
              <div className="item-path">{item.path}</div>
            </div>
            {item.metadata?.unreadCount && (
              <div className="unread-count">{item.metadata.unreadCount}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}