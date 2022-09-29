import { NextPage } from "next";
import React from 'react';
import styled from "styled-components";
import PanelLayout from "../../layouts/PanelLayout";


const PanelBottom = styled.section`
    background: rgba(204, 204, 204, 0.2);
    padding: 1rem 50px;
`

const TableauDeBord: NextPage = () => {
    return (
        <React.Fragment>
            <PanelLayout title="Panel" description="Panel">
                <PanelBottom>

                </PanelBottom>
            </PanelLayout>
        </React.Fragment>
    )
}

export default TableauDeBord;