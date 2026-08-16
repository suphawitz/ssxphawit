import assert from "node:assert/strict";
import test from "node:test";

import { closeProjectDialog, openProjectDialog } from "./project-dialog.ts";

function createDialog({ showModal, close } = {}) {
  const attributes = new Set();

  return {
    open: false,
    showModal,
    close,
    setAttribute(name) {
      attributes.add(name);
      this.open = true;
    },
    removeAttribute(name) {
      attributes.delete(name);
      this.open = false;
    },
    hasAttribute(name) {
      return attributes.has(name);
    },
  };
}

test("falls back to the open attribute when modal dialogs are unavailable", () => {
  const dialog = createDialog();

  openProjectDialog(dialog);

  assert.equal(dialog.open, true);
  assert.equal(dialog.hasAttribute("open"), true);
});

test("falls back when the native modal method throws", () => {
  const dialog = createDialog({
    showModal() {
      throw new Error("modal unavailable");
    },
  });

  openProjectDialog(dialog);

  assert.equal(dialog.open, true);
  assert.equal(dialog.hasAttribute("open"), true);
});

test("uses the native close method and clears the fallback attribute", () => {
  let closeCalls = 0;
  const dialog = createDialog({
    close() {
      closeCalls += 1;
      this.open = false;
    },
  });
  dialog.setAttribute("open", "");

  closeProjectDialog(dialog);

  assert.equal(closeCalls, 1);
  assert.equal(dialog.open, false);
  assert.equal(dialog.hasAttribute("open"), false);
});

test("reports when closing must use the non-native fallback", () => {
  const dialog = createDialog();
  dialog.setAttribute("open", "");

  const usedNativeClose = closeProjectDialog(dialog);

  assert.equal(usedNativeClose, false);
  assert.equal(dialog.open, false);
  assert.equal(dialog.hasAttribute("open"), false);
});
