import { useState, useEffect } from 'react';

type SelectedView = 'idle' | 'awake' | 'chat' | 'settings';
type Language = 'english' | 'portuguese' | 'spanish';

const langOptions = [
  { value: 'english', label: 'English' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'spanish', label: 'Spanish' },
];

const STYLES = {
  contentWrapper:
    'text-left space-y-4 h-full overflow-y-auto text-stone-200 p-2',
  section: 'space-y-1 bg-slate-800/20 p-3 rounded-lg shadow-md',
  label: 'block font-medium text-sm',
  select:
    'w-full px-3 py-2 bg-white/20 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50',
  toggleLabel: 'flex items-center justify-between font-medium text-sm',
  toggleButton: (isActive: boolean) =>
    `relative border-slate-700 inline-flex h-6 w-10 items-center rounded-full transition-colors ${
      isActive ? 'bg-orange-400' : 'bg-white/20'
    }`,
  toggleSlider: (isActive: boolean) =>
    `inline-block h-4 w-4 transform rounded-full bg-slate-700 transition-transform ${
      isActive ? 'translate-x-4' : 'translate-x-1'
    }`,
  description: 'text-xs',
  range:
    'w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-400',
};

interface ToggleFieldProps {
  label: string;
  description: string;
  isActive: boolean;
  onChange: (value: boolean) => void;
}

function ToggleField({
  label,
  description,
  isActive,
  onChange,
}: ToggleFieldProps) {
  return (
    <div className={STYLES.section}>
      <label className={STYLES.toggleLabel}>
        <span>{label}</span>
        <button
          onClick={() => onChange(!isActive)}
          className={STYLES.toggleButton(isActive)}
          aria-pressed={isActive}
          aria-label={label}
        >
          <span className={STYLES.toggleSlider(isActive)} />
        </button>
      </label>
      <p className={STYLES.description}>{description}</p>
    </div>
  );
}

export default function Settings({
  setSelectedView,
}: {
  setSelectedView: (view: SelectedView) => void;
}) {
  const [language, setLanguage] = useState<Language>('english');
  const [motionReduction, setMotionReduction] = useState<boolean>(false);
  const [soundEffects, setSoundEffects] = useState<boolean>(true);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedView('awake');
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setSelectedView]);

  return (
    <div className={STYLES.contentWrapper}>
      {/* Language Selector */}
      <div className={STYLES.section}>
        <label htmlFor="language-select" className={STYLES.label}>
          Language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className={STYLES.select}
        >
          {langOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Text Size Adjustment */}
      <div className={STYLES.section}>
        <label
          htmlFor="text-size-input"
          className="flex items-center justify-between font-medium text-sm"
        >
          Text Size
        </label>
        <div className="flex justify-between items-center px-1 gap-1">
          <span className="text-sm">Aa</span>
          <input
            id="text-size-input"
            type="range"
            min={0}
            max={5}
            className={STYLES.range}
            aria-label="Text Size"
          />
          <span className="text-lg">Aa</span>
        </div>
      </div>

      {/* Motion Reduction Toggle */}
      <ToggleField
        label="Reduce Motion"
        description="Reduces animations and visual effects"
        isActive={motionReduction}
        onChange={setMotionReduction}
      />

      {/* Sound Effect Toggle */}
      <ToggleField
        label="Sound Effects"
        description="Enable audio feedback and notification sounds"
        isActive={soundEffects}
        onChange={setSoundEffects}
      />
    </div>
  );
}
