import { MetadataRoute } from 'next';
import { subsidiesData } from '@/data/subsidies-data';
import { getAllCoursesData } from '@/data/ai-training-courses';
import { client } from '@/sanity/lib/client';
import { getAllPostsQuery, getAllCaseStudiesQuery } from '@/sanity/lib/queries';

const baseUrl = 'https://stigmatech.ca';
const locales = ['en', 'fr'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
        '/products/acronis',
        '/products/bitdefender',
        '/products/medicbackup',
    ];

    const subsidySlugs = Object.keys(subsidiesData);

    // Fetch dynamic content from Sanity
    let sanityPosts: any[] = [];
    let sanityCaseStudies: any[] = [];
    
    try {
        [sanityPosts, sanityCaseStudies] = await Promise.all([
            client.fetch(getAllPostsQuery),
            client.fetch(getAllCaseStudiesQuery)
        ]);
    } catch (error) {
        console.error('Sitemap fetch error:', error);
    }

    const allPaths: string[] = [...routes];

    // Add Sanity Blog Posts
    sanityPosts.forEach(post => {
        if (post.slug?.current) {
            allPaths.push(`/blog/${post.slug.current}`);
        }
    });

    // Add Sanity Case Studies
    sanityCaseStudies.forEach(cs => {
        if (cs.slug?.current) {
            allPaths.push(`/case-studies/${cs.slug.current}`);
        }
    });

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach(locale => {
        // Add static and Sanity routes
        allPaths.forEach(path => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: path === '' ? 1 : 0.8,
            });
        });

        // Add Training Courses (Slugs are locale-specific)
        const coursesData = getAllCoursesData(locale);
        coursesData.forEach(course => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/products/ai-training/${course.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });

        // Add Subsidies
        subsidySlugs.forEach(slug => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/subsidies/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });
    });

    return sitemapEntries;
}
