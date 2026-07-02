import { of } from 'rxjs';
import { unwrapData } from './unwrap-api-response';
import { ApiResponse } from '../models/api-response.interface';

interface Item {
  id: number;
  name: string;
}

describe('unwrapData', () => {
  it('should unwrap the data field from a single-item ApiResponse', (done) => {
    const item: Item = { id: 1, name: 'test' };
    const response: ApiResponse<Item> = { data: item, message: 'OK', timestamp: '2024-01-01T00:00:00Z' };

    of(response).pipe(unwrapData<Item>()).subscribe({
      next: (result) => {
        expect(result).toEqual(item);
        done();
      }
    });
  });

  it('should unwrap the data field from a list ApiResponse', (done) => {
    const items: Item[] = [
      { id: 1, name: 'alpha' },
      { id: 2, name: 'beta' }
    ];
    const response: ApiResponse<Item[]> = { data: items, message: 'OK', timestamp: '2024-01-01T00:00:00Z' };

    of(response).pipe(unwrapData<Item[]>()).subscribe({
      next: (result) => {
        expect(result).toEqual(items);
        expect(result.length).toBe(2);
        done();
      }
    });
  });

  it('should return null when data is null', (done) => {
    const response: ApiResponse<Item | null> = { data: null, message: 'Deleted', timestamp: '2024-01-01T00:00:00Z' };

    of(response).pipe(unwrapData<Item | null>()).subscribe({
      next: (result) => {
        expect(result).toBeNull();
        done();
      }
    });
  });
});
