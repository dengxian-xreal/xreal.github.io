// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NRSDK',
  tagline: 'NRSDK is cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://xreal.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'xreal', // Usually your GitHub org/user name.
  projectName: 'xreal.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          lastVersion: 'current',
          versions: {
              current: {
                  label: '2.2.0',
                  path: '/',
                  badge: true
              }
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      announcementBar: {
        id: 'New hackathon',
        content:
          'New hackathon is coming! 👩‍💻 <a target="_blank" rel="noopener noreferrer" href="https://opensource.facebook.com/support-ukraine"> Have fun with us</a>.',
        backgroundColor: '#f7e6f7',
        textColor: '#000',
        isCloseable: true,
      },
      navbar: {
        title: 'NRSDK',
        logo: {
          alt: 'NRSDK Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'docsVersionDropdown',
            
          },
          {
            href: 'https://developer.xreal.com/download',
            label: 'SDK Download',
            position: 'right',
          },
          {
            href: 'https://developer.xreal.com/reference/nrsdk/overview',
            label: 'API Reference',
            position: 'right',
          },
          {
            href: 'https://github.com/nreal-ai',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Forum',
                href: 'https://community.xreal.com/',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/jZ5MqFe9t4',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/nreal-ai',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} XREAL, Inc.`,
      },
      prism: {
        additionalLanguages: ['csharp'],
        theme: prismThemes.nightOwlLight,
        darkTheme: prismThemes.dracula,
        defaultLanguage: 'csharp',
      },
    }),
};

export default config;
