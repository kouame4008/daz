
import React, { useState, useEffect } from "react";
import { Header } from 'antd/lib/layout/layout';
import Link from 'next/link';
import { Menu, Button, Space, Avatar } from 'antd';
import LogoDaz from '../../public/assets/logo.jpg';
import Image from 'next/image'
import { UserOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { useAuth } from "../../pages/api/auth/auth-actions";

const UserInf = styled.div`
    font-size: 15px;
    font-family: "Poppins",sans-serif;
`;

function DashHeader() {
    const { user } = useAuth();
    const [us, setUs] = useState(user)

    return (
        <>
            <Header>
                <div className="header-col header-brand">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            src={LogoDaz.src}
                            width={"50"}
                            height={"50"}
                            alt={"Logo"}
                        />
                    </div>
                </div>
                <div className="header-col header-nav">
                    {/* <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                        <Menu.Item key="1">
                            <Link href="/dashboard">
                                <span> Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link href="/profile">
                                <span>Profile</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link href="/sign-up">
                                <span> Sign Up</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link href="/sign-in">
                                <span> Sign In</span>
                            </Link>
                        </Menu.Item>
                    </Menu> */}
                </div>
                <div className="header-col header-btn">
                    <Space>
                        <UserInf> {typeof user !== 'undefined' && typeof user._doc !== 'undefined' && user._doc.email} </UserInf>
                        <Avatar size={"default"} icon={<UserOutlined />} />
                    </Space>
                </div>
            </Header>
        </>
    );
}

export default DashHeader;
