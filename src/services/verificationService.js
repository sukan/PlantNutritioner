// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

export class VerificationService {
  api: ApiServiceInterface;

  endpoint: string = "/verification";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getAllVerifications(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-all`, query);
  }

  getSingleVerification(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-single`, query);
  }

  updateVerification(payload: Object = {}) {
    return this.api.put(`${this.endpoint}/update`, payload);
  }
}
