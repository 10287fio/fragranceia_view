import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import Reservecanvas from '@/component/canvas/Reservecanvas';
import Drawcanvas from '@/component/canvas/Drawcanvas';
import Resultcanvas from '@/component/canvas/Resultcanvas';
import {useEffect, useState} from 'react';
import {Draw, Reserve, Result, Shape, Point, Line, Arc, CurrentId} from "@/ts";

const Sketchbook = (props: any): JSX.Element => {
    const [draw, setDraw] = useState<Draw>({id: "d1"});
    const [reserve, setReserve] = useState<Reserve[]>([{id: "rv1"}]);
    const [result, setResult] = useState<Result>({id: "rt1"});
    const [shape, setShape] = useState<Shape[] | undefined>();
    const [point, setPoint] = useState<Point[] | undefined>();
    const [line, setLine] = useState<Line[] | undefined>();
    const [arc, setArc] = useState<Arc[] | undefined>();
    const [currentId, setCurrentId] = useState<CurrentId | undefined>();

    const stateProps = {
        draw, reserve, result, shape, point, line, arc, currentId
    };

    const updateProps = {
        setDraw, setReserve, setResult, setShape, setPoint, setLine, setArc, setCurrentId
    };

    useEffect(() => {
    });

    return (
        <div className={sketchbookStyle.canvasContainer}>
            <Reservecanvas/>
            <Resultcanvas/>
            <Drawcanvas stateProps={stateProps}/>
        </div>
    )
};

export default Sketchbook;