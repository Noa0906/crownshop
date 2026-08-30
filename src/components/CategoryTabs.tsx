import { categories, type Category } from "@/data/products";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  active: Category;
  onChange: (category: Category) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200",
            active === cat
              ? "bg-white text-black shadow-lg shadow-white/10"
              : "bg-white/[0.06] text-white/50 hover:bg-white/[0.12] hover:text-white/80"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
