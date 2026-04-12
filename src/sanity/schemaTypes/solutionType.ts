import {RocketIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const solutionType = defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'features',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
