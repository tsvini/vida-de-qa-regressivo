// config só pra gravação dos vídeos do curso (não vai pro repo)
const fs = require('fs');
const base = require(process.cwd() + '/cypress.config.js');
const setup0 = base.e2e.setupNodeEvents;
module.exports = { ...base, e2e: { ...base.e2e, baseUrl: 'http://localhost:8765/', video: true, videoCompression: false,
  supportFile: 'cypress/support/rec.js', viewportWidth: 1280, viewportHeight: 800, screenshotOnRunFailure: false,
  async setupNodeEvents(on, config) {
    on('before:browser:launch', (browser, opts) => {
      if (browser.name === 'electron') { opts.preferences.width = 1920; opts.preferences.height = 1080; }
      return opts;
    });
    // guarda uma cópia do vídeo antes do after:spec do projeto (que apaga vídeo de spec que passou)
    const on2 = (ev, fn) => on(ev, ev === 'after:spec' ? async (spec, results) => {
      if (results && results.video && fs.existsSync(results.video)) fs.copyFileSync(results.video, results.video.replace(/\.mp4$/, '.rec.mp4'));
      return fn(spec, results);
    } : fn);
    return setup0(on2, config);
  } } };
