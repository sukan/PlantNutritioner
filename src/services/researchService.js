// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

export class ResearchService {
  api: ApiServiceInterface;

  endpoint: string = "/research";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getNewResearchId() {
    return this.api.get(`${this.endpoint}/get-id`);
  }

  getAllResearches(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-all`, query);
  }

  saveResearch(payload: Object = {}) {
    return this.api.post(`${this.endpoint}/save`, payload);
  }
}
