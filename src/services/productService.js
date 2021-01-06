// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

export class ProductService {
  api: ApiServiceInterface;

  endpoint: string = "/product";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getAllProducts(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-all`, query);
  }

  saveProduct(payload: Object = {}) {
    return this.api.post(`${this.endpoint}/save`, payload);
  }

  getProductsByDeficiency(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-by-deficiency`, query);
  }
}
