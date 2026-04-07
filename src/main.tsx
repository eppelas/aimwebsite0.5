import { Component, StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const ensureRuntimeOverlay = () => {
  let node = document.getElementById('__runtime-error-overlay') as HTMLPreElement | null;
  if (!node) {
    node = document.createElement('pre');
    node.id = '__runtime-error-overlay';
    node.style.position = 'fixed';
    node.style.inset = '16px';
    node.style.zIndex = '2147483647';
    node.style.margin = '0';
    node.style.padding = '16px';
    node.style.overflow = 'auto';
    node.style.whiteSpace = 'pre-wrap';
    node.style.wordBreak = 'break-word';
    node.style.background = 'rgba(255,245,235,0.96)';
    node.style.border = '2px solid #111';
    node.style.boxShadow = '0 12px 40px rgba(0,0,0,0.18)';
    node.style.font = '12px/1.5 "IBM Plex Mono", monospace';
    node.style.color = '#111';
    document.body.appendChild(node);
  }
  return node;
};

const showRuntimeError = (title: string, detail: string) => {
  const node = ensureRuntimeOverlay();
  node.textContent = `${title}\n\n${detail}`;
};

if (import.meta.env.DEV) {

  window.addEventListener('error', (event) => {
    const detail = event.error?.stack || event.message || 'Unknown runtime error';
    showRuntimeError('Runtime error', detail);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const detail =
      typeof reason === 'object' && reason && 'stack' in reason
        ? String((reason as { stack?: string }).stack || reason)
        : String(reason);
    showRuntimeError('Unhandled promise rejection', detail);
  });
}

class DevErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  declare props: { children: ReactNode };
  declare state: { error: Error | null };

  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.DEV) {
      showRuntimeError('React render error', error.stack || String(error));
    }
  }

  render() {
    if (this.state.error && import.meta.env.DEV) {
      return null;
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevErrorBoundary>
      <App />
    </DevErrorBoundary>
  </StrictMode>,
);
