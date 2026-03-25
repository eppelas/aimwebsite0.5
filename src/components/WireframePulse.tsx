export const WireframePulse = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="0.8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#glow)">
    <path
      d="M22 51.5C22 35.2076 35.2076 22 51.5 22C67.7924 22 81 35.2076 81 51.5C81 67.7924 67.7924 81 51.5 81C35.2076 81 22 67.7924 22 51.5Z"
      fill="none"
      stroke="currentColor"
      stroke-width="0.7"
      opacity="0.18"
    >
      <animate attributeName="d" dur="7.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1" values="M22 51.5C22 35.2076 35.2076 22 51.5 22C67.7924 22 81 35.2076 81 51.5C81 67.7924 67.7924 81 51.5 81C35.2076 81 22 67.7924 22 51.5Z;M20 50C20 33.4315 34.3269 20 51 20C67.6731 20 82 33.4315 82 50C82 66.5685 67.6731 80 51 80C34.3269 80 20 66.5685 20 50Z;M22 51.5C22 35.2076 35.2076 22 51.5 22C67.7924 22 81 35.2076 81 51.5C81 67.7924 67.7924 81 51.5 81C35.2076 81 22 67.7924 22 51.5Z;M24 52C24 36.536 36.536 24 52 24C67.464 24 80 36.536 80 52C80 67.464 67.464 80 52 80C36.536 80 24 67.464 24 52Z" />
    </path>
    <path
      d="M31.5 51.5L45.6 65.6L70 41.2"
      fill="none"
      stroke="currentColor"
      stroke-width="2.9"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <animate attributeName="stroke-dasharray" dur="2.4s" repeatCount="indefinite" values="0 80;40 40;80 0;80 0" />
      <animate attributeName="stroke-dashoffset" dur="2.4s" repeatCount="indefinite" values="0;-18;-44;-80" />
      <animate attributeName="opacity" dur="2.4s" repeatCount="indefinite" values="0;0.45;1;1" />
    </path>
    <path
      d="M31.5 51.5L45.6 65.6L70 41.2"
      fill="none"
      stroke="currentColor"
      stroke-width="4.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.14"
    >
      <animate attributeName="stroke-dasharray" dur="2.4s" repeatCount="indefinite" values="0 80;40 40;80 0;80 0" />
      <animate attributeName="stroke-dashoffset" dur="2.4s" repeatCount="indefinite" values="0;-18;-44;-80" />
      <animate attributeName="opacity" dur="2.4s" repeatCount="indefinite" values="0;0.12;0.22;0.18" />
    </path>
    <path
      d="M37 18C29 24.5 24 34.7 24 46"
      fill="none"
      stroke="currentColor"
      stroke-width="0.7"
      stroke-linecap="round"
      opacity="0.48"
    >
      <animate attributeName="opacity" dur="2.2s" repeatCount="indefinite" values="0.12;0.52;0.12" />
    </path>
    <path
      d="M64 82C73.7 78 81 69.4 84 59"
      fill="none"
      stroke="currentColor"
      stroke-width="0.7"
      stroke-linecap="round"
      opacity="0.34"
    >
      <animate attributeName="opacity" dur="2.8s" repeatCount="indefinite" values="0.1;0.4;0.1" />
    </path>
    <circle cx="51.5" cy="51.5" r="18.5" fill="currentColor" opacity="0.12">
      <animate attributeName="r" dur="2.8s" repeatCount="indefinite" values="17.8;19.4;17.8" />
      <animate attributeName="opacity" dur="2.8s" repeatCount="indefinite" values="0.08;0.16;0.08" />
    </circle>
  </g>
</svg>`,
      }}
    />
  );
};
