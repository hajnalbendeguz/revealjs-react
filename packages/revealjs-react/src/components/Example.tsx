import React from 'react';
import { Code } from '..';

export interface ExampleProps {
  source?: string;
  children: React.ReactNode;
}

export default function Example({ source: code = '', children }: ExampleProps) {
  return (
    <div className="example">
      {children}
      <Code lineNumbers>{{ code }}</Code>
    </div>
  );
}
