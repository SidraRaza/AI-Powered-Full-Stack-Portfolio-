import { SitemapInfoModel } from '../../src/models/sitemap-info';

describe('SitemapInfoModel', () => {
  const validDate = new Date('2023-01-01');
  const validTotalUrls = 10;
  const validStatus = 'valid' as const;

  describe('constructor', () => {
    it('should create a valid SitemapInfoModel instance', () => {
      const model = new SitemapInfoModel(validDate, validTotalUrls, validStatus);

      expect(model.lastGenerated).toEqual(validDate);
      expect(model.totalUrls).toBe(validTotalUrls);
      expect(model.status).toBe(validStatus);
    });

    it('should throw an error for negative totalUrls', () => {
      expect(() => {
        new SitemapInfoModel(validDate, -1, validStatus);
      }).toThrow('totalUrls must be a non-negative number');
    });

    it('should throw an error for invalid status', () => {
      expect(() => {
        // @ts-expect-error - intentionally passing invalid status
        new SitemapInfoModel(validDate, validTotalUrls, 'invalid-status');
      }).toThrow('status must be one of: valid, invalid, pending');
    });
  });

  describe('fromData', () => {
    it('should create a model from valid data', () => {
      const data = {
        lastGenerated: validDate,
        totalUrls: validTotalUrls,
        status: validStatus,
      };

      const model = SitemapInfoModel.fromData(data);

      expect(model.lastGenerated).toEqual(validDate);
      expect(model.totalUrls).toBe(validTotalUrls);
      expect(model.status).toBe(validStatus);
    });

    it('should throw an error when lastGenerated is missing', () => {
      const data = {
        totalUrls: validTotalUrls,
        status: validStatus,
      };

      expect(() => {
        SitemapInfoModel.fromData(data as any);
      }).toThrow('lastGenerated is required');
    });

    it('should throw an error when totalUrls is invalid', () => {
      const data = {
        lastGenerated: validDate,
        totalUrls: 'invalid' as any,
        status: validStatus,
      };

      expect(() => {
        SitemapInfoModel.fromData(data);
      }).toThrow('totalUrls must be a non-negative number');
    });
  });

  describe('toJSON', () => {
    it('should return a plain object representation', () => {
      const model = new SitemapInfoModel(validDate, validTotalUrls, validStatus);
      const json = model.toJSON();

      expect(json).toEqual({
        lastGenerated: validDate,
        totalUrls: validTotalUrls,
        status: validStatus,
      });
    });
  });

  describe('validation methods', () => {
    it('isValid should return true for valid status', () => {
      const model = new SitemapInfoModel(validDate, validTotalUrls, 'valid');
      expect(model.isValid()).toBe(true);
    });

    it('isValid should return false for non-valid status', () => {
      const model = new SitemapInfoModel(validDate, validTotalUrls, 'invalid');
      expect(model.isValid()).toBe(false);
    });

    it('isInvalid should return true for invalid status', () => {
      const model = new SitemapInfoModel(validDate, validTotalUrls, 'invalid');
      expect(model.isInvalid()).toBe(true);
    });

    it('isInvalid should return false for non-invalid status', () => {
      const model = new SitemapInfoModel(validDate, validTotalUrls, 'valid');
      expect(model.isInvalid()).toBe(false);
    });

    it('isPending should return true for pending status', () => {
      const model = new SitemapInfoModel(validDate, validTotalUrls, 'pending');
      expect(model.isPending()).toBe(true);
    });

    it('isPending should return false for non-pending status', () => {
      const model = new SitemapInfoModel(validDate, validTotalUrls, 'valid');
      expect(model.isPending()).toBe(false);
    });
  });
});