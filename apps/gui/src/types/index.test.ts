import { describe, it, expect } from 'vitest';
import { Workspace, WorkspaceItem, NavigationState } from './index';

describe('TypeScript Interfaces', () => {
  describe('Workspace', () => {
    it('should accept valid workspace object', () => {
      const workspace: Workspace = {
        id: 'test-workspace',
        name: 'Test Workspace',
        items: []
      };

      expect(workspace.id).toBe('test-workspace');
      expect(workspace.name).toBe('Test Workspace');
      expect(workspace.items).toEqual([]);
    });

    it('should accept workspace with items', () => {
      const item: WorkspaceItem = {
        type: 'file',
        path: '/test/path',
        title: 'Test File'
      };

      const workspace: Workspace = {
        id: 'test-workspace',
        name: 'Test Workspace',
        items: [item]
      };

      expect(workspace.items).toHaveLength(1);
      expect(workspace.items[0]).toBe(item);
    });
  });

  describe('WorkspaceItem', () => {
    it('should accept file type item', () => {
      const item: WorkspaceItem = {
        type: 'file',
        path: '/path/to/file.md',
        title: 'README.md'
      };

      expect(item.type).toBe('file');
      expect(item.path).toBe('/path/to/file.md');
      expect(item.title).toBe('README.md');
    });

    it('should accept feed type item', () => {
      const item: WorkspaceItem = {
        type: 'feed',
        path: 'https://example.com/feed.xml',
        title: 'News Feed'
      };

      expect(item.type).toBe('feed');
      expect(item.path).toBe('https://example.com/feed.xml');
      expect(item.title).toBe('News Feed');
    });

    it('should accept web type item', () => {
      const item: WorkspaceItem = {
        type: 'web',
        path: 'https://github.com',
        title: 'GitHub'
      };

      expect(item.type).toBe('web');
      expect(item.path).toBe('https://github.com');
      expect(item.title).toBe('GitHub');
    });

    it('should accept item with metadata', () => {
      const item: WorkspaceItem = {
        type: 'feed',
        path: 'https://example.com/feed.xml',
        title: 'News Feed',
        metadata: {
          lastRead: new Date('2023-01-01'),
          unreadCount: 5
        }
      };

      expect(item.metadata?.lastRead).toBeInstanceOf(Date);
      expect(item.metadata?.unreadCount).toBe(5);
    });

    it('should accept item without metadata', () => {
      const item: WorkspaceItem = {
        type: 'file',
        path: '/test/file.txt',
        title: 'Test File'
      };

      expect(item.metadata).toBeUndefined();
    });
  });

  describe('NavigationState', () => {
    it('should accept valid navigation state', () => {
      const navigation: NavigationState = {
        activeWorkspace: 'workspace-1',
        activePanel: 'workspace',
        selectedItems: {
          parent: 'item-1',
          child: 'child-1'
        }
      };

      expect(navigation.activeWorkspace).toBe('workspace-1');
      expect(navigation.activePanel).toBe('workspace');
      expect(navigation.selectedItems.parent).toBe('item-1');
      expect(navigation.selectedItems.child).toBe('child-1');
    });

    it('should accept navigation state with null values', () => {
      const navigation: NavigationState = {
        activeWorkspace: null,
        activePanel: 'browser',
        selectedItems: {
          parent: null,
          child: null
        }
      };

      expect(navigation.activeWorkspace).toBeNull();
      expect(navigation.selectedItems.parent).toBeNull();
      expect(navigation.selectedItems.child).toBeNull();
    });

    it('should accept all valid panel types', () => {
      const panels: NavigationState['activePanel'][] = ['workspace', 'parent', 'child', 'browser'];
      
      panels.forEach(panel => {
        const navigation: NavigationState = {
          activeWorkspace: 'test',
          activePanel: panel,
          selectedItems: { parent: null, child: null }
        };

        expect(navigation.activePanel).toBe(panel);
      });
    });
  });
});