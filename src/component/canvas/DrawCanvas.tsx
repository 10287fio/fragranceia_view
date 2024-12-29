import canvasStyle from '@/component/canvas/Canvas.module.scss';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import DisplayGesso from '@/component/gesso/DisplayGesso';
import MagnifierGesso from '@/component/gesso/MagnifierGesso';
import {useRef, useEffect, MouseEvent} from 'react';
import {
    Draw,
    Reserve,
    Result,
    Shape,
    Point,
    Line,
    Arc,
    CurrentId,
    ShapeStateProps,
    CanvasComponentProps
} from '@/ts';

function calQuadCoord(lastPoint: { x: number, y: number }, x: number, y: number) {
    if (((lastPoint?.x < x) && (lastPoint?.y > y)) || ((lastPoint?.x > x) && (lastPoint?.y < y))) {
        if ((Math.round((y - lastPoint?.y) / (x - lastPoint?.x) * 10) / 10) > -1) {
            return "x";
        } else {
            return "y";
        }
    } else if (((lastPoint?.x < x) && (lastPoint?.y < y)) || ((lastPoint?.x > x) && (lastPoint?.y > y))) {
        if ((Math.round((y - lastPoint?.y) / (x - lastPoint?.x) * 10) / 10) < 1) {
            return "x";
        } else {
            return "y";
        }
    }

    return "x";
}

function generationID(shape_id: string | null): string {
    if (shape_id == null) {
        return "s1"
    }

    let idNum: number = Number(shape_id.slice(1));
    idNum++;
    return "s".concat(idNum.toString());
}

const DrawCanvas: React.FC<CanvasComponentProps> = ({shapeStateProps, updateShapeStateProps}) => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const shape: Shape[] = shapeStateProps.shape;
    const point: Point[] = shapeStateProps.point;
    const line: Line[] = shapeStateProps.line;
    const CurrentId: CurrentId | undefined = shapeStateProps.currentId;
    const setShape = updateShapeStateProps.setShape;
    const setPoint = updateShapeStateProps.setPoint;
    const setLine = updateShapeStateProps.setLine;
    const setCurrentId = updateShapeStateProps.setCurrentId;

    function drawCanvasMoveEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement | null) {
        if (drawCanvas == null) return false;

        if (drawCanvas.getContext) {
            const drawCtx = drawCanvas.getContext("2d");

            if (drawCtx) {
                drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
                let offsetX: number = event.nativeEvent.offsetX;
                let offsetY: number = event.nativeEvent.offsetY;

                drawCtx.beginPath();
                drawCtx.moveTo(0, 0);
                drawCtx.lineTo(offsetX, offsetY);
                drawCtx.closePath();
                drawCtx.stroke();
            }
        }
    }

    function drawCanvasClickEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement | null) {
        if (drawCanvas == null) return false;

        if (drawCanvas.getContext) {
            const drawCtx = drawCanvas.getContext("2d");

            if (drawCtx) {
                let offsetX: number = event.nativeEvent.offsetX;
                let offsetY: number = event.nativeEvent.offsetY;

                // In case of shape's existence
                if (CurrentId?.shape_id != undefined) {
                    //
                    if (shape.length != 0) {


                    } else {

                    }
                } // In case of shape's nonexistence
                else {
                    generationID("s1111");
                    // setShape((preShape: Shape[]) => [...preShape, {}]);

                }

            }
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && 'OffscreenCanvas' in window) {
            const offscreenCanvas = new OffscreenCanvas(500, 500);
        }

        if (drawCanvasRef.current) {
            const drawCanvas: HTMLCanvasElement = drawCanvasRef.current;

            drawCanvas.width = window.innerWidth;
            drawCanvas.height = window.innerWidth;

        }
    });

    return (
        <>
            <DisplayGesso shapeStateProps={shapeStateProps}></DisplayGesso>
            <MagnifierGesso shapeStateProps={shapeStateProps}></MagnifierGesso>
            <canvas className={sketchbookStyle.canvas} id={canvasStyle.drawCanvas} ref={drawCanvasRef}
                    onMouseMove={(event: MouseEvent) => drawCanvasMoveEventListener(event, drawCanvasRef.current)}
                    onClick={(event: MouseEvent) => drawCanvasClickEventListener(event, drawCanvasRef.current)}></canvas>
        </>

    )
};


export default DrawCanvas;