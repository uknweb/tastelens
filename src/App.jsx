import { useState } from 'react';
import Landing from './components/Landing';
import ImageUpload from './components/ImageUpload';
import LoadingState from './components/LoadingState';
import ComparisonView from './components/ComparisonView';
import { analyzeOutfit } from './utils/analyzeOutfit';

export default function App() {
  const [view, setView] = useState('landing');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file) => {
    // Clear any previous errors
    setError(null);

    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Start analysis
    setView('loading');

    try {
      const results = await analyzeOutfit(file);
      setAnalyses(results);
      setView('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      // Stay on landing page and show error
      setView('landing');
      setError(error.message || 'Analysis failed. Please try again.');
    }
  };

  const handleReset = () => {
    setView('landing');
    setUploadedImage(null);
    setImagePreview(null);
    setAnalyses([]);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      {view === 'landing' && (
        <>
          <Landing />
          <ImageUpload onAnalyze={handleAnalyze} analysisError={error} />
        </>
      )}

      {view === 'loading' && <LoadingState />}

      {view === 'results' && (
        <ComparisonView
          uploadedImage={imagePreview}
          analyses={analyses}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
