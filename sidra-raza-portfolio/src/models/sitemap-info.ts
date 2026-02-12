export interface SitemapInfo {
  lastGenerated: Date;
  totalUrls: number;
  status: 'valid' | 'invalid' | 'pending';
}

export class SitemapInfoModel {
  readonly lastGenerated: Date;
  readonly totalUrls: number;
  readonly status: 'valid' | 'invalid' | 'pending';

  constructor(lastGenerated: Date, totalUrls: number, status: 'valid' | 'invalid' | 'pending') {
    this.lastGenerated = lastGenerated;
    this.totalUrls = totalUrls;
    this.status = status;
  }

  /**
   * Creates a SitemapInfoModel instance from raw data
   * @param data Raw data to create the model from
   * @returns A new SitemapInfoModel instance
   */
  static fromData(data: Partial<SitemapInfo>): SitemapInfoModel {
    if (!data.lastGenerated) {
      throw new Error('lastGenerated is required');
    }

    if (typeof data.totalUrls !== 'number' || data.totalUrls < 0) {
      throw new Error('totalUrls must be a non-negative number');
    }

    if (!data.status || !['valid', 'invalid', 'pending'].includes(data.status)) {
      throw new Error('status must be one of: valid, invalid, pending');
    }

    return new SitemapInfoModel(
      new Date(data.lastGenerated),
      data.totalUrls,
      data.status as 'valid' | 'invalid' | 'pending'
    );
  }

  /**
   * Converts the model to a plain object
   * @returns A plain object representation of the model
   */
  toJSON(): SitemapInfo {
    return {
      lastGenerated: this.lastGenerated,
      totalUrls: this.totalUrls,
      status: this.status,
    };
  }

  /**
   * Checks if the sitemap info indicates the sitemap is valid
   * @returns True if the status is 'valid', false otherwise
   */
  isValid(): boolean {
    return this.status === 'valid';
  }

  /**
   * Checks if the sitemap info indicates the sitemap is invalid
   * @returns True if the status is 'invalid', false otherwise
   */
  isInvalid(): boolean {
    return this.status === 'invalid';
  }

  /**
   * Checks if the sitemap info indicates the sitemap is pending validation
   * @returns True if the status is 'pending', false otherwise
   */
  isPending(): boolean {
    return this.status === 'pending';
  }
}