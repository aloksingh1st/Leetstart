import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SceneWindow from "./SceneWindow";
import ProblemListView from "./scenes/ProblemListView";
import ProblemDetailView, {
  ProblmeDetailText,
} from "./scenes/ProblemDetailView";
import CodeEditorView, { CodeEditorText } from "./scenes/CodeEditorView";
import SubmissionView, { SubmissionText } from "./scenes/SubmissionView";
import { useScrollPosition } from "../hooks/useScrollPosition";

const LandingScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const scrollPosition = useScrollPosition();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY > 700 && window.scrollY < 2608;
      setIsFixed(shouldBeFixed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scrollPercentage =
      (scrollPosition / (document.body.scrollHeight - window.innerHeight)) *
      100;

    if (scrollPercentage < 25) setActiveScene(0);
    else if (scrollPercentage < 50) setActiveScene(1);
    else if (scrollPercentage < 75) setActiveScene(2);
    else setActiveScene(3);
  }, [scrollPosition]);

  const renderActiveScene = () => {
    switch (activeScene) {
      case 0:
        return <ProblemListView />;
      case 1:
        return <ProblemDetailView />;
      case 2:
        return <CodeEditorView />;
      case 3:
        return <SubmissionView />;
      default:
        return <ProblemListView />;
    }
  };

  const renderActiveText = () => {
    switch (activeScene) {
      case 1:
        return <ProblmeDetailText />;
      case 2:
        return <CodeEditorText />;
      case 3:
        return <SubmissionText />;
      default:
        return null;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <section className="min-h-screen flex items-center justify-center px-4 mt-[15rem]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Your Journey to DSA Mastery Begins Here.
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            LeetStart transforms your problem-solving skills with story-driven
            learning and real-time coding.
          </p>

          {/* Spacer to maintain layout flow when fixed */}
          {isFixed && <div style={{ height: "400px" }} />}

          {/* Animated SceneWindow */}
          <motion.div
            animate={{
              position: isFixed ? "fixed" : "relative",
              top: isFixed ? 96 : 0,
              left: isFixed ? 50 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`z-20 w-full transition-all`}
          >
            <div className={`${isFixed ? "flex" : "block"}`}>
              <SceneWindow>{renderActiveScene()}</SceneWindow>
              {isFixed && (
                <div className="w-3/4 p-6 self-center">
                  {renderActiveText()}
                </div>
              )}
            </div>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all">
              Start Solving
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all">
              Explore Challenges
            </button>
          </div>
        </div>
      </section>

      {/* Scroll Sections to trigger transitions */}
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
    </div>
  );
};

export default LandingScene;
