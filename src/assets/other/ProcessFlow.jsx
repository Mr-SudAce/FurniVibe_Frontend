import { FaLightbulb, FaCogs, FaPencilRuler, FaLaptopCode, FaComments, FaRocket } from "react-icons/fa";

const steps = [
  { id: 1, title: "VISION", description: "Step one is ensuring that we understand the full extent and details of your vision.", icon: <FaLightbulb /> },
  { id: 2, title: "PLAN", description: "We create the architecture, pick the right tools for the job, and build the roadmap for you.", icon: <FaCogs /> },
  { id: 3, title: "DESIGN", description: "Based on your ideas, we create wireframes, mockups, and with your feedback to final designs.", icon: <FaPencilRuler /> },
  { id: 4, title: "DEVELOP", description: "Based on the approved designs we start working towards the milestones in the plan.", icon: <FaLaptopCode /> },
  { id: 5, title: "FEEDBACK", description: "We ensure that the team is doing it right by presenting you with an early set of prototypes to analyze.", icon: <FaComments /> },
  { id: 6, title: "DEPLOY", description: "An automated deployment process will ensure timely delivery followed up with maintenance and support.", icon: <FaRocket /> },
];

const ProcessFlow = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-15 px-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center w-1/6 relative ">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white text-2xl z-1">
                {step.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-red-500">{step.id}. {step.title}</h3>
              <p className="mt-2 text-sm text-gray-100 text-center">{step.description}</p>
              {index < steps.length && (
                <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-24 border-t-2 border-red-500"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProcessFlow;
