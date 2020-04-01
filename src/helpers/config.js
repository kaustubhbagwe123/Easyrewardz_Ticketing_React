let config = {
    apiUrl: 'https://localhost:44357/api',
    hierarchyTemplate:[
    ["Designation", "ReportTo","Status"],
    ["HOD", "Root","Active"],
    ["Manager", "HOD","Active"]
    ],
    priorityTemplate:[
    ["PriorityName","Status"],
    ["Hight","Active"],
    ["Medium","Active"],
    ["Low","In-Active"],
    ],
    userTemplate:[
    ["UserName","FirstName","LastName","Mobile Number","User Email ID","User Designation","Reportee Designation","Reports To","CRM Role","Copy Escalation","Assign Escalation","Escalation Agent Name","Status"],
    ["Shlok.barot","Shlok","barot","9665958060","shlok@gmail.com","Executive","Manager","Chetan","Admin","Yes","Yes","Vikas","Active"],
    ["Mangesh.Mishra","Mangesh","Mishra","9665958060","mangesh@gmail.com","Executive","Supervisor","Chetan","Admin","Yes","Yes","Vikas","Active"]
    
    ],
    alertTemplate:[
    ["AlertType","Communication Mode","Status"],
    ["Mail","Mail,Sms","Active"],
    ["Agent Call","Mail,Sms","Active"],
    ],
    categoryTemplate:[
    ["UserID","Brand","Category","SubCategory","IssueTypeName","Status"],
    ["1","Tata","Category-1","SubCat-1","IssueType-1","Active"],
    ["2","Bata","Category-2","SubCat-2","IssueType-2","In-Active"],
    ],
    slaTemplate:[
    ["IssueType","SLAByPriority","Status"],
    ["IssueType-1","Low,Medium","Active"],
    ["IssueType-2","Low,Medium,High","In-Active"],
    ],
    crmRoleTemplate:[
    ["RoleName","Status","EnabledModules","DisabledModules"],
    ["HOD","InActive","Dashboard|Tickets|Knowledge Base","Settings|Chat|Notification|Reports"],
    ["Agent","Active","Settings|Chat|Notification|Reports","Settings|Chat|Notification|Reports"],
    ],
    storeTemplate:[
    ["Brand","StoreCode","StoreName","State","City","PinCode","Address","Region","Zone","StoreType","Email","Phone","Status"],
    ["Bata","S001","StoreName-1","Maharashtra","Mumbai","401202","testing address-1","delhi","east","retail","mangesh@gmail.com","9665958060","In-Active"],
    ["Tata","S002","StoreName-2","Maharashtra","Mumbai","401203","testing address-2","Region","West","StoreType","Email","9665958060","Active"],
    
    ],
    //apiUrl: 'http://easyrewardz.brainvire.net:44357/api'
    // apiUrl: 'http://easyrewardertz.demo.brainvire.net'
    //apiUrl: 'http://10.50.250.18:9512/api'
    // apiUrl: 'https://ertktapi.dcdev.brainvire.net/Api'
    // apiUrl: 'https://ertktapistable.dcdev.brainvire.net/Api'
    };
    
export default config;
