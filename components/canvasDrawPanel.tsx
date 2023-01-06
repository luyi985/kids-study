import { useEffect, useRef, useState } from "react";

class DrawPanel {
  private canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | null = null;
  private toPainting: boolean = false;
  constructor(canvas: HTMLCanvasElement | undefined) {
    if (canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.canvas.style.background = "#333";
      this.canvas.addEventListener("mouseup", this.stopPainting);
      this.canvas.addEventListener("touchstart", this.stopPainting);
      this.canvas.addEventListener("mousedown", this.startPainting);
      this.canvas.addEventListener("touchend", this.startPainting);
      this.canvas.addEventListener("mousemove", this.draw);
      this.canvas.addEventListener("touchmove", this.draw);
    }
  }
  private startPainting = () => {
    this.ctx?.beginPath();
    this.toPainting = true;
  };
  private stopPainting = () => {
    this.toPainting = false;
  };

  private getMousePos = (e: MouseEvent | TouchEvent) => {
    var rect = this.canvas!.getBoundingClientRect(), // abs. size of element
      scaleX = this.canvas!.width / rect.width, // relationship bitmap vs. element for x
      scaleY = this.canvas!.height / rect.height; // relationship bitmap vs. element for y

    return {
      //@ts-ignore
      x: (e?.clientX  - rect.left) * scaleX, // scale mouse coordinates after they have
      //@ts-ignore
      y: (e?.clientY  - rect.top) * scaleY, // been adjusted to be relative to element
    };
  };
  private draw = (e: MouseEvent | TouchEvent) => {
    if (!this.toPainting || !this.ctx) return;

    this.ctx.strokeStyle = "#ddd";
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 5;
    const { x, y } = this.getMousePos(e);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx?.beginPath();
  };
  clearCanvas = () => {
    if (!this.canvas) return;
    this.ctx?.clearRect(0, 0, this.canvas?.width, this.canvas?.height);
  };
  clearEvent = () => {
    this.canvas?.removeEventListener("mouseup", this.stopPainting);
    this.canvas?.removeEventListener("touchstart", this.stopPainting);
    this.canvas?.removeEventListener("mousedown", this.startPainting);
    this.canvas?.removeEventListener("touchend", this.startPainting);
    this.canvas?.removeEventListener("mousemove", this.draw);
    this.canvas?.removeEventListener("touchmove", this.draw);
  };
}

export const CanvasDrawPanel: React.FC<{
  handleSubmit: (arg: any) => any;
}> = () => {
  const canvasRef = useRef<any>();
  const [panel, setPanel] = useState<DrawPanel>();
  useEffect(() => {
    const p = new DrawPanel(canvasRef.current);
    setPanel(p);
    return p.clearEvent;
  }, []);

  return (
    <>
      <button className="btn btn-primary" onClick={panel?.clearCanvas}>
        Clear
      </button>
      <canvas ref={canvasRef} width="300" height="200" />
    </>
  );
};
