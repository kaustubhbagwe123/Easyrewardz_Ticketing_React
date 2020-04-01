import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import config from "./../../../helpers/config";

export default class ClaimCategoryService {
  ////  get Cliam Category list
  async GetClaimCategoryList() {
    return axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimCategoryList",
      headers: authHeader()
    });
  }
  ////  get Brand list
  async GetBrandList() {
    return axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    });
  }
  ///get category list by brand Id
  async GetCategoryListByBrandId(brandId) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimCategoryListByBrandID",
      headers: authHeader(),
      params: {
        BrandID: brandId
      }
    });
  }
  ///get sub category list by category Id
  async GetSubCategoryListByCateId(cateId) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Category/BulkUploadItem",
      headers: authHeader(),
      params: {
        BrandID: cateId
      }
    });
  }
  ///get issue type list by sub category Id
  async GetIssueTyepListBySubCateId(subCateId) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Category/BulkUploadItem",
      headers: authHeader(),
      params: {
        BrandID: subCateId
      }
    });
  }
  //// add category by brand id
  async AddCategoryByBrandId(brandId, categoryName) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Category/AddClaimCategory ",
      headers: authHeader(),
      params: {
        BrandID: brandId,
        CategoryName: categoryName
      }
    });
  }

  //// add sub category by category id
  async AddSubCategoryByCateId(cateId, subCateName) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Category/BulkUploadItem",
      headers: authHeader(),
      params: {
        BrandID: cateId,
        CategoryName: subCateName
      }
    });
  }
  //// add issue type by sub cateory id
  async AddIssueTypeBySubCateId(subCateId, issueTypeName) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Category/BulkUploadItem",
      headers: authHeader(),
      params: {
        BrandID: subCateId,
        CategoryName: issueTypeName
      }
    });
  }

  async CreateClaimCategory(categoryData) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Item/CreateClaimCategory",
      headers: authHeader(),
      data: categoryData
    });
  }
}
