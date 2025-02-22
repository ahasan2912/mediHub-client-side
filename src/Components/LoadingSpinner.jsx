import spinerImg from '../../src/assets/spinner.gif'
const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white">
            <img className="w-16 animate-spin" src={spinerImg} alt="" />
        </div>
    );
};

export default LoadingSpinner;