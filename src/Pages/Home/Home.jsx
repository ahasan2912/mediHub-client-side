import Banner from "../../Components/Banner";
import Categories from "../Categories/Categories";
import Accordion from "./Accordion";
import CustomerReview from "./CustomerReview";
import ReviewMobile from "./ReviewMobile";

const Home = () => {
    return (
        <div className="md:w-[90%] mx-auto px-3 mt-24 sm:mt-5 ">
            <Banner></Banner>
            <Categories></Categories>
            <div className="hidden lg:block">
                <CustomerReview></CustomerReview>
            </div>
            <div className="block lg:hidden">
                <ReviewMobile></ReviewMobile>
            </div>
            <Accordion></Accordion>
        </div>
    );
};

export default Home;