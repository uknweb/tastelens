import { Image, X } from 'lucide-react';
import { useState } from 'react';
import heic2any from 'heic2any';

export default function ImageUpload({ onAnalyze, analysisError }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [converting, setConverting] = useState(false);

  // Allowed image MIME types
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/heic',
    'image/heif'
  ];

  const handleFile = async (file) => {
    // Check if it's a HEIC file
    const isHEIC = file.type === 'image/heic' ||
                   file.type === 'image/heif' ||
                   file.name.toLowerCase().endsWith('.heic') ||
                   file.name.toLowerCase().endsWith('.heif');

    setError(null);
    setConverting(false); // Reset converting state

    console.log('File type:', file.type, 'Is HEIC:', isHEIC);

    try {
      let processedFile = file;

      // Convert HEIC to JPEG if needed
      if (isHEIC) {
        setConverting(true);
        console.log('Converting HEIC file...');

        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9
        });

        // heic2any might return an array of blobs for multi-image HEIC
        const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

        // Create a new File object from the converted blob
        processedFile = new File(
          [finalBlob],
          file.name.replace(/\.heic$/i, '.jpg'),
          { type: 'image/jpeg' }
        );

        console.log('HEIC conversion successful');
        setConverting(false);
      }

      // Validate - strict whitelist of allowed types
      if (!ALLOWED_TYPES.includes(processedFile.type)) {
        setError('Unsupported file type. Please upload a JPEG, PNG, GIF, WEBP, or HEIC image.');
        return;
      }
      if (processedFile.size > 10 * 1024 * 1024) {
        setError('Image must be under 10MB');
        return;
      }

      setImage(processedFile);

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(processedFile);
    } catch (err) {
      console.error('Error processing image:', err);
      setConverting(false);
      setError('Failed to process image. Please try a different file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    setImage(null);
    setPreview(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {converting ? (
        <div className="border border-neutral-300 p-8 sm:p-12 md:p-16 text-center">
          <div className="relative w-12 h-12 mx-auto mb-6">
            <svg className="animate-spin" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="8 4"
                strokeLinecap="round"
                className="text-black"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="8 4"
                strokeLinecap="round"
                className="text-neutral-300 opacity-40"
                style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}
              />
            </svg>
          </div>
          <p className="text-black font-light tracking-wide">Converting HEIC image...</p>
          <p className="text-sm text-neutral-500 font-light mt-2">This may take a moment</p>
        </div>
      ) : !preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border border-neutral-300 p-8 sm:p-12 md:p-16 text-center hover:border-black transition-all duration-300 cursor-pointer"
        >
          <input
            type="file"
            accept="image/*,.heic,.heif"
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Image className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 sm:mb-6 text-neutral-400 stroke-[1.5]" />
            <p className="text-black mb-2 font-light tracking-wide text-sm sm:text-base">
              <span className="font-normal">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 font-light">PNG, JPG, HEIC up to 10MB</p>
          </label>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div className="relative">
            <img
              src={preview}
              alt="Uploaded outfit"
              className="w-full h-64 sm:h-80 md:h-96 object-contain bg-white"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white border border-neutral-300 p-1.5 sm:p-2 hover:border-black transition-all duration-300"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[1.5]" />
            </button>
          </div>
          <button
            onClick={() => onAnalyze(image)}
            className="w-full bg-black text-white py-3 sm:py-4 text-sm sm:text-base font-light tracking-wide hover:bg-neutral-800 transition-all duration-300"
          >
            Analyze Through Taste Lenses
          </button>
        </div>
      )}
      {(error || analysisError) && (
        <div className="mt-4 sm:mt-6 space-y-2 px-2">
          {error && (
            <p className="text-red-600 text-xs sm:text-sm text-center font-light">{error}</p>
          )}
          {analysisError && (
            <p className="text-red-600 text-xs sm:text-sm text-center font-light">{analysisError}</p>
          )}
        </div>
      )}
    </div>
  );
}
