'use client';

import { useEffect, useRef } from 'react';

interface MermaidDiagramProps {
  definition: string;
  id: string;
}

export default function MermaidDiagram({ definition, id }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#0d1117',
          primaryColor: '#1e3a5f',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#3b82f6',
          lineColor: '#64748b',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          edgeLabelBackground: '#1e293b',
          clusterBkg: '#0f172a',
          titleColor: '#e2e8f0',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontSize: '14px',
          nodeBorder: '#3b82f6',
          mainBkg: '#1e293b',
          nodeTextColor: '#e2e8f0',
        },
        flowchart: { curve: 'basis', padding: 30, useMaxWidth: false },
        securityLevel: 'loose',
      });

      if (ref.current && !cancelled) {
        try {
          const { svg } = await mermaid.render(`mermaid-${id}`, definition);
          if (ref.current && !cancelled) {
            ref.current.innerHTML = svg;
            // Make SVG responsive
            const svgEl = ref.current.querySelector('svg');
            if (svgEl) {
              svgEl.removeAttribute('style');
              svgEl.removeAttribute('width');
              svgEl.removeAttribute('height');
              svgEl.style.width = '100%';
              svgEl.style.height = 'auto';
              svgEl.style.minHeight = '500px';
              svgEl.style.display = 'block';
            }
          }
        } catch (e) {
          if (ref.current && !cancelled) {
            ref.current.innerHTML = '<p class="text-slate-500 text-sm text-center py-8">Diagram loading...</p>';
          }
        }
      }
    }
    render();
    return () => { cancelled = true; };
  }, [definition, id]);

  return (
    <div
      ref={ref}
      className="w-full overflow-x-auto min-h-[500px] p-4"
    />
  );
}
