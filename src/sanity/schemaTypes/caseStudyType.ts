import {ClipboardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'fr', type: 'string', title: 'French'},
      ],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      type: 'string',
    }),
    defineField({
      name: 'industry',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'fr', type: 'text', title: 'French'},
      ],
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', type: 'string'},
            {
              name: 'label',
              type: 'object',
              fields: [
                {name: 'en', type: 'string'},
                {name: 'fr', type: 'string'},
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'challenge',
      type: 'object',
      fields: [
        {name: 'en', type: 'text'},
        {name: 'fr', type: 'text'},
      ],
    }),
    defineField({
      name: 'solution',
      type: 'object',
      fields: [
        {name: 'en', type: 'text'},
        {name: 'fr', type: 'text'},
      ],
    }),
    defineField({
      name: 'impact',
      type: 'object',
      fields: [
        {name: 'en', type: 'text'},
        {name: 'fr', type: 'text'},
      ],
    }),
    defineField({
      name: 'testimonial',
      type: 'object',
      fields: [
        {name: 'quote', type: 'object', fields: [{name: 'en', type: 'text'}, {name: 'fr', type: 'text'}]},
        {name: 'author', type: 'string'},
        {name: 'role', type: 'string'},
        {name: 'company', type: 'string'},
      ],
    }),
  ],
})
