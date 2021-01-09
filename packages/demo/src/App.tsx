import './App.css';
import {
  RevealJS,
  Slide,
  HighlightPlugin,
  NotesPlugin,
  Code,
} from '@gregcello/revealjs-react';
import { Example } from '@gregcello/revealjs-react/example.macro';
import 'reveal.js/dist/theme/moon.css';
import 'reveal.js/plugin/highlight/monokai.css';

const plugins = [HighlightPlugin, NotesPlugin];

function App() {
  return (
    <div className="App">
      <RevealJS plugins={plugins} history>
        <Slide>
          <Example language="typescript">
            <Code language="typescript">
              {{ code: 'const f: number = 2;' }}
            </Code>
          </Example>
        </Slide>
      </RevealJS>
    </div>
  );
}

export default App;
