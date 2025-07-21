const Modal = ({ setToggleModal }) => {

    return (
        <div>
            <div className="bg-gray-500">
                <div className="modal_css z-10 top-26   ">
                    <div className="modal-box px-[40px] relative">
                        <div className="rounded-[8px] bg-[#fff]">
                            <div className="h-[27px] w-[411px] rounded-t-xl font-[500]  flex flex-row-reverse items-center px-3">

                                <button onClick={() => setToggleModal(false)} className="">
                                    ✕
                                </button>
                            </div>
                            <h2 className="text-center font-[500]">Thank you for submitting the answer.</h2>{" "}
                            <div className="h-[93px] flex gap-5 items-center font-[500] justify-center">
                                <button
                                    onClick={() =>{ setToggleModal(false)
                                    window.location.reload()
                                    }}
                                    className="text-[#EE3C4D] bg-white h-[34px] w-[99px] text-sm border border-[#EE3C4D] rounded  shadow hover:shadow-red-400 "
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
