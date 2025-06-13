import { CaptureUpdateAction } from "@excalidraw/excalidraw";
import { register } from "@excalidraw/excalidraw/actions/register";
import { presentIcon } from "@excalidraw/excalidraw/components/icons";
import { isPresentationLink } from "excalidraw-app/presentation/Presentation";

import type { NormalizedZoomValue } from "@excalidraw/excalidraw/types";

export const actionPresent = register({
  name: "present",
  label: "labels.present",
  icon: presentIcon,
  trackEvent: { category: "canvas" },
  perform: (_, appState, __, app) => {
    const frames = app.scene
      .getNonDeletedElements()
      .filter((e) => e.type === "frame");
    const selectedElementIds = appState.selectedElementIds;
    const selectedFrames = app.scene
      .getSelectedElements({ selectedElementIds })
      .filter((e) => e.type === "frame");
    let frameIndex = 0;
    if (selectedFrames.length !== 0) {
      const minY = Math.min(...selectedFrames.map((f) => f.y));
      frameIndex = frames.reduce((count, f) => count + (f.y < minY ? 1 : 0), 0);
    }

    const newUrl = new URL(window.location.href);
    newUrl.hash = `#presentation=${frameIndex}`;
    window.open(newUrl.href, "_blank");

    return { captureUpdate: CaptureUpdateAction.NEVER };
  },
});

export const actionResetPresentCanvas = register({
  name: "resetPresentCanvas",
  label: "labels.resetPresentCanvas",
  icon: presentIcon,
  trackEvent: { category: "canvas" },
  perform: (_elements, appState, _, app) => {
    const initialScaleDiv = document.body.querySelector(
      ".presentation-presentation",
    ) as HTMLDivElement;
    if (initialScaleDiv !== null) {
      const initialScale = initialScaleDiv.dataset.initialScale;
      return {
        appState: {
          ...appState,
          scrollX: 0,
          scrollY: 0,
          zoom: {
            value: Number(initialScale) as NormalizedZoomValue,
          },
        },
        captureUpdate: CaptureUpdateAction.NEVER,
      };
    }
    return { captureUpdate: CaptureUpdateAction.NEVER };
  },
  predicate: (elements, appState, appProps) => {
    return isPresentationLink(window.location.href);
  },
});
