// import { useEffectOnce } from "@legendapp/state/react";
import { useRef, type ElementRef, useEffect } from "react"

export default function CanvasRendering() {

  const canvasRef = useRef<ElementRef<"canvas">>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext('2d');
    if (context === null) return;

    const img = new Image()
    img.src = "https://pinkdose.s3.ap-southeast-3.amazonaws.com/small_IMG_2094_c7eaac4d5f.jpg"

    console.log(img)

    context.drawImage(
      img,
      0, 0,
      400,
      500
    )
  })

  return (
    <div className="p-20px">
      <div className="flex w-400px">
        <div className="w-400px relative overflow-hidden h-0 pt-125%">
          <canvas ref={canvasRef} className="rounded-5px absolute top-0 left-0 w-full h-full"></canvas>
        </div>
      </div>
      <canvas ref={canvasRef} width="400" height="500" className="rounded-5px"></canvas>
    </div>
  )
}
