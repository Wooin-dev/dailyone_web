import './css/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Background from "./pages/Background";
import NotFound from "./pages/NotFound";
import Landing from "./pages/landing/Landing";
import MainLayout from "./layout/MainLayout";
import FullLayout from "./layout/FullLayout";
import {AnimatePresence} from "framer-motion";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Join from "./pages/Join";
import Done from "./pages/done/Done";
import Start from "./pages/Start";
import MyPage from "./pages/MyPage";
import CalendarPage from "./pages/CalendarPage";
import LoadingPage from "./pages/loading/LoadingPage";
import CreateMyGoal from "./pages/createmygoal/CreateMyGoal";
import MyPromiseGoal from "./pages/done/MyPromiseGoal";
import KakaoRedirect from "./pages/KakaoRedirect";
import Home from "./pages/home/Home";
import GoalDetail from "./pages/home/goal/GoalDetail";

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
                                {/*TODO : Start - 랜딩페이지는 향후 작업후 루트로 접근하도록 변경 예정*/}
                                <Route path="/start" element={<Start/>}/>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/home" element={<Home/>}/>
                                <Route path="/goal/:id" element={<GoalDetail/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/kakao-login" element={<KakaoRedirect/>}/>
                                <Route path="/join" element={<Join/>}/>
                                <Route path="/loading" element={<LoadingPage/>}/>
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
                                        {/*<Route path="/" element={<Done/>}/>*/}
                                        <Route path="/done" element={<Done/>}/>
                                        <Route path="/promise-goal" element={<MyPromiseGoal/>}/>
                                        <Route path="/calendar" element={<CalendarPage/>}/>
                                        <Route path="/mypage" element={<MyPage/>}/>
                                        <Route path="/create-goal" element={<CreateMyGoal/>}/>
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
