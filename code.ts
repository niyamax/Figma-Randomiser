figma.showUI(__html__);
figma.ui.resize(308, 250);
figma.ui.onmessage = (msg) => {
  if (msg.type === "randomise") {
    const isChecked = msg.isChecked;
  
    try {
      const frame: FrameNode = figma.currentPage.selection[0] as FrameNode;
      if (frame.type == "FRAME") {
        const children = frame.children;
        for (const child of children) {
          //resizeChild(child, frame.width);
          if(isChecked)
            {
              child.x = Math.max(0, Math.min(Math.random() * frame.width, frame.width - child.width));
              child.y = Math.max(0, Math.min(Math.random() * frame.height, frame.height - child.height));
            }
          else
            {
              child.x = Math.random() * frame.width;
              child.y = Math.random() * frame.height;
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
  function resizeChild(child: SceneNode, frameWidth: number) {
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
      child.resize(
        (child.width !=0 ? Math.random() * frameWidth : 0) / 4,
        (child.height !=0 ? Math.random() * frameWidth : 0) / 4
      );
    }
  }
};
