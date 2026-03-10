// export type DesignNode =
//     {
//       type: "text"
//       content: string
//       fontSize: number
//     }
//   | {
//       type: "rect"
//       width: number
//       height: number
//       radius?: number
//       fill?: { r: number; g: number; b: number }
//     }
//   | {
//       type: "ellipse"
//       width: number
//       height: number
//       fill?: { r: number; g: number; b: number }
//     }
//   |
//   {
//     type: "stack"
//     direction: "vertical" | "horizontal"
//     gap?: number
//     padding?: number
//     children: DesignNode[]
//   }


// export type DesignSchema = {
//   frame: {
//     width: number
//     height: number
//   }
//   nodes: DesignNode[]
// }


// export type Payload = {
//   prompt: string,
//   style: string,
//   platform: string
// }

export type RGB = {
  r: number 
  g: number
  b: number
}

export type FrameNodeType = {
  type: "frame"
  name?: string
  width?: number
  height?: number
  fill?: RGB
  stroke?: RGB
  strokeWidth?: number
  children?: DesignNode[]
}

export type TextNodeType = {
  type: "text"
  content?: string
  x?: number
  y?: number
  fontSize?: number
  fill?: RGB
}

export type RectangleNodeType = {
  type: "rectangle"
  width?: number
  height?: number
  x?: number
  y?: number
  fill?: RGB
  radius?: number
}

export type DesignNode =
  | FrameNodeType
  | TextNodeType
  | RectangleNodeType