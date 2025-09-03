
import React from 'react';
import { useImageEditor } from './hooks/useImageEditor';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptControls from './components/PromptControls';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { PhotoIcon } from './components/Icons';

export default function App(): React.ReactElement {
  const {
    originalImage,
    originalImagePreview,
    prompt,
    editedResult,
    isLoading,
    error,
    handleImageChange,
    setPrompt,
    handleEditImage,
  } = useImageEditor();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl p-6 h-fit sticky top-8 self-start z-5">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6">1. Upload & Describe</h2>
            <div className="space-y-6">
              <ImageUploader
                originalImagePreview={originalImagePreview}
                handleImageChange={handleImageChange}
              />
              <PromptControls
                prompt={prompt}
                setPrompt={setPrompt}
                handleEditImage={handleEditImage}
                isLoading={isLoading}
                isImageUploaded={!!originalImage}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-8">
             <div className="bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl p-6 min-h-[600px] flex flex-col">
                <h2 className="text-2xl font-bold text-indigo-400 mb-6">2. View Result</h2>
                 <div className="flex-grow flex items-center justify-center relative">
                    {isLoading && <Loader />}
                    {error && !isLoading && (
                       <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                         <p className="font-semibold">An Error Occurred</p>
                         <p className="text-sm">{error}</p>
                       </div>
                    )}
                    {!isLoading && !editedResult && !error && (
                        <div className="text-center text-slate-500">
                            <PhotoIcon className="w-24 h-24 mx-auto mb-4" />
                            <p className="text-lg font-medium">Your edited image will appear here.</p>
                            <p>Upload an image and provide an edit description to get started.</p>
                        </div>
                    )}
                    {editedResult && !isLoading && (
                      <ResultDisplay
                        originalImage={originalImagePreview}
                        editedImage={editedResult.imageUrl}
                        responseText={editedResult.text}
                      />
                    )}
                 </div>
             </div>
          </div>
        </div>
        <footer className="text-center text-slate-500 mt-12 pb-4">
            <p>Powered by Gemini Nano Banana Model</p>
        </footer>
      </main>
    </div>
  );
}
