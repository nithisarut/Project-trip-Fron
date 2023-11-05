import { AppstoreOutlined, BarChartOutlined, CarOutlined, CloudOutlined, DashOutlined, ShopOutlined, TeamOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLocationPlus, BiPackage, BiHomeAlt } from "react-icons/bi";


interface Props {
    children: any
}
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];



function NavAdmin({ children }: Props) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    const onPage = ({ key }: Page) => {
        switch (key) {
            case "1":
                navigate("/Dashboard");
                break;
            case "2":
                navigate("/TableUser");
                break;
            case "3":
                navigate("/TableCar");
                break;
            case "4":
                navigate("/TableLocation");
                break;
            case "5":
                navigate("/TableTrip");
                break;
            case "6":
                navigate("/");
                break;
            case "7":
                navigate("/CreateLocation");
                break;
            case "8":
                navigate("/CreateCar");
                break;
            case "9":
                navigate("/CreateCar");
                break;
            case "10":
                navigate("/TableLocation");
                break;
            case "11":
                navigate("/TableTrip");
                break;
            case "12":
                navigate("/CreateTrip");
                break;
            case "13":
                navigate("/TableOrder");
                break;

            default:
                break;
        }
    };
    interface Page {
        key?: string;
    }
    const items: MenuItem[] = [
        getItem('แผงควบคุม', '1', <DashOutlined style={{ fontSize: "20px" }} />,),
        getItem('ผู้ใช้งาน', '2', <UserOutlined style={{ fontSize: "20px" }} />),
        getItem('รถ', '9', <CarOutlined style={{ fontSize: "20px" }} />, [getItem('สร้างข้อมูล', '8'), getItem('ข้อมูลทั้งหมด', '3')]),
        getItem('สถานที่ท่องเที่ยว', '10', <BiLocationPlus style={{ fontSize: "20px" }} />, [getItem('สร้างข้อมูล', '7'), getItem('ข้อมูลทั้งหมด', '4')]),
        getItem('แพ็กเกจทัวร์', '5', <BiPackage style={{ fontSize: "20px" }} />, [getItem('สร้างข้อมูล', '12'), getItem('ข้อมูลทั้งหมด', '11')]),
        getItem('ชำระเงิน', '13', <UserOutlined style={{ fontSize: "20px" }} />),
        getItem('กลับหน้าแรก', '6', <BiHomeAlt style={{ fontSize: "20px" }} />),
    ];
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    return (
        <React.Fragment>
            <Layout  style={{ minHeight: '100vh' }}>
                <Sider  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div  className='center' style={{ padding: "10px" }}><img src="https://drive.google.com/uc?id=1QMrjbLJOMQXCWPVZH-mdfXqTgpmI_9eb"></img></div>
                    <Menu  onClick={(e) => onPage({ key: e.key })} theme="dark" mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout  " >
                    <Content  style={{ margin: '0 16px' }}>
                        <Breadcrumb   style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        
                        <div   style={{ padding: 24, minHeight: 360, background: colorBgContainer }} >
                            {children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Nithisarut Sinkhong 63123250107</Footer>
                </Layout>
            </Layout>

        </React.Fragment>
    )
}

export default NavAdmin