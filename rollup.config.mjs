import terser from '@rollup/plugin-terser'

function minifyInlineHtml() {
  return {
    name: 'minify-inline-html',
    transform(code, id) {
      if (!id.endsWith('.js')) return null;
      const result = code.replace(
        /\/\*\s*html\s*\*\/\s*`([\s\S]*?)`/g,
        (_, html) => '`' + html
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/[ \t]*\n[ \t]*/g, '')
          .replace(/  +/g, ' ')
          .replace(/> </g, '><')
          .trim() + '`'
      );
      return result === code ? null : { code: result };
    }
  };
}

export default {
  input: './bpm-glyph.js',
  plugins: [minifyInlineHtml()],
  onwarn(warning, warn) {
    if (warning.code === 'SOURCEMAP_BROKEN') return;
    warn(warning);
  },
  output: {
    file: 'dist/bpm-glyph.min.js',
    format: 'iife',
    sourcemap: 'inline',
    plugins: [terser()]
  }
}
