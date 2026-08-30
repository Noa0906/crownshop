import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { X, CreditCard, Check, Loader2, ArrowLeft } from "lucide-react";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

function formatPrice(price: number) {
  return price.toLocaleString("ko-KR") + "원";
}

type Step = "review" | "payment" | "processing" | "complete";

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("review");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  if (!open) return null;

  const handlePayment = () => {
    if (!selectedPayment) return;
    setStep("processing");
    setTimeout(() => {
      setStep("complete");
    }, 2000);
  };

  const handleClose = () => {
    if (step === "complete") {
      clearCart();
    }
    setStep("review");
    setSelectedPayment(null);
    onClose();
  };

  const paymentMethods = [
    { id: "card", name: "신용/체크카드", desc: "모든 카드 결제 지원" },
    { id: "transfer", name: "계좌이체", desc: "실시간 계좌이체" },
    { id: "kakaopay", name: "카카오페이", desc: "간편결제" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.1] bg-[#0a0a0a] shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/50 transition-all hover:bg-white/[0.15] hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {step === "payment" && (
              <button
                onClick={() => setStep("review")}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white/70 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold text-white/90">
                {step === "review" && "주문 확인"}
                {step === "payment" && "결제 방법"}
                {step === "processing" && "결제 처리 중"}
                {step === "complete" && "결제 완료"}
              </h2>
              <p className="text-xs text-white/30 mt-1">
                {step === "review" && "주문 내용을 확인해 주세요."}
                {step === "payment" && "결제 방법을 선택해 주세요."}
                {step === "processing" && "잠시만 기다려 주세요."}
                {step === "complete" && "결제가 성공적으로 처리되었습니다."}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Review step */}
          {step === "review" && (
            <div className="flex flex-col gap-4">
              {/* Items */}
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white/70 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-white/25 mt-0.5">
                        {item.product.category} · 수량 {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-white/60 shrink-0 ml-4">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-4 mt-1">
                <span className="text-sm text-white/40">결제 금액</span>
                <span className="text-xl font-extrabold text-white">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={() => setStep("payment")}
                className="w-full rounded-2xl bg-white px-6 py-4 text-sm font-bold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] cursor-pointer mt-2"
              >
                결제 진행
              </button>
            </div>
          )}

          {/* Payment step */}
          {step === "payment" && (
            <div className="flex flex-col gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`flex items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all cursor-pointer ${
                    selectedPayment === method.id
                      ? "bg-white/[0.08] border-white/[0.2] shadow-lg shadow-white/5"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    selectedPayment === method.id
                      ? "bg-white/10 text-white"
                      : "bg-white/[0.04] text-white/30"
                  }`}>
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white/80">{method.name}</p>
                    <p className="text-xs text-white/30 mt-0.5">{method.desc}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </button>
              ))}

              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-4 mt-3">
                <span className="text-sm text-white/40">결제 금액</span>
                <span className="text-xl font-extrabold text-white">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedPayment}
                className={`w-full rounded-2xl px-6 py-4 text-sm font-bold transition-all mt-2 cursor-pointer ${
                  selectedPayment
                    ? "bg-white text-black hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98]"
                    : "bg-white/[0.06] text-white/20 cursor-not-allowed"
                }`}
              >
                {formatPrice(totalPrice)} 결제하기
              </button>
            </div>
          )}

          {/* Processing step */}
          {step === "processing" && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="h-10 w-10 text-white/30 animate-spin" />
              <p className="text-sm text-white/40">결제를 처리하고 있습니다…</p>
            </div>
          )}

          {/* Complete step */}
          {step === "complete" && (
            <div className="flex flex-col items-center justify-center py-10 gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Check className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white/90">결제가 완료되었습니다</p>
                <p className="text-sm text-white/30 mt-2">
                  구매하신 상품은 마이페이지에서 확인하실 수 있습니다.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-white/90 active:scale-[0.98] cursor-pointer mt-2"
              >
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
