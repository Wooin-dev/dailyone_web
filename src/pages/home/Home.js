import React from 'react';

function Home(props) {
    return (
        <div className="size-full py-5">

            <div className="">
                <div className="border-b-[1px]">
                    <h2>🔥 목표</h2>
                </div>
                <div className="py-3 px-5 border-b-[0.5px]">
                    <div className="flex items-center py-1 mb-1">
                        <div
                            className="mr-2 flex items-center justify-center bg-sky-200 size-6 text-center rounded-full">w
                        </div>
                        <div className="text-xs font-semibold text-gray-800 mr-1">Wooin우인</div>
                        <div className="text-[0.7rem] text-gray-400">2분</div>
                    </div>
                    <div>
                        <div className="text-xl font-bold">오운완</div>
                        <div className="text-sm">메인 목표입니다</div>
                    </div>

                    <div className="flex justify-around pt-2">
                        <div>like</div>
                        <div>follow</div>
                        <div>view</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
