import {
  registerGlobalServices,
  serviceManager,
} from "shared/services/manager";
import { AuthService } from "./authService";
import { StorageService } from "./storageService";
import { DeficiencyService } from "./deficiencyService";
import { ProductService } from "./productService";
import { ResearchService } from "./researchService";
import { VerificationService } from "./verificationService";

export const registerServices = (options) => {
  registerGlobalServices(options);

  serviceManager.register("AuthService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new AuthService(api);
  });

  serviceManager.register("StorageService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new StorageService(api);
  });

  serviceManager.register("DeficiencyService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new DeficiencyService(api);
  });

  serviceManager.register("ProductService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new ProductService(api);
  });

  serviceManager.register("ResearchService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new ResearchService(api);
  });

  serviceManager.register("VerificationService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new VerificationService(api);
  });
};
export { serviceManager };
