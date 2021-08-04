type Font = {
  family: string;
  lineHeight: number;
  size: number;
  style: string;
  weight: number;
};

interface LabelOptions {
  text: string,
  font: Font,
  color: string,
}

export interface Options extends LabelOptions {
  /**
   * Multi-labels definition object where each property represents a new
   * label, the key being the label key and the value being the options
   * specific to each label and merged on top of the root options.
   * @default undefined
   * @since 0.7.0
   */
  labels?: Record<string, LabelOptions | null>;
}
