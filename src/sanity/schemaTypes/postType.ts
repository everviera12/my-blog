import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { ALL_FIELDS_GROUP, defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      type: 'object',
      groups: [
        {
          name: 'es',
          title: 'Español',
        },
        {
          name: 'en',
          title: 'English',
        },
        {
          ...ALL_FIELDS_GROUP,
          hidden: true,
        }
      ],
      fields: [
        defineField({
          name: 'es',
          type: 'object',
          group: 'es',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
            }),

            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'title',
              },
            }),

            defineField({
              name: 'body',
              title: 'Contenido',
              type: 'blockContent',
            }),
          ],
        }),

        defineField({
          name: 'en',
          type: 'object',
          group: 'en',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),

            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'title',
              },
            }),

            defineField({
              name: 'body',
              title: 'Content',
              type: 'blockContent',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
