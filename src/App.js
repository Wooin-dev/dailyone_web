import './css/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Background from "./pages/Background";
import NotFound from "./pages/NotFound";
import Landing from "./pages/landing/Landing";
import MainLayout from "./layout/MainLayout";
import FullLayout from "./layout/FullLayout";
import {AnimatePresence} from "framer-motion";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Join from "./pages/Join";
import Today from "./pages/today/Today";
import Start from "./pages/Start";
import MyPage from "./pages/MyPage";
import CalendarPage from "./pages/CalendarPage";

function App() {
    // const [cookies] = useCookies(['visited']); TODO : 랜딩페이지 적용 후 활성화

    return (
        <div>
            <div className="main-container">
                <AnimatePresence>
                    <BrowserRouter>
                        <Routes>
                            {/*MainLayout 적용 페이지들*/}
                            <Route element={<MainLayout/>}>
                                <Route path="/" element={<Today/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/join" element={<Join/>}/>
                                <Route path="/start" element={<Start/>}/>

                                <Route path="/*" element={<NotFound/>}/>
                            </Route>

                            {/*화면 전체 레이아웃*/}
                            <Route element={<FullLayout/>}>
                                <Route path="/landing" element={<Landing/>}/>
                            </Route>

                            <Route>
                                {/*  유저 전용 페이지  */}
                                <Route element={<ProtectedRoute/>}>
                                    <Route element={<MainLayout/>}>
                                        <Route path="/today" element={<Today/>}/>
                                        <Route path="/calendar" element={<CalendarPage/>}/>
                                        <Route path="/mypage" element={<MyPage/>}/>
                                        {/*element={cookies.visited ? <Home/> : <Navigate to="/landing" replace/>}/> TODO : 랜딩페이지 적용후 활성화*/}
                                    </Route>
                                    {/*    <Route path="/my-page" element={<Mypage/>}/>*/}
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AnimatePresence>
            </div>
            <div className="background-container">
                <Background/>
            </div>
        </div>
    );
}

export default App;