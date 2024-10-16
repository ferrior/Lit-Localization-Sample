import { LitElement, html, css } from 'lit';
import { createIntl, createIntlCache } from '@formatjs/intl';
import enMessages from '../locales/en.json';
import frMessages from '../locales/fr.json';

// 初始化多语言数据
const messages = {
  en: enMessages,
  fr: frMessages,
};

// 创建缓存实例（可选，提升性能）
const cache = createIntlCache();

// 初始化国际化实例
let intl = createIntl(
  {
    locale: 'en',
    messages: messages['en'],
  },
  cache,
);

class MyComponent extends LitElement {
  static styles = css`
    b {
      font-weight: bold;
      color: #007bff;
    }
  `;

  constructor() {
    super();
    this.name = 'Alice';
    this.place = 'Wonderland';
  }

  switchLanguage(lang) {
    intl = createIntl(
      {
        locale: lang,
        messages: messages[lang],
      },
      cache,
    );
    this.requestUpdate();
  }

  // 使用回调函数处理富文本插值
  renderMessage() {
    const message = intl.formatMessage(
      { id: 'greeting' },
      {
        b: (content) => html`<b>${content}</b>`,
        name: html`<b>${this.name}</b>`,
        place: html`<b>${this.place}</b>`,
      },
    );
    return message;
  }

  render() {
    return html`
      <div>
        <p>${this.renderMessage()}</p>
        <button @click=${() => this.switchLanguage('fr')}>
          Switch to French
        </button>
        <button @click=${() => this.switchLanguage('en')}>
          Switch to English
        </button>
      </div>
    `;
  }
}

customElements.define('my-component', MyComponent);
