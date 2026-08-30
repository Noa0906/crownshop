import type { Product } from "@/data/products";
import { X, ShoppingCart, Plus, Check } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

function formatPrice(price: number) {
  return price.toLocaleString("ko-KR") + "원";
}

function categoryAccent(category: string): string {
  switch (category) {
    case "브롤스타즈":
      return "bg-gradient-to-r from-amber-500 to-orange-500";
    case "로블록스":
      return "bg-gradient-to-r from-emerald-500 to-teal-500";
    case "카톡":
      return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    case "디스코드":
      return "bg-gradient-to-r from-indigo-500 to-purple-500";
    default:
      return "bg-gradient-to-r from-white/40 to-white/20";
  }
}

export default function ProductDetail({ product, onClose, onAddToCart, isInCart }: ProductDetailProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.1] bg-[#0a0a0a] shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/50 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video section */}
        {product.videoUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl bg-black">
            <div className={`absolute inset-0 ${categoryAccent(product.category)} opacity-10`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <iframe
                  src={product.videoUrl}
                  title={`${product.name} 영상`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative aspect-video w-full rounded-t-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-white/15">
              <ShoppingCart className="h-12 w-12" />
              <span className="text-sm">상품 준비 중</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-6 p-6 sm:p-8">
          {/* Category badge */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/50">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {product.name}
          </h2>

          {/* Description */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
            <p className="text-sm leading-7 text-white/50">
              {product.description}
            </p>
          </div>

          {/* Price + Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div>
              <p className="text-xs text-white/30 mb-1">가격</p>
              <p className="text-3xl font-extrabold text-white tracking-tight">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onAddToCart(product)}
                className={`flex items-center justify-center gap-2.5 rounded-2xl border px-6 py-4 text-sm font-bold transition-all active:scale-[0.98] cursor-pointer ${
                  isInCart
                    ? "border-white/[0.2] bg-white/[0.08] text-white/70"
                    : "border-white/[0.1] bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:border-white/[0.2] hover:text-white/80"
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="h-4.5 w-4.5" />
                    장바구니 담김
                  </>
                ) : (
                  <>
                    <Plus className="h-4.5 w-4.5" />
                    장바구니
                  </>
                )}
              </button>
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] cursor-pointer"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
