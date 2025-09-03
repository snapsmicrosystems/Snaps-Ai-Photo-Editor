import React from 'react';
import { DownloadIcon } from './Icons';

interface ResultDisplayProps {
  originalImage: string | null;
  editedImage: string;
  responseText: string | null;
}

interface ImageCardProps {
    src: string | null;
    title: string;
    onDownload?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, title, onDownload }) => (
    <div className="w-full">
        <div className="relative flex justify-center items-center mb-3 h-8">
            <h3 className="text-lg font-semibold text-center text-slate-400">{title}</h3>
            {onDownload && src && (
                 <button
                    onClick={onDownload}
                    className="absolute right-0 flex items-center gap-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1 px-3 rounded-md transition-colors duration-200"
                    aria-label="Download edited image"
                >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Download</span>
                </button>
            )}
        </div>
        <div className="aspect-square bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700 shadow-lg flex items-center justify-center">
            {src ? (
                <img src={src} alt={title} className="object-contain max-h-full max-w-full" />
            ) : (
                <div className="text-slate-600">No Image</div>
            )}
        </div>
    </div>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, editedImage, responseText }) => {
  const handleDownload = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage;

    const mimeTypeMatch = editedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    const extension = mimeTypeMatch && mimeTypeMatch.length > 1 ? mimeTypeMatch[1].split('/')[1] : 'png';
    
    link.download = `snaps-ai-edited-image.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="w-full animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageCard src={originalImage} title="Original" />
            <ImageCard src={editedImage} title="Edited" onDownload={handleDownload} />
        </div>
        {responseText && (
            <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-300 italic">
                    <span className="font-semibold text-indigo-400">AI Note:</span> {responseText}
                </p>
            </div>
        )}
    </div>
  );
};

export default ResultDisplay;