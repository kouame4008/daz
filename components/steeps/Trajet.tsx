import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { List, Steps, Row, Col } from 'antd';
import { ButtonLogin, InputItemField, ButtonAjouter } from '../components';
import { SearchOutlined } from '@ant-design/icons';
import { getItems, getListStyle, getItemStyle } from '../../helpers/util';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';




interface userPropsType {
    handleNextSteep: Function
}

const DragLayoutContent = styled.section`
    padding: 1rem;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 10px;
    max-height: 400px;
    overflow: auto;
    scrollbar-color: #f0eded #fafafa;
    scrollbar-width: thin;
`

const ListeItem = styled(List.Item)`
    background: #bbe8f22e !important;
    text-align: center;
    border-radius: 15px;
    border: 0;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    padding: 12px 0 !important;

    span {
        font-family : 'Poppins'
    }
`;

const ListeDrop = styled(List.Item)`
    margin-bottom: 1.1rem  !important;
    padding: 12px 0 !important;
    background: #FFF  !important;
    text-align: center;
    border-radius: 15px;
    border: 1px dashed rgba(0,0,0,0.1)  !important;
    display: flex;
    justify-content: center;

    span {
        font-family : 'Poppins'
    }
`;
const DropDefault = styled.div`
margin-bottom: 1.1rem !important;
padding: 12px 0 !important;
background: #FFF  !important;
text-align: center;
border-radius: 15px;
border: 1px dashed rgba(0,0,0,0.1)  !important;
display: flex;
justify-content: center;

span {
    font-family : 'Poppins'
}
`;

const data = [
    'UTB KOUMASSI',
    'UTB KOUMASSI',
    'UTB KOUMASSI',
    'UTB KOUMASSI',
    'UTB KOUMASSI',
    'UTB KOUMASSI',
    'UTB KOUMASSI',
    'UTB KOUMASSI',
    'UTB KOUMASSI',
];

const SectionFlex = styled.section``;

interface itemTypeProps {
    id: string;
    content: string
}



const { Step } = Steps;
const Iitems = [
    { id: `item-1`, content: `UTB KOUMASSI` },
    { id: `item-2`, content: `UTB KOUMASSI` },
    { id: `item-3`, content: `UTB KOUMASSI` },
    { id: `item-4`, content: `UTB KOUMASSI` },
];

const Iselect: any[] | (() => any[]) = []



const Trajet = ({ handleNextSteep }: userPropsType) => {

    const [items, setItems] = useState(Iitems);
    const [selected, setSelected] = useState(Iselect);
    const [currentSteep, setCurrentSteep] = useState<number>(0);


    const next = () => {
        setCurrentSteep((currentSteep) => currentSteep + 1);
    };

    const prev = () => {
        setCurrentSteep((currentSteep) => currentSteep - 1);
    };


    const handleDragEnd = useCallback((result: DropResult) => {

        const dataItems = items;
        const dataSelected = selected;

        if (!result.destination) return;

        // DEV:note premier cas
        if (result.destination.droppableId === "droppable2" && result.source.droppableId === "droppable") {
            const element = items.filter((item) => item.id === result.draggableId);
            let tabs = selected;
            const currentItem: itemTypeProps = element[0];
            tabs.push(currentItem)
            setSelected(tabs)

            // setCurrentSteep((steep) => steep + 1)



            let index = dataItems.findIndex((item) => item.id === result.draggableId);

            dataItems.splice(index, 1);
            setItems(dataItems);

            // console.log(selected)
            next()
        }

        // DEV:note deuxieme cas
        if (result.destination.droppableId === "droppable" && result.source.droppableId === "droppable") {
            const [reorderItems] = dataItems.splice(result.source.index, 1);
            dataItems.splice(result.destination.index, 0, reorderItems);
            setItems(dataItems);
        }

        // DEV:note troixieme cas
        if (result.destination.droppableId === "droppable2" && result.source.droppableId === "droppable2") {
            const [reorderSelected] = dataSelected.splice(result.source.index, 1);
            dataSelected.splice(result.destination.index, 0, reorderSelected);
            setSelected(dataSelected);
        }

        // // DEV:note dernier cas
        if (result.destination.droppableId === "droppable" && result.source.droppableId === "droppable2") {
            const element = selected.filter((item) => item.id === result.draggableId);

            const currentItem: itemTypeProps = element[0];
            dataItems.push(currentItem)
            // console.log (dataItems)
            setItems(dataItems)

            // setCurrentSteep((steep) => steep - 1)


            let index = selected.findIndex((item) => item.id === result.draggableId);

            dataSelected.splice(index, 1);
            setSelected(dataSelected);
            prev()

        }
    }, [items, selected]);




    return (
        <React.Fragment>
            <div className="current-steep-content container-fluid">

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="row">
                        <div className="col-md-5">

                            <DragLayoutContent className='DragLayoutContent'>
                                <InputItemField
                                    prefix={<SearchOutlined />}
                                    placeholder={"rechercher"}
                                    style={{
                                        marginBottom: '1rem'
                                    }}
                                />

                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (

                                        <div
                                            ref={provided.innerRef}
                                        >
                                            <List
                                                key={"ListeDrop"}
                                                dataSource={items}
                                                renderItem={(item, index) => (

                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            // <div
                                                            //     ref={provided.innerRef}
                                                            //     {...provided.draggableProps}
                                                            //     {...provided.dragHandleProps}
                                                            //     style={getItemStyle(
                                                            //         snapshot.isDragging,
                                                            //         provided.draggableProps.style
                                                            //     )}
                                                            // >
                                                            //     {item.content}
                                                            // </div>
                                                            <ListeItem
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
                                                            >
                                                                {item.content}
                                                            </ListeItem>
                                                        )}
                                                    </Draggable>

                                                )}
                                            />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragLayoutContent>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6 drap-steeps">
                            <section style={{
                                display: 'flex'
                            }}>
                                <div style={{ width: '50px' }}>
                                    {selected.length > 0 &&
                                        <Steps direction="vertical" current={currentSteep}  style={{ marginTop: '1rem' }} progressDot>
                                            {selected.map((item, index) =>
                                                <Step key={index} title="T" description="escriptoon" />
                                            )}
                                        </Steps>}
                                </div>
                                <div style={{ flex: 1, marginTop: '0.5rem' }}>
                                    <Droppable droppableId="droppable2">
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                            >
                                                <>
                                                    {selected.length > 0 ?
                                                        <List
                                                            key={"ListeDrap"}
                                                            dataSource={selected}
                                                            renderItem={(item, index) => (

                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => (

                                                                        <ListeDrop
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={getItemStyle(
                                                                                snapshot.isDragging,
                                                                                provided.draggableProps.style
                                                                            )}
                                                                        >
                                                                            {item.content}
                                                                        </ListeDrop>
                                                                    )}
                                                                </Draggable>

                                                            )}
                                                        />
                                                        :
                                                        <DropDefault>
                                                            <span>Trajet Initial</span>
                                                        </DropDefault>
                                                    }
                                                </>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </section>
                        </div>
                    </div>
                </DragDropContext>
            </div>
            <Row>
                <Col span={24}>
                    <ButtonAjouter>
                        Ajouter un trajet
                    </ButtonAjouter>
                </Col>
            </Row>
            <Row style={{ marginBottom: '1.3rem' }}>
                <Col span={24}>
                    <ButtonLogin
                        onClick={() => handleNextSteep()}
                        style={{
                            fontSize: '1rem',
                        }}
                    >
                        Valider et passer à la prochaine étape
                    </ButtonLogin>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Trajet;