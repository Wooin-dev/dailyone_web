import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_GOALS_CREATE} from "../../constants/ApiEndpoint";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import StepInput from "./StepInput";
import CreateMyGoalStep1 from "./CreateMyGoalStep1";
import CreateMyGoalStep2 from "./CreateMyGoalStep2";
import CreateMyGoalStep3 from "./CreateMyGoalStep3";
import CreateMyGoalStep4 from "./CreateMyGoalStep4";
import CreateMyGoalStep5 from "./CreateMyGoalStep5";
import CreateMyGoalStep6 from "./CreateMyGoalStep6";
import CreateMyGoalStep7 from "./CreateMyGoalStep7";

function CreateMyGoal({isCreated, setIsCreated}) {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [validationMsg, setValidationMsg] = useState("");
    const [originalGoal, setOriginalGoal] = useState("");
    const [simpleGoal, setSimpleGoal] = useState("");
    const [motivationComment, setMotivationComment] = useState("");
    const [congratsComment, setCongratsComment] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date(startDate).setDate(startDate.getDate() + 1)));
    const [promiseDoneCount, setPromiseDoneCount] = useState(0);
    const promiseDoneCountLimit = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const finalStep = 7;
    const stepProgress = `${(step / finalStep) * 100}%`;

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            // 엔터 키가 눌렸을 때 실행할 동작
            stepBtnHandler();
        }
    };
    const stepBtnHandler = () => {
        if (!validateInput()) {
            return;
        }
        if (step < finalStep) {
            setStep(step + 1);
        } else {
            createGoalAxios();
        }
    }
    const validateInput = () => {
        if (step === 1 && originalGoal === "") {
            setValidationMsg("마음 속 목표를 적어주세요");
            return false;
        }
        if (step === 2 && simpleGoal === "") {
            setValidationMsg("꾸준한 목표가 대단한 목표에요");
            return false;
        }
        if (step === 3 && motivationComment === "") {
            setValidationMsg("초심이 흔들리더라도 다시 잡는게 중요해요");
            return false;
        }
        if (step === 4 && congratsComment === "") {
            setValidationMsg("미래의 나에게 응원을 남겨보세요");
            return false;
        }

        if (step === 7 && (promiseDoneCount == null || promiseDoneCount === 0 || promiseDoneCount === "")) {
            alert(promiseDoneCount);
            setValidationMsg("충분히 쉬워보이는 수치로 도전해도 좋아요");
            return false;
        }
        if (step === 7 && promiseDoneCount > promiseDoneCountLimit) {
            setValidationMsg("하루에 한번씩으로도 충분해요");
            return false;
        }
        setValidationMsg("");
        return true;
    }
    useEffect(() => {
        setValidationMsg("");
    }, [originalGoal, simpleGoal, motivationComment, congratsComment, promiseDoneCount]);
    const createGoalAxios = () => {
        axios.post(`${API_GOALS_CREATE}`,
            {
                originalGoal: originalGoal,
                simpleGoal: simpleGoal,
                motivationComment: motivationComment,
                congratsComment: congratsComment,
                startDate: startDate,
                endDate: endDate,
                promiseDoneCount: promiseDoneCount
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            },
        )
            .then((res) => {
                console.log('success');
                alert("목표를 생성했습니다");
                navigate("/done")
                // setIsCreated(!isCreated);
            })
            .catch((error) => {
                console.log(error);
                alert("목표 생성에 실패했어요😭");
                navigate("/")
            });
    }

    return (
        <div className="container pt-0 pb-1 px-0 h-full flex flex-col">
            <div className={"shadow-md shadow-gray-50"}>
                <div className={"h-2 bg-green-100"}>
                    <div className={`h-full bg-green-300 transition-all duration-500`}
                         style={{width: stepProgress}}/>
                </div>
                <div className="text-center text-gray-400 text-sm">{step} / {finalStep}</div>
            </div>

            <div className={"p-5 flex-grow relative overflow-y-auto overflow-x-hidden"}
                 onKeyDown={handleKeyDown}>

                <StepInput activeStep={1} currentStep={step}><CreateMyGoalStep1 value={originalGoal}
                                                                                setValue={setOriginalGoal}/></StepInput>
                <StepInput activeStep={2} currentStep={step}><CreateMyGoalStep2 value={simpleGoal}
                                                                                setValue={setSimpleGoal}
                                                                                originalGoal={originalGoal}/></StepInput>
                <StepInput activeStep={3} currentStep={step}><CreateMyGoalStep3 value={motivationComment}
                                                                                setValue={setMotivationComment}/></StepInput>
                <StepInput activeStep={4} currentStep={step}><CreateMyGoalStep4 value={congratsComment}
                                                                                setValue={setCongratsComment}/></StepInput>
                <StepInput activeStep={5} currentStep={step}><CreateMyGoalStep5 value={startDate}
                                                                                setValue={setStartDate}/></StepInput>
                <StepInput activeStep={6} currentStep={step}><CreateMyGoalStep6 value={endDate}
                                                                                setValue={setEndDate}
                                                                                startDate={startDate}/></StepInput>
                <StepInput activeStep={7} currentStep={step}><CreateMyGoalStep7 value={promiseDoneCount}
                                                                                setValue={setPromiseDoneCount}
                                                                                limit={promiseDoneCountLimit}/></StepInput>
            </div>
            <div className="w-full py-1 px-4 relative">
                {validationMsg !== "" &&
                    <motion.div className="w-full absolute -top-4 left-0 text-center text-red-600"
                                initial={{y: 10, opacity: 0}}
                                animate={{y: 0, opacity: 1}} transition={{type: "spring", duration: 0.5}}
                    >{validationMsg}
                    </motion.div>
                }
                {step > 0 &&
                    <button className={"btn-main my-1"}
                            onClick={() => stepBtnHandler()}>{step < finalStep ? '다음' : '목표 생성하기'}</button>
                }
            </div>
        </div>
    );
}

export default CreateMyGoal;
