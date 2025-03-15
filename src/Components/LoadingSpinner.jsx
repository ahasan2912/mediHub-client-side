// import spinerImg from '../../src/assets/spinner.gif'
import spinerImg2 from '../../src/assets/loading.gif'
const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white">
            <img className="w-16 animate-spin" src={spinerImg2} alt="" />
        </div>
    );
};

export default LoadingSpinner;