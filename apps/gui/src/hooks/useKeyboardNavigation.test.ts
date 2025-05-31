import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { NavigationState } from '../types';

describe('useKeyboardNavigation', () => {
  let navigation: NavigationState;
  let setNavigation: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    navigation = {
      activeWorkspace: 'workspace-1',
      activePanel: 'workspace',
      selectedItems: {
        parent: null,
        child: null,
      },
    };
    setNavigation = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize without errors', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        navigation,
        setNavigation,
        workspacesLength: 2,
        parentItemsLength: 3,
      })
    );

    expect(result.current).toBeDefined();
    expect(result.current.handleVerticalNavigation).toBeInstanceOf(Function);
    expect(result.current.handleHorizontalNavigation).toBeInstanceOf(Function);
    expect(result.current.handleEnterKey).toBeInstanceOf(Function);
  });

  it('should move right through panels with gh/gl navigation', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        navigation,
        setNavigation,
        workspacesLength: 2,
        parentItemsLength: 3,
      })
    );

    // Test moving right from workspace to parent
    result.current.handleHorizontalNavigation('right');
    expect(setNavigation).toHaveBeenCalledWith(expect.any(Function));

    // Test the function passed to setNavigation
    const setNavigationCall = setNavigation.mock.calls[0][0];
    const newState = setNavigationCall(navigation);
    expect(newState.activePanel).toBe('parent');
  });

  it('should move left through panels', () => {
    navigation.activePanel = 'parent';
    
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        navigation,
        setNavigation,
        workspacesLength: 2,
        parentItemsLength: 3,
      })
    );

    result.current.handleHorizontalNavigation('left');
    expect(setNavigation).toHaveBeenCalledWith(expect.any(Function));

    const setNavigationCall = setNavigation.mock.calls[0][0];
    const newState = setNavigationCall(navigation);
    expect(newState.activePanel).toBe('workspace');
  });

  it('should not move left from first panel', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        navigation,
        setNavigation,
        workspacesLength: 2,
        parentItemsLength: 3,
      })
    );

    result.current.handleHorizontalNavigation('left');
    expect(setNavigation).not.toHaveBeenCalled();
  });

  it('should not move right from last panel', () => {
    navigation.activePanel = 'browser';
    
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        navigation,
        setNavigation,
        workspacesLength: 2,
        parentItemsLength: 3,
      })
    );

    result.current.handleHorizontalNavigation('right');
    expect(setNavigation).not.toHaveBeenCalled();
  });

  it('should handle enter key press', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        navigation,
        setNavigation,
        workspacesLength: 2,
        parentItemsLength: 3,
      })
    );

    result.current.handleEnterKey();
    expect(consoleSpy).toHaveBeenCalledWith('Enter pressed on panel:', 'workspace');
    
    consoleSpy.mockRestore();
  });

  it('should handle vertical navigation for workspace panel', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        navigation,
        setNavigation,
        workspacesLength: 2,
        parentItemsLength: 3,
      })
    );

    result.current.handleVerticalNavigation('down');
    expect(consoleSpy).toHaveBeenCalledWith('Workspace navigation: down, total: 2');
    
    consoleSpy.mockRestore();
  });

  it('should add and remove event listeners', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useKeyboardNavigation({
        navigation,
        setNavigation,
        workspacesLength: 2,
        parentItemsLength: 3,
      })
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});