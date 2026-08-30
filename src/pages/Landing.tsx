import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, type Category } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import { Crown, ShoppingBag, Shield, Zap, Package, ArrowRight } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Landing() {
  const [activeCategory, setActiveCategory] = useState<Category>("전체");
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "전체") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* ===== Fixed background elements ===== */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Top-right warm orb */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-amber-500/[0.02] blur-[160px]" />
        {/* Bottom-left cool orb */}
        <div className="absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.02] blur-[160px]" />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ===== Sticky header ===== */}
      <header className="sticky top-0 z-40 border-b border-white/[0.05] bg-[#050505]/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/15 to-amber-600/10">
              <Crown className="h-4 w-4 text-amber-400/80" />
            </div>
            <span className="text-[15px] font-bold text-white/80 tracking-tight">
              Crown Shop
            </span>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-white/30 transition-all duration-300 hover:bg-white/[0.1] hover:text-white/60 cursor-pointer"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cart.totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black"
              >
                {cart.totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/10 bg-amber-500/[0.05] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400/60">
              <span className="h-1 w-1 rounded-full bg-amber-400/60 animate-pulse" />
              프리미엄 게임 숍
            </span>
          </motion.div>

          {/* Headline — two lines, staggered */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em]"
          >
            <span className="block text-white/95">검증된</span>
            <span className="block text-white/95">
              프리미엄 게임{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  상품
                </span>
                {/* underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-amber-400/40 to-orange-400/20"
                />
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-7 text-[15px] sm:text-base text-white/30 leading-[1.8] max-w-md"
          >
            다양한 카테고리의 엄선된 디지털 상품을 합리적인 가격에.
            <br className="hidden sm:block" />
            빠른 배송과 안전한 결제를 보장합니다.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/5 active:scale-[0.97]"
            >
              상품 둘러보기
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-5 pl-1">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/20">
                <Shield className="h-3 w-3" /> 안전 거래
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/20">
                <Zap className="h-3 w-3" /> 즉시 배송
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/20">
                <Package className="h-3 w-3" /> 검증 완료
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Divider ===== */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ===== Products ===== */}
      <section id="products" className="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white/90 tracking-tight">
                상품 목록
              </h2>
              <p className="mt-1.5 text-[13px] text-white/25">
                {activeCategory === "전체"
                  ? `총 ${filteredProducts.length}개의 상품`
                  : `${activeCategory} · ${filteredProducts.length}개의 상품`}
              </p>
            </div>
          </div>

          {/* Category tabs */}
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, ease }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-white/15"
          >
            <Package className="h-10 w-10 mb-3" />
            <p className="text-sm">해당 카테고리에 등록된 상품이 없습니다.</p>
          </motion.div>
        )}
      </section>

      {/* ===== CTA band ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 sm:px-12 sm:py-12"
        >
          {/* bg accent */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-amber-500/[0.04] blur-[80px]" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-lg sm:text-xl font-bold text-white/80 tracking-tight">
                필요한 상품이 없으신가요?
              </p>
              <p className="mt-2 text-sm text-white/25">
                카카오톡 채널로 문의주시면 맞춤 상품을 안내해 드립니다.
              </p>
            </div>
            <a
              href="#"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/[0.08] px-6 py-3 text-sm font-semibold text-white/50 transition-all duration-300 hover:bg-white/[0.1] hover:text-white/70 hover:border-white/[0.15]"
            >
              문의하기
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Crown className="h-3.5 w-3.5 text-amber-500/30" />
            <span className="text-[13px] font-semibold text-white/20">Crown Shop</span>
          </div>
          <p className="text-[11px] text-white/12">
            © 2026 Crown Shop. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ===== Cart Drawer ===== */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setCartOpen(false)}
      />
    </div>
  );
}
