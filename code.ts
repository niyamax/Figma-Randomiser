figma.showUI(__html__);
figma.ui.resize(308, 282);
const notifiedErrors = new Set<string>(); 
figma.ui.onmessage = (msg) => {
  if (msg.type === "randomise") {
    const isPositionEnbaled = msg.positionEnabled;
    const isSizeEnabled = msg.sizeEnabled;
    const isColorEnabled = msg.colorEnabled;
    try {
      const frame: FrameNode = figma.currentPage.selection[0] as FrameNode;
      if (frame.type == "FRAME") {
        const children = frame.children;
        for (const child of children) {
          if (isPositionEnbaled) {
            randomisePosition(child, frame);
          }
          if (isSizeEnabled) {
            resizeChild(child, frame);
          }
          if (isColorEnabled) {
            colorChange(child);
          }
          if (!isPositionEnbaled && !isSizeEnabled && !isColorEnabled) {
            figma.notify("Enable any property to randomise");
          }
        }
        frame.resizeWithoutConstraints(frame.width, frame.height);
      } else {
        figma.notify("Selection is not a frame");
      }
    } catch (error) {
      handleError(error, notifiedErrors);
      }
    }
  if (msg.type === "close") {
    figma.closePlugin();
  }
  function randomisePosition(child: SceneNode, frame: FrameNode) {
    child.x = Math.max(
      0,
      Math.min(Math.random() * frame.width, frame.width - child.width)
    );
    child.y = Math.max(
      0,
      Math.min(Math.random() * frame.height, frame.height - child.height)
    );
  }
  function resizeChild(child: SceneNode, frame: FrameNode) {
    if (
      child.type == "BOOLEAN_OPERATION" ||
      child.type == "COMPONENT" ||
      child.type == "COMPONENT_SET" ||
      child.type == "ELLIPSE" ||
      child.type == "FRAME" ||
      child.type == "GROUP" ||
      child.type == "HIGHLIGHT" ||
      child.type == "INSTANCE" ||
      child.type == "LINE" ||
      child.type == "POLYGON" ||
      child.type == "RECTANGLE" ||
      child.type == "SLICE" ||
      child.type == "STAMP" ||
      child.type == "STAR" ||
      child.type == "TEXT" ||
      child.type == "VECTOR" ||
      child.type == "WASHI_TAPE"
    ) {
      const newWidth = (Math.random() * frame.width) / 4;
      const newHeight = (newWidth * child.height) / child.width;
      child.resize(
        child.width != 0 ? newWidth : 0,
        child.height != 0 ? newHeight : 0
      );
    }
  }
  function colorChange(child: SceneNode) {
    if (
      child.type == "BOOLEAN_OPERATION" ||
      child.type == "COMPONENT" ||
      child.type == "COMPONENT_SET" ||
      child.type == "ELLIPSE" ||
      child.type == "FRAME" ||
      child.type == "HIGHLIGHT" ||
      child.type == "INSTANCE" ||
      child.type == "LINE" ||
      child.type == "POLYGON" ||
      child.type == "RECTANGLE" ||
      child.type == "STAMP" ||
      child.type == "STAR" ||
      child.type == "TEXT" ||
      child.type == "VECTOR" ||
      child.type == "WASHI_TAPE"
    ) {
      const fills = clone(child.fills);
      fills[0].color.r = parseFloat(Math.random().toFixed(1));
      fills[0].color.g = parseFloat(Math.random().toFixed(1));
      fills[0].color.b = parseFloat(Math.random().toFixed(1));
      child.fills = fills;
    }

    function clone(val: readonly Paint[] | typeof figma.mixed) {
      return JSON.parse(JSON.stringify(val));
    }
  }
  function handleError(error: unknown, notifiedErrors: Set<string>) {
    if (error instanceof TypeError) {
      if (error.message.includes("color")) {
        notifyOnce("One or more shapes have no fill color", notifiedErrors);
      } else if (error.message.includes("frame")) {
        notifyOnce("Selection is not a frame", notifiedErrors);
      } else {
        notifyOnce("Something went wrong: " + error.message, notifiedErrors);
      }
    } else {
      throw error;
    }
  }
  function notifyOnce(message: string, notifiedErrors: Set<string>) {
    if (!notifiedErrors.has(message)) {
      figma.notify(message);
      notifiedErrors.add(message);
    }
  }
};
