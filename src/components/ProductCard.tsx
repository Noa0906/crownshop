import { useNavigate } from "react-router";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index: number;
}

function formatPrice(price: number) {
  return price.toLocaleString("ko-KR") + "원";
}

function categoryGlow(category: string): string {
  switch (category) {
    case "브롤스타즈":
      return "group-hover:shadow-amber-500/[0.06]";
    case "로블록스":
      return "group-hover:shadow-emerald-500/[0.06]";
    case "카톡":
      return "group-hover:shadow-yellow-400/[0.06]";
    case "디스코드":
      return "group-hover:shadow-indigo-500/[0.06]";
    default:
      return "";
  }
}

function categoryBorder(category: string): string {
  switch (category) {
    case "브롤스타즈":
      return "group-hover:border-amber-500/20";
    case "로블록스":
      return "group-hover:border-emerald-500/20";
    case "카톡":
      return "group-hover:border-yellow-400/20";
    case "디스코드":
      return "group-hover:border-indigo-500/20";
    default:
      return "";
  }
}

function categoryDot(category: string): string {
  switch (category) {
    case "브롤스타즈":
      return "bg-amber-400";
    case "로블록스":
      return "bg-emerald-400";
    case "카톡":
      return "bg-yellow-400";
    case "디스코드":
      return "bg-indigo-400";
    default:
      return "bg-white/40";
  }
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={() => navigate(`/about/${product.id}`)}
      className={`group relative flex flex-col text-left w-full cursor-pointer rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-2xl hover:-translate-y-1 ${categoryGlow(product.category)} ${categoryBorder(product.category)}`}
    >
      {/* Category dot + label */}
      <div className="flex items-center gap-2.5 mb-5">
        <span className={`h-1.5 w-1.5 rounded-full ${categoryDot(product.category)}`} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/25">
          {product.category}
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-bold text-white/80 leading-snug mb-auto">
        {product.name}
      </h3>

      {/* Bottom row: price + arrow */}
      <div className="flex items-end justify-between mt-6 pt-4 border-t border-white/[0.04]">
        <span className="text-xl font-extrabold text-white/90 tracking-tight">
          {formatPrice(product.price)}
        </span>
        <span className="text-[11px] font-medium text-white/15 group-hover:text-white/40 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
          자세히 →
        </span>
      </div>
    </motion.button>
  );
}
