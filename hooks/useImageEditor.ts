
import { useState, useCallback } from 'react';
import type { EditedImageResult } from '../types';
import { editImageWithNanoBanana } from '../services/geminiService';

export const useImageEditor = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [editedResult, setEditedResult] = useState<EditedImageResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImage(file);
      setEditedResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // remove the "data:*/*;base64," prefix
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleEditImage = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError("Please upload an image and provide an editing prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedResult(null);

    try {
        const base64Data = await convertFileToBase64(originalImage);
        const result = await editImageWithNanoBanana(base64Data, originalImage.type, prompt);
        setEditedResult(result);
    } catch (e) {
      console.error("Editing failed:", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred. See console for details.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return {
    originalImage,
    originalImagePreview,
    prompt,
    editedResult,
    isLoading,
    error,
    handleImageChange,
    setPrompt,
    handleEditImage,
  };
};