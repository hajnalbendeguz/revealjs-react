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

export interface PrismOptions<
  CustomLanguages extends string = PrismLanguages,
  CustomPlugins extends string = PrismPlugins,
  CustomThemes extends string = PrismThemes
> {
  prism?: {
    languages?: CustomLanguages[];
    plugins?: CustomPlugins[];
    theme?: CustomThemes;
  };
}
export type { PrismLanguages, PrismPlugins, PrismThemes };

export type CustomPrismHighlightPlugin<
  CustomLanguages extends string = PrismLanguages,
  CustomPlugins extends string = PrismPlugins,
  CustomThemes extends string = PrismThemes
> = () => RevealPluginDefinition<
  PrismOptions<CustomLanguages, CustomPlugins, CustomThemes>
>;

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
