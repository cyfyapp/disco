import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
import { BrowserPanel } from './BrowserPanel';
import { WorkspaceItem } from '../types';

describe('BrowserPanel', () => {
  it('shows empty state when no item is selected', () => {
    render(
      <BrowserPanel
        selectedItem={null}
        isActive={true}
      />
    );

    expect(screen.getByText('Content Viewer')).toBeInTheDocument();
    expect(screen.getByText('📖')).toBeInTheDocument();
    expect(screen.getByText('Select an item to view content')).toBeInTheDocument();
  });

  it('displays file viewer for file type', () => {
    const fileItem: WorkspaceItem = {
      type: 'file',
      path: '/path/to/document.md',
      title: 'Document.md'
    };

    render(
      <BrowserPanel
        selectedItem={fileItem}
        isActive={true}
      />
    );

    expect(screen.getByText('Document.md')).toBeInTheDocument();
    expect(screen.getByText('File: /path/to/document.md')).toBeInTheDocument();
    expect(screen.getByText('File content will be displayed here')).toBeInTheDocument();
  });

  it('displays feed viewer for feed type', () => {
    const feedItem: WorkspaceItem = {
      type: 'feed',
      path: 'https://example.com/feed.xml',
      title: 'Tech News Feed'
    };

    render(
      <BrowserPanel
        selectedItem={feedItem}
        isActive={true}
      />
    );

    expect(screen.getByText('Tech News Feed')).toBeInTheDocument();
    expect(screen.getByText('Feed: https://example.com/feed.xml')).toBeInTheDocument();
    expect(screen.getByText('RSS/Atom feed content will be displayed here')).toBeInTheDocument();
  });

  it('displays web viewer for web type', () => {
    const webItem: WorkspaceItem = {
      type: 'web',
      path: 'https://github.com',
      title: 'GitHub Homepage'
    };

    render(
      <BrowserPanel
        selectedItem={webItem}
        isActive={true}
      />
    );

    expect(screen.getByText('GitHub Homepage')).toBeInTheDocument();
    expect(screen.getByText('URL: https://github.com')).toBeInTheDocument();
    expect(screen.getByText('Web content will be displayed here')).toBeInTheDocument();
  });

  it('applies active class when isActive is true', () => {
    const { container } = render(
      <BrowserPanel
        selectedItem={null}
        isActive={true}
      />
    );

    const panel = container.querySelector('.browser-panel');
    expect(panel).toHaveClass('active');
  });

  it('does not apply active class when isActive is false', () => {
    const { container } = render(
      <BrowserPanel
        selectedItem={null}
        isActive={false}
      />
    );

    const panel = container.querySelector('.browser-panel');
    expect(panel).not.toHaveClass('active');
  });

  it('displays content viewer header in all cases', () => {
    render(
      <BrowserPanel
        selectedItem={null}
        isActive={true}
      />
    );

    const headers = screen.getAllByText('Content Viewer');
    expect(headers).toHaveLength(1);
  });
});