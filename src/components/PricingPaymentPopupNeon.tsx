import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Copy } from 'lucide-react';
import { WireframePulse } from './WireframePulse';
import {
  GREEN_OUTLINE_CTA_BUTTON_CLASS,
  GREEN_SOLID_CTA_BUTTON_CLASS,
  PAYMENT_SELECTOR_ACTIVE_CLASS,
  PAYMENT_SELECTOR_BASE_CLASS,
  PAYMENT_SELECTOR_IDLE_CLASS,
} from './ctaButtonStyles';

interface SelectedPlan {
  name: string;
  price: string;
}

interface PricingPaymentPopupNeonProps {
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

export default function PricingPaymentPopupNeon({
  isOpen,
  plan,
  onClose,
}: PricingPaymentPopupNeonProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('card_intl');
  const [successState, setSuccessState] = useState<SuccessState>('none');
  const [subMethod, setSubMethod] = useState<CardSubmethodId>('card');
  const [showQR, setShowQR] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const basePrice = useMemo(() => Number.parseInt(plan?.price ?? '0', 10), [plan?.price]);
  const planLabel = plan ? `${plan.name} · MAIN LAB X26` : 'MAIN LAB X26';

  const methods: Array<{ id: PaymentMethodId; label: string }> = [
    { id: 'usdt', label: 'USDT' },
    { id: 'card_ru', label: 'РУ-КАРТЫ' },
    { id: 'card_intl', label: 'ЗАРУБЕЖНЫЕ КАРТЫ' },
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

  return (
    <div
      className="fixed inset-y-0 left-0 right-0 z-[160] flex items-end justify-center bg-black/80 px-2 pb-[calc(env(safe-area-inset-bottom,0px)+32px)] pt-3 backdrop-blur-md sm:p-4 md:left-[18%] md:items-center md:p-4"
      onClick={handleClose}
    >
      <motion.div
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative flex max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-1.5rem)] w-full max-w-[500px] flex-col overflow-y-auto rounded-lg border border-white/10 bg-[#0a0a0a]/95 p-5 pt-8 text-left font-sans text-[#f5f4ef] shadow-[0_0_50px_rgba(141,198,63,0.15)] backdrop-blur-3xl md:max-h-[100dvh] md:-translate-y-3 md:p-8"
        style={{ color: '#f5f4ef' }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-2 z-20 p-2 text-5xl font-light leading-none text-[#bdbdb7] transition-all hover:scale-105 hover:text-white md:right-5 md:top-3"
          aria-label="Закрыть"
        >
          ×
        </button>

        <AnimatePresence mode="wait">
          {successState === 'card' || successState === 'usdt' ? (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 text-center md:py-10">
              <WireframePulse className="mx-auto h-40 w-40 text-[#8DC63F] drop-shadow-[0_0_15px_rgba(141,198,63,0.4)] md:h-44 md:w-44" />
              <h3 className="mt-8 text-xl font-black uppercase tracking-tight text-[#f5f4ef] md:text-2xl" style={{ color: '#f5f4ef' }}>
                {successState === 'usdt' ? 'СПАСИБО ЗА ПОКУПКУ!' : 'СПАСИБО ЗА ЗАКАЗ!'}
              </h3>
              <p className="mt-4 text-sm font-normal leading-relaxed text-[#d8d6cf]">
                {successState === 'usdt' ? (
                  <>
                    Мы свяжемся с вами в Telegram в течение суток с подтверждением оплаты.
                    <br />
                    <br />
                    <span className="text-[#f5f4ef]">ВАШ ЗАКАЗ ПРИНЯТ, НОМЕР #{plan.price}{plan.name.replace(/\s+/g, '').slice(0, 4)}</span>
                  </>
                ) : (
                  'Оплата прошла успешно. Мы скоро свяжемся с вами в Telegram с подтверждением и доступом.'
                )}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className={`${GREEN_OUTLINE_CTA_BUTTON_CLASS} mt-8 w-full md:mt-10`}
              >
                закрыть
              </button>
            </motion.div>
          ) : successState === 'card_input' ? (
            <motion.div key="card-input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <div className="mb-5 md:mb-8">
                <h2 className="text-xl font-black uppercase leading-tight tracking-tight text-[#f5f4ef] md:text-2xl" style={{ color: '#f5f4ef' }}>БЕЗОПАСНАЯ ОПЛАТА</h2>
                <div className="mt-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#8DC63F]">
                  {selectedMethod === 'card_intl' ? 'ЗАРУБЕЖНЫЕ КАРТЫ' : 'РУ-КАРТЫ'}
                </div>
              </div>

              <div className="mb-5 flex items-baseline gap-3 md:mb-8">
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#d2d0ca] md:text-[11px]">К ОПЛАТЕ:</div>
                <div className="text-2xl font-black tracking-tight text-[#8DC63F] drop-shadow-[0_0_15px_rgba(141,198,63,0.3)] md:text-3xl">{getPrice()}</div>
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
                    className={cn(
                      PAYMENT_SELECTOR_BASE_CLASS,
                      'flex h-12 uppercase',
                      subMethod === option.id
                        ? PAYMENT_SELECTOR_ACTIVE_CLASS
                        : PAYMENT_SELECTOR_IDLE_CLASS,
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {subMethod === 'card' ? (
                <div className="mb-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-4 md:gap-4 md:p-6">
                  <input
                    type="text"
                    placeholder="Номер карты"
                    className="w-full rounded-sm border border-white/10 bg-black/50 px-3 py-3 text-xs text-[#f5f4ef] outline-none transition-colors placeholder:text-white/45 focus:border-[#8DC63F] md:px-4 md:py-4 md:text-sm"
                  />
                  <div className="flex gap-3 md:gap-4">
                    <input
                      type="text"
                      placeholder="ММ/ГГ"
                      className="w-full rounded-sm border border-white/10 bg-black/50 px-3 py-3 text-xs text-[#f5f4ef] outline-none transition-colors placeholder:text-white/45 focus:border-[#8DC63F] md:px-4 md:py-4 md:text-sm"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full rounded-sm border border-white/10 bg-black/50 px-3 py-3 text-xs text-[#f5f4ef] outline-none transition-colors placeholder:text-white/45 focus:border-[#8DC63F] md:px-4 md:py-4 md:text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6 flex h-[132px] items-center justify-center rounded-lg border border-white/10 bg-white/5 p-4 text-center font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-white/62 md:h-[156px] md:p-6 md:text-[11px]">
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
                  className={`${GREEN_SOLID_CTA_BUTTON_CLASS} w-full whitespace-nowrap`}
                >
                  оплатить
                </button>
                <button
                  type="button"
                  onClick={() => setSuccessState('none')}
                  className="mx-auto flex items-center gap-2 pb-4 text-[13px] font-mono font-bold tracking-[0.12em] text-white/70 transition-colors hover:text-white md:pb-6 md:text-[14px]"
                >
                  <span className="text-xs">←</span> вернуться назад
                </button>
              </div>
            </motion.div>
          ) : !showQR ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <div className="mb-5 pr-6 md:mb-8">
                <h2 className="text-xl font-black uppercase leading-tight tracking-tight text-[#f5f4ef] md:text-2xl" style={{ color: '#f5f4ef' }}>ОПЛАТА ЗАКАЗА</h2>
                <div className="mt-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#8DC63F]">{planLabel}</div>
              </div>

              <div className="mb-5 flex items-baseline gap-3 md:mb-8">
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#d2d0ca] md:text-[11px]">ИТОГО К ОПЛАТЕ:</div>
                <div className="text-2xl font-black tracking-tight text-[#8DC63F] drop-shadow-[0_0_15px_rgba(141,198,63,0.3)] md:text-3xl">{getPrice()}</div>
              </div>

              <div className="mb-5 text-left md:mb-8">
                <div className="mb-2 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#d2d0ca] md:mb-3 md:text-[11px]">СПОСОБ ОПЛАТЫ</div>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {methods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        PAYMENT_SELECTOR_BASE_CLASS,
                        'relative flex h-12 uppercase md:h-14 md:p-4',
                        method.id === 'card_intl' && 'col-span-2',
                        selectedMethod === method.id
                          ? PAYMENT_SELECTOR_ACTIVE_CLASS
                          : PAYMENT_SELECTOR_IDLE_CLASS,
                      )}
                    >
                      {method.label}
                      {method.id === 'usdt' && (
                        <div className="absolute -top-3 left-[-4px] rounded-[2px] bg-[#8DC63F] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-black md:px-2">
                          СКИДКА 5%
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3 flex flex-row gap-2 md:mb-4 md:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 truncate text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-[#d2d0ca] md:mb-2 md:text-[10px]">E-MAIL:</div>
                  <input
                    type="email"
                    placeholder="mail@.com"
                    className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2.5 text-[11px] text-[#f5f4ef] outline-none transition-all placeholder:text-white/45 focus:border-[#8DC63F] focus:bg-[#8DC63F]/5 md:px-4 md:py-3.5 md:text-sm"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 truncate text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-[#8DC63F] md:mb-2 md:text-[10px]">* ТЕЛЕГРАМ (@):</div>
                  <input
                    type="text"
                    placeholder="@user"
                    className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2.5 text-[11px] text-[#f5f4ef] outline-none transition-all placeholder:text-white/45 focus:border-[#8DC63F] focus:bg-[#8DC63F]/5 md:px-4 md:py-3.5 md:text-sm"
                  />
                </div>
              </div>

              <div className="mb-5 mt-4 flex flex-col gap-1.5 md:mb-8 md:mt-2 md:gap-2">
                <div className="truncate text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-[#d2d0ca] md:text-[10px]">КОММЕНТАРИЙ:</div>
                <input
                  type="text"
                  placeholder="..."
                  className="w-full border-b border-white/10 bg-transparent pb-1.5 text-[11px] text-[#f5f4ef] outline-none transition-all placeholder:text-white/45 focus:border-[#8DC63F] focus:border-b-white md:pb-2 md:text-sm"
                />
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-4 md:pt-2">
                <a
                  href="https://join.aimindset.org/waitlist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-[#b8b6b0] underline decoration-transparent underline-offset-4 transition-colors hover:text-[#8DC63F] hover:decoration-[#8DC63F] md:text-[10px]"
                >
                  СВЯЖИТЕСЬ С НАМИ
                </a>
                <button
                  type="button"
                  onClick={handleInitialPay}
                  className={`${GREEN_SOLID_CTA_BUTTON_CLASS} whitespace-nowrap md:px-8`}
                >
                  оплатить
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col text-left">
              <div className="mb-5 md:mb-8">
                <h2 className="text-xl font-black uppercase leading-tight tracking-tight text-[#f5f4ef] md:text-2xl" style={{ color: '#f5f4ef' }}>
                  ПЕРЕВЕДИТЕ {getPrice()}
                  <br />
                  ПО АДРЕСУ:
                </h2>
                <div className="mt-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#8DC63F]">USDT (TRC20) PAYMENT</div>
              </div>

              <div className="mb-6 flex justify-center rounded-lg border border-white/10 bg-white/5 p-5 shadow-lg md:p-6">
                <div className="flex h-40 w-40 items-center justify-center rounded-md border-2 border-dashed border-white/20 text-center font-mono text-[10px] font-bold tracking-[0.16em] text-[#d2d0ca] md:h-48 md:w-48">
                  QR CODE
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="mb-8 flex w-full items-center justify-between rounded-sm border border-white/10 bg-black/50 p-3 font-mono text-xs font-bold text-[#8DC63F] transition-colors hover:bg-white/5 md:p-4 md:text-sm"
              >
                <span className="mr-4 truncate tracking-[0.05em]">{PAYMENT_ADDRESS}</span>
                <span className="flex shrink-0 items-center gap-2 rounded-sm bg-white/10 px-2 py-1 text-[10px] tracking-[0.1em] text-white/88 md:px-3 md:py-1.5 md:text-xs">
                  <Copy className="h-3.5 w-3.5" />
                  {addressCopied ? 'copied' : 'copy'}
                </span>
              </button>

              <div className="mt-auto flex flex-col gap-3 md:gap-4">
                <button
                  type="button"
                  onClick={() => setSuccessState('usdt')}
                  className={`${GREEN_SOLID_CTA_BUTTON_CLASS} w-full`}
                >
                  я оплатил
                </button>
                <button
                  type="button"
                  onClick={() => setShowQR(false)}
                  className="w-full text-center text-[11px] font-black tracking-widest text-white/62 transition-colors hover:text-white"
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
