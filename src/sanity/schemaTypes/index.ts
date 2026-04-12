import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './authorType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { solutionType } from './solutionType'
import { caseStudyType } from './caseStudyType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, categoryType, postType, solutionType, caseStudyType],
}
