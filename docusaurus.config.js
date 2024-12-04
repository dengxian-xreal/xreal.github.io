// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NRSDK',
  tagline: 'NRSDK is cool',
  favicon: 'img/Glasses.ico',

  // Set the production url of your site here
  url: 'https://xreal.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'xreal', // Usually your GitHub org/user name.
  projectName: 'xreal.github.io', // Usually your repo name.

  onBrokenLinks: 'ignore',
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
          routeBasePath: '/',
          lastVersion: 'current',
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
          versions: {
              current: {
                  label: '2.3.1',
                  path: '/',
                  badge: true
              }
          },
          // Please change this to your repo.
          // // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   // editUrl:
        //   //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true, // 是否对索引使用哈希
        language: ['en', 'zh'], // 支持的语言，可以自定义
        indexBlog: false, // 是否索引博客内容
        indexDocs: true, // 是否索引文档内容
        docsRouteBasePath: '/', // 文档的基础路径
      },
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
      
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      announcementBar: {
        id: 'New SDK',
        content:
          'NRSDK 2.4.0 is now compatible with XREAL One Series and Unity 6 🥳 <a target="_blank" rel="noopener noreferrer" href="/Release Note/NRSDK 2.4.0"> Check the release note</a>.',
        backgroundColor: '#f7e6f7',
        textColor: '#000',
        isCloseable: false,
      },
      navbar: {
        title: 'NRSDK',
        logo: {
          alt: 'NRSDK Logo',
          src: 'img/logo.png',
          style: { height: '25px' },
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
            to:'/docs',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'docsVersionDropdown',
            
          },
          {
            to: 'https://developer.xreal.com/download',
            label: 'SDK Download',
            position: 'right',
          },
          {
            to: 'https://developer.xreal.com/reference/nrsdk/overview',
            label: 'API Reference',
            position: 'right',
          },
          {
            to: 'https://github.com/nreal-ai',
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
                label: 'XREAL Hardware Tutorials',
                to: 'https://tutorial.xreal.com',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Forum',
                to: 'https://community.xreal.com/',
              },
              {
                label: 'Discord',
                to: 'https://discord.com/invite/jZ5MqFe9t4',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                to: 'https://github.com/nreal-ai',
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
      scripts: [
        {
          src: '@vercel/analytics/client',
          async: true,
        },
      ],
    }),
};

export default config;
