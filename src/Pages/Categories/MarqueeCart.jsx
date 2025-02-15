import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const MarqueeCart = () => {
    const [marquee, setMarquee] = useState([]);
    useEffect(() => {
        fetch('marquee.json')
            .then((res) => res.json())
            .then((data) => setMarquee(data))
    }, []);
    return (
        <div>
            <Marquee pauseOnHover={true} speed={90} className="my-10">
                {
                    marquee.map((item, idx) => <div key={idx} className="bg-blue-300 p-1 border m-1 rounded-lg" >
                        <img className="w-52 h-28" src={item.image} alt="" />
                    </div>)
                }
            </Marquee>
        </div>
    );
};

export default MarqueeCart;