import { useEffect, useCallback } from "react";
import { NavigationState } from "../types";

interface UseKeyboardNavigationProps {
  navigation: NavigationState;
  setNavigation: React.Dispatch<React.SetStateAction<NavigationState>>;
  workspacesLength: number;
  parentItemsLength: number;
}

export function useKeyboardNavigation({
  navigation,
  setNavigation,
  workspacesLength,
  parentItemsLength,
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key, target } = event;
      
      // Skip if user is typing in an input field
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      // Handle global navigation shortcuts
      switch (key.toLowerCase()) {
        case "g":
          event.preventDefault();
          break;
        case "j":
          if (event.code === "KeyJ") {
            event.preventDefault();
            handleVerticalNavigation("down");
          }
          break;
        case "k":
          if (event.code === "KeyK") {
            event.preventDefault();
            handleVerticalNavigation("up");
          }
          break;
        case "h":
          if (event.code === "KeyH") {
            event.preventDefault();
            handleHorizontalNavigation("left");
          }
          break;
        case "l":
          if (event.code === "KeyL") {
            event.preventDefault();
            handleHorizontalNavigation("right");
          }
          break;
        case "enter":
          event.preventDefault();
          handleEnterKey();
          break;
      }
    },
    [navigation, workspacesLength, parentItemsLength]
  );

  const handleVerticalNavigation = (direction: "up" | "down") => {
    const { activePanel } = navigation;
    
    if (activePanel === "workspace") {
      // Navigate between workspaces - implementation needed
      console.log(`Workspace navigation: ${direction}, total: ${workspacesLength}`);
    } else if (activePanel === "parent") {
      // Navigate between parent items - implementation needed
    } else if (activePanel === "child") {
      // Navigate between child items - implementation needed
    }
  };

  const handleHorizontalNavigation = (direction: "left" | "right") => {
    const panels = ["workspace", "parent", "child", "browser"] as const;
    const currentIndex = panels.indexOf(navigation.activePanel);
    
    if (direction === "left" && currentIndex > 0) {
      setNavigation(prev => ({
        ...prev,
        activePanel: panels[currentIndex - 1]
      }));
    } else if (direction === "right" && currentIndex < panels.length - 1) {
      setNavigation(prev => ({
        ...prev,
        activePanel: panels[currentIndex + 1]
      }));
    }
  };

  const handleEnterKey = () => {
    console.log("Enter pressed on panel:", navigation.activePanel);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    handleVerticalNavigation,
    handleHorizontalNavigation,
    handleEnterKey,
  };
}