import React, { FC, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
import { Space, Rate, Typography, Spin, Skeleton } from 'antd';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from '../../public/assets/slides/1.jpg';
import img2 from '../../public/assets/slides/2.jpg';
import img3 from '../../public/assets/slides/3.jpg';
import Image from 'next/image';


const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const { Title } = Typography

const Slides: FC = () => {
    const [value, setValue] = useState(3);
    const [spinning, setSpinning] = useState(true);

    React.useEffect(() => {
        setTimeout(() => { setSpinning(false) }, 2000)
    })

    return (
        <React.Fragment>
            <Skeleton loading={spinning} active style={{ height: '100%', width: '100%' }}>
                <Swiper
                    // cssMode={true}
                    navigation={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                    className="mySwiper"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide>
                        <div className='slidesTxt'>
                            <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, animi, eligendi tempora dolor ex ipsa accusantium impedit natus quod, officiis ipsum provident debitis! Cumque fugiat vitae hic, quasi possimus maxime.   </span>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '1rem'
                                }}
                            >
                                <div className="">
                                    <span>Dada Gnahoua</span> <br />
                                    <small className='text-white'> CEO DAZ </small>
                                </div>
                                <div className="">
                                    <span>
                                        <Rate tooltips={desc} onChange={setValue} value={value} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* <img src={img2.src} alt="" /> */}
                        <div className='w-100'>
                            <Image
                                src={img2.src}
                                width={573}
                                height={841}
                                sizes={"100vh"}
                                alt={"Img3"}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-100'>
                            <Image
                                src={img1.src}
                                width={573}
                                height={841}
                                sizes={"100vh"}
                                alt={"Img1"}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-100'>
                            <Image
                                src={img3.src}
                                width={573}
                                height={841}
                                sizes={"100vh"}
                                alt={"Img2"}
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </Skeleton>
        </React.Fragment>
    );
}

export default Slides;