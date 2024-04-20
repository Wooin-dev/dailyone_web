import React, { useState } from 'react';
import { IoNotifications } from "react-icons/io5";

const Notification = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <IoNotifications className="h-6 w-6 fill-white cursor-pointer" onClick={toggleModal}/>
            {showModal && (
                <div className="fixed inset-0 bg-white bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        {/* 모달 내용 */}
                        <p>알림이 도착했습니다!</p>
                        <button onClick={toggleModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notification;
