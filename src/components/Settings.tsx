import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type SelectedView = 'idle' | 'awake' | 'chat' | 'settings';
type Language = 'english' | 'portuguese' | 'spanish';
type FontSize = 'small' | 'medium' | 'large';

const STYLES = {
  container:
    'absolute bg-cyan-800/60 bottom-0 left-0 right-0 top-10 rounded-lg overflow-hidden text-stone-900',
  contentWrapper:
    'text-left bg-white/30 backdrop-blur-sm shadow-md border-2 border-white/10 p-4 space-y-4 h-full overflow-y-auto',
  header: 'flex justify-between items-center mb-4',
  title: 'font-semibold text-black text-shadow-md text-lg',
  closeButton:
    'p-0 text-black bg-transparent border-transparent hover:opacity-70 transition-opacity',
  section: 'space-y-1 bg-white/40 p-3 rounded-md shadow-md',
  label: 'block font-medium text-sm',
  select:
    'w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50',
  optionText: 'text-gray-900',
  toggleLabel: 'flex items-center justify-between font-medium text-sm',
  toggleButton: (isActive: boolean) =>
    `relative border-slate-400 inline-flex h-6 w-10 items-center rounded-full transition-colors ${
      isActive ? 'bg-white/60' : 'bg-white/30'
    }`,
  toggleSlider: (isActive: boolean) =>
    `inline-block h-4 w-4 transform rounded-full bg-slate-500 transition-transform ${
      isActive ? 'translate-x-2' : '-translate-x-2'
    }`,
  description: 'text-xs',
  footerContainer: 'flex justify-end pt-3',
  saveButton: 'px-6 py-2 rounded-md text-sm font-medium transition-colors',
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className={STYLES.section}>
      <label className={STYLES.label}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={STYLES.select}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className={STYLES.optionText}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

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
  const [fontSize, setFontSize] = useState<FontSize>('medium');
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

  const handleClose = () => setSelectedView('awake');

  return (
    <div className={STYLES.container}>
      <div className={STYLES.contentWrapper}>
        <div className={STYLES.header}>
          <h3 className={STYLES.title}>Settings</h3>
          <button
            onClick={handleClose}
            className={STYLES.closeButton}
            aria-label="Close settings"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <SelectField
          label="Language"
          value={language}
          onChange={(val) => setLanguage(val as Language)}
          options={[
            { value: 'english', label: 'English' },
            { value: 'portuguese', label: 'Portuguese' },
            { value: 'spanish', label: 'Spanish' },
          ]}
        />

        <SelectField
          label="Font Size"
          value={fontSize}
          onChange={(val) => setFontSize(val as FontSize)}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ]}
        />

        <ToggleField
          label="Reduce Motion"
          description="Reduces animations and visual effects"
          isActive={motionReduction}
          onChange={setMotionReduction}
        />

        <ToggleField
          label="Sound Effects"
          description="Enable audio feedback and notification sounds"
          isActive={soundEffects}
          onChange={setSoundEffects}
        />

        <div className={STYLES.footerContainer}>
          <button onClick={handleClose} className={STYLES.saveButton}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
