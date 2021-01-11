import './App.css';
import {
  RevealJS,
  Slide,
  PrismHighlightPlugin,
  NotesPlugin,
  Code,
  PrismOptions,
} from '@gregcello/revealjs-react';
import { Example } from '@gregcello/revealjs-react/example.macro';
import 'reveal.js/dist/theme/moon.css';

const plugins = [PrismHighlightPlugin, NotesPlugin];
const pluginProps: PrismOptions = {
  prism: {
    languages: ['jsx', 'tsx', 'typescript'],
    theme: 'tomorrow',
    plugins: ['line-numbers', 'line-highlight'],
  },
};

function App() {
  return (
    <div className="App">
      <RevealJS plugins={plugins} history pluginProps={pluginProps}>
        <Slide>
          <Example>
            <Code language="tsx" lineNumbers="16" id="example">
              {{
                code: `<RevealJS plugins={plugins} history pluginProps={pluginProps}>
  <Slide>
    <Example>
      <Code language="typescript">
        {{ code: \`
const f: number = 4;
console.log(f);
\`}}
      </Code>
    </Example>
  </Slide>
  </RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
</RevealJS>
`,
              }}
            </Code>
          </Example>
        </Slide>
      </RevealJS>
    </div>
  );
}

export default App;
