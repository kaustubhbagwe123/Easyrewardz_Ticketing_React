let config = {
  apiUrl: "https://localhost:44357/api",
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
  hierarchyTemplate: [
    ["Designation", "ReportTo", "Status"],
    ["HOD", "Root", "Active"],
    ["Manager", "HOD", "Active"],
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
      "Settings|Chat|Notification|Reports",
      "Settings|Chat|Notification|Reports",
    ],
  ],
  //apiUrl: 'http://easyrewardz.brainvire.net:44357/api'
  // apiUrl: 'http://easyrewardertz.demo.brainvire.net'
  //apiUrl: 'http://10.50.250.18:9512/api'
  // apiUrl: 'https://ertktapi.dcdev.brainvire.net/Api'
  // apiUrl: 'https://ertktapistable.dcdev.brainvire.net/Api'
};

export default config;
