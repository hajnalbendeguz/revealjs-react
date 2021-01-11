import Prism from 'prismjs';
// @ts-ignore
import config from 'prismjs/components.js';
// @ts-ignore
import getLoader from 'prismjs/dependencies';
import { RevealPluginDefinition } from '../../types/reveal.js';
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

export interface ActualPrism {
  languages: Prism.Languages;
}

export function addCustomPrismLanguage(
  languageDef: (prism: ActualPrism) => void,
) {
  languageDef(Prism);
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
  init() {
    setTimeout(() => Prism.highlightAll(), 100);
  },
};

export default () => PrismHighlightPlugin;
