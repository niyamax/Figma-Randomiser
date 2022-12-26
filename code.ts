
figma.showUI(__html__);
figma.ui.onmessage = msg => {
  if (msg.type === 'randomise') {
    try {
    const frame: FrameNode = figma.currentPage.selection[0] as FrameNode;
    if(frame.type == "FRAME"){
       const children = frame.children;
      for (const child of children) {
        child.x = Math.random() * frame.width;
        child.y = Math.random() * frame.height;
      }
      frame.resizeWithoutConstraints(frame.width, frame.height);
    }
    else{
      figma.notify("Selection is not a frame");
    }
  }
  catch (error) {
    if (error instanceof TypeError) {
      figma.notify("Selection is not a frame");
    } else {
      throw error;
    }
  }
  }
  if (msg.type === 'close'){
    figma.closePlugin();
  }
};
