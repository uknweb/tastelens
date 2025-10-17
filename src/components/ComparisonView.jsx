import TasteCard from './TasteCard';

export default function ComparisonView({ uploadedImage, analyses, onReset }) {
  // Extract outfit items from the first analysis (all should identify similar items)
  const outfitItems = analyses[0]?.analysis?.items || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      {/* Uploaded Image */}
      <div className="mb-8 sm:mb-12 text-center fade-in">
        <button
          onClick={onReset}
          className="font-serif text-3xl sm:text-4xl font-normal text-black mb-6 sm:mb-10 tracking-wide hover:opacity-70 transition-opacity duration-300 cursor-pointer"
        >
          Your Outfit
        </button>
        <img
          src={uploadedImage}
          alt="Analyzed outfit"
          className="max-w-full sm:max-w-md lg:max-w-lg mx-auto mb-6 sm:mb-8 px-4 sm:px-0"
        />

        {/* Outfit Breakdown */}
        {outfitItems.length > 0 && (
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-600 font-light">
              {outfitItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="capitalize">{item}</span>
                  {index < outfitItems.length - 1 && (
                    <span className="ml-2 sm:ml-3 text-neutral-400">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Three Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 mt-12 sm:mt-20">
        {analyses.map(({ profile, analysis }, index) => (
          <div key={profile.id} className={`fade-in-delay-${index + 1}`}>
            <TasteCard profile={profile} analysis={analysis} />
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="text-center fade-in px-4">
        <button
          onClick={onReset}
          className="border border-black text-black px-8 sm:px-10 py-3 text-sm sm:text-base font-light tracking-wide hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto"
        >
          Analyze Another Outfit
        </button>
      </div>
    </div>
  );
}
