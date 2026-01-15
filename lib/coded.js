"use strict";
// // lib/code.ts
// // WUXMA – minimal “UI renderer” engine with Auto Layout
// // Supports: text, rect-as-button, ellipse
// // Uses explicit, safe JS (no ??) to avoid older parser issues.
// type Payload = {
//   prompt: string
//   style: string
//   platform: string
// }
// // -------- Design schema (expand this over time) --------
// type RGB = { r: number; g: number; b: number }
// type TextNode = {
//   type: "text"
//   content: string
//   fontSize: number
// }
// type RectNode = {
//   type: "rect"
//   width?: number
//   height?: number
//   radius?: number
//   fill?: RGB
//   label?: string // if present, we render as a button (Auto Layout)
// }
// type EllipseNode = {
//   type: "ellipse"
//   width: number
//   height: number
//   fill?: RGB
// }
// type DesignNode = TextNode | RectNode | EllipseNode
// type DesignSchema = {
//   frame: {
//     name?: string
//     width?: number
//     height?: number
//   }
//   nodes: DesignNode[]
// }
// // -------- UI boot --------
// figma.showUI(__html__, { width: 360, height: 540 })
// // -------- Helpers --------
// function solidFill(color: RGB): SolidPaint[] {
//   return [{ type: "SOLID", color }]
// }
// async function loadInterRegular() {
//   await figma.loadFontAsync({ family: "Inter", style: "Regular" })
// }
// function clamp01(n: number) {
//   if (n < 0) return 0
//   if (n > 1) return 1
//   return n
// }
// function safeRGB(c?: RGB, fallback?: RGB): RGB {
//   const fb = fallback || { r: 0.9, g: 0.9, b: 0.9 }
//   if (!c) return fb
//   return { r: clamp01(c.r), g: clamp01(c.g), b: clamp01(c.b) }
// }
// // -------- Generator (temporary, replace with backend later) --------
// function generateDesign(payload: Payload): DesignSchema {
//   const prompt = payload.prompt && payload.prompt.trim() ? payload.prompt.trim() : "Generated UI"
//   // Simple palette that matches what you saw:
//   const cyan: RGB = { r: 0.0, g: 0.8, b: 0.9 }
//   const pink: RGB = { r: 1.0, g: 0.2, b: 0.7 }
//   return {
//     frame: { name: "WUXMA Design" },
//     nodes: [
//       { type: "text", content: prompt, fontSize: 18 },
//       { type: "rect", radius: 14, fill: cyan, label: "Get Started" }, // rendered as a button
//       { type: "ellipse", width: 80, height: 80, fill: pink },
//     ],
//   }
// }
// // -------- Renderer (Auto Layout) --------
// async function renderDesign(design: DesignSchema) {
//   const frame = figma.createFrame()
//   frame.name = (design.frame && design.frame.name) ? design.frame.name : "WUXMA Design"
//   // Auto Layout container
//   frame.layoutMode = "VERTICAL"
//   frame.primaryAxisSizingMode = "AUTO"
//   frame.counterAxisSizingMode = "AUTO"
//   frame.itemSpacing = 16
//   frame.paddingTop = 40
//   frame.paddingBottom = 40
//   frame.paddingLeft = 40
//   frame.paddingRight = 40
//   // Neutral background
//   frame.fills = solidFill({ r: 1, g: 1, b: 1 })
//   figma.currentPage.appendChild(frame)
//   // Fonts (must be loaded before creating/setting text)
//   await loadInterRegular()
//   for (const node of design.nodes) {
//     if (node.type === "text") {
//       const t = figma.createText()
//       t.characters = node.content
//       t.fontSize = node.fontSize
//       t.fills = solidFill({ r: 0.1, g: 0.1, b: 0.12 })
//       frame.appendChild(t)
//       continue
//     }
//     if (node.type === "rect") {
//       // If label exists -> treat as Auto Layout "button"
//       const labelText = (node.label && node.label.trim()) ? node.label.trim() : ""
//       if (labelText) {
//         const btn = figma.createFrame()
//         btn.layoutMode = "HORIZONTAL"
//         btn.primaryAxisSizingMode = "AUTO"
//         btn.counterAxisSizingMode = "AUTO"
//         btn.primaryAxisAlignItems = "CENTER"
//         btn.counterAxisAlignItems = "CENTER"
//         btn.itemSpacing = 8
//         btn.paddingLeft = 18
//         btn.paddingRight = 18
//         btn.paddingTop = 12
//         btn.paddingBottom = 12
//         const radius = (typeof node.radius === "number") ? node.radius : 10
//         btn.cornerRadius = radius
//         const fill = safeRGB(node.fill, { r: 0.1, g: 0.45, b: 1 })
//         btn.fills = solidFill(fill)
//         const lbl = figma.createText()
//         lbl.characters = labelText
//         lbl.fontSize = 14
//         lbl.fills = solidFill({ r: 1, g: 1, b: 1 })
//         btn.appendChild(lbl)
//         frame.appendChild(btn)
//       } else {
//         // Plain rectangle (non-button)
//         const rect = figma.createRectangle()
//         const w = (typeof node.width === "number") ? node.width : 240
//         const h = (typeof node.height === "number") ? node.height : 80
//         rect.resize(w, h)
//         const radius = (typeof node.radius === "number") ? node.radius : 0
//         rect.cornerRadius = radius
//         const fill = safeRGB(node.fill, { r: 0.9, g: 0.9, b: 0.9 })
//         rect.fills = solidFill(fill)
//         frame.appendChild(rect)
//       }
//       continue
//     }
//     if (node.type === "ellipse") {
//       const e = figma.createEllipse()
//       e.resize(node.width, node.height)
//       const fill = safeRGB(node.fill, { r: 0.7, g: 0.7, b: 0.7 })
//       e.fills = solidFill(fill)
//       frame.appendChild(e)
//       continue
//     }
//   }
//   figma.viewport.scrollAndZoomIntoView([frame])
// }
// // -------- Message handler --------
// figma.ui.onmessage = async (msg: { type: string; payload?: Payload }) => {
//   if (msg.type !== "generate-design" || !msg.payload) return
//   figma.notify("Design Generation started 🚀")
//   // Replace this with backend call later:
//   const design = generateDesign(msg.payload)
//   await renderDesign(design)
// }
