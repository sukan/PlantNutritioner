// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

export class DeficiencyService {
  api: ApiServiceInterface;

  endpoint: string = "/deficiency";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getAllDeficiency(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-all`, query);
  }

  saveDeficiency(payload: Object = {}) {
    return this.api.post(`${this.endpoint}/save`, payload);
  }
}
