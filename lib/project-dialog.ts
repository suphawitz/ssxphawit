type ProjectDialog = {
  open: boolean;
  showModal?: () => void;
  close?: () => void;
  setAttribute: (name: string, value: string) => void;
  removeAttribute: (name: string) => void;
};

export function openProjectDialog(dialog: ProjectDialog) {
  if (typeof dialog.showModal === "function") {
    try {
      dialog.showModal();
      return;
    } catch {
      // Fall through to the non-modal dialog mode.
    }
  }

  dialog.setAttribute("open", "");
}

export function closeProjectDialog(dialog: ProjectDialog) {
  if (typeof dialog.close === "function") {
    try {
      dialog.close();
      dialog.removeAttribute("open");
      return true;
    } catch {
      // Fall through to the non-modal dialog mode.
    }
  }

  dialog.removeAttribute("open");
  return false;
}
