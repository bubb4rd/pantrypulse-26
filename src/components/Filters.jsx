import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { CUISINES, DIETS, HEALTH, MAX_CALORIES } from "../lib/filters.js";
import { cx } from "../lib/ui.js";

function FilterGroup({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink-900/8 py-4 last:border-b-0 dark:border-cream/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-display text-lg font-bold text-ink-900 dark:text-cream">
          {title}
        </span>
        <CaretDown
          size={18}
          weight="bold"
          className={cx(
            "text-ink-800/50 transition-transform dark:text-cream/50",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function TogglePill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "rounded-full border px-3.5 py-1.5 text-sm font-semibold capitalize transition-colors",
        active
          ? "border-ember-600 bg-ember-600 text-white"
          : "border-ink-900/15 text-ink-800/80 hover:border-ember-500 hover:text-ember-700 dark:border-cream/20 dark:text-cream/75 dark:hover:text-ember-300"
      )}
    >
      {children}
    </button>
  );
}

export default function Filters({ value, onChange, onClear }) {
  const toggle = (key, item) => {
    const set = new Set(value[key]);
    set.has(item) ? set.delete(item) : set.add(item);
    onChange({ ...value, [key]: [...set] });
  };

  const activeCount =
    value.cuisineType.length +
    value.diet.length +
    value.health.length +
    (value.calMin > 0 || value.calMax < MAX_CALORIES ? 1 : 0);

  const progressLeft = (value.calMin / MAX_CALORIES) * 100;
  const progressRight = 100 - (value.calMax / MAX_CALORIES) * 100;

  return (
    <div className="rounded-card border border-ink-900/8 bg-cream/70 p-5 dark:border-cream/10 dark:bg-ink-900/60">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-cream">
          Filters
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-ember-700 hover:underline dark:text-ember-300"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <div className="mt-2">
        <FilterGroup title="Calories">
          <div className="flex items-center justify-between text-sm font-semibold text-ink-800/70 dark:text-cream/70">
            <span>{value.calMin} kcal</span>
            <span>
              {value.calMax}
              {value.calMax >= MAX_CALORIES ? "+" : ""} kcal
            </span>
          </div>
          <div className="relative mt-3 h-5">
            <div className="absolute top-2 h-1 w-full rounded-full bg-ink-900/15 dark:bg-cream/20" />
            <div
              className="absolute top-2 h-1 rounded-full bg-ember-500"
              style={{ left: `${progressLeft}%`, right: `${progressRight}%` }}
            />
            <input
              type="range"
              min="0"
              max={MAX_CALORIES}
              step="50"
              value={value.calMin}
              onChange={(e) =>
                onChange({
                  ...value,
                  calMin: Math.min(Number(e.target.value), value.calMax - 50),
                })
              }
              aria-label="Minimum calories"
              className="range-thumb pointer-events-none absolute top-0 h-5 w-full appearance-none bg-transparent"
            />
            <input
              type="range"
              min="0"
              max={MAX_CALORIES}
              step="50"
              value={value.calMax}
              onChange={(e) =>
                onChange({
                  ...value,
                  calMax: Math.max(Number(e.target.value), value.calMin + 50),
                })
              }
              aria-label="Maximum calories"
              className="range-thumb pointer-events-none absolute top-0 h-5 w-full appearance-none bg-transparent"
            />
          </div>
        </FilterGroup>

        <FilterGroup title="Cuisine">
          <div className="flex flex-wrap gap-2">
            {CUISINES.map((c) => (
              <TogglePill
                key={c.value}
                active={value.cuisineType.includes(c.value)}
                onClick={() => toggle("cuisineType", c.value)}
              >
                {c.label}
              </TogglePill>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Diet">
          <div className="flex flex-wrap gap-2">
            {DIETS.map((d) => (
              <TogglePill
                key={d.value}
                active={value.diet.includes(d.value)}
                onClick={() => toggle("diet", d.value)}
              >
                {d.label}
              </TogglePill>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Dietary needs" defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {HEALTH.map((h) => (
              <TogglePill
                key={h.value}
                active={value.health.includes(h.value)}
                onClick={() => toggle("health", h.value)}
              >
                {h.label}
              </TogglePill>
            ))}
          </div>
        </FilterGroup>
      </div>
    </div>
  );
}
