import { type KeyboardEvent, type TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

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

type SuccessState = 'none' | 'redirecting' | 'paid' | 'failed' | 'join';
type PaymentMethodId = 'usdt' | 'card_ru' | 'card_intl';
type TelegramDiscountState = 'idle' | 'checking' | 'applied' | 'not_applied';
type PromoCodeDiscountState = 'idle' | 'checking' | 'applied' | 'not_applied';
type PaymentStatusVisualVariant = 'signal' | 'terminal' | 'mesh' | 'ascii-handoff' | 'ascii-retry';
type PaymentStatusLayoutVariant = 'classic' | 'split' | 'receipt' | 'console' | 'route' | 'hybrid' | 'hybrid-geo' | 'handoff' | 'pass' | 'recovery';

const PAYMENT_ACQUIRING_URL = 'https://join.aimindset.org/waitlist';
const TELEGRAM_ACCESS_BOT_URL = 'https://t.me/prod_ai_mind_set_bot?start=payment_success';
const TEAMOS_GEO_ANIMATION_SRC = `${import.meta.env.BASE_URL}assets/payment-popups/teamos-geo-animation.svg`;
const ASCII_TELEGRAM_HANDOFF_ANIMATION_SRC = `${import.meta.env.BASE_URL}assets/payment-popups/ascii-aim-telegram-handoff.svg`;
const ASCII_RETRY_ANIMATION_SRC = `${import.meta.env.BASE_URL}assets/payment-popups/ascii-aim-retry.svg`;
const TELEGRAM_ALUMNI_DISCOUNT_HANDLES = new Set(['aim', '@aim']);
const PROMO_CODE_DISCOUNTS = new Set(['ponchik']);
const PAYMENT_STATUS_DEMO_STATES = new Set<SuccessState>(['redirecting', 'paid', 'failed', 'join']);
const PAYMENT_METHOD_IDS = new Set<PaymentMethodId>(['usdt', 'card_ru', 'card_intl']);
const PAYMENT_STATUS_VISUAL_VARIANTS = new Set<PaymentStatusVisualVariant>(['signal', 'terminal', 'mesh', 'ascii-handoff', 'ascii-retry']);
const PAYMENT_STATUS_LAYOUT_VARIANTS = new Set<PaymentStatusLayoutVariant>(['classic', 'split', 'receipt', 'console', 'route', 'hybrid', 'hybrid-geo', 'handoff', 'pass', 'recovery']);

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const formatRoublePrice = (amount: number) => `${new Intl.NumberFormat('ru-RU').format(amount)}\u00a0₽`;
const isKnownAlumniHandle = (value: string) => TELEGRAM_ALUMNI_DISCOUNT_HANDLES.has(value.trim().toLowerCase());
const hasTelegramContact = (value: string) => value.trim().length > 0;
const getIsPaymentVariantPreviewMode = () => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('paymentVariantPreview') === '1';
};
const getRequestedPaymentMethod = (): PaymentMethodId => {
  if (typeof window === 'undefined') return 'card_intl';
  const requestedMethod = new URLSearchParams(window.location.search).get('paymentMethod') as PaymentMethodId | null;
  return requestedMethod && PAYMENT_METHOD_IDS.has(requestedMethod) ? requestedMethod : 'card_intl';
};
const getRequestedPaymentStatusVisual = (): PaymentStatusVisualVariant | null => {
  if (typeof window === 'undefined') return null;
  if (!getIsPaymentVariantPreviewMode()) return null;
  const requestedVisual = new URLSearchParams(window.location.search).get('paymentStatusVisual') as PaymentStatusVisualVariant | null;
  return requestedVisual && PAYMENT_STATUS_VISUAL_VARIANTS.has(requestedVisual) ? requestedVisual : null;
};
const getRequestedPaymentStatusLayout = (): PaymentStatusLayoutVariant | null => {
  if (typeof window === 'undefined') return null;
  if (!getIsPaymentVariantPreviewMode()) return null;
  const requestedLayout = new URLSearchParams(window.location.search).get('paymentStatusLayout') as PaymentStatusLayoutVariant | null;
  return requestedLayout && PAYMENT_STATUS_LAYOUT_VARIANTS.has(requestedLayout) ? requestedLayout : null;
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
  const [telegramHandle, setTelegramHandle] = useState('');
  const [telegramError, setTelegramError] = useState('');
  const [telegramDiscountState, setTelegramDiscountState] = useState<TelegramDiscountState>('idle');
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeDiscountState, setPromoCodeDiscountState] = useState<PromoCodeDiscountState>('idle');
  const panelRef = useRef<HTMLDivElement | null>(null);

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
  const requestedStatusVisualVariant = getRequestedPaymentStatusVisual();
  const statusVisualVariant: PaymentStatusVisualVariant = requestedStatusVisualVariant
    ?? (visibleSuccessState === 'paid' || visibleSuccessState === 'join'
      ? 'ascii-handoff'
      : visibleSuccessState === 'failed'
        ? 'ascii-retry'
        : 'signal');
  const requestedStatusLayoutVariant = getRequestedPaymentStatusLayout();
  const statusLayoutVariant: PaymentStatusLayoutVariant = requestedStatusLayoutVariant
    ?? (visibleSuccessState === 'redirecting'
      ? 'console'
      : visibleSuccessState === 'failed'
        ? 'recovery'
        : visibleSuccessState === 'paid' || visibleSuccessState === 'join'
          ? 'handoff'
          : 'classic');
  const isCompactRedirectConsole = visibleSuccessState === 'redirecting' && statusLayoutVariant === 'console';
  const isCompactStatusShell = isCompactRedirectConsole
    || ((visibleSuccessState === 'paid' || visibleSuccessState === 'join') && statusLayoutVariant === 'handoff')
    || (visibleSuccessState === 'failed' && statusLayoutVariant === 'recovery');
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
    setTelegramHandle('');
    setTelegramError('');
    setTelegramDiscountState('idle');
    setPromoCode('');
    setPromoCodeDiscountState('idle');
  };

  const blurActiveElement = () => {
    if (typeof document === 'undefined') return;
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  const handleClose = () => {
    blurActiveElement();
    resetState();
    onClose();
  };

  const handleInitialPay = () => {
    blurActiveElement();

    if (!hasTelegramContact(telegramHandle)) {
      setTelegramError('укажите telegram или телефон');
      return;
    }

    setTelegramError('');
    setSuccessState('redirecting');
  };

  const clearForcedPaymentStatus = () => {
    if (typeof window !== 'undefined' && forcedPaymentStatus) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.delete('paymentStatus');
      window.history.replaceState(window.history.state, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    }
  };

  const handleReturnToPaymentForm = () => {
    blurActiveElement();
    clearForcedPaymentStatus();

    setSuccessState('none');
  };

  const handleFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const handleOverlayTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel || !panel.contains(event.target as Node)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscrollBehavior = html.style.overscrollBehavior;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const previousOverflow = body.style.overflow;
    const previousOverflowY = body.style.overflowY;
    const previousBodyOverscrollBehavior = body.style.overscrollBehavior;
    const shouldLockBody = !window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';

    if (shouldLockBody) {
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflowY = 'scroll';
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscrollBehavior;
      body.style.overflow = previousOverflow;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;

      if (shouldLockBody) {
        body.style.position = previousPosition;
        body.style.top = previousTop;
        body.style.width = previousWidth;
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
    isMobileFittedLayout ? 'min-h-[44px] px-1.5 text-[11px] tracking-[0.14em]' : 'min-h-[50px] px-3 text-[11px] tracking-[0.28em]',
    isActive
      ? 'border-black bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]'
      : 'border-black/80 bg-white text-black hover:border-black hover:bg-[#f3f3f3]',
  );

  const fieldClass =
    'w-full border border-black/14 bg-[#f7f7f7] px-3 py-2 font-mono text-[16px] font-medium leading-none text-black outline-none transition-colors placeholder:text-black/32 [&::placeholder]:text-[11px] focus:border-black/70 focus:bg-white md:px-4 md:py-[13px] md:text-[13px] md:leading-normal md:[&::placeholder]:text-[13px]';

  const mutedLabelClass =
    'font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/46';

  const primaryButtonClass =
    'inline-flex h-[46px] min-w-[170px] items-center justify-center bg-[#8ad036] px-8 font-mono text-[12px] font-black lowercase leading-none tracking-[0.2em] text-black transition-all duration-150 hover:scale-[1.025] hover:bg-[#79bd2d]';
  const statusPrimaryButtonClass = cn(primaryButtonClass, 'w-[240px] max-w-full px-4');
  const statusSecondaryButtonClass =
    'inline-flex h-[46px] w-[240px] max-w-full items-center justify-center px-4 font-mono text-[12px] font-black lowercase leading-none tracking-[0.2em] text-black/46 underline decoration-transparent underline-offset-4 transition-colors hover:text-black hover:decoration-black';

  const renderStatusScreen = () => {
    const statusCopy: Record<Exclude<SuccessState, 'none'>, { label: string; title: string; body: string; tone: 'success' | 'neutral' | 'danger'; cta?: string }> = {
      redirecting: {
        label: 'переход к оплате',
        title: 'ПЕРЕХОД К ОПЛАТЕ',
        body: '',
        tone: 'neutral',
      },
      paid: {
        label: 'статус оплаты',
        title: 'ОПЛАТА ПОЛУЧЕНА',
        body: 'Перейдите в Telegram-бот для доступа к группе.',
        tone: 'success',
        cta: '/присоединиться',
      },
      failed: {
        label: 'статус оплаты',
        title: 'ОПЛАТА НЕ ПРОШЛА',
        body: 'Платёж не подтвердился. Деньги не списались или банк отклонил операцию. Можно попробовать снова.',
        tone: 'danger',
      },
      join: {
        label: 'доступ к группе',
        title: 'ОТКРОЙТЕ БОТА',
        body: 'Перейдите в Telegram-бот для доступа к группе.',
        tone: 'success',
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
    const stepLabel = activeSuccessState === 'redirecting'
      ? '01 route'
      : activeSuccessState === 'failed'
        ? '02 retry'
        : '03 access';

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

    const renderStatusActions = (align: 'right' | 'center' | 'full' = 'right') => (
      <div className={cn(
        'flex items-center gap-2',
        align === 'full' ? 'w-full flex-col sm:flex-row' : align === 'center' ? 'justify-center' : 'justify-end',
      )}>
        {activeSuccessState === 'failed' || activeSuccessState === 'redirecting' ? (
          <button
            type="button"
            onClick={handleReturnToPaymentForm}
            className={cn(
              statusSecondaryButtonClass,
              align === 'full' && 'w-full sm:w-[240px]',
            )}
          >
            отмена
          </button>
        ) : null}
        {activeSuccessState === 'failed' ? (
          <button
            type="button"
            onClick={handleReturnToPaymentForm}
            className={cn(statusPrimaryButtonClass, 'bg-black text-white hover:bg-black/82', align === 'full' && 'w-full sm:w-[240px]')}
          >
            /попробовать снова
          </button>
        ) : showBotCta ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(statusPrimaryButtonClass, align === 'full' && 'w-full sm:w-[240px]')}
          >
            {copy.cta}
          </a>
        ) : null}
      </div>
    );

    if (statusLayoutVariant === 'route') {
      return (
        <motion.div key={`${activeSuccessState}-route`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-full flex-col py-7 md:py-10">
          <div className="mb-7 pr-14">
            <div className={mutedLabelClass}>payment route</div>
            <h3 className="mt-3 max-w-[420px] font-sans text-[34px] font-black uppercase leading-[0.94] tracking-[0.01em] text-black md:text-[44px]">
              ОТКРЫВАЕМ СТРАНИЦУ ОПЛАТЫ
            </h3>
          </div>
          <div className="grid gap-3 md:grid-cols-[88px_1fr]">
            <div className="grid grid-rows-3 border border-black font-mono text-[10px] font-black uppercase tracking-[0.16em]">
              {['данные', 'шлюз', 'банк'].map((item, index) => (
                <div key={item} className={cn('flex items-center justify-center border-b border-black last:border-b-0', index === 1 && 'bg-[#8ad036] text-black')}>
                  {String(index + 1).padStart(2, '0')} {item}
                </div>
              ))}
            </div>
            <div className="flex min-h-[228px] flex-col justify-between border border-black bg-white p-5">
              <div className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-black/38">заказ {orderNumber}</div>
              <p className="max-w-[420px] font-sans text-[24px] leading-tight text-black/72">
                {copy.body}
              </p>
              <div className="h-2 w-full overflow-hidden bg-black/8">
                <motion.div
                  className="h-full w-1/3 bg-[#8ad036]"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
          <div className="mt-auto flex justify-end pt-8">
            {renderStatusActions()}
          </div>
        </motion.div>
      );
    }

    if (statusLayoutVariant === 'hybrid' || statusLayoutVariant === 'hybrid-geo') {
      const showGeoAnimation = statusLayoutVariant === 'hybrid-geo';

      return (
        <motion.div key={`${activeSuccessState}-hybrid`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-full flex-col py-7 md:py-10">
          <div className="mb-6 pr-14">
            <h3 className="mt-3 max-w-[430px] font-sans text-[34px] font-black uppercase leading-[0.94] tracking-[0.01em] text-black md:text-[43px]">
              ПЕРЕХОД К ОПЛАТЕ
            </h3>
            {copy.body ? (
              <p className="mt-4 max-w-[460px] font-sans text-[19px] leading-snug text-black/62">
                {copy.body}
              </p>
            ) : null}
          </div>

          <div className="relative overflow-hidden rounded-[4px] border border-black bg-black p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            {showGeoAnimation ? (
              <div className="pointer-events-none absolute bottom-7 right-5 top-4 w-[190px] opacity-45 md:right-8 md:w-[230px]">
                <img
                  src={TEAMOS_GEO_ANIMATION_SRC}
                  alt=""
                  className="h-full w-full object-contain"
                  aria-hidden="true"
                />
              </div>
            ) : null}
            <div className="relative z-10 mb-7 flex items-start justify-between gap-5">
              <div className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-white/42">payment route</div>
              <motion.div
                className="h-2 w-2 rounded-full bg-[#8ad036] shadow-[0_0_18px_rgba(138,208,54,0.8)]"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>

            <div className="relative z-10 mb-5 grid gap-2 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-white/58">
              <div>&gt; order {orderNumber}</div>
              <div>&gt; state redirecting</div>
              <div className="text-[#8ad036]">&gt; gateway request sent</div>
            </div>

            <div className="relative z-10 mt-4 grid grid-cols-[56px_1fr_56px] border border-white/16 font-mono text-[8px] font-black uppercase tracking-[0.12em]">
              <div className="flex h-[17px] items-center justify-center border-r border-white/16 text-white/38">site</div>
              <div className="relative h-[17px] overflow-hidden bg-white/6">
                <motion.div
                  className="absolute inset-y-0 left-0 w-1/5 bg-[#8ad036]/70"
                  animate={{ x: ['-110%', '310%'] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div className="flex h-[17px] items-center justify-center border-l border-white/16 text-white/38">bank</div>
            </div>
          </div>

          <div className="mt-auto flex justify-center pt-8">
            {renderStatusActions()}
          </div>
        </motion.div>
      );
    }

    if (statusLayoutVariant === 'handoff') {
      const showAsciiHandoffVisual = statusVisualVariant === 'ascii-handoff';

      return (
        <motion.div key={`${activeSuccessState}-handoff`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex h-full min-h-0 flex-col pb-3 pt-7 md:pb-[75px] md:pt-10">
          <div data-payment-status-board="handoff" className="relative min-h-[166px] overflow-hidden rounded-[4px] border border-black bg-black px-4 py-3.5 text-white md:min-h-[220px] md:px-5 md:py-5">
            {showAsciiHandoffVisual ? (
              <motion.img
                src={ASCII_TELEGRAM_HANDOFF_ANIMATION_SRC}
                alt=""
                className="pointer-events-none absolute right-3 top-8 h-[116px] w-[116px] object-contain opacity-50 mix-blend-screen md:bottom-[-38px] md:right-4 md:top-auto md:h-[245px] md:w-[245px]"
                aria-hidden="true"
                animate={{ opacity: [0.34, 0.62, 0.34] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            ) : null}
            <motion.div
              className="absolute inset-y-0 right-0 w-px bg-[#8ad036]"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/42 md:text-[10px] md:tracking-[0.22em]">telegram handoff</div>
            <h3 className="relative z-10 mt-2 max-w-[230px] font-sans text-[24px] font-black leading-[1.01] tracking-[0.01em] !text-white md:mt-3 md:max-w-[420px] md:text-[36px]">
              <span className="block uppercase">ОПЛАТА ПРОШЛА.</span>
              <span className="block text-[0.68em] normal-case leading-[1.05] md:text-[0.86em]">присоединяйтесь к группе</span>
            </h3>
            <div className="relative z-10 mt-4 grid grid-cols-[1fr_auto] items-end gap-4 font-mono text-[9px] font-black uppercase leading-relaxed tracking-[0.16em] text-white/44 md:mt-5 md:text-[10px]">
              <div>
                заказ<br />
                <span className="text-[#8ad036]">{orderNumber}</span>
              </div>
              <motion.div
                className="h-3 w-3 rounded-full bg-[#8ad036] shadow-[0_0_24px_rgba(138,208,54,0.85)]"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </div>

          <div data-payment-status-body="handoff" className="mt-2 flex min-h-[84px] items-center justify-center bg-white px-2 py-1.5 text-center font-sans text-[13px] leading-[1.32] text-black/70 md:mt-4 md:min-h-[78px] md:px-5 md:py-2 md:text-[15px] md:leading-[1.28]">
            <span>{copy.body}</span>
          </div>
          <div data-payment-status-action="handoff" className="absolute bottom-2 left-0 right-0 flex justify-center md:bottom-[29px]">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={statusPrimaryButtonClass}
            >
              /присоединиться
            </a>
          </div>
        </motion.div>
      );
    }

    if (statusLayoutVariant === 'pass') {
      return (
        <motion.div key={`${activeSuccessState}-pass`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-full flex-col py-7 md:py-10">
          <div className="overflow-hidden border border-black bg-white">
            <div className="grid grid-cols-[1fr_92px] border-b border-black">
              <div className="bg-[#8ad036] px-5 py-5">
                <div className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-black/52">access pass</div>
                <h3 className="mt-3 font-sans text-[36px] font-black uppercase leading-none tracking-[0.01em] text-black">
                  ОПЛАТА ПОЛУЧЕНА
                </h3>
              </div>
              <div className="flex items-center justify-center border-l border-black font-mono text-[28px] font-black text-black">OK</div>
            </div>
            <div className="grid gap-0 md:grid-cols-[1fr_170px]">
              <div className="px-5 py-6 font-sans text-[18px] leading-relaxed text-black/72">
                {copy.body}
              </div>
              <div className="border-t border-black/12 bg-[#f6f6f6] px-5 py-6 font-mono text-[10px] font-black uppercase leading-relaxed tracking-[0.16em] text-black/42 md:border-l md:border-t-0">
                order<br />
                <span className="text-black">{orderNumber}</span>
              </div>
            </div>
          </div>
          <div className="mt-auto flex justify-end pt-8">
            {renderStatusActions()}
          </div>
        </motion.div>
      );
    }

    if (statusLayoutVariant === 'recovery') {
      const showAsciiRetryVisual = statusVisualVariant === 'ascii-retry';

      return (
        <motion.div key={`${activeSuccessState}-recovery`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex h-full min-h-0 flex-col pb-3 pt-7 md:pb-[75px] md:pt-10">
          <div data-payment-status-board="recovery" className="relative min-h-[166px] overflow-hidden rounded-[4px] border border-black bg-black px-4 py-3.5 text-white md:min-h-[220px] md:px-5 md:py-5">
            {showAsciiRetryVisual ? (
              <motion.img
                src={ASCII_RETRY_ANIMATION_SRC}
                alt=""
                className="pointer-events-none absolute right-4 top-8 h-[116px] w-[116px] object-contain opacity-58 mix-blend-screen md:bottom-[-62px] md:right-0 md:top-auto md:h-[230px] md:w-[230px]"
                aria-hidden="true"
                animate={{ opacity: [0.4, 0.72, 0.4] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            ) : null}
            <motion.div
              className="absolute inset-x-0 top-0 h-[2px] bg-[#d93025]"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/42 md:text-[10px] md:tracking-[0.22em]">payment error</div>
            <h3 className="relative z-10 mt-2 max-w-[230px] font-sans text-[27px] font-black uppercase leading-[0.98] tracking-[0.01em] !text-white md:mt-3 md:max-w-[360px] md:text-[36px]">
              ОПЛАТА НЕ ПРОШЛА
            </h3>
          </div>
          <div data-payment-status-row="recovery" className="my-2 grid min-h-[84px] grid-cols-[minmax(0,1fr)_106px] gap-2 md:my-4 md:min-h-[78px] md:grid-cols-[1fr_150px] md:gap-3">
            <div className="flex items-center border border-black/14 bg-white p-2 font-sans text-[12px] leading-[1.18] text-black/70 md:p-3.5 md:text-[14px] md:leading-[1.24]">
              {copy.body}
            </div>
            <div className="flex flex-col justify-center border border-black/14 bg-white p-2 font-mono text-[8px] font-black uppercase leading-[1.35] tracking-[0.14em] text-black/42 md:p-3 md:text-[9.5px] md:leading-[1.42] md:tracking-[0.16em]">
              заказ<br />
              <span className="text-black">{orderNumber}</span><br />
              статус<br />
              <span className="text-[#d93025]">unpaid</span>
            </div>
          </div>
          <div data-payment-status-action="recovery" className="absolute bottom-2 left-0 right-0 flex justify-center md:bottom-[29px]">
            <button
              type="button"
              onClick={handleReturnToPaymentForm}
              className={cn(statusPrimaryButtonClass, 'bg-black text-white hover:bg-black/82')}
            >
              /попробовать снова
            </button>
          </div>
        </motion.div>
      );
    }

    if (statusLayoutVariant === 'split') {
      return (
        <motion.div key={`${activeSuccessState}-split`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid min-h-full grid-rows-[auto_1fr_auto] py-7 md:py-10">
          <div className="flex items-start justify-between gap-8 pr-14">
            <div>
              <div className={mutedLabelClass}>{copy.label}</div>
              <h3 className="mt-4 max-w-[360px] font-sans text-[34px] font-black uppercase leading-[0.94] tracking-[0.01em] text-black md:text-[42px]">
                {copy.title}
              </h3>
            </div>
            <div className="hidden md:block">{renderStatusMark()}</div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_170px]">
            <div className={cn(
              'flex min-h-[210px] items-end rounded-[4px] border p-5 font-sans text-[18px] leading-snug',
              isSuccess ? 'border-[#8ad036] bg-[#f4faed] text-black/78' : 'border-black bg-white text-black/72',
            )}>
              {copy.body}
            </div>
            <div className="grid content-between rounded-[4px] border border-black bg-black p-4 text-white">
              <div className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/42">{stepLabel}</div>
              <div className="font-mono text-[11px] font-black uppercase leading-relaxed tracking-[0.16em]">
                заказ<br />
                <span className="text-[#8ad036]">{orderNumber}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            {renderStatusActions()}
          </div>
        </motion.div>
      );
    }

    if (statusLayoutVariant === 'receipt') {
      return (
        <motion.div key={`${activeSuccessState}-receipt`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-full flex-col py-7 md:py-10">
          <div className="mb-8 border-b border-black pb-5 pr-14">
            <div className={mutedLabelClass}>{copy.label}</div>
            <h3 className="mt-3 font-sans text-[32px] font-black uppercase leading-none tracking-[0.01em] text-black md:text-[39px]">
              {copy.title}
            </h3>
          </div>
          <div className="grid gap-0 overflow-hidden rounded-[4px] border border-black bg-white">
            <div className="grid grid-cols-[120px_1fr] border-b border-black/12">
              <div className="bg-[#f6f6f6] px-4 py-4 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-black/38">статус</div>
              <div className="px-4 py-4 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-[#5f9f20]">{copy.tone === 'danger' ? 'требует повтора' : activeSuccessState === 'redirecting' ? 'открываем оплату' : 'готово'}</div>
            </div>
            <div className="grid grid-cols-[120px_1fr] border-b border-black/12">
              <div className="bg-[#f6f6f6] px-4 py-4 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-black/38">заказ</div>
              <div className="px-4 py-4 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-black/60">{orderNumber}</div>
            </div>
            <div className="grid grid-cols-[120px_1fr]">
              <div className="bg-[#f6f6f6] px-4 py-4 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-black/38">дальше</div>
              <div className="px-4 py-4 font-sans text-[15px] leading-relaxed text-black/72">{copy.body}</div>
            </div>
          </div>
          <div className="mt-auto pt-8">
            {renderStatusActions('full')}
          </div>
        </motion.div>
      );
    }

    if (statusLayoutVariant === 'console') {
      return (
        <motion.div key={`${activeSuccessState}-console`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex h-full min-h-0 flex-col pb-4 pt-7 md:pb-[75px] md:pt-10">
          <div data-payment-status-board="console" className="relative flex min-h-[222px] w-full flex-col overflow-hidden rounded-[4px] border border-black bg-black p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:min-h-[274px] md:p-5">
            <motion.img
              src={TEAMOS_GEO_ANIMATION_SRC}
              alt=""
              className="pointer-events-none absolute right-4 top-[58px] h-[112px] w-[112px] object-contain opacity-55 mix-blend-screen md:right-6 md:top-[54px] md:h-[150px] md:w-[150px]"
              aria-hidden="true"
              animate={{
                opacity: [0.34, 0.74, 0.34],
                scale: [0.985, 1.025, 0.985],
                filter: [
                  'drop-shadow(0 0 5px rgba(56,189,248,0.14))',
                  'drop-shadow(0 0 15px rgba(56,189,248,0.42))',
                  'drop-shadow(0 0 5px rgba(56,189,248,0.14))',
                ],
              }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative z-10 mb-4 flex items-center justify-end gap-4 md:mb-5">
              <motion.div
                className="h-2 w-2 rounded-full bg-[#8ad036]"
                animate={{
                  opacity: [0.45, 1, 0.45],
                  scale: [0.92, 1.12, 0.92],
                  boxShadow: [
                    '0 0 10px rgba(138,208,54,0.22)',
                    '0 0 34px rgba(138,208,54,0.92)',
                    '0 0 10px rgba(138,208,54,0.22)',
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="relative z-10 max-w-[430px] pr-16 md:pr-20">
              <h3 className="font-sans text-[27px] font-black uppercase leading-[1] tracking-[0.01em] !text-white md:text-[36px]">
                {copy.title}
              </h3>
              <div className="mt-5 grid gap-1.5 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.13em] text-white/58 md:mt-7 md:gap-2 md:text-[10px] md:tracking-[0.14em]">
                <div>&gt; order {orderNumber}</div>
                <div>&gt; state {activeSuccessState}</div>
                <div className="text-[#8ad036]">&gt; {activeSuccessState === 'failed' ? 'retry available' : activeSuccessState === 'redirecting' ? 'gateway request sent' : 'telegram bot ready'}</div>
              </div>
            </div>

            <div className="relative z-10 mt-auto grid grid-cols-[56px_1fr_56px] border border-white/18 font-mono text-[8px] font-black uppercase tracking-[0.12em]">
              <div className="flex h-[22px] items-center justify-center border-r border-white/18 text-white/42 md:h-[24px]">site</div>
              <div className="relative h-[22px] overflow-hidden bg-white/6 md:h-[24px]">
                <motion.div
                  className="absolute inset-y-0 left-0 w-[22%] bg-[#8ad036]/72"
                  animate={{
                    x: ['-120%', '455%'],
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      '0 0 0 rgba(138,208,54,0)',
                      '0 0 24px rgba(138,208,54,0.58)',
                      '0 0 0 rgba(138,208,54,0)',
                    ],
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="flex h-[22px] items-center justify-center border-l border-white/18 text-white/42 md:h-[24px]">bank</div>
            </div>
          </div>
          {copy.body ? (
            <div className="mt-5 border-l-2 border-[#8ad036] pl-4 font-sans text-[16px] leading-relaxed text-black/72">
              {copy.body}
            </div>
          ) : null}
          <div data-payment-status-action="console" className="absolute bottom-2 left-0 right-0 md:bottom-[29px]">
            {renderStatusActions('center')}
          </div>
        </motion.div>
      );
    }

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
          {renderStatusActions()}
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
      onTouchMove={handleOverlayTouchMove}
    >
      <motion.div
        ref={panelRef}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={cn(
          'relative flex w-full flex-col overflow-y-auto overscroll-contain rounded-[4px] border border-black bg-white text-left font-mono text-black shadow-[0_34px_110px_rgba(0,0,0,0.14)] md:max-h-[calc(100dvh-2rem)]',
          isCompactStatusShell
            ? 'h-[412px] max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-1.5rem)] px-5 pb-4 pt-6'
            : isMobileDenseLayout
              ? 'max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-0.5rem)] max-w-[calc(100vw-8px)] p-3.5 pt-4'
              : isMobileWideLayout
                ? 'max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-0.75rem)] max-w-[calc(100vw-8px)] p-3.5 pt-4'
                : 'max-h-[calc(100dvh-env(safe-area-inset-bottom,0px)-1.5rem)] p-7 pt-8',
          isCompactStatusShell
            ? 'md:mr-10 md:h-[528px] md:max-w-[560px] md:p-7'
            : isCompactWide
            ? 'md:mr-10 md:h-[640px] md:max-w-[560px] md:p-7'
            : 'max-w-[500px] md:h-[642px] md:p-[30px]',
        )}
        data-payment-panel={visibleSuccessState !== 'none' ? visibleSuccessState : 'form'}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-7 w-7 appearance-none items-center justify-center border-0 !bg-transparent p-0 text-black/72 shadow-none outline-none transition-colors duration-150 hover:text-black focus-visible:ring-2 focus-visible:ring-black/30 md:right-6 md:top-6"
          aria-label="Закрыть"
        >
          <X className="h-7 w-7" strokeWidth={1.7} />
        </button>

        <AnimatePresence mode="wait">
          {visibleSuccessState !== 'none' ? renderStatusScreen() : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <div className={cn(
                'pr-16 md:pr-20',
                isMobileDenseLayout ? 'mb-4 md:mb-9' : isMobileWideLayout ? 'mb-4 md:mb-9' : isCompactWide ? 'mb-9 md:mb-9' : 'mb-6 md:mb-6',
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
                isMobileDenseLayout ? 'mb-4 gap-2 px-3 py-2.5 md:mb-6 md:gap-4 md:py-4' : isMobileWideLayout ? 'mb-4 gap-2 px-3.5 py-2.5 md:mb-6 md:gap-4 md:py-4' : isCompactWide ? 'mb-6 gap-4 px-4 py-4 md:mb-6 md:py-4' : 'mb-5 gap-4 px-4 py-4 md:mb-5 md:py-[18px]',
              )}>
                <div>
                  <div className={cn(
                    'font-mono font-black uppercase text-black/48',
                    isMobileFittedLayout ? 'text-[10px] tracking-[0.18em] md:text-[12px] md:tracking-[0.24em]' : 'text-[12px] tracking-[0.24em]',
                  )}>{isMobileFittedLayout ? 'к оплате:' : 'итого к оплате:'}</div>
                </div>
                <div className={cn('relative flex items-center justify-end text-right', isMobileFittedLayout ? 'h-[42px]' : 'h-[54px]')}>
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

              <div className={cn('text-left', isMobileDenseLayout ? 'mb-4 md:mb-8' : isMobileWideLayout ? 'mb-4 md:mb-8' : isCompactWide ? 'mb-8 md:mb-8' : 'mb-5 md:mb-5')}>
                <div className={cn(mutedLabelClass, isMobileFittedLayout ? 'mb-3' : 'mb-4')}>способ оплаты</div>
                <div className={cn('grid gap-3 sm:grid-cols-3', isMobileFittedLayout ? 'grid-cols-3 gap-1 sm:gap-3' : 'grid-cols-1')}>
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
                          isMobileFittedLayout ? '-top-[9px] h-[17px] px-1.5 pt-[5px] text-[8px] tracking-[0.08em]' : '-top-[11px] h-[20px] px-4 pt-[5px] text-[10px] tracking-[0.18em]',
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
                isMobileDenseLayout ? 'mb-4 gap-0.5 md:mb-3 md:gap-6' : isMobileWideLayout ? 'mb-4 gap-0.5 md:mb-3 md:gap-6' : isCompactWide ? 'mb-3 gap-5 md:mb-3 md:gap-6' : 'mb-4 gap-5 md:mb-4 md:gap-7',
              )}>
                <div className="min-w-0 flex-1">
                  <div className={cn('mb-2 flex items-start gap-[1px]', mutedLabelClass)}>
                    <span className={cn('-mt-[3px] text-[13px] leading-none text-[#78bd2f]', telegramError && '!text-[#d93025]')}>*</span>
                    <span>telegram</span>
                  </div>
                  <input
                    type="text"
                    placeholder="@user или телефон"
                    value={telegramHandle}
                    onChange={(event) => {
                      setTelegramHandle(event.target.value);
                      if (!telegramError || hasTelegramContact(event.target.value)) {
                        setTelegramError('');
                      }
                    }}
                    onKeyDown={handleFieldKeyDown}
                    className={cn(
                      fieldClass,
                      telegramError && '!border-[#d93025] focus:!border-[#d93025]',
                    )}
                    aria-invalid={telegramError ? 'true' : 'false'}
                    aria-describedby={telegramError ? 'payment-telegram-error' : undefined}
                    title="Можно указать @username, username или телефон: +351 912 345 678, 89123456789, (912) 345-67-89"
                  />
                  <div className={cn('overflow-hidden pt-1', isMobileFittedLayout ? 'h-[18px] md:h-[28px]' : 'h-[28px]')}>
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
                          id={telegramError ? 'payment-telegram-error' : undefined}
                          role={telegramError ? 'alert' : undefined}
                          className={cn(
                            'block whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-[0.16em]',
                            telegramError ? '!text-[10px] !text-[#d93025]' : 'text-[#5f9f20]',
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
                  className="w-full border-0 border-b border-black/16 bg-transparent pb-1.5 font-mono text-[16px] font-medium leading-none text-black outline-none transition-all placeholder:text-black/34 [&::placeholder]:text-[11px] focus:border-black/60 md:pb-2 md:text-[13px] md:leading-normal md:[&::placeholder]:text-[13px]"
                />
                <div className={cn('overflow-hidden pt-1', isCompactWide ? 'h-[18px] md:h-[25px]' : 'h-[42px]')}>
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

              <div className={cn('flex items-center justify-end gap-2', isMobileDenseLayout ? 'pb-2 pt-0 md:mt-auto md:pb-3 md:pt-4' : isMobileWideLayout ? 'pb-2 pt-0 md:mt-auto md:pb-3 md:pt-4' : 'mt-auto pt-4', isCompactWide && !isMobileFittedLayout && 'pb-3')}>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex h-[46px] min-w-[110px] shrink-0 items-center justify-center px-4 font-mono text-[12px] font-black lowercase leading-none tracking-[0.2em] text-black/46 underline decoration-transparent underline-offset-4 transition-colors hover:text-black hover:decoration-black"
                >
                  отмена
                </button>
                <button
                  type="button"
                  onClick={handleInitialPay}
                  className={`${primaryButtonClass} whitespace-nowrap`}
                >
                  оплатить
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
