import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import { ParentColumn } from './ParentColumn';
import { WorkspaceItem } from '../types';

const mockItems: WorkspaceItem[] = [
  {
    type: 'file',
    path: '/path/to/file.md',
    title: 'README.md'
  },
  {
    type: 'feed',
    path: 'https://example.com/feed.xml',
    title: 'Tech News',
    metadata: { unreadCount: 5 }
  },
  {
    type: 'web',
    path: 'https://github.com',
    title: 'GitHub'
  }
];

describe('ParentColumn', () => {
  it('renders items correctly', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ParentColumn
        items={mockItems}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('README.md')).toBeInTheDocument();
    expect(screen.getByText('Tech News')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('displays correct icons for item types', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ParentColumn
        items={mockItems}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('📄')).toBeInTheDocument(); // file icon
    expect(screen.getByText('📰')).toBeInTheDocument(); // feed icon
    expect(screen.getByText('🌐')).toBeInTheDocument(); // web icon
  });

  it('displays unread count when available', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ParentColumn
        items={mockItems}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights selected item', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ParentColumn
        items={mockItems}
        selectedItem="/path/to/file.md"
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    const selectedItem = screen.getByText('README.md').closest('.item');
    expect(selectedItem).toHaveClass('selected');
  });

  it('calls onItemSelect when item is clicked', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ParentColumn
        items={mockItems}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    const item = screen.getByText('Tech News').closest('.item');
    fireEvent.click(item!);

    expect(mockOnSelect).toHaveBeenCalledWith('https://example.com/feed.xml');
  });

  it('applies active class when isActive is true', () => {
    const mockOnSelect = vi.fn();
    
    const { container } = render(
      <ParentColumn
        items={mockItems}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    const column = container.querySelector('.parent-column');
    expect(column).toHaveClass('active');
  });

  it('renders column header', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ParentColumn
        items={mockItems}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Items')).toBeInTheDocument();
  });
});