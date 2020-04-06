let config = {
  apiUrl: "https://localhost:44357/api",
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
  slaTemplate: [
    [
      "IssueType",
      "Priority",
      "SLABreachPercent",
      "RespondValue",
      ,
      "RespondDuration",
      "ResolutionValue",
      "ResolutionDuration",
      "Status",
    ],
    ["Issue1", "High", "30", "1", "Day", "2", "Day", "Active"],
    ["Issue1", "Medium", "30", "1", "Day", "2", "Day", "Active"],
    ["Issue1", "Low", "30", "1", "Day", "2", "Day", "Active"],
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
      "Bombay",
      "Maharashtra",
      "380001",
      "Store-Name-01",
      "Store-address-01",
      "Store-Code-01",
      "delhi",
      "east",
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
      "Gujarat",
      "West",
      "Retail",
      "Store02@gmail.com",
      "909090909",
      "In-Active",
    ],
  ],
  //apiUrl: 'http://easyrewardz.brainvire.net:44357/api'
  // apiUrl: 'http://easyrewardertz.demo.brainvire.net'
  //apiUrl: 'http://10.50.250.18:9512/api'
  // apiUrl: 'https://ertktapi.dcdev.brainvire.net/Api'
  // apiUrl: 'https://ertktapistable.dcdev.brainvire.net/Api'
};

export default config;
