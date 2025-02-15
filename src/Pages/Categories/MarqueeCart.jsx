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
        <div className="my-6 md:my-8">
             <h1 className="text-2xl md:text-4xl font-bold uppercase">Top Companny</h1>
            <Marquee pauseOnHover={true} speed={90} className="mt-3 md:mt-5">
                {
                    marquee.map((item, idx) => <div key={idx} className="bg-blue-300 p-1 border m-1 rounded-lg" >
                        <img className="w-32 h-16 md:w-52 md:h-28" src={item.image} alt="" />
                    </div>)
                }
            </Marquee>
        </div>
    );
};

export default MarqueeCart;