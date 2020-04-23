let config = {
  apiUrl: "https://ertktapi.dcdev.brainvire.net/Api",
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
  ],
  alertTemplate: [["AlertType", "Communication Mode", "Status"]],
  categoryTemplate: [
    ["BrandName", "Category", "SubCategory", "IssueType", "Status"],
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
  ],
  crmRoleTemplate: [
    ["RoleName", "Status", "EnabledModules", "DisabledModules"],
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
  ],
  //apiUrl: 'http://easyrewardz.brainvire.net:44357/api'
  // apiUrl: 'http://easyrewardertz.demo.brainvire.net'
  apiUrl: "https://ertktapi.dcdev.brainvire.net/Api",
  //apiUrl: 'https://ertktapistable.dcdev.brainvire.net/Api'
  //apiUrl: 'http://stage-bellapi.ercx.co/Api'    // Client API
};

export default config;
