import LabW26PageV3 from './LabW26PageV3';

export default function LabW26PageV3Switcher() {
  const scrollToPricing = () => {
    const pricing = document.querySelector('#pricing');
    if (pricing) pricing.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Mobile Bottom CTA */}
      <div className="md:hidden fixed inset-x-0 bottom-6 z-[9999] flex justify-center px-4">
        <button
          type="button"
          onClick={scrollToPricing}
          className="inline-flex w-full max-w-[20rem] items-center justify-center bg-black text-white px-10 py-5 text-xs font-black tracking-widest hover:bg-[#8DC63F] transition-all text-center rounded-sm shadow-2xl active:scale-[0.98]"
        >
          хочу на лабораторию
        </button>
      </div>

      <LabW26PageV3 />
    </>
  );
}
