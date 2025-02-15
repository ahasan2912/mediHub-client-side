const Accordion = () => {
    return (
        <div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">How can I place an order?</div>
                <div className="collapse-content">
                    <p>You can place an order by browsing our website, adding medicines to your cart, and proceeding to checkout.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Do I need a prescription to buy medicines?</div>
                <div className="collapse-content">
                    <p>Yes, prescription medicines require a valid prescription from a registered doctor. Over-the-counter (OTC) medicines do not require a prescription.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium"> What payment methods do you accept?</div>
                <div className="collapse-content">
                    <p>We accept credit/debit cards, mobile banking (bKash, Nagad, Rocket), and cash on delivery (COD).</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">How long does delivery take?</div>
                <div className="collapse-content">
                    <p>Delivery time varies by location. Standard delivery takes 2-3 days, while express delivery is available within 24 hours in selected areas.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 mb-10">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Is there a minimum order amount for home delivery?</div>
                <div className="collapse-content">
                    <p>Yes, the minimum order amount for free home delivery is ৳500. Orders below this amount may incur a small delivery fee.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 mb-10">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Can I return or exchange a medicine?</div>
                <div className="collapse-content">
                    <p>We do not accept returns on medicines due to safety reasons. However, if you receive a damaged or incorrect item, please contact our support team within 24 hours.</p>
                </div>
            </div>
            
        </div>
    );
};

export default Accordion;