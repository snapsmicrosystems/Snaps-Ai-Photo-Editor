
import React from 'react';
import { WandIcon } from './Icons';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleEditImage: () => void;
  isLoading: boolean;
  isImageUploaded: boolean;
}

const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, handleEditImage, isLoading, isImageUploaded }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
        Describe Your Edit
      </label>
      <textarea
        id="prompt"
        rows={4}
        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        placeholder="e.g., 'Add a birthday hat on the cat' or 'make the background a futuristic city'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleEditImage}
        disabled={isLoading || !isImageUploaded || !prompt}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Editing...
          </>
        ) : (
          <>
            <WandIcon className="w-5 h-5" />
            Apply Edit
          </>
        )}
      </button>
    </div>
  );
};

export default PromptControls;
