import React, {Fragment, useState} from 'react';
import { IoNotifications } from "react-icons/io5";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

const Notification = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    // return (
    //     <div>
    //         <IoNotifications className="h-6 w-6 fill-white cursor-pointer" onClick={toggleModal}/>
    //         {showModal && (
    //             <div className="fixed inset-0 bg-white bg-opacity-30 flex justify-center items-center">
    //                 <div className="bg-white p-4 rounded-md shadow-md">
    //                     {/* 모달 내용 */}
    //                     <p>알림이 도착했습니다!</p>
    //                     <button onClick={toggleModal}>닫기</button>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // );
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center px-2 py-2">
                    <IoNotifications className="h-6 w-6 fill-white cursor-pointer" onClick={toggleModal}/>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    알림은
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    준비중입니다!
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <div className="block px-4 py-2 text-sm text-gray-900">
                            <p>Hello</p>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Notification;
