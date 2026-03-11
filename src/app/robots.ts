import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'Google-Extended'],
                allow: '/',
            },
        ],
        sitemap: 'https://stigmatech.ca/sitemap.xml',
    };
}
