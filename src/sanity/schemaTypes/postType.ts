import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'fr', type: 'text', title: 'French'},
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
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image', options: { hotspot: true } },
          ],
        },
        {
          name: 'fr',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
