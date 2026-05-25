import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Copy, X } from 'lucide-react';

interface SelectedPlan {
  name: string;
  price: string;
}

interface PricingPaymentPopupDatalineHeaderProps {
  isOpen: boolean;
  plan: SelectedPlan | null;
  onClose: () => void;
  presentation?: 'v6' | 'v7';
}

type SuccessState = 'none' | 'card_input' | 'card' | 'usdt';
type PaymentMethodId = 'usdt' | 'card_ru' | 'card_intl';
type CardSubmethodId = 'card' | 'sbp' | 'qr' | 'revolut' | 'link';
type TelegramDiscountState = 'idle' | 'checking' | 'applied' | 'not_applied';
type PromoCodeDiscountState = 'idle' | 'checking' | 'applied' | 'not_applied';

const PAYMENT_ADDRESS = 'T9yF8hQpA5vW2xZ1sE4dC7bN0mK3jL6uI9oP';
const TELEGRAM_ALUMNI_DISCOUNT_HANDLES = new Set(['aim', '@aim']);
const PROMO_CODE_DISCOUNTS = new Set(['ponchik']);

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const formatRoublePrice = (amount: number) => `${new Intl.NumberFormat('ru-RU').format(amount)}\u00a0₽`;

export default function PricingPaymentPopupDatalineHeader({
  isOpen,
  plan,
  onClose,
  presentation = 'v6',
}: PricingPaymentPopupDatalineHeaderProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('card_intl');
  const [successState, setSuccessState] = useState<SuccessState>('none');
  const [subMethod, setSubMethod] = useState<CardSubmethodId>('card');
  const [showQR, setShowQR] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [telegramHandle, setTelegramHandle] = useState('');
  const [telegramDiscountState, setTelegramDiscountState] = useState<TelegramDiscountState>('idle');
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeDiscountState, setPromoCodeDiscountState] = useState<PromoCodeDiscountState>('idle');

  const basePrice = useMemo(() => Number.parseInt(plan?.price ?? '0', 10), [plan?.price]);
  const planLabel = 'MAIN LAB X26 · ADVANCED TRACK';
  const isCompactWide = presentation === 'v7';
  const appliedDiscountRate = telegramDiscountState === 'applied'
    ? 0.2
    : promoCodeDiscountState === 'applied'
      ? 0.05
      : 0;
  const isPromoCodeSuperseded = telegramDiscountState === 'applied' && promoCodeDiscountState === 'applied';

  const methods: Array<{ id: PaymentMethodId; label: string; note: string }> = [
    { id: 'usdt', label: 'USDT', note: '' },
    { id: 'card_ru', label: 'РУ-КАРТЫ', note: '' },
    { id: 'card_intl', label: 'EU-КАРТЫ', note: '' },
  ];

  const getPrice = () => {
    if (!basePrice) return '';
    const discountedBasePrice = Math.round(basePrice * (1 - appliedDiscountRate));
    if (selectedMethod === 'usdt') return `${Math.round(discountedBasePrice * 0.95)}\u00a0USDT`;
    if (selectedMethod === 'card_intl') return `€${discountedBasePrice}`;
    return formatRoublePrice(discountedBasePrice * 100);
  };

  const getOriginalPrice = () => {
    if (!basePrice || !appliedDiscountRate) return '';
    if (selectedMethod === 'usdt') return `${Math.round(basePrice * 0.95)}\u00a0USDT`;
    if (selectedMethod === 'card_intl') return `€${basePrice}`;
    return formatRoublePrice(basePrice * 100);
  };

  const resetState = () => {
    setSelectedMethod('card_intl');
    setSuccessState('none');
    setSubMethod('card');
    setShowQR(false);
    setAddressCopied(false);
    setTelegramHandle('');
    setTelegramDiscountState('idle');
    setPromoCode('');
    setPromoCodeDiscountState('idle');
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

  useEffect(() => {
    if (!telegramHandle.trim()) {
      setTelegramDiscountState('idle');
      return;
    }

    setTelegramDiscountState('checking');

    const timer = window.setTimeout(() => {
      const normalizedHandle = telegramHandle.trim().toLowerCase();
      setTelegramDiscountState(
        TELEGRAM_ALUMNI_DISCOUNT_HANDLES.has(normalizedHandle) ? 'applied' : 'not_applied',
      );
    }, 520);

    return () => window.clearTimeout(timer);
  }, [telegramHandle]);

  useEffect(() => {
    if (!promoCode.trim()) {
      setPromoCodeDiscountState('idle');
      return;
    }

    setPromoCodeDiscountState('checking');

    const timer = window.setTimeout(() => {
      const normalizedPromoCode = promoCode.trim().toLowerCase();
      setPromoCodeDiscountState(
        PROMO_CODE_DISCOUNTS.has(normalizedPromoCode) ? 'applied' : 'not_applied',
      );
    }, 420);

    return () => window.clearTimeout(timer);
  }, [promoCode]);

  if (!isOpen || !plan) return null;

  const selectorClass = (isActive: boolean) => cn(
    'relative inline-flex min-h-[50px] items-center justify-center border px-3 text-center font-mono text-[11px] font-black uppercase leading-none tracking-[0.28em] transition-all duration-150 md:min-h-[52px] md:text-[12px]',
    isActive
      ? 'border-black bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]'
      : 'border-black/80 bg-white text-black hover:border-black hover:bg-[#f3f3f3]',
  );

  const fieldClass =
    'w-full border border-black/14 bg-[#f7f7f7] px-4 py-3 font-mono text-[12px] font-medium text-black outline-none transition-colors placeholder:text-black/32 focus:border-black/70 focus:bg-white md:py-[13px] md:text-[13px]';

  const mutedLabelClass =
    'font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/46';

  const primaryButtonClass =
    'inline-flex h-[46px] min-w-[170px] items-center justify-center bg-[#8ad036] px-8 font-mono text-[12px] font-black lowercase leading-none tracking-[0.2em] text-black transition-all duration-150 hover:scale-[1.025] hover:bg-[#79bd2d]';

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
        className={cn(
          'relative flex max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-1.5rem)] w-full flex-col overflow-y-auto rounded-[4px] border border-black bg-white p-7 pt-8 text-left font-mono text-black shadow-[0_34px_110px_rgba(0,0,0,0.14)] md:max-h-[calc(100dvh-2rem)]',
          isCompactWide
            ? 'max-w-[560px] md:h-[640px] md:p-7'
            : 'max-w-[500px] md:h-[642px] md:p-[30px]',
        )}
      >
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            'absolute right-7 z-20 flex h-[44px] w-[44px] items-center justify-center rounded-[4px] border border-black/10 bg-[#f4f4f4] text-black transition-all duration-150 hover:scale-110 hover:border-black hover:bg-white md:right-8',
            isCompactWide ? 'top-10' : 'top-8 md:top-8',
          )}
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" strokeWidth={2.1} />
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
              <div className={cn('pr-16 md:pr-20', isCompactWide ? 'mb-9 md:mb-9' : 'mb-6 md:mb-6')}>
                <h2 className={cn(
                  'mt-4 font-sans font-black uppercase leading-none tracking-[0.01em] text-black',
                  isCompactWide ? 'text-[31px] md:text-[36px]' : 'text-[32px] md:text-[38px]',
                )}>ОПЛАТА ЗАКАЗА</h2>
                {!isCompactWide ? (
                  <div className="mt-3 text-[11px] font-mono font-black uppercase tracking-[0.24em] text-[#78bd2f]">{planLabel}</div>
                ) : null}
              </div>

              <div className={cn(
                'grid grid-cols-[1fr_auto] items-center gap-4 rounded-[4px] border border-black/12 bg-[#f6f6f6] px-4 py-4 md:px-5',
                isCompactWide ? 'mb-6 md:mb-6 md:py-4' : 'mb-5 md:mb-5 md:py-[18px]',
              )}>
                <div>
                  <div className="font-mono text-[12px] font-black uppercase tracking-[0.24em] text-black/48">итого к оплате:</div>
                </div>
                <div className="relative flex h-[54px] items-center justify-end text-right">
                  {getOriginalPrice() ? (
                    <div className="absolute right-0 top-[-4px] font-mono text-[10px] font-bold leading-none tracking-[0.16em] text-black/32 line-through">
                      {getOriginalPrice()}
                    </div>
                  ) : null}
                  <div className="font-sans text-[40px] font-black leading-none tracking-[0.01em] text-black md:text-[46px]">{getPrice()}</div>
                </div>
              </div>

              {!isCompactWide ? (
                <div className="mb-6 h-px w-full bg-[#78bd2f] md:mb-6" aria-hidden="true" />
              ) : null}

              <div className={cn('text-left', isCompactWide ? 'mb-8 md:mb-8' : 'mb-5 md:mb-5')}>
                <div className={`mb-4 ${mutedLabelClass}`}>способ оплаты</div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {methods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={selectorClass(selectedMethod === method.id)}
                    >
                      {method.id === 'usdt' ? (
                        <span className="absolute -top-[11px] left-[-1px] h-[20px] bg-[#8ad036] px-4 pt-[5px] text-[10px] font-black tracking-[0.18em] text-black">
                          СКИДКА 5%
                        </span>
                      ) : null}
                      <span>{method.label}</span>
                      <span className={cn('sr-only', selectedMethod === method.id ? 'text-white' : 'text-black/32')}>
                        {method.note}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={cn('flex flex-col gap-5 sm:flex-row', isCompactWide ? 'mb-3 md:mb-3 md:gap-6' : 'mb-4 md:mb-4 md:gap-7')}>
                <div className="min-w-0 flex-1">
                  <div className={`mb-2 flex items-start gap-[1px] ${mutedLabelClass}`}>
                    <span className="-mt-[3px] text-[13px] leading-none text-[#78bd2f]">*</span>
                    <span>telegram</span>
                  </div>
                  <input
                    type="text"
                    placeholder="@user или телефон"
                    value={telegramHandle}
                    onChange={(event) => setTelegramHandle(event.target.value)}
                    className={fieldClass}
                  />
                  <div className="h-[28px] overflow-hidden pt-1.5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={telegramDiscountState}
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: telegramDiscountState === 'applied' ? 1 : 0, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.16 }}
                        className={cn(
                          'font-mono text-[9px] font-bold uppercase tracking-[0.16em]',
                          'text-[#5f9f20]',
                        )}
                      >
                        {telegramDiscountState === 'applied' ? 'скидка Alumni 20% применена' : '\u00a0'}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`mb-2 truncate ${mutedLabelClass}`}>e-mail</div>
                  <input
                    type="email"
                    placeholder="mail@mail.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className={cn(
                'flex w-full flex-col gap-1.5',
                isCompactWide ? 'mb-4 max-w-none sm:w-[calc((100%-1.5rem)/2)] md:mb-4' : 'mb-3 max-w-[238px] md:mb-3',
              )}>
                <div className={`truncate ${mutedLabelClass}`}>промокод</div>
                <input
                  type="text"
                  placeholder="..."
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  className="w-full border-0 border-b border-black/16 bg-transparent pb-2 font-mono text-[13px] font-medium text-black outline-none transition-all placeholder:text-black/34 focus:border-black/60"
                />
                <div className={cn('overflow-hidden pt-1.5', isCompactWide ? 'h-[25px]' : 'h-[42px]')}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={promoCodeDiscountState}
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: promoCodeDiscountState === 'idle' ? 0 : 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.16 }}
                      className={cn(
                        'font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.16em]',
                        isCompactWide && 'whitespace-nowrap',
                        promoCodeDiscountState === 'applied' && !isPromoCodeSuperseded ? 'text-[#5f9f20]' : 'text-black/36',
                      )}
                    >
                      {promoCodeDiscountState === 'checking'
                        ? 'ищу скидку'
                        : promoCodeDiscountState === 'applied'
                          ? isPromoCodeSuperseded
                            ? 'действует Alumni 20%'
                            : 'промокод 5% применён'
                          : promoCodeDiscountState === 'not_applied'
                            ? 'промокод не применён'
                            : '\u00a0'}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-end gap-2 pt-4">
                <a
                  href="https://join.aimindset.org/waitlist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[46px] min-w-[110px] shrink-0 items-center justify-center px-4 font-mono text-[12px] font-black lowercase leading-none tracking-[0.2em] text-black/46 underline decoration-transparent underline-offset-4 transition-colors hover:text-black hover:decoration-black"
                >
                  отмена
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
