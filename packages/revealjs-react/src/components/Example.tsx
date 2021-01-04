import React from 'react';
import { Code } from '..';

export interface ExampleProps {
  source?: string;
  language: string;
  children: React.ReactNode;
}

export default function Example({
  source: code = '',
  children,
  language,
}: ExampleProps) {
  return (
    <div className="example">
      {children}
      <Code lineNumbers language={language}>
        {{ code }}
      </Code>
    </div>
  );
}
