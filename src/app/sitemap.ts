import { MetadataRoute } from 'next';
import { subsidiesData } from '@/data/subsidies-data';
import { getAllCourseSlugs } from '@/data/ai-training-courses';

const baseUrl = 'https://stigmatech.ca';
const locales = ['en', 'fr'];

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/about',
        '/contact',
        '/quote',
        '/marketplace',
        '/blog',
        '/case-studies',
        '/solutions/ai-machine-learning',
        '/solutions/cloud-computing',
        '/solutions/digital-transformation',
        '/solutions/grc',
        '/solutions/managed-cybersecurity',
        '/solutions/managed-it-services',
        '/products/ai-training',
        '/products/cyber-protect-cloud',
        '/products/sentinelone',
        '/products/support-360',
    ];

    const subsidySlugs = Object.keys(subsidiesData);
    const courseSlugs = getAllCourseSlugs();

    const allPaths: string[] = [...routes];

    subsidySlugs.forEach(slug => {
        allPaths.push(`/subsidies/${slug}`);
    });

    courseSlugs.forEach(slug => {
        allPaths.push(`/products/ai-training/${slug}`);
    });

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach(locale => {
        allPaths.forEach(path => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: path === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
