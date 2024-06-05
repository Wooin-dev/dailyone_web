import React from 'react';
import {AnimatePresence, motion} from "framer-motion";

function StepInput({ activeStep, currentStep, children}) {
    return (
        <div className={`absolute top-0 left-0 size-full ${activeStep !== currentStep && "pointer-events-none"}`}>
            <AnimatePresence>
                {activeStep === currentStep &&
                    <motion.div
                        className={"size-full"}
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -30}}
                        transition={{duration: 0.5}}
                    >
                        {children}
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}

export default StepInput;