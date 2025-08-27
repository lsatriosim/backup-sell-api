/**
 * Converts snake_case keys to camelCase
 */
export function toCamelCase<T>(obj: any): T {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item)) as T;
  }

  const converted: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    converted[camelKey] = typeof value === 'object' ? toCamelCase(value) : value;
  }
  
  return converted as T;
}

/**
 * Converts camelCase keys to snake_case
 */
export function toSnakeCase<T>(obj: any): T {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => toSnakeCase(item)) as T;
  }

  const converted: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    converted[snakeKey] = typeof value === 'object' ? toSnakeCase(value) : value;
  }
  
  return converted as T;
}

/**
 * Database Repository Base Class with auto-transformation
 */
export abstract class BaseRepository {
  /**
   * Transform database result to entity format
   */
  protected transformFromDb<T>(data: any): T {
    return toCamelCase<T>(data);
  }

  /**
   * Transform entity data to database format
   */
  protected transformToDb<T>(data: any): T {
    return toSnakeCase<T>(data);
  }

  /**
   * Transform multiple database results to entity format
   */
  protected transformArrayFromDb<T>(data: any[]): T[] {
    return data.map(item => this.transformFromDb<T>(item));
  }
}