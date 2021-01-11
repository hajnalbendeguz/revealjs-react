import Prism from 'prismjs';
import Reveal, {
  MightBeRevealPlugin,
  RevealPlugin,
  RevealPluginDefinition,
} from '../../types/reveal.js';
import {
  PrismLanguages,
  PrismPlugins,
  PrismThemes,
} from './PrismHighlightPlugin/types';
import './PrismHighlightPlugin/PrismHighlight.css';

window.Prism = Prism;

export interface PrismOptions {
  prism?: {
    languages?: PrismLanguages[];
    plugins?: PrismPlugins[];
    theme?: PrismThemes;
  };
}

/*!
 * reveal.js plugin that adds syntax highlight support using Prism.js.
 */

const PrismHighlightPlugin: RevealPluginDefinition<PrismOptions> = {
  id: 'prism-highlight',

  /**
   * Highlights code blocks withing the given deck.
   *
   * Note that this can be called multiple times if
   * there are multiple presentations on one page.
   */
  init(reveal: Reveal<(MightBeRevealPlugin | RevealPlugin<PrismOptions>)[]>) {
    const {
      prism: { languages = [], plugins = [], theme = 'default' } = {
        languages: [],
        plugins: [],
        theme: 'default',
      },
    } = reveal.getConfig();
    languages.forEach((language) => {
      require(`prismjs/components/prism-${language}.min`);
    });
    plugins.forEach((plugin) => {
      try {
        require(`prismjs/plugins/${plugin}/prism-${plugin}.css`);
      } catch (_) {
        // ignore missing css
      }
      require(`prismjs/plugins/${plugin}/prism-${plugin}.min`);
    });
    if (theme === 'default') {
      require(`prismjs/themes/prism.css`);
    } else {
      require(`prismjs/themes/prism-${theme}.css`);
    }
    Prism.highlightAll();
  },
};

export default () => PrismHighlightPlugin;
