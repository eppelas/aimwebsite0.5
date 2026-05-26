import { type KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Copy, X } from 'lucide-react';

interface SelectedPlan {
  name: string;
  price: string;
}

interface PricingPaymentPopupDatalineHeaderProps {
  isOpen: boolean;
  plan: SelectedPlan | null;
  onClose: () => void;
  presentation?: 'v6' | 'v7';
  mobileLayout?: 'current' | 'wide' | 'dense';
}

type SuccessState = 'none' | 'redirecting' | 'paid' | 'failed' | 'join' | 'usdt';
type PaymentMethodId = 'usdt' | 'card_ru' | 'card_intl';
type TelegramDiscountState = 'idle' | 'checking' | 'applied' | 'not_applied';
type PromoCodeDiscountState = 'idle' | 'checking' | 'applied' | 'not_applied';
type PaymentStatusVisualVariant = 'signal' | 'terminal' | 'mesh';

const PAYMENT_ADDRESS = 'T9yF8hQpA5vW2xZ1sE4dC7bN0mK3jL6uI9oP';
const PAYMENT_ACQUIRING_URL = 'https://join.aimindset.org/waitlist';
const TELEGRAM_ACCESS_BOT_URL = 'https://t.me/prod_ai_mind_set_bot?start=payment_success';
const TELEGRAM_ALUMNI_DISCOUNT_HANDLES = new Set(['aim', '@aim']);
const PROMO_CODE_DISCOUNTS = new Set(['ponchik']);
const PAYMENT_STATUS_DEMO_STATES = new Set<SuccessState>(['redirecting', 'paid', 'failed', 'join']);
const PAYMENT_METHOD_IDS = new Set<PaymentMethodId>(['usdt', 'card_ru', 'card_intl']);
const PAYMENT_STATUS_VISUAL_VARIANTS = new Set<PaymentStatusVisualVariant>(['signal', 'terminal', 'mesh']);

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const formatRoublePrice = (amount: number) => `${new Intl.NumberFormat('ru-RU').format(amount)}\u00a0₽`;
const isTelegramUsername = (value: string) => /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(value.trim());
const isKnownAlumniHandle = (value: string) => TELEGRAM_ALUMNI_DISCOUNT_HANDLES.has(value.trim().toLowerCase());
const isTelegramPhone = (value: string) => {
  const trimmedValue = value.trim();
  if (!/^\+?[\d\s().-]{7,24}$/.test(trimmedValue)) return false;
  const digits = trimmedValue.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};
const isValidTelegramContact = (value: string) => isTelegramUsername(value) || isTelegramPhone(value) || isKnownAlumniHandle(value);
const getRequestedPaymentMethod = (): PaymentMethodId => {
  if (typeof window === 'undefined') return 'card_intl';
  const requestedMethod = new URLSearchParams(window.location.search).get('paymentMethod') as PaymentMethodId | null;
  return requestedMethod && PAYMENT_METHOD_IDS.has(requestedMethod) ? requestedMethod : 'card_intl';
};
const getRequestedPaymentStatusVisual = (): PaymentStatusVisualVariant => {
  if (typeof window === 'undefined') return 'signal';
  const requestedVisual = new URLSearchParams(window.location.search).get('paymentStatusVisual') as PaymentStatusVisualVariant | null;
  return requestedVisual && PAYMENT_STATUS_VISUAL_VARIANTS.has(requestedVisual) ? requestedVisual : 'signal';
};

export default function PricingPaymentPopupDatalineHeader({
  isOpen,
  plan,
  onClose,
  presentation = 'v6',
  mobileLayout = 'current',
}: PricingPaymentPopupDatalineHeaderProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>(() => getRequestedPaymentMethod());
  const [successState, setSuccessState] = useState<SuccessState>('none');
  const [showQR, setShowQR] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [telegramHandle, setTelegramHandle] = useState('');
  const [telegramError, setTelegramError] = useState('');
  const [telegramDiscountState, setTelegramDiscountState] = useState<TelegramDiscountState>('idle');
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeDiscountState, setPromoCodeDiscountState] = useState<PromoCodeDiscountState>('idle');

  const basePrice = useMemo(() => Number.parseInt(plan?.price ?? '0', 10), [plan?.price]);
  const planLabel = 'MAIN LAB X26 · ADVANCED TRACK';
  const isCompactWide = presentation === 'v7';
  const isMobileWideLayout = isCompactWide && mobileLayout === 'wide';
  const isMobileDenseLayout = isCompactWide && mobileLayout === 'dense';
  const isMobileFittedLayout = isMobileWideLayout || isMobileDenseLayout;
  const requestedPaymentStatus = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('paymentStatus') as SuccessState | null
    : null;
  const forcedPaymentStatus = requestedPaymentStatus && PAYMENT_STATUS_DEMO_STATES.has(requestedPaymentStatus)
    ? requestedPaymentStatus
    : null;
  const visibleSuccessState = successState === 'none' && forcedPaymentStatus ? forcedPaymentStatus : successState;
  const statusVisualVariant = getRequestedPaymentStatusVisual();
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
    if (!basePrice) return '';
    if (selectedMethod === 'usdt') {
      const originalUsdtPrice = appliedDiscountRate ? Math.round(basePrice * 0.95) : basePrice;
      return `${originalUsdtPrice}\u00a0USDT`;
    }
    if (!appliedDiscountRate) return '';
    if (selectedMethod === 'card_intl') return `€${basePrice}`;
    return formatRoublePrice(basePrice * 100);
  };

  const resetState = () => {
    setSelectedMethod(getRequestedPaymentMethod());
    setSuccessState('none');
    setShowQR(false);
    setAddressCopied(false);
    setTelegramHandle('');
    setTelegramError('');
    setTelegramDiscountState('idle');
    setPromoCode('');
    setPromoCodeDiscountState('idle');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleInitialPay = () => {
    if (!isValidTelegramContact(telegramHandle)) {
      setTelegramError('укажите @user, username или телефон');
      return;
    }

    if (selectedMethod === 'usdt') {
      setShowQR(true);
      return;
    }
    setSuccessState('redirecting');
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

  const handleFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const previousOverflow = body.style.overflow;
    const previousOverflowY = body.style.overflowY;
    const shouldLockBody = !window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;

    if (shouldLockBody) {
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      body.style.overflowY = 'scroll';
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      if (shouldLockBody) {
        body.style.position = previousPosition;
        body.style.top = previousTop;
        body.style.width = previousWidth;
        body.style.overflow = previousOverflow;
        body.style.overflowY = previousOverflowY;
        window.scrollTo(0, scrollY);
      }
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;
    const requestedStatus = new URLSearchParams(window.location.search).get('paymentStatus') as SuccessState | null;
    if (requestedStatus && PAYMENT_STATUS_DEMO_STATES.has(requestedStatus)) {
      setSuccessState(requestedStatus);
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
        isKnownAlumniHandle(normalizedHandle) ? 'applied' : 'not_applied',
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
    'relative inline-flex items-center justify-center border text-center font-mono font-black uppercase leading-none transition-all duration-150 md:min-h-[52px] md:px-3 md:text-[12px] md:tracking-[0.28em]',
    isMobileFittedLayout ? 'min-h-[44px] px-2 text-[10px] tracking-[0.18em]' : 'min-h-[50px] px-3 text-[11px] tracking-[0.28em]',
    isActive
      ? 'border-black bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]'
      : 'border-black/80 bg-white text-black hover:border-black hover:bg-[#f3f3f3]',
  );

  const fieldClass =
    'w-full border border-black/14 bg-[#f7f7f7] px-4 py-3 font-mono text-[16px] font-medium text-black outline-none transition-colors placeholder:text-black/32 focus:border-black/70 focus:bg-white md:py-[13px] md:text-[13px]';

  const mutedLabelClass =
    'font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/46';

  const primaryButtonClass =
    'inline-flex h-[46px] min-w-[170px] items-center justify-center bg-[#8ad036] px-8 font-mono text-[12px] font-black lowercase leading-none tracking-[0.2em] text-black transition-all duration-150 hover:scale-[1.025] hover:bg-[#79bd2d]';

  const renderStatusScreen = () => {
    const statusCopy: Record<Exclude<SuccessState, 'none'>, { label: string; title: string; body: string; tone: 'success' | 'neutral' | 'danger'; cta?: string }> = {
      redirecting: {
        label: 'подготовка оплаты',
        title: 'ПЕРЕХОД К ОПЛАТЕ',
        body: 'Сейчас откроется страница оплаты. Если окно не появилось, вернитесь назад и попробуйте ещё раз.',
        tone: 'neutral',
      },
      paid: {
        label: 'статус оплаты',
        title: 'ОПЛАТА ПОЛУЧЕНА',
        body: 'Перейдите в наш telegram-бот, чтобы мы добавили вас в группу обучения.',
        tone: 'success',
        cta: '/присоединиться',
      },
      failed: {
        label: 'статус оплаты',
        title: 'ОПЛАТА НЕ ПРОШЛА',
        body: 'Платёж не подтвердился. Деньги не списались или банк отклонил операцию. Можно вернуться и попробовать другой способ.',
        tone: 'danger',
      },
      join: {
        label: 'доступ к группе',
        title: 'ОТКРОЙТЕ БОТА',
        body: 'Перейдите в наш telegram-бот, чтобы мы добавили вас в группу обучения.',
        tone: 'success',
        cta: '/присоединиться',
      },
      usdt: {
        label: 'проверка перевода',
        title: 'ЗАЯВКА ПРИНЯТА',
        body: 'Мы проверим USDT-перевод и пришлём доступ через Telegram. Если хотите ускорить проверку, откройте бота.',
        tone: 'neutral',
        cta: '/присоединиться',
      },
    };

    const activeSuccessState = visibleSuccessState as Exclude<SuccessState, 'none'>;
    const copy = statusCopy[activeSuccessState];
    const isDanger = copy.tone === 'danger';
    const isSuccess = copy.tone === 'success';
    const ctaHref = activeSuccessState === 'redirecting' ? PAYMENT_ACQUIRING_URL : TELEGRAM_ACCESS_BOT_URL;
    const showBotCta = activeSuccessState !== 'redirecting' && activeSuccessState !== 'failed';
    const orderNumber = `#${plan.price}${plan.name.replace(/\s+/g, '').slice(0, 4)}`;

    const renderStatusMark = () => {
      if (isDanger) {
        return (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[4px] border border-black bg-black text-white">
            <X className="h-8 w-8" strokeWidth={2.1} />
          </div>
        );
      }

      if (statusVisualVariant === 'terminal') {
        return (
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[2px] border border-black bg-[#120f10] px-3 py-2 font-mono text-[8px] font-bold uppercase leading-[1.35] tracking-[0.12em] text-[#3db7ef] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
            <motion.div
              className="absolute inset-x-0 top-0 h-px bg-[#e44848]"
              animate={{ y: [0, 62, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            />
            <div>[ access ]</div>
            <div>{activeSuccessState === 'redirecting' ? 'pay route' : 'bot sync'}</div>
            <div>0101 1100</div>
            <div className="text-[#8ad036]">{activeSuccessState === 'redirecting' ? 'opening' : 'ready'}</div>
          </div>
        );
      }

      if (statusVisualVariant === 'mesh') {
        return (
          <div className="grid h-16 w-24 shrink-0 grid-cols-5 gap-[3px] rounded-[2px] border border-black bg-white p-2">
            {Array.from({ length: 15 }).map((_, index) => (
              <motion.span
                key={`payment-status-mesh-${index}`}
                className={cn(
                  'block rounded-[1px] border border-black/14',
                  index % 4 === 0 ? 'bg-[#8ad036]' : index % 5 === 0 ? 'bg-black' : 'bg-[#f1f1f1]',
                )}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.6, delay: index * 0.05, repeat: Infinity }}
              />
            ))}
          </div>
        );
      }

      return (
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[2px] border border-black bg-white p-3">
          <div className="flex h-full items-center justify-center gap-1">
            {[0, 1, 2, 3].map((index) => (
              <motion.span
                key={`payment-status-signal-${index}`}
                className="block h-8 w-[7px] bg-[#8ad036]"
                animate={{ scaleY: [0.35, 1, 0.35] }}
                transition={{ duration: 1.05, delay: index * 0.12, repeat: Infinity }}
              />
            ))}
          </div>
          <div className="absolute bottom-1 left-2 right-2 h-px bg-black/22" />
        </div>
      );
    };

    return (
      <motion.div key={activeSuccessState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-full flex-col py-7 md:py-10">
        <div className="mb-8 flex items-center gap-4">
          {renderStatusMark()}
          <div>
            <div className={mutedLabelClass}>{copy.label}</div>
            <h3 className="mt-3 font-sans text-[28px] font-black uppercase leading-none tracking-[0.01em] text-black md:text-[34px]">
              {copy.title}
            </h3>
          </div>
        </div>

        <div className={cn(
          'rounded-[4px] border px-5 py-5 font-sans text-[15px] leading-relaxed md:px-6 md:py-6',
          isSuccess ? 'border-[#8ad036] bg-[#f4faed] text-black/76' : 'border-black/12 bg-[#f6f6f6] text-black/68',
        )}>
          {copy.body}
        </div>

        <div className="mt-6 rounded-[4px] border border-black/10 bg-white px-4 py-3 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-black/42">
          заказ {orderNumber}
        </div>

        <div className="mt-auto flex items-center justify-end gap-2 pt-8">
          {activeSuccessState === 'failed' || activeSuccessState === 'redirecting' ? (
            <button
              type="button"
              onClick={() => setSuccessState('none')}
              className="inline-flex h-[46px] min-w-[150px] items-center justify-center px-4 font-mono text-[12px] font-black lowercase leading-none tracking-[0.2em] text-black/46 underline decoration-transparent underline-offset-4 transition-colors hover:text-black hover:decoration-black"
            >
              назад
            </button>
          ) : null}
          {activeSuccessState === 'failed' ? (
            <button
              type="button"
              onClick={() => setSuccessState('none')}
              className={cn(primaryButtonClass, 'bg-black text-white hover:bg-black/82')}
            >
              попробовать снова
            </button>
          ) : showBotCta ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButtonClass}
            >
              {copy.cta}
            </a>
          ) : null}
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 right-0 z-[10030] flex justify-center bg-[#f1f1f1]/90 backdrop-blur-[2px] sm:p-4 md:left-[18%] md:items-center md:p-4',
        isMobileFittedLayout
          ? 'items-center px-1 py-[calc(env(safe-area-inset-bottom,0px)+8px)]'
          : 'items-end px-2 pb-[calc(env(safe-area-inset-bottom,0px)+24px)] pt-3',
      )}
      onClick={handleClose}
    >
      <motion.div
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={cn(
          'relative flex w-full flex-col overflow-y-auto overscroll-contain rounded-[4px] border border-black bg-white text-left font-mono text-black shadow-[0_34px_110px_rgba(0,0,0,0.14)] md:max-h-[calc(100dvh-2rem)]',
          isMobileDenseLayout
            ? 'max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-0.5rem)] max-w-[calc(100vw-8px)] p-4 pt-[18px]'
            : isMobileWideLayout
              ? 'max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-0.75rem)] max-w-[calc(100vw-8px)] p-4 pt-[18px]'
              : 'max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-1.5rem)] p-7 pt-8',
          isCompactWide
            ? 'md:mr-10 md:h-[640px] md:max-w-[560px] md:p-7'
            : 'max-w-[500px] md:h-[642px] md:p-[30px]',
        )}
      >
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            'absolute right-7 z-20 flex h-[44px] w-[44px] items-center justify-center rounded-[4px] border border-black/10 bg-[#f4f4f4] text-black transition-all duration-150 hover:scale-110 hover:border-black hover:bg-white md:right-8',
            isMobileWideLayout && '!right-4 !top-[22px] !h-[34px] !w-[34px]',
            isMobileDenseLayout && '!right-4 !top-[22px] !h-[34px] !w-[34px]',
            isCompactWide ? 'md:top-10' : 'top-8 md:top-8',
            isCompactWide && !isMobileFittedLayout && 'top-10',
          )}
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" strokeWidth={2.1} />
        </button>

        <AnimatePresence mode="wait">
          {visibleSuccessState !== 'none' ? renderStatusScreen() : !showQR ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <div className={cn(
                'pr-16 md:pr-20',
                isMobileDenseLayout ? 'mb-6 md:mb-9' : isMobileWideLayout ? 'mb-6 md:mb-9' : isCompactWide ? 'mb-9 md:mb-9' : 'mb-6 md:mb-6',
              )}>
                <h2 className={cn(
                  'font-sans font-black uppercase leading-none tracking-[0.01em] text-black',
                isMobileFittedLayout ? 'mt-2' : 'mt-4',
                  isMobileDenseLayout ? 'text-[26px] md:text-[36px]' : isMobileWideLayout ? 'text-[27px] md:text-[36px]' : isCompactWide ? 'text-[31px] md:text-[36px]' : 'text-[32px] md:text-[38px]',
                )}>ОПЛАТА ЗАКАЗА</h2>
                {!isCompactWide ? (
                  <div className="mt-3 text-[11px] font-mono font-black uppercase tracking-[0.24em] text-[#78bd2f]">{planLabel}</div>
                ) : null}
              </div>

              <div className={cn(
                'grid grid-cols-[minmax(0,1fr)_auto] items-center rounded-[4px] border border-black/12 bg-[#f6f6f6] md:px-5',
                isMobileDenseLayout ? 'mb-5 gap-2 px-3 py-3 md:mb-6 md:gap-4 md:py-4' : isMobileWideLayout ? 'mb-5 gap-3 px-4 py-3.5 md:mb-6 md:gap-4 md:py-4' : isCompactWide ? 'mb-6 gap-4 px-4 py-4 md:mb-6 md:py-4' : 'mb-5 gap-4 px-4 py-4 md:mb-5 md:py-[18px]',
              )}>
                <div>
                  <div className={cn(
                    'font-mono font-black uppercase text-black/48',
                    isMobileFittedLayout ? 'text-[10px] tracking-[0.18em] md:text-[12px] md:tracking-[0.24em]' : 'text-[12px] tracking-[0.24em]',
                  )}>{isMobileFittedLayout ? 'к оплате:' : 'итого к оплате:'}</div>
                </div>
                <div className={cn('relative flex items-center justify-end text-right', isMobileFittedLayout ? 'h-[50px]' : 'h-[54px]')}>
                  {getOriginalPrice() ? (
                    <div className="absolute right-0 top-[-4px] font-mono text-[10px] font-bold leading-none tracking-[0.16em] text-black/32 line-through">
                      {getOriginalPrice()}
                    </div>
                  ) : null}
                  <div className="font-sans text-[clamp(31px,9.6vw,40px)] font-black leading-none tracking-[0.01em] text-black md:text-[46px]">{getPrice()}</div>
                </div>
              </div>

              {!isCompactWide ? (
                <div className="mb-6 h-px w-full bg-[#78bd2f] md:mb-6" aria-hidden="true" />
              ) : null}

              <div className={cn('text-left', isMobileDenseLayout ? 'mb-5 md:mb-8' : isMobileWideLayout ? 'mb-6 md:mb-8' : isCompactWide ? 'mb-8 md:mb-8' : 'mb-5 md:mb-5')}>
                <div className={`mb-4 ${mutedLabelClass}`}>способ оплаты</div>
                <div className={cn('grid gap-3 sm:grid-cols-3', isMobileFittedLayout ? 'grid-cols-3 gap-1.5 sm:gap-3' : 'grid-cols-1')}>
                  {methods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={selectorClass(selectedMethod === method.id)}
                    >
                      {method.id === 'usdt' ? (
                        <span className={cn(
                          'absolute left-[-1px] bg-[#8ad036] font-black text-black',
                          isMobileFittedLayout ? '-top-[10px] h-[18px] px-2 pt-[5px] text-[8px] tracking-[0.12em]' : '-top-[11px] h-[20px] px-4 pt-[5px] text-[10px] tracking-[0.18em]',
                        )}>
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

              <div className={cn(
                'flex flex-col sm:flex-row',
                isMobileDenseLayout ? 'mb-6 gap-1 md:mb-3 md:gap-6' : isMobileWideLayout ? 'mb-7 gap-1 md:mb-3 md:gap-6' : isCompactWide ? 'mb-3 gap-5 md:mb-3 md:gap-6' : 'mb-4 gap-5 md:mb-4 md:gap-7',
              )}>
                <div className="min-w-0 flex-1">
                  <div className={`mb-2 flex items-start gap-[1px] ${mutedLabelClass}`}>
                    <span className="-mt-[3px] text-[13px] leading-none text-[#78bd2f]">*</span>
                    <span>telegram</span>
                  </div>
                  <input
                    type="text"
                    placeholder="@user или телефон"
                    value={telegramHandle}
                    onChange={(event) => {
                      setTelegramHandle(event.target.value);
                      if (!telegramError || !event.target.value.trim() || isValidTelegramContact(event.target.value)) {
                        setTelegramError('');
                      }
                    }}
                    onKeyDown={handleFieldKeyDown}
                    className={cn(fieldClass, telegramError && 'border-black bg-white')}
                    aria-invalid={telegramError ? 'true' : 'false'}
                    title="Можно указать @username, username или телефон: +351 912 345 678, 89123456789, (912) 345-67-89"
                  />
                  <div className={cn('overflow-hidden pt-1.5', isMobileFittedLayout ? 'h-[22px] md:h-[28px]' : 'h-[28px]')}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={telegramError || telegramDiscountState}
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: telegramError || telegramDiscountState === 'applied' ? 1 : 0, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.16 }}
                        className="w-full overflow-visible"
                      >
                        <span
                          className={cn(
                            'block whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-[0.16em]',
                            telegramError ? 'text-black/46' : 'text-[#5f9f20]',
                          )}
                        >
                          {telegramError || (telegramDiscountState === 'applied' ? 'скидка Alumni 20% применена' : '\u00a0')}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`mb-2 truncate ${mutedLabelClass}`}>e-mail</div>
                  <input
                    type="email"
                    placeholder="mail@mail.com"
                    onKeyDown={handleFieldKeyDown}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className={cn(
                'flex w-full flex-col',
                isMobileFittedLayout ? 'gap-0.5 md:gap-1.5' : 'gap-1.5',
                isMobileDenseLayout ? 'mb-0 max-w-none md:mb-4 sm:w-[calc((100%-1.5rem)/2)]' : isMobileWideLayout ? 'mb-1 max-w-none md:mb-4 sm:w-[calc((100%-1.5rem)/2)]' : isCompactWide ? 'mb-4 max-w-none sm:w-[calc((100%-1.5rem)/2)] md:mb-4' : 'mb-3 max-w-[238px] md:mb-3',
              )}>
                <div className={`truncate ${mutedLabelClass}`}>промокод</div>
                <input
                  type="text"
                  placeholder="..."
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  onKeyDown={handleFieldKeyDown}
                  className="w-full border-0 border-b border-black/16 bg-transparent pb-2 font-mono text-[16px] font-medium text-black outline-none transition-all placeholder:text-black/34 focus:border-black/60 md:text-[13px]"
                />
                <div className={cn('overflow-hidden pt-1.5', isCompactWide ? 'h-[25px]' : 'h-[42px]')}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={promoCodeDiscountState}
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: promoCodeDiscountState === 'idle' ? 0 : 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.16 }}
                      className="w-full overflow-visible"
                    >
                      <span
                        className={cn(
                          'block whitespace-nowrap font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.16em]',
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
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className={cn('flex items-center justify-end gap-2', isMobileDenseLayout ? 'pb-6 pt-0 md:mt-auto md:pb-3 md:pt-4' : isMobileWideLayout ? 'pb-7 pt-0 md:mt-auto md:pb-3 md:pt-4' : 'mt-auto pt-4', isCompactWide && !isMobileFittedLayout && 'pb-3')}>
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
