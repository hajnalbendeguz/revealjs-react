import React, { useCallback, useState } from 'react';
import Code from './Code';
import './Example.css';

export interface ExampleProps {
  source?: string;
  id?: string;
  children: React.ReactNode;
}

export default function Example({
  source: code = '',
  id,
  children,
}: ExampleProps) {
  const [selected, setSelected] = useState<'example' | 'source'>('example');
  const show = useCallback(
    (e: React.MouseEvent, select: 'example' | 'source') => {
      e.preventDefault();
      setSelected(select);
    },
    [setSelected],
  );
  return (
    <div className="example">
      <div style={{ display: selected === 'example' ? 'block' : 'none' }}>
        {children}
        <a href="#source" onClick={(e) => show(e, 'source')}>
          show source
        </a>
      </div>
      <div style={{ display: selected === 'source' ? 'block' : 'none' }}>
        <Code lineNumbers language="tsx" id={id}>
          {{ code }}
        </Code>
        <a href="#example" onClick={(e) => show(e, 'example')}>
          show example
        </a>
      </div>
    </div>
  );
}
