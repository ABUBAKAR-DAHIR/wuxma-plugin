import { DesignNode } from './../types/types';
import { CONFIG } from './../utils/config';
import { getOrCreateDeviceId } from '../utils/getOrCreateDeviceId';
import { getSession } from '../utils/session';

figma.showUI(__html__, {width: 360, height: 540});

async function renderNode(node: DesignNode, parent: BaseNode & ChildrenMixin){
  if(node.type === "frame"){
    const frame = figma.createFrame()
    frame.resize(node.width || 800, node.height || 600)
    frame.name = node.name || "Frame"
    if(node.fill){
      frame.fills = [
        {
          type: "SOLID",
          color: node.fill
        }
      ]
    }

    frame.strokeWeight = node.strokeWidth || 1
    if(node.stroke){
      frame.strokes = [
        {
          type: "SOLID",
          color: node.stroke
        }
      ]
    }
    parent.appendChild(frame)

    if(node.children){
      for(const child of node.children){
        await renderNode(child, frame)
      }
    }
  }

  if(node.type === "text"){
    const text = figma.createText()
    text.characters = node.content || "Text"
    text.x = node.x || 0
    text.y = node.y || 0
    if(node.fontSize) text.fontSize = node.fontSize
    if(node.fill){
      text.fills = [
        {
          type: "SOLID",
          color: node.fill
        }
      ]
    }

    parent.appendChild(text)
  }

  if(node.type === "rectangle"){
    const rectangle = figma.createRectangle()
    rectangle.name = node.type 
    rectangle.resize(node.width || 100, node.height || 100)
    rectangle.x = node.x || 0
    rectangle.y = node.y || 0
    if(node.fill){
      rectangle.fills = [
        {
          type: "SOLID",
          color: node.fill
        }
      ]
    }

    if(node.radius){
      rectangle.cornerRadius = node.radius
    }

    parent.appendChild(rectangle)
  }
}

const mockDesign: DesignNode = {
  type: "frame",
  name: "Hero Section",
  width: 630,
  height: 1000,
  fill: { r: 0.95, g: 0.96, b: 0.98 },
  stroke: { r: 0.8, g: 0.82, b: 0.86 },
  strokeWidth: 2,
  children: [
    {
      type: "text",
      content: "Welcome to Wuxma",
      x: 100,
      y: 120,
      fontSize: 48,
      fill: { r: 0.1, g: 0.1, b: 0.1 }
    },
    {
      type: "text",
      content: "Generate UI designs instantly using AI",
      x: 100,
      y: 190,
      fontSize: 20,
      fill: { r: 0.35, g: 0.37, b: 0.42 }
    },
    {
      type: "rectangle",
      width: 200,
      height: 60,
      x: 100,
      y: 260,
      radius: 12,
      fill: { r: 0.2, g: 0.45, b: 1 }
    },
    {
      type: "text",
      content: "Get Started",
      x: 140,
      y: 280,
      fontSize: 18,
      fill: { r: 1, g: 1, b: 1 }
    }
  ]
}

figma.ui.onmessage = async (msg) => {
  const deviceId = await getOrCreateDeviceId()

  if (msg.type === 'generate-design'){
    try {
      const sessionId = await getSession() 
  
      const res = await fetch(`${CONFIG.BASE_URL}/api/plugin/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, sessionId, prompt: msg.payload.prompt })
      })
  
      const data = await res.json()
      // show signup button to the user if the free anonymous quota is exhausted
      if(data.error === "QUOTA_EXHAUSTED"){
        figma.ui.postMessage({ type: "quota_exceeded", message: "Free Qausted. Please login to continue.", deviceId: deviceId})
      }
      
      await figma.loadFontAsync({family: "Inter", style: "Regular"})
      await renderNode(data.output, figma.currentPage)
      // figma.notify(data ? data.success === true ? `Output: halaw, ${data.output}\nsessionId:${data.sessionId} `: data.success===false ? `Error: ${data.error}` : "Done !!" : "No data received but done")
      figma.notify(data ? data.success === true ? `UI generated and rendered ✅`: data.success===false ? `Error: ${data.error}` : "Done !!" : "No data received but done")
      console.log(data)
  
  
      figma.ui.postMessage({finished: true, message: 'done'})
  
    } catch (err: any) {
      console.log("Error in onmessage:", err)
      figma.notify("❌ Failed to start generation")
      
      figma.ui.postMessage({finished: true, message: 'error occurred'})
    }
  }

  if(msg.type === "start_login"){
    const timer = setInterval(async () => {
    try {
        const res = await fetch(`${CONFIG.BASE_URL}/api/plugin/status?deviceId=${deviceId}`)

        const data = await res.json()

        if(data.success === true && data.isAuthenticated === true){
          clearInterval(timer)
          figma.ui.postMessage({type: "login_success"})
          figma.notify("✅ login detected! You now have full access")
        }
        
      } catch (error : any) {
        console.log("Error: " + error.message)
        figma.notify("❌ Couldnt login! please try again")
      }
    }, 2000);
  }
  
}
