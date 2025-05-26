"use client";

export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex flex-col items-end right-[7%] absolute top-4 ">
      <div className="flex">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              {/* step circle */}
              <div
                className={`w-[5vw] h-[5vw] rounded-full flex items-center justify-center text-xs transition-colors ${
                  isActive
                    ? "bg-[var(--green)] text-white"
                    : isCompleted
                    ? "bg-[var(--blue)] text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              {/* line */}
              {stepNumber < totalSteps && (
                <div
                  className={`w-[6vw] h-[2px] mx-[1vw] transition-colors ${
                    isCompleted ? "bg-[var(--blue)]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step labels */}
      <div className="text-xs text-gray-600">
        Trin {currentStep} af {totalSteps}
      </div>
    </div>
  );
}
