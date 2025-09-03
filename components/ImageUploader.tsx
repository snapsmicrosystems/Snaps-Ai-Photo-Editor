
import React from 'react';
import { UploadIcon, PhotoIcon } from './Icons';

interface ImageUploaderProps {
  originalImagePreview: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ originalImagePreview, handleImageChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Upload Image</label>
      <div className="mt-1">
        <div className="w-full h-64 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center bg-slate-900/50 hover:border-indigo-500 transition-colors duration-300 relative group">
          {originalImagePreview ? (
            <img src={originalImagePreview} alt="Preview" className="object-contain h-full w-full rounded-md p-1" />
          ) : (
            <div className="text-center text-slate-500">
              <PhotoIcon className="mx-auto h-12 w-12" />
              <p className="mt-2">Click or drag to upload</p>
              <p className="text-xs">PNG, JPG, WEBP</p>
            </div>
          )}
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/webp"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
