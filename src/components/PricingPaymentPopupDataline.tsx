import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Copy, X } from 'lucide-react';

interface SelectedPlan {
  name: string;
  price: string;
}

interface PricingPaymentPopupDatalineProps {
  isOpen: boolean;
  plan: SelectedPlan | null;
  onClose: () => void;
}

type SuccessState = 'none' | 'card_input' | 'card' | 'usdt';
type PaymentMethodId = 'usdt' | 'card_ru' | 'card_intl';
type CardSubmethodId = 'card' | 'sbp' | 'qr' | 'revolut' | 'link';

const PAYMENT_ADDRESS = 'T9yF8hQpA5vW2xZ1sE4dC7bN0mK3jL6uI9oP';

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const formatRoublePrice = (amount: number) => `${new Intl.NumberFormat('ru-RU').format(amount)} ₽`;

export default function PricingPaymentPopupDataline({
  isOpen,
  plan,
  onClose,
}: PricingPaymentPopupDatalineProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('card_intl');
  const [successState, setSuccessState] = useState<SuccessState>('none');
  const [subMethod, setSubMethod] = useState<CardSubmethodId>('card');
  const [showQR, setShowQR] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const basePrice = useMemo(() => Number.parseInt(plan?.price ?? '0', 10), [plan?.price]);
  const planLabel = 'MAIN LAB X26';

  const methods: Array<{ id: PaymentMethodId; label: string; note: string }> = [
    { id: 'usdt', label: 'USDT', note: '' },
    { id: 'card_ru', label: 'РУ-КАРТЫ', note: '' },
    { id: 'card_intl', label: 'EU-КАРТЫ', note: '' },
  ];

  const getPrice = () => {
    if (!basePrice) return '';
    if (selectedMethod === 'usdt') return `${Math.round(basePrice * 0.95)} USDT`;
    if (selectedMethod === 'card_intl') return `${basePrice} €`;
    return formatRoublePrice(basePrice * 100);
  };

  const resetState = () => {
    setSelectedMethod('card_intl');
    setSuccessState('none');
    setSubMethod('card');
    setShowQR(false);
    setAddressCopied(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleInitialPay = () => {
    if (selectedMethod === 'usdt') {
      setShowQR(true);
      return;
    }
    setSuccessState('card_input');
    setSubMethod('card');
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_ADDRESS);
      setAddressCopied(true);
      window.setTimeout(() => setAddressCopied(false), 1600);
    } catch {
      setAddressCopied(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const selectorClass = (isActive: boolean) => cn(
    'inline-flex min-h-[52px] items-center justify-center border px-3 text-center font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.26em] transition-all duration-150 md:min-h-[54px] md:text-[12px]',
    isActive
      ? 'border-black bg-black text-white'
      : 'border-black bg-white text-black hover:bg-[#f2f2f2]',
  );

  const fieldClass =
    'w-full border border-black/12 bg-[#f4f4f4] px-3 py-3.5 font-mono text-[12px] text-black outline-none transition-colors placeholder:text-black/34 focus:border-black focus:bg-white md:px-3.5 md:py-4 md:text-[13px]';

  const mutedLabelClass =
    'font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-black/42';

  const primaryButtonClass =
    'inline-flex h-[48px] min-w-[150px] items-center justify-center bg-black px-8 font-mono text-[12px] font-semibold lowercase tracking-[0.18em] text-white transition-colors hover:bg-[#222]';

  return (
    <div
      className="fixed inset-y-0 left-0 right-0 z-[10030] flex items-end justify-center bg-[#f1f1f1]/90 px-2 pb-[calc(env(safe-area-inset-bottom,0px)+24px)] pt-3 backdrop-blur-[2px] sm:p-4 md:left-[18%] md:items-center md:p-4"
      onClick={handleClose}
    >
      <motion.div
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative flex max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-1.5rem)] w-full max-w-[500px] flex-col overflow-y-auto border border-black bg-white p-6 pt-8 text-left font-mono text-black shadow-none md:h-[642px] md:max-h-[calc(100dvh-2rem)] md:p-8"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center bg-white text-black transition-opacity hover:opacity-55 md:right-6 md:top-5"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" strokeWidth={2.2} />
        </button>

        <AnimatePresence mode="wait">
          {successState === 'card' || successState === 'usdt' ? (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-7 text-center md:py-10">
              <div className="mx-auto flex h-32 w-32 items-center justify-center border border-black bg-white md:h-36 md:w-36">
                <CheckCircle2 className="h-16 w-16 text-black" strokeWidth={1.5} />
              </div>
              <h3 className="mt-8 font-sans text-[28px] font-black uppercase leading-none tracking-[0.02em] text-black md:text-3xl">
                {successState === 'usdt' ? 'СПАСИБО ЗА ПОКУПКУ!' : 'СПАСИБО ЗА ЗАКАЗ!'}
              </h3>
              <p className="mx-auto mt-5 max-w-[25rem] font-sans text-sm font-normal leading-relaxed text-black/60">
                {successState === 'usdt' ? (
                  <>
                    Мы свяжемся с вами в Telegram в течение суток с подтверждением оплаты.
                    <br />
                    <br />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70">заказ #{plan.price}{plan.name.replace(/\s+/g, '').slice(0, 4)}</span>
                  </>
                ) : (
                  'Оплата прошла успешно. Мы скоро свяжемся с вами в Telegram с подтверждением и доступом.'
                )}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className={`${primaryButtonClass} mt-8 w-full md:mt-10`}
              >
                закрыть
              </button>
            </motion.div>
          ) : successState === 'card_input' ? (
            <motion.div key="card-input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <div className="mb-7 md:mb-8">
                <div className={mutedLabelClass}>оплата картой</div>
                <h2 className="mt-4 font-sans text-[28px] font-black uppercase leading-none tracking-[0.02em] text-black md:text-[34px]">БЕЗОПАСНАЯ ОПЛАТА</h2>
                <div className="mt-2 text-[10px] font-mono font-medium uppercase tracking-[0.28em] text-black/42">
                  {selectedMethod === 'card_intl' ? 'EU-КАРТЫ' : 'РУ-КАРТЫ'}
                </div>
              </div>

              <div className="mb-7 border-b border-black pb-6 md:mb-8">
                <div className={mutedLabelClass}>к оплате</div>
                <div className="mt-1 font-sans text-[38px] font-black tracking-[0.02em] text-black md:text-[44px]">{getPrice()}</div>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2 md:gap-3">
                {(selectedMethod === 'card_intl'
                  ? [
                      { id: 'revolut', label: 'Revolut' },
                      { id: 'link', label: 'Link' },
                      { id: 'card', label: 'Карта' },
                    ]
                  : [
                      { id: 'sbp', label: 'СБП' },
                      { id: 'qr', label: 'QR' },
                      { id: 'card', label: 'Карта' },
                    ]
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSubMethod(option.id as CardSubmethodId)}
                    className={selectorClass(subMethod === option.id)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              {subMethod === 'card' ? (
                <div className="mb-6 flex flex-col gap-3 border border-black/12 bg-white p-4 md:gap-4 md:p-6">
                  <input
                    type="text"
                    placeholder="Номер карты"
                    className={fieldClass}
                  />
                  <div className="flex gap-3 md:gap-4">
                    <input
                      type="text"
                      placeholder="ММ/ГГ"
                      className={fieldClass}
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className={fieldClass}
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6 flex h-[132px] items-center justify-center border border-black/20 bg-[#f4f4f4] p-4 text-center font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.24em] text-black/46 md:h-[156px] md:p-6 md:text-[11px]">
                  {subMethod === 'sbp'
                    ? 'ОТКРЫТЬ ПРИЛОЖЕНИЕ БАНКА'
                    : subMethod === 'qr'
                      ? 'СКАНИРОВАТЬ QR-КОД'
                      : subMethod === 'revolut'
                        ? 'ПЕРЕЙТИ В REVOLUT APP'
                        : subMethod === 'link'
                          ? 'ПЕРЕЙТИ В LINK.COM'
                          : 'ПЕРЕХОД К ОПЛАТЕ...'}
                </div>
              )}

              <div className="mt-auto flex flex-col gap-6 pt-4 md:gap-8 md:pt-6">
                <button
                  type="button"
                  onClick={() => setSuccessState('card')}
                  className={`${primaryButtonClass} w-full whitespace-nowrap`}
                >
                  оплатить
                </button>
                <button
                  type="button"
                  onClick={() => setSuccessState('none')}
                  className="mx-auto flex items-center gap-2 pb-4 text-[11px] font-mono font-medium tracking-[0.2em] text-black/46 transition-colors hover:text-black md:pb-6"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> вернуться назад
                </button>
              </div>
            </motion.div>
          ) : !showQR ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <div className="mb-5 pr-8 md:mb-4">
                <h2 className="mt-4 font-sans text-[29px] font-black uppercase leading-none tracking-[0.02em] text-black md:text-[34px]">ОПЛАТА ЗАКАЗА</h2>
                <div className="mt-2 text-[10px] font-mono font-medium uppercase tracking-[0.28em] text-black/42">{planLabel}</div>
              </div>

              <div className="mb-5 grid grid-cols-[1fr_auto] items-end gap-4 border-b border-black pb-4 md:mb-5">
                <div>
                  <div className={mutedLabelClass}>итого к оплате</div>
                </div>
                <div className="text-right font-sans text-[40px] font-black tracking-[0.03em] text-black md:text-[44px]">{getPrice()}</div>
              </div>

              <div className="mb-5 text-left md:mb-5">
                <div className={`mb-2 md:mb-3 ${mutedLabelClass}`}>способ оплаты</div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {methods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={selectorClass(selectedMethod === method.id)}
                    >
                      <span>{method.label}</span>
                      <span className={cn('sr-only', selectedMethod === method.id ? 'text-white' : 'text-black/32')}>
                        {method.note}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-4 sm:flex-row md:mb-3 md:gap-7">
                <div className="min-w-0 flex-1">
                  <div className={`mb-1.5 truncate md:mb-2 ${mutedLabelClass}`}>e-mail</div>
                  <input
                    type="email"
                    placeholder="mail@.com"
                    className={fieldClass}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`mb-1.5 truncate md:mb-2 ${mutedLabelClass}`}>telegram</div>
                  <input
                    type="text"
                    placeholder="username"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mb-5 mt-4 flex flex-col gap-1.5 md:mb-6 md:mt-2 md:gap-2">
                <div className={`truncate ${mutedLabelClass}`}>комментарий</div>
                <input
                  type="text"
                  placeholder="..."
                  className="w-full border-b border-black/14 bg-transparent pb-2 font-mono text-[12px] text-black outline-none transition-all placeholder:text-black/34 focus:border-black md:text-[13px]"
                />
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-4 md:pt-2">
                <a
                  href="https://join.aimindset.org/waitlist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[9px] font-mono font-medium uppercase tracking-[0.24em] text-black/42 underline decoration-transparent underline-offset-4 transition-colors hover:text-black hover:decoration-black md:text-[10px]"
                >
                  связаться с нами
                </a>
                <button
                  type="button"
                  onClick={handleInitialPay}
                  className={`${primaryButtonClass} whitespace-nowrap`}
                >
                  оплатить
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col text-left">
              <div className="mb-7 md:mb-8">
                <div className={mutedLabelClass}>оплата usdt</div>
                <h2 className="mt-4 font-sans text-[25px] font-black uppercase leading-[0.96] tracking-[0.02em] text-black md:text-3xl">
                  ПЕРЕВЕДИТЕ {getPrice()}
                  <br />
                  ПО АДРЕСУ:
                </h2>
              </div>

              <div className="mb-6 flex justify-center border border-black/12 bg-[#f4f4f4] p-5 md:p-6">
                <div className="flex h-40 w-40 items-center justify-center border border-black bg-white text-center font-mono text-[10px] font-medium tracking-[0.24em] text-black/36 md:h-48 md:w-48">
                  QR CODE
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="mb-8 flex w-full items-center justify-between border border-black bg-white p-3 font-mono text-xs font-semibold text-black transition-colors hover:bg-[#f4f4f4] md:p-4 md:text-sm"
              >
                <span className="mr-4 truncate tracking-[0.05em]">{PAYMENT_ADDRESS}</span>
                <span className="flex shrink-0 items-center gap-2 bg-black px-2 py-1 text-[10px] tracking-[0.16em] text-white md:px-3 md:py-1.5 md:text-xs">
                  <Copy className="h-3.5 w-3.5" />
                  {addressCopied ? 'copied' : 'copy'}
                </span>
              </button>

              <div className="mt-auto flex flex-col gap-3 md:gap-4">
                <button
                  type="button"
                  onClick={() => setSuccessState('usdt')}
                  className={`${primaryButtonClass} w-full`}
                >
                  я оплатил
                </button>
                <button
                  type="button"
                  onClick={() => setShowQR(false)}
                  className="w-full text-center text-[11px] font-medium tracking-[0.2em] text-black/42 transition-colors hover:text-black"
                >
                  вернуться к выбору
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
