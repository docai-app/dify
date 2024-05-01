export type Item = {
  value: number | string
  name: string
  example: string
}

export type I18nText = {
  'en-US': string
  'zh-Hans': string
  'pt-BR': string
  'es-ES': string
  'fr-FR': string
  'de-DE': string
  'ja-JP': string
  'ko-KR': string
  'ru-RU': string
  'it-IT': string
  'uk-UA': string
  'vi-VN': string
  'de_DE': string
  'zh_Hant': string
}

export const languages = [
  {
    value: 'en-US',
    name: 'English (United States)',
    example: 'Hello, DocAI!',
    supported: true,
  },
  {
    value: 'zh-Hans',
    name: '简体中文',
    example: '你好，DocAI！',
    supported: true,
  },
  {
    value: 'zh-Hant',
    name: '繁體中文',
    example: '你好，DocAI！',
    supported: true,
  },
  {
    value: 'pt-BR',
    name: 'Português (Brasil)',
    example: 'Olá, DocAI!',
    supported: true,
  },
  {
    value: 'es-ES',
    name: 'Español (España)',
    example: 'Saluton, DocAI!',
    supported: false,
  },
  {
    value: 'fr-FR',
    name: 'Français (France)',
    example: 'Bonjour, DocAI!',
    supported: true,
  },
  {
    value: 'de-DE',
    name: 'Deutsch (Deutschland)',
    example: 'Hallo, DocAI!',
    supported: true,
  },
  {
    value: 'ja-JP',
    name: '日本語 (日本)',
    example: 'こんにちは、DocAI!',
    supported: true,
  },
  {
    value: 'ko-KR',
    name: '한국어 (대한민국)',
    example: '안녕, DocAI!',
    supported: false,
  },
  {
    value: 'ru-RU',
    name: 'Русский (Россия)',
    example: ' Привет, DocAI!',
    supported: false,
  },
  {
    value: 'it-IT',
    name: 'Italiano (Italia)',
    example: 'Ciao, DocAI!',
    supported: false,
  },
  {
    value: 'th-TH',
    name: 'ไทย (ประเทศไทย)',
    example: 'สวัสดี DocAI!',
    supported: false,
  },
  {
    value: 'id-ID',
    name: 'Bahasa Indonesia',
    example: 'Saluto, DocAI!',
    supported: false,
  },
  {
    value: 'uk-UA',
    name: 'Українська (Україна)',
    example: 'Привет, DocAI!',
    supported: true,
  },
  {
    value: 'vi-VN',
    name: 'Tiếng Việt (Việt Nam)',
    example: 'Xin chào, DocAI!',
    supported: true,
  },
]

export const LanguagesSupported = languages.filter(item => item.supported).map(item => item.value)

export const getLanguage = (locale: string) => {
  if (locale === 'zh-Hans')
    return locale.replace('-', '_')

  return LanguagesSupported[0].replace('-', '_')
}

export const NOTICE_I18N = {
  title: {
    en_US: 'Important Notice',
    zh_Hans: '重要公告',
    pt_BR: 'Aviso Importante',
    es_ES: 'Aviso Importante',
    fr_FR: 'Avis important',
    de_DE: 'Wichtiger Hinweis',
    ja_JP: '重要なお知らせ',
    ko_KR: '중요 공지',
    uk_UA: 'Важливе повідомлення',
    vi_VN: 'Thông báo quan trọng',
  },
  desc: {
    en_US: 'Our system will be unavailable from 19:00 to 24:00 UTC on August 28 for an upgrade. For questions, kindly contact our support team (support@DocAI.ai). We value your patience.',
    zh_Hans: '为了有效提升数据检索能力及稳定性，DocAI 将于 2023 年 8 月 29 日 03:00 至 08:00 期间进行服务升级，届时 DocAI 云端版及应用将无法访问。感谢您的耐心与支持。',
    pt_BR: 'Our system will be unavailable from 19:00 to 24:00 UTC on August 28 for an upgrade. For questions, kindly contact our support team (support@DocAI.ai). We value your patience.',
    es_ES: 'Our system will be unavailable from 19:00 to 24:00 UTC on August 28 for an upgrade. For questions, kindly contact our support team (support@DocAI.ai). We value your patience.',
    fr_FR: 'Our system will be unavailable from 19:00 to 24:00 UTC on August 28 for an upgrade. For questions, kindly contact our support team (support@DocAI.ai). We value your patience.',
    de_DE: 'Our system will be unavailable from 19:00 to 24:00 UTC on August 28 for an upgrade. For questions, kindly contact our support team (support@DocAI.ai). We value your patience.',
    ja_JP: 'Our system will be unavailable from 19:00 to 24:00 UTC on August 28 for an upgrade. For questions, kindly contact our support team (support@DocAI.ai). We value your patience.',
    ko_KR: 'Our system will be unavailable from 19:00 to 24:00 UTC on August 28 for an upgrade. For questions, kindly contact our support team (support@DocAI.ai). We value your patience.',
    uk_UA: 'Наша система буде недоступна з 19:00 до 24:00 UTC 28 серпня для оновлення. Якщо у вас виникнуть запитання, будь ласка, зв’яжіться з нашою службою підтримки (support@DocAI.ai). Дякуємо за терпіння.',
    vi_VN: 'Hệ thống của chúng tôi sẽ ngừng hoạt động từ 19:00 đến 24:00 UTC vào ngày 28 tháng 8 để nâng cấp. Nếu có thắc mắc, vui lòng liên hệ với nhóm hỗ trợ của chúng tôi (support@DocAI.ai). Chúng tôi đánh giá cao sự kiên nhẫn của bạn.',
  },
  href: '#',
}
