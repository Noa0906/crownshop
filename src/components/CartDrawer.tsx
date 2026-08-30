import { useCart } from "@/hooks/use-cart";
import { X, Trash2, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

function formatPrice(price: number) {
  return price.toLocaleString("ko-KR") + "원";
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, totalItems, totalPrice } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Drawer */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/[0.08] shadow-2xl shadow-black/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-white/40" />
            <h2 className="text-lg font-bold text-white/90">장바구니</h2>
            {totalItems > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/70">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white/70 transition-all cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/20 gap-3">
              <ShoppingBag className="h-10 w-10" />
              <p className="text-sm">장바구니가 비어 있습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white/80 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-white/30 mt-1">
                      {item.product.category} · 수량 {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-bold text-white/70">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-white/30 hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.06] px-6 py-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-white/40">합계</span>
              <span className="text-xl font-extrabold text-white">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full rounded-2xl bg-white px-6 py-4 text-sm font-bold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] cursor-pointer"
            >
              결제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
