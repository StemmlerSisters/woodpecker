import * as path from 'path';
import type { VersionBanner, VersionOptions } from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

import versions from './versions.json';

const docsVersions: { [version: string]: VersionOptions } = {
  current: {
    label: 'Next 🚧',
    banner: 'unreleased' as VersionBanner,
  },
};

const includeVersions = ['current', versions[0]];

versions.forEach((v, index) => {
  const version = {
    label: `${v}.x${index === 0 ? '' : ' 💀'}`,
  };
  if (index !== 0 && process.env.NODE_ENV !== 'development') {
    version['banner'] = 'unmaintained';
    includeVersions.push(v);
  }
  docsVersions[v] = version;
});

const config = {
  title: 'Woodpecker CI',
  tagline: 'Woodpecker is a simple, yet powerful CI/CD engine with great extensibility.',
  url: 'https://woodpecker-ci.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',
  organizationName: 'woodpecker-ci',
  projectName: 'woodpecker-ci.github.io',
  trailingSlash: false,
  headTags: [
    {
      tagName: 'link',
      attributes: {
        href: 'https://floss.social/@WoodpeckerCI',
        rel: 'me',
      },
    },
  ],
  themeConfig: {
    navbar: {
      title: 'Woodpecker',
      logo: {
        alt: 'Woodpecker Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro/index',
          activeBaseRegex: 'docs/(?!migrations|awesome)',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/plugins',
          position: 'left',
          label: 'Plugins',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          label: 'More',
          position: 'left',
          items: [
            {
              to: '/migrations', // Always point to newest migration guide
              activeBaseRegex: 'migrations',
              label: 'Migrations',
            },
            {
              to: '/awesome', // Always point to newest awesome list
              activeBaseRegex: 'awesome',
              label: 'Awesome',
            },
            {
              to: '/api',
              label: 'API',
            },
            {
              to: '/about',
              label: 'About',
            },
          ],
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },
        {
          label: 'Sponsor Us',
          position: 'right',
          className: 'header-sponsor-link',
          href: 'https://opencollective.com/woodpecker-ci',
        },
        {
          href: 'https://github.com/woodpecker-ci/woodpecker',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
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
              label: 'Welcome to Woodpecker',
              to: '/docs/intro',
            },
            {
              label: 'Usage',
              to: '/docs/usage/intro',
            },
            {
              label: 'Administration',
              to: '/docs/administration/general',
            },
            {
              to: '/migrations', // Always point to newest migration guide
              activeBaseRegex: 'migrations',
              label: 'Migrations',
            },
            {
              to: '/awesome', // Always point to newest awesome list
              activeBaseRegex: 'awesome',
              label: 'Awesome',
            },
            {
              to: '/api',
              label: 'API',
            },
            {
              to: '/about',
              label: 'About',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Matrix',
              href: 'https://matrix.to/#/#woodpecker:matrix.org',
            },
            {
              label: 'Mastodon',
              href: 'https://floss.social/@WoodpeckerCI',
            },
            {
              label: 'Bluesky',
              href: 'https://bsky.app/profile/woodpecker-ci.org',
            },
            {
              label: 'X',
              href: 'https://twitter.com/woodpeckerci',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Translate',
              href: 'https://translate.woodpecker-ci.org/engage/woodpecker-ci/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/woodpecker-ci/woodpecker',
            },
            {
              href: 'https://ci.woodpecker-ci.org/repos/3780',
              label: 'CI',
            },
            {
              href: 'https://opencollective.com/woodpecker-ci',
              label: 'Open Collective',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Woodpecker Authors. Built with Docusaurus.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: [
        'diff',
        'json',
        'docker',
        'javascript',
        'css',
        'bash',
        'nginx',
        'apacheconf',
        'ini',
        'nix',
        'uri',
        // php is currently needed for redocusaurus
        // https://github.com/rohit-gohri/redocusaurus/issues/388
        'php',
      ],
    },
    announcementBar: {
      id: 'github-star',
      content: `If you like Woodpecker-CI, <a href=https://github.com/woodpecker-ci/woodpecker rel="noopener noreferrer" target="_blank">give us a star on GitHub</a> ! ⭐️`,
      backgroundColor: 'var(--ifm-color-primary)',
      textColor: 'var(--ifm-color-gray-900)',
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    () => ({
      name: 'docusaurus-plugin-favicon',
      injectHtmlTags() {
        return {
          headTags: [
            {
              tagName: 'link',
              attributes: {
                rel: 'icon',
                href: '/img/favicon.ico',
                sizes: 'any',
              },
            },
            {
              tagName: 'link',
              attributes: {
                rel: 'icon',
                href: '/img/favicon.svg',
                type: 'image/svg+xml',
              },
            },
          ],
        };
      },
    }),
    () => ({
      name: 'webpack-config',
      configureWebpack() {
        return {
          devServer: {
            client: {
              webSocketURL: 'auto://0.0.0.0:0/ws',
            },
          },
        } as any;
      },
    }),
  ],
  themes: [
    path.resolve(__dirname, 'plugins', 'woodpecker-plugins', 'dist'),
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/woodpecker-ci/woodpecker/edit/main/docs/',
          includeCurrentVersion: true,
          lastVersion: versions[0],
          onlyIncludeVersions: includeVersions,
          versions: docsVersions,
        },
        blog: {
          blogTitle: 'Blog',
          blogDescription: 'A blog for release announcements, turorials...',
          onInlineAuthors: 'ignore',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
    [
      'redocusaurus',
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: 'openapi.json',
            route: '/api/',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#4caf50',
        },
      },
    ],
  ],
  markdown: {
    format: 'detect',
  },
  future: {
    experimental_faster: true,
    v4: true,
  },
} satisfies Config;

export default config;
