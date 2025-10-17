import { GoogleGenerativeAI } from '@google/generative-ai';
import { tasteProfiles } from '../data/tasteProfiles';
import { analysisPrompts } from '../data/analysisPrompts';

// Initialize Gemini with API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log('API Key loaded:', apiKey ? 'Yes (length: ' + apiKey.length + ')' : 'No - MISSING!');
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Convert File to base64 string
 */
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Analyze outfit with Gemini Vision for a single taste profile
 */
async function analyzeWithProfile(imageBase64, mimeType, profileId) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = analysisPrompts[profileId];

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: mimeType,
          data: imageBase64
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    // Extract JSON from response (handle potential markdown wrapping)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const analysis = JSON.parse(jsonText);

    return {
      profile: tasteProfiles[profileId],
      analysis: analysis
    };
  } catch (error) {
    console.error(`Error analyzing with ${profileId} profile:`, error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);

    // Return fallback analysis
    return {
      profile: tasteProfiles[profileId],
      analysis: {
        score: 5,
        overall: `Unable to complete analysis. Error: ${error.message}`,
        working: ["Analysis temporarily unavailable"],
        adjust: ["Please try uploading the image again"],
        principle: "Technical difficulties prevented analysis"
      }
    };
  }
}

/**
 * Main analysis function - analyzes outfit through all 3 taste profiles
 */
export const analyzeOutfit = async (imageFile) => {
  try {
    // Convert image to base64
    const imageBase64 = await fileToBase64(imageFile);
    const mimeType = imageFile.type;

    // Analyze with all three profiles in parallel
    const analyses = await Promise.all([
      analyzeWithProfile(imageBase64, mimeType, 'minimalist'),
      analyzeWithProfile(imageBase64, mimeType, 'maximalist'),
      analyzeWithProfile(imageBase64, mimeType, 'balanced')
    ]);

    // Check if any profile failed (partial failure detection)
    const hasPartialFailure = analyses.some(result => {
      const analysis = result.analysis;
      // Detect fallback error responses by checking for score 5 and error message patterns
      return (
        analysis.score === 5 &&
        (analysis.overall.includes('Unable to') ||
         analysis.overall.includes('Error:') ||
         analysis.working[0] === 'Analysis temporarily unavailable')
      );
    });

    if (hasPartialFailure) {
      console.error('Partial API failure detected - one or more profiles failed');
      throw new Error('One or more taste profiles failed to analyze the outfit. Please try again.');
    }

    return analyses;
  } catch (error) {
    console.error('Error in analyzeOutfit:', error);

    // Re-throw the error so App.jsx can handle it
    throw error;
  }
};
