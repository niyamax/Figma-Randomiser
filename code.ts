figma.showUI(__html__);
figma.ui.resize(308,320);
figma.ui.onmessage = (msg) => {
  if (msg.type === "randomise") {
    const isPositionEnbaled = msg.positionEnabled;
    const isSizeEnabled = msg.sizeEnabled;
    const isColorEnabled = msg.colorEnabled;
    const isShapeEnabled = msg.shapeEnabled;

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
          if (isShapeEnabled) {
            randomiseShape(child, frame)          }          
          if (!isPositionEnbaled && !isSizeEnabled && !isColorEnabled) {
            figma.notify("Enable size or position to randomise");
          }
        }
        frame.resizeWithoutConstraints(frame.width, frame.height);
      } else {
        figma.notify("Selection is not a frame");
      }
    } catch (error) {
      if (error instanceof TypeError) {
        figma.notify("Selection is not a frame");
      } else {
        throw error;
      }
    }
  }
  if (msg.type === "close") {
    figma.closePlugin();
  }
};

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
}

function clone(val: readonly Paint[] | typeof figma.mixed) {
  return JSON.parse(JSON.stringify(val));
}

function randomiseShape(child: SceneNode, frame: FrameNode) {
  if (child.type == "ELLIPSE" || child.type == "POLYGON" || child.type == "RECTANGLE" || child.type == "STAR" || child.type == "VECTOR") {
    const shapes = ["ELLIPSE", "POLYGON", "RECTANGLE", "STAR", "RECTANGLE","TRIANGLE","OVAL","SQUIRCLE"]; // Replaced "VECTOR" with "RECTANGLE"
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    let newShape: BaseNode;

    switch (randomShape) {
      case "ELLIPSE":
        newShape = figma.createEllipse();
        break;
      case "POLYGON":
        newShape = figma.createPolygon();
        break;
      case "RECTANGLE":
        newShape = figma.createRectangle();
        break;
      case "STAR":
        newShape = figma.createStar();
        break;
      case "OVAL":
        newShape = figma.createEllipse();
        newShape.resize(child.width, child.height * 0.6); // Adjust to make it an oval
        break;
      case "TRIANGLE": // Handle triangle creation
        newShape = figma.createPolygon();
        newShape.pointCount = 3;
        break;
      case "SQUIRCLE":
        newShape = figma.createRectangle();
        newShape.cornerRadius = child.width * 0.25; // Adjust corner radius for squircle effect
        break;
      default:
        return; // If for some reason none of the cases match, exit the function
    }

    // Copy properties from the old shape to the new shape
    newShape.x = child.x;
    newShape.y = child.y;
    newShape.resize(child.width, child.height);
    newShape.fills = child.fills;

    // Add the new shape to the frame
    frame.appendChild(newShape);

    // Ensure the new shape is added before removing the old shape
    child.remove();
  }
}
