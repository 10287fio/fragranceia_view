import {CanvasComponentProps, Current, ShapeArray, ModalStateProps, UpdateModalStateProps} from '@/ts';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import shapeUtil from '@/util/shape.util';
import {ShapeTypeEnum, ToolObjectEnum, ShapeStatusEnum, OperationEnum, ToolEnum} from '@/store/enum/shape.enum';
import {ConfirmEnum} from '@/store/enum/system.enum';
import ConfirmModal from '@/composition/modal/ConfirmModal';

const Tool = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {

    const current: Current = shapeStateProps.current;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    const shape: ShapeArray = shapeStateProps.shape;
    const setShape = updateShapeStateProps.setShape;

    const [modalOpenFlag, setModalOpenFlag] = useState<boolean>(true);
    const [modalResult, setModalResult] = useState<ConfirmEnum>(ConfirmEnum.No);

    const modalStateProps: ModalStateProps = {
        modalOpenFlag, modalResult
    }

    const setModalStateProps: UpdateModalStateProps = {
        setModalOpenFlag, setModalResult
    }

    function toolClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {
        if (shapeUtil.checkShift(event.currentTarget.id, current)) {
            let shapeId: string = "";

            if (current?.shape_id == undefined) {
                shapeId = "s1"
            } else {
                shapeId = shapeUtil.generationIdNum(current?.shape_id);
            }

            let shapeType: ShapeTypeEnum | null = null;

            if (shapeUtil.checkAtomicity(event.currentTarget.id)) {
                shapeType = ShapeTypeEnum[event.currentTarget.id as typeof ShapeTypeEnum[keyof typeof ShapeTypeEnum]];
            }

            setShape((prevShapes: ShapeArray) => [...prevShapes, {
                id: shapeId,
                shapeId: shapeType,
                status: ShapeStatusEnum["New"]
            }]);

            let toolType = ToolEnum[event.currentTarget.id as keyof typeof ToolEnum]

            setCurrent((prevState: Current) => ({
                ...prevState,
                shape_id: shapeId,
                shape_status: ShapeStatusEnum["New"],
                tool: toolType,
                operation: OperationEnum["AP_Free"]
            }));

        } else {
            alert("It is not possible to create new shape.");
        }
    }

    useEffect(() => {
        console.log(modalResult);
    });

    return (
        <div>
            <ConfirmModal modalStateProps={modalStateProps} updateModalStateProps={setModalStateProps}>Would you
                convert shape?
            </ConfirmModal>
            {Object.values(ToolEnum).map((tool) => (
                <button key={tool} id={tool} onClick={toolClickEventListener} style={{marginRight: "3px"}}>
                    {tool}
                </button>))
            }
        </div>
    );
};

export default Tool;