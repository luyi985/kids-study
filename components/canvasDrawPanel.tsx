import { useEffect, useRef, useState } from "react";

class DrawPanel {
  private canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | null = null;
  private toPainting: boolean = false;
  constructor(canvas: HTMLCanvasElement | undefined) {
    if (canvas) {
      this.canvas = canvas;

      this.ctx = canvas.getContext("2d");
      if (this.ctx) {
        this.ctx.strokeStyle = "#ddd";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 5;
      }
      this.canvas.style.background = "#333";
      this.canvas.style.width = "100%";

      this.canvas.addEventListener("mousedown", this.startPainting);
      this.canvas.addEventListener("touchstart", this.startPainting);
      this.canvas.addEventListener("mouseup", this.stopPainting);
      this.canvas.addEventListener("mouseout", this.stopPainting);
      this.canvas.addEventListener("touchend", this.stopPainting);
      this.canvas.addEventListener("mousemove", this.draw);
      this.canvas.addEventListener("touchmove", this.draw);
    }
  }
  private startPainting = (e: TouchEvent | MouseEvent) => {
    e.preventDefault();
    this.ctx?.beginPath();
    this.toPainting = true;
  };
  private stopPainting = (e: TouchEvent | MouseEvent) => {
    e.preventDefault();
    this.toPainting = false;
  };

  private getMousePos = (e: TouchEvent | MouseEvent) => {
    var rect = this.canvas!.getBoundingClientRect(), // abs. size of element
      scaleX = this.canvas!.width / rect.width, // relationship bitmap vs. element for x
      scaleY = this.canvas!.height / rect.height; // relationship bitmap vs. element for y
    //@ts-ignore
    if (e.changedTouches && e.changedTouches.length) {
      return {
        //@ts-ignore
        x: (e.touches[0].clientX - rect.left) * scaleX,
        //@ts-ignore
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      //@ts-ignore
      x: (e?.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
      //@ts-ignore
      y: (e?.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
  };
  private draw = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!this.toPainting || !this.ctx) return;

    const { x, y } = this.getMousePos(e);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  };
  clearCanvas = () => {
    if (!this.canvas) return;
    this.ctx?.clearRect(0, 0, this.canvas?.width, this.canvas?.height);
  };
  clearEvent = () => {
    this.canvas!.removeEventListener("mousedown", this.startPainting);
    this.canvas!.removeEventListener("touchstart", this.startPainting);
    this.canvas!.removeEventListener("mouseup", this.stopPainting);
    this.canvas!.removeEventListener("mouseout", this.stopPainting);
    this.canvas!.removeEventListener("touchend", this.stopPainting);
    this.canvas!.removeEventListener("mousemove", this.draw);
    this.canvas!.removeEventListener("touchmove", this.draw);
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
    <div className="container-fluid p-1">
      <div className="row">
        <div className="col-12">
          <canvas ref={canvasRef} width="3000" height="2000" />
        </div>
        <div
          className="col-12"
          style={{ justifyContent: "flex-end", display: "flex" }}
        >
          <button className="btn btn-danger" onClick={panel?.clearCanvas}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
