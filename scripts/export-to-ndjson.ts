import { caseStudies } from '../src/lib/case-studies-data';
import fs from 'fs';

const ndjson = caseStudies.map(cs => ({
  _type: 'caseStudy',
  _id: `cs-${cs.slug}`,
  title: cs.title,
  slug: { _type: 'slug', current: cs.slug },
  category: cs.category,
  industry: cs.industry,
  description: cs.description,
  // Images are tricky in NDJSON import without assets, 
  // but we'll import the plain text first.
  stats: cs.stats,
  challenge: cs.challenge,
  solution: cs.solution,
  impact: cs.impact,
  testimonial: cs.testimonial,
}));

fs.writeFileSync('cases.ndjson', ndjson.map(obj => JSON.stringify(obj)).join('\n'));
console.log('Exported to cases.ndjson');
