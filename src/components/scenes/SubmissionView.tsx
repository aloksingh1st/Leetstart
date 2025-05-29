import React, { useEffect, useRef } from "react";
import { CheckCircle, Clock, BarChart2, ArrowRight } from "lucide-react";

const SubmissionView: React.FC = () => {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      const circle = circleRef.current;
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      // Animate the circle
      setTimeout(() => {
        circle.style.transition = "stroke-dashoffset 1s ease-in-out";
        circle.style.strokeDashoffset = "0";
      }, 300);
    }
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <circle
            className="text-gray-700 stroke-current"
            strokeWidth="4"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          />
          <circle
            ref={circleRef}
            className="text-green-500 stroke-current"
            strokeWidth="4"
            strokeLinecap="round"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          />
        </svg>
        <CheckCircle className="text-green-500 w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        <span className="text-green-400">Accepted!</span>
      </h2>

      <p className="text-gray-300 mb-8">Your solution passed all test cases.</p>

      <div className="grid grid-cols-3 gap-6 max-w-md mb-8">
        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
          <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
          <div className="text-white font-medium">Runtime</div>
          <div className="text-green-400">76ms</div>
          <div className="text-xs text-gray-400">Beats 93%</div>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
          <BarChart2 className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
          <div className="text-white font-medium">Memory</div>
          <div className="text-green-400">38.5MB</div>
          <div className="text-xs text-gray-400">Beats 89%</div>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
          <svg
            className="w-5 h-5 text-cyan-400 mx-auto mb-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <div className="text-white font-medium">Complexity</div>
          <div className="text-green-400">O(n)</div>
          <div className="text-xs text-gray-400">Optimal</div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
          View Solution
        </button>
        <button className="bg-gradient-to-r from-accent-300 to-accent hover:from-cyan-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg flex items-center transition-all">
          Next Problem
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export const SubmissionText: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-lg">
      <h2 className="text-3xl font-extrabold mb-4 leading-tight tracking-wide">
        🌲 The Victory Slide
      </h2>
      <p className="text-emerald-100 text-base leading-relaxed">
        With every correct submission, you level up.
      </p>
    </div>
  );
};

export default SubmissionView;
