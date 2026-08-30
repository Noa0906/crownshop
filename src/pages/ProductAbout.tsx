import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { ArrowLeft, Crown, ShoppingCart, Check, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

function formatPrice(price: number) {
  return price.toLocaleString("ko-KR") + "원";
}

function categoryAccent(category: string): string {
  switch (category) {
    case "브롤스타즈":
      return "from-amber-500 to-orange-500";
    case "로블록스":
      return "from-emerald-500 to-teal-500";
    case "카톡":
      return "from-yellow-400 to-yellow-600";
    case "디스코드":
      return "from-indigo-500 to-purple-500";
    default:
      return "from-white/40 to-white/20";
  }
}

export default function ProductAbout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items } = useCart();

  const product = products.find((p) => p.id === id);
  const isInCart = product ? items.some((i) => i.product.id === product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-lg mb-4">상품을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/40 transition-all hover:bg-white/[0.12] hover:text-white/70 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <Crown className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-bold text-white/70">Crown Shop</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Video + Info */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-white/[0.08]"
            >
              {product.videoUrl ? (
                <iframe
                  src={product.videoUrl}
                  title={`${product.name} 영상`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
                  <p className="text-sm text-white/20">영상 준비 중</p>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mb-4">
                상품 설명
              </h2>
              <p className="text-[15px] leading-[1.85] text-white/45">
                {product.description}
              </p>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap gap-6 pt-2"
            >
              <div className="flex items-center gap-2 text-white/20">
                <Shield className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">안전한 거래</span>
              </div>
              <div className="flex items-center gap-2 text-white/20">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">즉시 배송</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Purchase panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:sticky lg:top-24"
            >
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
                {/* Category */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/35 mb-5">
                  {product.category}
                </span>

                {/* Name */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                  {product.name}
                </h1>

                {/* Price */}
                <p className="text-3xl font-extrabold text-white tracking-tight mb-7">
                  {formatPrice(product.price)}
                </p>

                {/* Accent line */}
                <div className={`h-px w-full bg-gradient-to-r ${categoryAccent(product.category)} opacity-20 mb-7`} />

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      addItem(product);
                      toast.success("장바구니에 추가되었습니다", {
                        style: {
                          background: "#1a1a1a",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.8)",
                        },
                      });
                    }}
                    className={`w-full rounded-xl py-3.5 text-sm font-bold transition-all active:scale-[0.98] cursor-pointer ${
                      isInCart
                        ? "bg-white/[0.08] text-white/60 border border-white/[0.12]"
                        : "bg-white/[0.05] text-white/50 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white/70 hover:border-white/[0.15]"
                    }`}
                  >
                    {isInCart ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4" /> 장바구니 담김
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" /> 장바구니 추가
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      addItem(product);
                      toast.success("구매 절차를 진행합니다", {
                        style: {
                          background: "#1a1a1a",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.8)",
                        },
                      });
                    }}
                    className="w-full rounded-xl bg-white py-3.5 text-sm font-bold text-black transition-all hover:bg-white/90 active:scale-[0.98] cursor-pointer"
                  >
                    구매하기
                  </button>
                </div>

                {/* Extra info */}
                <p className="text-[11px] text-white/15 text-center mt-5 leading-relaxed">
                  결제 완료 후 즉시 배송 · 환불 문의는 카카오톡 채널
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
