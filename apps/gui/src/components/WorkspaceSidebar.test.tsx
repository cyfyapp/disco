import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { Workspace } from '../types';

const mockWorkspaces: Workspace[] = [
  {
    id: 'workspace-1',
    name: 'Documents',
    items: []
  },
  {
    id: 'workspace-2', 
    name: 'Projects',
    items: []
  }
];

describe('WorkspaceSidebar', () => {
  it('renders workspace list correctly', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <WorkspaceSidebar
        workspaces={mockWorkspaces}
        activeWorkspace="workspace-1"
        isActive={true}
        onWorkspaceSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('highlights active workspace', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <WorkspaceSidebar
        workspaces={mockWorkspaces}
        activeWorkspace="workspace-1"
        isActive={true}
        onWorkspaceSelect={mockOnSelect}
      />
    );

    const activeWorkspace = screen.getByText('Documents').closest('.workspace-item');
    expect(activeWorkspace).toHaveClass('selected');
  });

  it('calls onWorkspaceSelect when workspace is clicked', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <WorkspaceSidebar
        workspaces={mockWorkspaces}
        activeWorkspace="workspace-1"
        isActive={true}
        onWorkspaceSelect={mockOnSelect}
      />
    );

    const projectsWorkspace = screen.getByText('Projects').closest('.workspace-item');
    fireEvent.click(projectsWorkspace!);

    expect(mockOnSelect).toHaveBeenCalledWith('workspace-2');
  });

  it('applies active class when isActive is true', () => {
    const mockOnSelect = vi.fn();
    
    const { container } = render(
      <WorkspaceSidebar
        workspaces={mockWorkspaces}
        activeWorkspace="workspace-1"
        isActive={true}
        onWorkspaceSelect={mockOnSelect}
      />
    );

    const sidebar = container.querySelector('.workspace-sidebar');
    expect(sidebar).toHaveClass('active');
  });

  it('does not apply active class when isActive is false', () => {
    const mockOnSelect = vi.fn();
    
    const { container } = render(
      <WorkspaceSidebar
        workspaces={mockWorkspaces}
        activeWorkspace="workspace-1"
        isActive={false}
        onWorkspaceSelect={mockOnSelect}
      />
    );

    const sidebar = container.querySelector('.workspace-sidebar');
    expect(sidebar).not.toHaveClass('active');
  });

  it('renders empty list when no workspaces provided', () => {
    const mockOnSelect = vi.fn();
    
    const { container } = render(
      <WorkspaceSidebar
        workspaces={[]}
        activeWorkspace={null}
        isActive={true}
        onWorkspaceSelect={mockOnSelect}
      />
    );

    const workspaceList = container.querySelector('.workspace-list');
    expect(workspaceList?.children).toHaveLength(0);
  });
});