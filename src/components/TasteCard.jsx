import { Check, ArrowRight, Sparkles, Palette, Scale } from 'lucide-react';

// Icon mapping
const iconMap = {
  Sparkles,
  Palette,
  Scale
};

export default function TasteCard({ profile, analysis }) {
  const IconComponent = iconMap[profile.iconName];

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-600 border-emerald-600';
    if (score >= 5) return 'text-amber-600 border-amber-600';
    return 'text-rose-600 border-rose-600';
  };

  return (
    <div className="bg-white border border-neutral-200 p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 hover:border-neutral-400 transition-all duration-300">
      {/* Header */}
      <div>
        {IconComponent && (
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 mb-3 sm:mb-4 text-black stroke-[1.5]" />
        )}
        <h3 className="text-xl sm:text-2xl font-normal text-black mb-2 tracking-wide">{profile.name}</h3>
        <p className="text-sm text-neutral-600 font-light leading-relaxed">{profile.description}</p>
      </div>

      {/* Score */}
      <div className="flex items-center justify-center py-4 sm:py-6">
        <div className={`text-5xl sm:text-6xl font-light ${getScoreColor(analysis.score)} border-2 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center`}>
          {analysis.score}
        </div>
      </div>

      {/* Overall */}
      <div className="border-t border-neutral-200 pt-6">
        <h4 className="text-xs font-normal text-black uppercase tracking-widest mb-3">
          Overall
        </h4>
        <p className="text-black font-light leading-relaxed">{analysis.overall}</p>
      </div>

      {/* What's Working */}
      <div className="border-t border-neutral-200 pt-6">
        <h4 className="text-xs font-normal text-black uppercase tracking-widest mb-3">
          What's Working
        </h4>
        <ul className="space-y-2">
          {analysis.working.map((point, idx) => (
            <li key={idx} className="text-sm text-neutral-700 flex gap-3 font-light leading-relaxed">
              <Check className="w-4 h-4 text-emerald-600 stroke-[1.5] flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What to Adjust */}
      <div className="border-t border-neutral-200 pt-6">
        <h4 className="text-xs font-normal text-black uppercase tracking-widest mb-3">
          What to Adjust
        </h4>
        <ul className="space-y-2">
          {analysis.adjust.map((point, idx) => (
            <li key={idx} className="text-sm text-neutral-700 flex gap-3 font-light leading-relaxed">
              <ArrowRight className="w-4 h-4 text-amber-600 stroke-[1.5] flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Principle */}
      <div className="border-t border-neutral-200 pt-6">
        <h4 className="text-xs font-normal text-black uppercase tracking-widest mb-3">
          Key Principle
        </h4>
        <p className="text-sm text-neutral-700 font-light leading-relaxed italic">{analysis.principle}</p>
      </div>
    </div>
  );
}
