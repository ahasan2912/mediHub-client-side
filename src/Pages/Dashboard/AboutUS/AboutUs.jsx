import aboutUsImg from '../../../../src/assets/About-us.png'

const AboutUs = () => {
    return (
        <div className='mt-16 pt-10 px-4 md:p-10'>
            <div>
                <img className='rounded-md w-full h-40 md:h-auto object-fill' src={aboutUsImg} alt="" />
            </div>
            <div className='mt-8'>
                <h1 className='text-2xl font-semibold uppercase'>About us</h1>
                <p className='mt-2'>MedEasy is the no. 1 digital healthcare platform in Bangladesh. We provide doctor video consultation and medicine home delivery all over Bangladesh. We are also supported by the ICT division of Bangladesh. MedEasy app enables you to connect with licensed doctors from 23 specialties and, receive consultations through video calling from anywhere.</p>
            </div>
            <div className='mt-5'>
                <h1 className='text-2xl font-semibold'>MEDICINE HOME DELIVERY</h1>
                <p className='mt-2'>Order medicine from our online pharmacy every month and save your money & time. Our medicine is authentic and cheaper than the pharmacy in most cases. Get up to 10% discount on your medicine order. How to order medicine from MedEasy? -Download MedEasy App and upload your prescription -You can also search for your desired medicine -Select the medicine you want to buy and click add to cart -Add delivery address and proceed to place the order.</p>
                <p className='mt-2'></p>
            </div>
            <div className='mt-5'>
                <h1 className='text-2xl font-semibold'>VIDEO-CONSULT WITH SPECIALIST DOCTORS</h1>
                <p className='mt-2'>Now you can consult with renowned specialist doctors via video call from anywhere by booking appointments with them. For chronic health conditions like Diabetes, Hypertension, Liver Disease you can get consultations from specialist doctors as well. For common health conditions like flu, fever, headaches, diarrhea, common allergies, skin conditions, etc. you can consult with our experienced General Practitioners (MBBS) for only 99 taka throughout the day.</p>
            </div>
        </div>
    );
};

export default AboutUs;