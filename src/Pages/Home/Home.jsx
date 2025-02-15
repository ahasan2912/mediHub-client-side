import Banner from "../../Components/Banner";
import Categories from "../Categories/Categories";
import Accordion from "./Accordion";

const Home = () => {
    return (
        <div className="md:w-[90%] mx-auto px-5">
            <Banner></Banner>
            <Categories></Categories>
            <Accordion></Accordion>
        </div>
    );
};

export default Home;