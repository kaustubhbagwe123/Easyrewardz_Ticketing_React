let config = {
  //apiUrl: "https://localhost:44357/api",
  isHomeShope: true, /// make false when give Homeshop build for client
  isShowTaskTab: true, /// make false when give multiTenant store module build for client

  //// -----------------------[Ticketing bulkupload code]--------------------------------------------
  hierarchyTemplate: [
    ["Designation", "ReportTo", "Status"],
    ["HOD", "Root", "Active"],
    ["Manager", "HOD", "Active"],
  ],
  priorityTemplate: [
    ["PriorityName", "Status"],
    ["Hight", "Active"],
    ["Medium", "Active"],
    ["Low", "In-Active"],
  ],
  userTemplate: [
    [
      "UserName",
      "FirstName",
      "LastName",
      "Mobile Number",
      "User Email ID",
      "User Designation",
      "Reportee Designation",
      "Reports To",
      "CRM Role",
      "Copy Escalation",
      "Assign Escalation",
      "Escalation Agent Name",
      "Status",
    ],
    [
      "Shlok.barot",
      "Shlok",
      "barot",
      "9665958060",
      "shlok@gmail.com",
      "Executive",
      "Manager",
      "Chetan",
      "Admin",
      "Yes",
      "Yes",
      "Vikas",
      "Active",
    ],
    [
      "Mangesh.Mishra",
      "Mangesh",
      "Mishra",
      "9665958060",
      "mangesh@gmail.com",
      "Executive",
      "Supervisor",
      "Chetan",
      "Admin",
      "Yes",
      "Yes",
      "Vikas",
      "Active",
    ],
  ],
  alertTemplate: [
    ["AlertType", "Communication Mode", "Status"],
    ["Mail", "Mail,Sms", "Active"],
    ["Agent Call", "Mail,Sms", "Active"],
  ],
  categoryTemplate: [
    ["BrandName", "Category", "SubCategory", "IssueType", "Status"],
    ["Tata", "Category-1", "SubCat-1", "IssueType-1", "Active"],
    ["Bata", "Category-2", "SubCat-2", "IssueType-2", "In-Active"],
  ],

  crmRoleTemplate: [
    ["RoleName", "Status", "EnabledModules", "DisabledModules"],
    [
      "HOD",
      "InActive",
      "Dashboard|Tickets|Knowledge Base",
      "Settings|Chat|Notification|Reports",
    ],
    [
      "Agent",
      "Active",
      "Dashboard|Tickets|Knowledge Base",
      "Settings|Chat|Notification|Reports",
    ],
  ],
  storeTemplate: [
    [
      "Brand",
      "City",
      "State",
      "PinCode",
      "StoreName",
      "Address",
      "StoreCode",
      "Region",
      "Zone",
      "StoreType",
      "StoreEmailID",
      "StorePhoneNo",
      "Status",
    ],
    [
      "Paragon",
      "Mumbai",
      "Maharashtra",
      "380001",
      "Store-Name-01",
      "Store-address-01",
      "Store-Code-01",
      "West",
      "East",
      "Commercial",
      "Store01@gmail.com",
      "909090909",
      "Active",
    ],
    [
      "BATA",
      "Ahmedabad",
      "Gujarat",
      "370001",
      "Store-Name-02",
      "Store-address-02",
      "Store-Code-02",
      "East",
      "West",
      "Retail",
      "Store02@gmail.com",
      "909090909",
      "In-Active",
    ],
  ],
  ///// ------------------------------------ [Store bulkupload code]-----------------------------------------------
  itemMasterTemplate: [
    [
      "BrandName",
      "ItemCode",
      "ItemName",
      "DepartmentName",
      "ItemCat",
      "ItemSubCategory",
      "ItemGroup",
    ],
    [
      "Amazon",
      "Item-A1",
      "Black Sneakers",
      "Casual Shoes",
      "Shoes",
      "Casual Shoes",
      "Shoes",
    ],
    [
      "Amazon",
      "Item-B1",
      "White Sneakers",
      "Casual Shoes",
      "Shoes",
      "Casual Shoes",
      "Shoes",
    ],
  ],
  claimCategoryTemplate: [
    ["BrandName", "Category", "SubCategory", "IssueType", "StatusID"],
    ["EasyRewarz", "Exchange", "Defective Article", "Broken Shoe", "Active"],
    ["EasyRewarz", "Exchange", "Defective Article", "Broken Shoe", "Active"],
  ],
  slaTemplate: [
    [
      "IssueType",
      "Priority",
      "SLABreachPercent",
      "RespondValue",
      "RespondDuration",
      "ResolutionValue",
      "ResolutionDuration",
      "Status",
    ],
    ["Issue1", "High", "30", "1", "Day", "2", "Day", "Active"],
    ["Issue1", "Medium", "30", "1", "Day", "2", "Day", "Active"],
    ["Issue1", "Low", "30", "1", "Day", "2", "Day", "Active"],
  ],
  Store_HierarchyTemplate: [
    ["Designation", "ReportTo", "Status"],
    ["HOD", "Root", "Active"],
    ["Manager", "HOD", "Active"],
  ],

  campaignTemplate: [["CampaignName", "Script"]],
  departmentTemplate: [
    ["Brand", "StoreCode", "Department", "Function", "Status"],
    [
      "Paragon|Bata",
      "TestStoreBulkasf|ApitestStoresa",
      "Department 10",
      "Function10-1",
      "Active",
    ],
  ],
  storeUserTemplate: [
    [
      "Brand",
      "StoreCode",
      "UserName",
      "MobileNumber",
      "UserEmailID",
      "Department",
      "Function",
      "UserDesignation",
      "ReporteeDesignation",
      "ReportsTo",
      "CRMRole",
      "Status",
      "ClaimApprover"
    ],
    [
      "Bata",
      "Store95t5",
      "abc",
      "8097654323",
      "abc@gmail.com",
      "Department-1",
      "Function-1|Function-2",
      "CXO",
      "CTTO",
      "xyz",
      "Admin",
      "Active",
      "Yes"
    ],
  ],
  storeSlaTemplate: [
    [
      "IssueType",
      "Priority",
      "SLABreachPercent",
      "ResolutionValue",
      "ResolutionDuration",
      "Status",
    ],
    ["Issue1", "High", "30", "2", "Day", "Active"],
    ["Issue1", "Medium", "30", "2", "Day", "Active"],
    ["Issue1", "Low", "30", "2", "Day", "Active"],
  ],
  storeOrder_Template: [
    [
      "Template Name",
      "Height",
      "Length",
      "Breadth",
      "Unit",
      "Weight",
      "WeightUnit",
    ],
    ["template1", "5", "8", "5.5", "CM", "5", "KG"],
    ["template2", "6", "9", "7.5", "CM", "5", "KG"],
  ],
  //apiUrl: 'https://api-shopsterqa.ercx.co/Api',  /// -------HomeShopClient API----------
  // apiUrl: "https://ertktapihomeshop.dcdev.brainvire.net/Api", /// -------HomeShop API---------
  //apiUrl: "https://multitenancyshopsterapi.dcdev.brainvire.net/Api", /// -------HomeShopMultiTenant API---------
  apiUrl: "https://multitenancyshopsterapiv2.dcdev.brainvire.net/Api", /// -------HomeShopMultiTenant API V2---------
  //apiUrl: "http://ertktapistore.dcdev.brainvire.net/Api", ///----Store API--------
  //apiUrl: 'https://ertktapistable.dcdev.brainvire.net/Api'
  //apiUrl: 'http://stage-bellapi.ercx.co/Api'    /// ----- Client API -------
  //apiUrl: 'https://api-bell-tktqa.ercx.co/Api',   /// ----- Client API for store module-------
  // apiUrl: 'https://ertktapistable.dscdev.brainvire.net/Api'
  // socketUrl: "http://ndjs.shopster.live/api/sendreply", /// ------Client Socket--------
  // socketUrl: "wss://bvsocketserver.dcdev.brainvire.net",
  socketUrl: "https://bvsocketservermts.dcdev.brainvire.net", /// -------Socket MultiTenant URL---------
  // socketUrl: "https://api-bellchatsocketserverqa.ercx.co", /// -------Socket URL Client---------
  // socketUrl:"http://localhost:4000/"
  // soundURL: "https://localhost:44357/Uploadfiles/Chat/ChatBotSoundFiles/",
  //  soundURL: "https://multitenancyshopsterapiv2.dcdev.brainvire.net/Uploadfiles/Chat/ChatBotSoundFiles/",
};

export default config;
