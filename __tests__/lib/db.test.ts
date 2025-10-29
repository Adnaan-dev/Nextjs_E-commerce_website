import * as db from '@/lib/db';

jest.mock('fs');
jest.mock('next/cache');

describe('Database Operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateApiKey', () => {
    it('should validate correct API key', () => {
      const result = db.validateApiKey('admin-secret-key-123');
      expect(result).toBe(true);
    });

    it('should reject incorrect API key', () => {
      const result = db.validateApiKey('wrong-key');
      expect(result).toBe(false);
    });

    it('should reject null API key', () => {
      const result = db.validateApiKey(null);
      expect(result).toBe(false);
    });
  });
});






