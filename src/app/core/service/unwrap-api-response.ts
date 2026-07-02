import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.interface';

export function unwrapData<T>() {
  return map((res: ApiResponse<T>) => res.data);
}
