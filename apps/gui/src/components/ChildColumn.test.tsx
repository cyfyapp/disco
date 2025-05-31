import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/test-utils';
import { ChildColumn } from './ChildColumn';
import { WorkspaceItem } from '../types';

const mockParentItem: WorkspaceItem = {
  type: 'file',
  path: '/path/to/file.md',
  title: 'README.md'
};

describe('ChildColumn', () => {
  it('shows empty state when no parent item is provided', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ChildColumn
        parentItem={null}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Select an item to view details')).toBeInTheDocument();
  });

  it('displays parent item title in header when parent item is provided', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ChildColumn
        parentItem={mockParentItem}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('README.md')).toBeInTheDocument();
  });

  it('shows no sub-items message for file type', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <ChildColumn
        parentItem={mockParentItem}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('No sub-items available')).toBeInTheDocument();
  });

  it('applies active class when isActive is true', () => {
    const mockOnSelect = vi.fn();
    
    const { container } = render(
      <ChildColumn
        parentItem={mockParentItem}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    const column = container.querySelector('.child-column');
    expect(column).toHaveClass('active');
  });

  it('does not apply active class when isActive is false', () => {
    const mockOnSelect = vi.fn();
    
    const { container } = render(
      <ChildColumn
        parentItem={mockParentItem}
        selectedItem={null}
        isActive={false}
        onItemSelect={mockOnSelect}
      />
    );

    const column = container.querySelector('.child-column');
    expect(column).not.toHaveClass('active');
  });

  it('shows empty state for feed type with no child items', () => {
    const feedItem: WorkspaceItem = {
      type: 'feed',
      path: 'https://example.com/feed.xml',
      title: 'Tech Feed'
    };

    const mockOnSelect = vi.fn();
    
    render(
      <ChildColumn
        parentItem={feedItem}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Tech Feed')).toBeInTheDocument();
    expect(screen.getByText('No sub-items available')).toBeInTheDocument();
  });

  it('shows empty state for web type with no child items', () => {
    const webItem: WorkspaceItem = {
      type: 'web',
      path: 'https://github.com',
      title: 'GitHub'
    };

    const mockOnSelect = vi.fn();
    
    render(
      <ChildColumn
        parentItem={webItem}
        selectedItem={null}
        isActive={true}
        onItemSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('No sub-items available')).toBeInTheDocument();
  });
});