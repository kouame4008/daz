
import { useState, useEffect } from "react";
import { Header } from 'antd/lib/layout/layout';
import Link from 'next/link';
import { Menu, Button, Space, Avatar, PageHeader, Affix, Progress, Steps  } from 'antd';
import LogoDaz from '../../public/assets/logo.jpg';
import Image from 'next/image'
import { BellOutlined, CalendarOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import styled from "styled-components";

const { Step } = Steps;

const UserInf = styled.div`
    font-size: 15px;
    font-family: "Poppins",sans-serif;
`;

const DashboardItem = styled.div`
    display : flex;
`;

const DashboardItemContent = styled.div`
    padding-left : 5px;

    .ItemNumber {
        font-size: 24px;
        font-weight: 600;
        color: #FFF;
        position: relative;
        top: 5px;
        font-family: Regave
    }

    .ItemText {
        font-size: 16px;
        font-weight: 600;
        color: rgba(255,255,255,0.75);
        position: relative;
        top: -0.4rem;
    }
`;

const AffixBox = styled.div`
    background : #FFF;
    border-radius: 10px;
    padding : 1rem 1.5rem;
    box-shadow: 0 20px 27px rgb(0 0 0/5%);
`;

const AffixTrajet = styled.div`
    font-family: Poppins;
    font-weight: bold;
`;


const AffixSlider = styled.div``

const AffixSteeps = styled.div``

const links = [
    { id: 1, path: '/dashboard', label: 'Dashboard' },
    { id: 2, path: '/compagnie', label: 'Compagnie' },
    { id: 3, path: '/utilisateur', label: 'Utilisateur' },
    { id: 4, path: '/gare', label: 'Gare' },
    { id: 5, path: '/trajet', label: 'Trajet' },
    { id: 6, path: '/engin', label: 'Engin' },
    { id: 7, path: '/colis', label: 'Colis' },
    { id: 8, path: '/facturation', label: 'Facturation' },
    { id: 9, path: '/aide', label: 'Aide' },
    { id: 10, path: '/parametres', label: 'Paramètres' },
];

interface IHeaderIcon {
    Icon: React.ForwardRefExoticComponent<any>
}
const HeaderIcon = ({ Icon }: IHeaderIcon) => {
    return (

        <Button
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            shape="circle"
            icon={<Icon className="headerIcon" />}
        />


    )
}

interface IDashBoardItemStatComponent {
    Icon?: React.ForwardRefExoticComponent<any>,
    number: string,
    text: string
}

const DashBoardItemStatComponent = ({ Icon, number, text }: IDashBoardItemStatComponent) => {
    return (
        <DashboardItem>
            <Space>
                <div><Avatar size={50} /></div>
                <DashboardItemContent>
                    <Space direction="vertical">
                        <div className="ItemNumber"> {number} </div>
                        <div className="ItemText"> {text} </div>
                    </Space>
                </DashboardItemContent>
            </Space>
        </DashboardItem>
    )
}

function PanelHeader() {
    return (
        <>
            <section className="sectionPanel">
                <Header className="panelheader">
                    <div className="header-col header-brand">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <Image
                            src={LogoDaz.src}
                            width={"50"}
                            height={"50"}
                            alt={"Logo"}
                        /> */}
                            <Avatar size={64} />
                        </div>
                    </div>
                    <div className="header-col header-nav">
                        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                            {links.map((rte) => (
                                <Menu.Item key={rte.id}>
                                    <Link href={rte.path}>
                                        <span> {rte.label} </span>
                                    </Link>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>
                    <div className="header-col header-btn">
                        <Space>
                            <HeaderIcon Icon={MessageOutlined} />
                            <HeaderIcon Icon={CalendarOutlined} />
                            <HeaderIcon Icon={BellOutlined} />


                            {/* <CalendarOutlined className="headerIcon" />
                            <BellOutlined className="headerIcon" /> */}
                        </Space>
                    </div>

                </Header>
                <PageHeader
                    className="site-page-header"
                    title="Dashboard Compagnie X"
                    subTitle="Toutes vos données à portée de main"
                />
                <section className="container-fluid">
                    <div className="row p-4">
                        <div className="col-md-2">
                            <DashBoardItemStatComponent
                                number="06"
                                text="Voyages en cours"
                            />
                        </div>

                        <div className="col-md-2">
                            <DashBoardItemStatComponent
                                number="02"
                                text="Utilisateurs"
                            />
                        </div>

                        <div className="col-md-2">
                            <DashBoardItemStatComponent
                                number="4%"
                                text="Colis non achéminés"
                            />
                        </div>

                        <div className="col-md-2">
                            <DashBoardItemStatComponent
                                number="96%"
                                text="Colis envoyés"
                            />
                        </div>

                        <div className="col-md-3 offset-1">
                            <div className="position-absolute" style={{ top : '20%' }}>
                                <Affix offsetTop={10}>
                                    <AffixBox>
                                        <AffixTrajet>
                                            Etat du trajet ABJ == BKO
                                        </AffixTrajet>
                                        <AffixSlider>
                                            <span>En cours</span>
                                            <Progress percent={30} />
                                        </AffixSlider>
                                        <AffixSteeps className="mt-3">
                                            <Steps progressDot current={0} direction="vertical">
                                                <Step title="Départ d'abidjan" />
                                                <Step title="Arrivée gare de Bouaké" />
                                                <Step title="Arrivée gare de Gagnoa"  />
                                            </Steps>
                                        </AffixSteeps>
                                    </AffixBox>
                                </Affix>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}

export default PanelHeader;
