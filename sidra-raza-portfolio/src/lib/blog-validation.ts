// Re-export validation functions from blog.ts for backward compatibility
export {
  validateSlug,
  validateTitle,
  validateExcerpt,
  validateContent,
  validateDate,
  validateTags
} from './blog';
