import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { authHeader } from "./../../../helpers/authHeader";
import DownExcel from "./../../../assets/Images/csv.png";
import { CSVLink } from "react-csv";
import axios from "axios";
import Pagination from "react-pagination-js";
import { Table } from "antd";
import config from "./../../../helpers/config";
import Modal from "react-bootstrap/Modal";
import { NotificationManager } from "react-notifications";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
var uid = 0;
class OrderSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moduleConfigData: {},
      orderConfigData: {},
      selTab: "Module Configuration",
      translateLanguage: {},
      OrdTemplatename: "",
      OrdTempHeight: "",
      OrdTempLength: "",
      OrdTempBreadth: "",
      OrdTempWeight: "",
      selectedOrdHeight: "cm",
      selectedOrdLength: "cm",
      selectedOrdBreadth: "cm",
      selectedOrdWeight: "Kg",
      ShippingTempData: [],
      ShipTemploading: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      OrdTemplateNameValidation: "",
      OrdTempHeightValidation: "",
      OrdTempLengthValidation: "",
      OrdTempBreadthValidation: "",
      OrdTempWeightValidation: "",
      editSlotModal: false,
      templateID: 0,
      editTemplate: {},
      EditOrdTempNameValidation: "",
      EditOrdTempHeightValidation: "",
      EditOrdTempLengthValidation: "",
      EditOrdTempBreadthValidation: "",
      EditOrdTempWeightValidation: "",
      editButtonShow: false,
      orderMessageTemplate: [],
      file: {},
      fileName: "",
      ordSettingBtnDisabled: false,
      orderWhatsAppTemplate: [],
    };
    this.closeSlotEditModal = this.closeSlotEditModal.bind(this);
  }

  componentDidMount() {
    this.handleGetModuleConfigData();
    this.handleGetOrderConfigData();
    this.handleGetShippingTempData();
    this.handleGetWhatsAppTemplateData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  closeSlotEditModal() {
    this.setState({
      editSlotModal: false,
    });
  }

  openSlotEditModal(rowData) {
    var editTemplate = {};
    editTemplate.templateName = rowData.templateName;
    editTemplate.height = rowData.height;
    editTemplate.height_Unit = rowData.height_Unit;
    editTemplate.weight = rowData.weight;
    editTemplate.weight_Unit = rowData.weight_Unit;
    editTemplate.length = rowData.length;
    editTemplate.length_Unit = rowData.length_Unit;
    editTemplate.breath = rowData.breath;
    editTemplate.breath_Unit = rowData.breath_Unit;

    this.setState({
      editSlotModal: true,
      templateID: rowData.id,
      editTemplate,
    });
  }

  handleGetModuleConfigData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetModuleConfiguration",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            moduleConfigData: data,
          });
        } else {
          self.setState({
            moduleConfigData: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle get shipping tempt grid data
  handleGetShippingTempData() {
    let self = this;
    this.setState({
      ShipTemploading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderShippingTemplate",
      headers: authHeader(),
      data: {
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ShippingTempData: data.shippingTemplateList,
            totalCount: data.totalCount,
            ShipTemploading: false,
          });
        } else {
          self.setState({
            ShippingTempData: [],
            totalCount: 0,
            ShipTemploading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateModConfigData() {
    const TranslationContext = this.state.translateLanguage.default;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateModuleConfiguration",
      headers: authHeader(),
      data: {
        ID: this.state.moduleConfigData.id,
        ShoppingBag: this.state.moduleConfigData.shoppingBag,
        Payment: this.state.moduleConfigData.payment,
        Shipment: this.state.moduleConfigData.shipment,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.moduleupdatedsuccessfully
              : "Module Updated Successfully."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ModuleConfigFlagChange = (id) => {
    var ModuleConfig = id.target.id;
    if (ModuleConfig === "ckModconfigShoppBag") {
      this.state.moduleConfigData.shoppingBag = !this.state.moduleConfigData
        .shoppingBag;
    } else if (ModuleConfig === "ckModconfigPayment") {
      this.state.moduleConfigData.payment = !this.state.moduleConfigData
        .payment;
    } else if (ModuleConfig === "ckModconfigShipment") {
      this.state.moduleConfigData.shipment = !this.state.moduleConfigData
        .shipment;
    }

    this.setState({ moduleConfigData: this.state.moduleConfigData });
  };

  handleGetOrderConfigData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderConfiguration",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            orderConfigData: data,
            orderMessageTemplate: data.pHYOrderMessageTemplates,
          });
        } else {
          self.setState({
            orderConfigData: {},
            orderMessageTemplate: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateOrderConfigData() {
    const TranslationContext = this.state.translateLanguage.default;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateOrderConfiguration",
      headers: authHeader(),
      data: {
        ID: this.state.orderConfigData.id,
        IntegratedSystem: this.state.orderConfigData.integratedSystem,
        Payment: this.state.orderConfigData.payment,
        Shipment: this.state.orderConfigData.shipment,
        ShoppingBag: this.state.orderConfigData.shoppingBag,
        EnableClickAfterValue: this.state.orderConfigData.enableClickAfterValue,
        EnableClickAfterDuration: this.state.orderConfigData
          .enableClickAfterDuration,
        StoreDelivery: this.state.orderConfigData.storeDelivery,
        AlertCommunicationviaWhtsup: this.state.orderConfigData
          .alertCommunicationviaWhtsup,
        AlertCommunicationviaSMS: this.state.orderConfigData
          .alertCommunicationviaSMS,
        AlertCommunicationSMSText: this.state.orderConfigData
          .alertCommunicationSMSText,
        ShoppingBagConvertToOrder: this.state.orderConfigData
          .shoppingBagConvertToOrder,
        ShoppingBagConvertToOrderText: this.state.orderConfigData
          .shoppingBagConvertToOrderText,
        AWBAssigned: this.state.orderConfigData.awbAssigned,
        AWBAssignedText: this.state.orderConfigData.awbAssignedText,
        PickupScheduled: this.state.orderConfigData.pickupScheduled,
        PickupScheduledText: this.state.orderConfigData.pickupScheduledText,
        Shipped: this.state.orderConfigData.shipped,
        ShippedText: this.state.orderConfigData.shippedText,
        Delivered: this.state.orderConfigData.delivered,
        DeliveredText: this.state.orderConfigData.deliveredText,
        Cancel: this.state.orderConfigData.cancel,
        CancelText: this.state.orderConfigData.cancelText,
        UnDeliverable: this.state.orderConfigData.unDeliverable,
        UnDeliverableText: this.state.orderConfigData.unDeliverableText,
        StoreDeliveryText: this.state.orderConfigData.storeDeliveryText,
        PaymentTenantCodeText: this.state.orderConfigData.paymentTenantCodeText,
        RetryCount:
          this.state.orderConfigData.retryCount !== ""
            ? parseInt(this.state.orderConfigData.retryCount)
            : 0,
        StateFlag: this.state.orderConfigData.stateFlag,
        CurrencyText: this.state.orderConfigData.currencyText,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.orderupdatedsuccessfully
              : "Order Updated Successfully."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.ordernotupdated
              : "Order Not Updated."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateOrderConfigMessageTempData() {
    const TranslationContext = this.state.translateLanguage.default;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateOrderConfigurationMessageTemplate",
      headers: authHeader(),
      data: {
        pHYOrderMessageTemplates: this.state.orderMessageTemplate,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.orderupdatedsuccessfully
              : "Order Updated Successfully."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.ordernotupdated
              : "Order Not Updated."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  OrderConfigFlagChange = (id) => {
    var OrderConfig = id.target.id;
    if (OrderConfig === "ckOrdconfigIntegSys") {
      this.state.orderConfigData.integratedSystem = !this.state.orderConfigData
        .integratedSystem;
    } else if (OrderConfig === "ckOrdconfigPayment") {
      this.state.orderConfigData.payment = !this.state.orderConfigData.payment;
    } else if (OrderConfig === "ckOrdconfigShipment") {
      this.state.orderConfigData.shipment = !this.state.orderConfigData
        .shipment;
    } else if (OrderConfig === "ckOrdconfigShopBag") {
      this.state.orderConfigData.shoppingBag = !this.state.orderConfigData
        .shoppingBag;
    } else if (OrderConfig === "ckOrdconfigStoredelivery") {
      this.state.orderConfigData.storeDelivery = !this.state.orderConfigData
        .storeDelivery;
    } else if (OrderConfig === "OrdshoppingBagConvertToOrder") {
      this.state.orderConfigData.shoppingBagConvertToOrder = !this.state
        .orderConfigData.shoppingBagConvertToOrder;
    } else if (OrderConfig === "OrdAwbAssigned") {
      this.state.orderConfigData.awbAssigned = !this.state.orderConfigData
        .awbAssigned;
    } else if (OrderConfig === "OrdPickupScheduled") {
      this.state.orderConfigData.pickupScheduled = !this.state.orderConfigData
        .pickupScheduled;
    } else if (OrderConfig === "OrdShipped") {
      this.state.orderConfigData.shipped = !this.state.orderConfigData.shipped;
    } else if (OrderConfig === "OrdDelivered") {
      this.state.orderConfigData.delivered = !this.state.orderConfigData
        .delivered;
    } else if (OrderConfig === "OrdCancelled") {
      this.state.orderConfigData.cancel = !this.state.orderConfigData.cancel;
    } else if (OrderConfig === "OrdUndelivered") {
      this.state.orderConfigData.unDeliverable = !this.state.orderConfigData
        .unDeliverable;
    } else if (OrderConfig === "chkOrderconfigStateFlag") {
      this.state.orderConfigData.stateFlag = !this.state.orderConfigData
        .stateFlag;
    }
    this.setState({ orderConfigData: this.state.orderConfigData });
  };
  /// Handle Communication change
  handleCommunicationChange(id) {
    var OrderConfig = id.target.id;
    if (OrderConfig === "ckOrdconfigAltConmWhts") {
      if (this.state.orderConfigData.alertCommunicationviaWhtsup) {
        this.state.orderConfigData.alertCommunicationviaWhtsup = false;
        this.state.orderConfigData.alertCommunicationviaSMS = true;
      } else {
        this.state.orderConfigData.alertCommunicationviaWhtsup = false;
      }
    } else {
      if (this.state.orderConfigData.alertCommunicationviaSMS) {
        this.state.orderConfigData.alertCommunicationviaSMS = false;
        this.state.orderConfigData.alertCommunicationviaWhtsup = true;
      } else {
        this.state.orderConfigData.alertCommunicationviaSMS = false;
      }
    }

    this.setState({ orderConfigData: this.state.orderConfigData });
  }

  OrderSettingOnChange(e) {
    const { name, value } = e.target;
    var orderConfigData = this.state.orderConfigData;
    if (name === "enableClickAfterValue") {
      if (orderConfigData["enableClickAfterDuration"] == "M") {
        if (parseInt(value) <= 60) {
          orderConfigData[name] = value;
          this.setState({ orderConfigData });
        } else {
          orderConfigData[name] = "";
          this.setState({ orderConfigData });
        }
      } else {
        if (parseInt(value) <= 99) {
          orderConfigData[name] = value;
          this.setState({ orderConfigData });
        } else {
          orderConfigData[name] = "";
          this.setState({ orderConfigData });
        }
      }
    } else {
      if (name === "enableClickAfterDuration") {
        if (value === "M") {
          if (orderConfigData["enableClickAfterValue"] > 60)
            orderConfigData["enableClickAfterValue"] = "";
        }

        if (value === "H") {
          if (orderConfigData["enableClickAfterValue"] > 99)
            orderConfigData["enableClickAfterValue"] = "";
        }
      }
      orderConfigData[name] = value;
      this.setState({ orderConfigData });
    }
  }
  /// handle input change
  handleInputOnchange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  /// Edit input onchange
  handleEditInputOnchange(e) {
    var names = e.target.name;
    var values = e.target.value;

    var editTemplate = this.state.editTemplate;
    editTemplate[names] = values;
    this.setState({
      editTemplate,
    });
  }

  // /// handle Edit Input Validation change
  handleEditInputValidationChange(e) {
    var names = e.target.name;
    var values = e.target.value;

    var editTemplate = this.state.editTemplate;
    editTemplate[names] = values;

    if (isNaN(values)) {
      return false;
    }
    var splitText = values.split(".");
    var index = values.indexOf(".");

    if (index !== -1) {
      if (splitText) {
        if (splitText[1].length <= 2) {
          if (index !== -1 && splitText.length === 2) {
            this.setState({
              editTemplate,
            });
          }
        } else {
          return false;
        }
      } else {
        this.setState({
          editTemplate,
        });
      }
    } else {
      this.setState({
        editTemplate,
      });
    }
  }
  /// handle input valiadtion change
  handleInputValidationChange(e) {
    var values = e.target.value;
    var names = e.target.name;

    if (isNaN(values)) {
      return false;
    }
    var splitText = values.split(".");
    var index = values.indexOf(".");

    if (index !== -1) {
      if (splitText) {
        if (splitText[1].length <= 2) {
          if (index !== -1 && splitText.length === 2) {
            if (names === "OrdTempHeight") {
              this.setState({
                OrdTempHeight: values,
              });
            } else if (names === "OrdTempLength") {
              this.setState({
                OrdTempLength: values,
              });
            } else if (names === "OrdTempBreadth") {
              this.setState({
                OrdTempBreadth: values,
              });
            } else if (names === "OrdTempWeight") {
              this.setState({
                OrdTempWeight: values,
              });
            }
          }
        } else {
          return false;
        }
      } else {
        if (names === "OrdTempHeight") {
          this.setState({
            OrdTempHeight: values,
          });
        } else if (names === "OrdTempLength") {
          this.setState({
            OrdTempLength: values,
          });
        } else if (names === "OrdTempBreadth") {
          this.setState({
            OrdTempBreadth: values,
          });
        } else if (names === "OrdTempWeight") {
          this.setState({
            OrdTempWeight: values,
          });
        }
      }
    } else {
      if (names === "OrdTempHeight") {
        this.setState({
          OrdTempHeight: values,
        });
      } else if (names === "OrdTempLength") {
        this.setState({
          OrdTempLength: values,
        });
      } else if (names === "OrdTempBreadth") {
        this.setState({
          OrdTempBreadth: values,
        });
      } else if (names === "OrdTempWeight") {
        this.setState({
          OrdTempWeight: values,
        });
      }
    }
  }

  /// handle drop down change
  handleDropDownChange(e) {
    var names = e.target.name;
    var values = e.target.value;

    if (names === "selectedOrdHeight") {
      this.setState({
        selectedOrdHeight: values,
      });
    } else if (names === "selectedOrdLength") {
      this.setState({
        selectedOrdLength: values,
      });
    } else if (names === "selectedOrdBreadth") {
      this.setState({
        selectedOrdBreadth: values,
      });
    } else if (names === "selectedOrdWeight") {
      this.setState({
        selectedOrdWeight: values,
      });
    }
  }
  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetShippingTempData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });

    this.handleGetShippingTempData();
  };

  handleCheckMethod() {
    if (this.state.fileName !== "") {
      this.handleBulkOrderTempUpload();
    } else {
      this.handleSubmitShppingTemp();
    }
  }
  /// handle submit shipping template
  handleSubmitShppingTemp() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.OrdTemplatename !== "" &&
      this.state.OrdTempHeight !== "" &&
      this.state.OrdTempLength !== "" &&
      this.state.OrdTempBreadth !== "" &&
      this.state.OrdTempWeight !== ""
    ) {
      let self = this;
      this.setState({
        ordSettingBtnDisabled: true,
      });
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/InsertUpdateOrderShippingTemplate",
        headers: authHeader(),
        data: {
          TemplateName: this.state.OrdTemplatename,
          Height: this.state.OrdTempHeight,
          Height_Unit: this.state.selectedOrdHeight,
          Length: this.state.OrdTempLength,
          Length_Unit: this.state.selectedOrdLength,
          Breath: this.state.OrdTempBreadth,
          Breath_Unit: this.state.selectedOrdBreadth,
          Weight: this.state.OrdTempWeight,
          Weight_Unit: this.state.selectedOrdWeight,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              OrdTemplatename: "",
              OrdTempHeight: "",
              OrdTempLength: "",
              OrdTempBreadth: "",
              OrdTempWeight: "",
              selectedOrdHeight: "cm",
              selectedOrdLength: "cm",
              selectedOrdBreadth: "cm",
              selectedOrdWeight: "Kg",
              OrdTemplateNameValidation: "",
              OrdTempHeightValidation: "",
              OrdTempLengthValidation: "",
              OrdTempBreadthValidation: "",
              OrdTempWeightValidation: "",
              ordSettingBtnDisabled: false,
            });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.templateaddedsuccessfully
                : "Template Added Successfully."
            );
            self.handleGetShippingTempData();
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.templatenotadded
                : "Template not added."
            );
            self.setState({
              ordSettingBtnDisabled: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        OrdTemplateNameValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
        OrdTempHeightValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
        OrdTempLengthValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
        OrdTempBreadthValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
        OrdTempWeightValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
      });
    }
  }
  /// handle Order template file upload
  handleBulkOrderTempUpload() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    this.setState({
      ordSettingBtnDisabled: true,
    });
    const formData = new FormData();
    formData.append("file", this.state.file);
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/BulkUploadOrderTemplate",
      headers: authHeader(),
      data: formData,
    })
      .then((response) => {
        var status = response.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.fileuploadedsuccessfully
              : "File uploaded successfully."
          );
          self.setState({
            fileName: "",
            file: {},
            ordSettingBtnDisabled: false,
          });
          self.handleGetShippingTempData();
        } else {
          self.setState({ ordSettingBtnDisabled: false });
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.filenotuploaded
              : "File not uploaded."
          );
        }
      })
      .catch((response) => {
        self.setState({ ordSettingBtnDisabled: false });
        console.log(response);
      });
  }
  /// clear all data
  handleOrdClearData() {
    this.setState({
      fileName: "",
      file: {},
      OrdTemplatename: "",
      OrdTempHeight: "",
      OrdTempLength: "",
      OrdTempBreadth: "",
      OrdTempWeight: "",
      selectedOrdHeight: "cm",
      selectedOrdLength: "cm",
      selectedOrdBreadth: "cm",
      selectedOrdWeight: "Kg",
      OrdTemplateNameValidation: "",
      OrdTempHeightValidation: "",
      OrdTempLengthValidation: "",
      OrdTempBreadthValidation: "",
      OrdTempWeightValidation: "",
    });
  }
  /// update Shipping template data
  handleUpdateShippingTemplate() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.editTemplate.templateName !== "" &&
      this.state.editTemplate.height !== "" &&
      this.state.editTemplate.length !== "" &&
      this.state.editTemplate.breath !== "" &&
      this.state.editTemplate.weight !== ""
    ) {
      let self = this;
      this.setState({
        editButtonShow: true,
      });
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/InsertUpdateOrderShippingTemplate",
        headers: authHeader(),
        data: {
          ID: this.state.templateID,
          TemplateName: this.state.editTemplate.templateName,
          Height: this.state.editTemplate.height,
          Height_Unit: this.state.editTemplate.height_Unit,
          Length: this.state.editTemplate.length,
          Length_Unit: this.state.editTemplate.length_Unit,
          Breath: this.state.editTemplate.breath,
          Breath_Unit: this.state.editTemplate.breath_Unit,
          Weight: this.state.editTemplate.weight,
          Weight_Unit: this.state.editTemplate.weight_Unit,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              OrdTemplateNameValidation: "",
              OrdTempHeightValidation: "",
              OrdTempLengthValidation: "",
              OrdTempBreadthValidation: "",
              OrdTempWeightValidation: "",
              editSlotModal: false,
              editButtonShow: false,
            });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.templateupdatedsuccessfully
                : "Template Updated Successfully."
            );
            self.handleGetShippingTempData();
          } else {
            self.setState({
              editButtonShow: false,
            });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard.templatenotupdated
                : "Template not Updated."
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        EditOrdTempNameValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
        EditOrdTempHeightValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
        EditOrdTempLengthValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
        EditOrdTempBreadthValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
        EditOrdTempWeightValidation:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.requiredfield
            : "Required field.",
      });
    }
  }

  /// handle SMS and Whatup toggle change
  handleSMSWhatsUpOnChange = (index) => {
    let orderMessageTemplate = this.state.orderMessageTemplate;
    orderMessageTemplate[index].isActive = !orderMessageTemplate[index]
      .isActive;

    this.setState({
      orderMessageTemplate,
    });
  };

  /// handle SMS and Whatup text change
  handleSMSWhatsUpTextOnChange(index, e) {
    const { value } = e.target;
    let orderMessageTemplate = this.state.orderMessageTemplate;
    orderMessageTemplate[index].description = value;

    this.setState({
      orderMessageTemplate,
    });
  }

  /// handle SMS and Whatup store delivery text change
  handleSMSWhatsUpStoreDelTextOnChange(index, e) {
    const { value } = e.target;
    let orderMessageTemplate = this.state.orderMessageTemplate;
    orderMessageTemplate[index].storeDeliveryDescription = value;

    this.setState({
      orderMessageTemplate,
    });
  }

  /// handle file upload id change
  handleFileUploadData = () => {
    this.refs.ordUplTemplate.click();
  };

  /// check file format
  handleFileUpload = (e) => {
    var imageFile = e.target.files[0];
    var fileName = imageFile.name;
    if (!imageFile.name.match(/\.(csv)$/)) {
      alert("Only csv file allowed.");
      return false;
    } else {
      this.setState({
        fileName,
        file: imageFile,
      });
    }
  };

  handleGetWhatsAppTemplateData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetWhatsappTemplate",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            orderWhatsAppTemplate: data,
          });
        } else {
          self.setState({
            orderWhatsAppTemplate: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleWhatsAppTemplateTextOnChange(index, e) {
    const { value } = e.target;
    let orderWhatsAppTemplate = this.state.orderWhatsAppTemplate;
    orderWhatsAppTemplate[index].templateName = value;

    this.setState({
      orderWhatsAppTemplate,
    });
  }

  handleUpdateWhatsAppTemplateData() {
    const TranslationContext = this.state.translateLanguage.default;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateWhatsappTemplate",
      headers: authHeader(),
      data: {
        pHYWhatsAppTemplates: this.state.orderWhatsAppTemplate,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.orderupdatedsuccessfully
              : "Order Updated Successfully."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.ordernotupdated
              : "Order Not Updated."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.order
              : "Order"}
          </Link>
        </div>
        <div className="Store-paddmodule storeModule">
          <div className="module-tabs">
            <section>
              <Tabs
                onSelect={(index, label) => this.setState({ selTab: label })}
                selected={this.state.selTab}
              >
                {/* Don't Remove commented code */}
                {/* <Tab label="Module">
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5 m-auto">
                              <div className="right-sect-div">
                                <h3>MODULE CONFIGURATION</h3>
                                <div className="module-switch-cntr">
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        Shopping Bag
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckModconfigShoppBag"
                                        name="allModules"
                                        checked={
                                          this.state.moduleConfigData
                                            .shoppingBag
                                        }
                                        onChange={this.ModuleConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckModconfigShoppBag"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        Payment
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckModconfigPayment"
                                        name="allModules"
                                        checked={
                                          this.state.moduleConfigData.payment
                                        }
                                        onChange={this.ModuleConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckModconfigPayment"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        Shipment
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckModconfigShipment"
                                        name="allModules"
                                        checked={
                                          this.state.moduleConfigData.shipment
                                        }
                                        onChange={this.ModuleConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckModconfigShipment"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleUpdateModConfigData.bind(
                                    this
                                  )}
                                >
                                  UPDATE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab> */}
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.label.order
                      : "Order"
                  }
                >
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5 m-auto">
                              <div className="right-sect-div">
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3.orderconfiguration
                                    : "ORDER CONFIGURATION"}
                                </h3>
                                <div className="module-switch-cntr">
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.shoppingbag
                                          : "Shopping Bag"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigShopBag"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.shoppingBag
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigShopBag"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .integratedsystem
                                          : "Integrated System(Sync Order)"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigIntegSys"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .integratedSystem
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigIntegSys"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.payment
                                          : "Payment"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigPayment"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.payment
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigPayment"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData.payment ? (
                                      <div className="ordPayment1">
                                        <input
                                          type="text"
                                          name="paymentTenantCodeText"
                                          autoComplete="off"
                                          placeholder="Enter Tenant Code"
                                          maxLength={500}
                                          value={
                                            this.state.orderConfigData
                                              .paymentTenantCodeText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.shipment
                                          : "Shipment"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigShipment"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.shipment
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigShipment"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .storeasdeliverypartner
                                          : "Store as Delivery Partner"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigStoredelivery"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .storeDelivery
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigStoredelivery"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .alertcommunicationviawhatsapp
                                          : "Alert Communication via Whatsapp"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigAltConmWhts"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .alertCommunicationviaWhtsup
                                        }
                                        onChange={this.handleCommunicationChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigAltConmWhts"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .alertcommunicationviasms
                                          : "Alert Communication via SMS"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigAltComSMS"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .alertCommunicationviaSMS
                                        }
                                        onChange={this.handleCommunicationChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigAltComSMS"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData
                                      .alertCommunicationviaSMS ? (
                                      <div className="ordcusinput">
                                        <input
                                          type="text"
                                          name="alertCommunicationSMSText"
                                          autoComplete="off"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.placeholder
                                                  .providername
                                              : "Provider name"
                                          }
                                          maxLength={15}
                                          value={
                                            this.state.orderConfigData
                                              .alertCommunicationSMSText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>

                                  <table className="cmpaign-channel-table">
                                    <tr>
                                      <td>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.td
                                              .clickwillbeenabledafter
                                          : "Click will be enabled after"}
                                        <span>
                                          (
                                          {TranslationContext !== undefined
                                            ? TranslationContext.span
                                                .paymentsendlinkbutton
                                            : "Payment send link button"}
                                          )
                                        </span>
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="enableClickAfterValue"
                                          autoComplete="off"
                                          maxLength={2}
                                          value={
                                            this.state.orderConfigData
                                              .enableClickAfterValue
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </td>
                                      <td>
                                        <select
                                          value={
                                            this.state.orderConfigData
                                              .enableClickAfterDuration
                                          }
                                          name="enableClickAfterDuration"
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="M">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option.min
                                              : "Min"}
                                          </option>
                                          <option value="H">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option.hr
                                              : "Hr"}
                                          </option>
                                        </select>
                                      </td>
                                    </tr>
                                  </table>
                                  <table className="cmpaign-channel-table">
                                    <tr>
                                      <td>Maximum Retry Count</td>
                                      <td>
                                        <input
                                          type="text"
                                          style={{ marginRight: "63px" }}
                                          name="retryCount"
                                          autoComplete="off"
                                          maxLength={2}
                                          value={
                                            this.state.orderConfigData
                                              .retryCount
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        State Flag
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="chkOrderconfigStateFlag"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.stateFlag
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="chkOrderconfigStateFlag"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label
                                        className="storeRole-name-text ml-0 ordSttd-store"
                                        style={{ marginTop: 14 }}
                                      >
                                        Currency
                                      </label>
                                      <input
                                        type="text"
                                        className="setting-txt"
                                        name="currencyText"
                                        value={
                                          this.state.orderConfigData
                                            .currencyText
                                        }
                                        onChange={this.OrderSettingOnChange.bind(
                                          this
                                        )}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleUpdateOrderConfigData.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.update
                                    : "UPDATE"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.label.smsandwhatsapp
                      : "SMS & WhatsApp"
                  }
                >
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5">
                              <div className="right-sect-div">
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3.smsandwhatsapp
                                    : "SMS & WhatsApp"}
                                </h3>
                                <div className="module-switch-cntr">
                                  {this.state.orderMessageTemplate !== null &&
                                    this.state.orderMessageTemplate.map(
                                      (item, i) => (
                                        <div className="module-switch ord-m-t20">
                                          <div className="switch switch-primary">
                                            <label className="storeRole-name-text m-0 ordSttd-store">
                                              {(() => {
                                                switch (item.messageName) {
                                                  case "Shopping bag Converted to Order":
                                                    return TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.label
                                                          .shoppingbagconvertedtoorder
                                                      : item.messageName;
                                                  case "Awb Assigned":
                                                    return TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.label
                                                          .awbassigned
                                                      : item.messageName;
                                                  case "Pickup Scheduled/Generated":
                                                    return TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.label
                                                          .pickupscheduledgenerated
                                                      : item.messageName;
                                                  case "Shipped":
                                                    return TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.label
                                                          .shipped
                                                      : item.messageName;
                                                  case "Delivered":
                                                    return TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.label
                                                          .delivered
                                                      : item.messageName;
                                                  case "Cancelled":
                                                    return TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.label
                                                          .cancelled
                                                      : item.messageName;
                                                  case "Undelivered":
                                                    return TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.label
                                                          .undelivered
                                                      : item.messageName;
                                                }
                                              })()}
                                            </label>
                                            <input
                                              type="checkbox"
                                              id={"OrderMessage" + i}
                                              name="allModules"
                                              checked={item.isActive}
                                              onChange={this.handleSMSWhatsUpOnChange.bind(
                                                this,
                                                i
                                              )}
                                            />
                                            <label
                                              htmlFor={"OrderMessage" + i}
                                              className="cr cr-float-auto"
                                            ></label>
                                          </div>
                                          {item.isActive ? (
                                            <>
                                              <div
                                                className={
                                                  "ordcusinput" + (i + 1)
                                                }
                                              >
                                                <input
                                                  type="text"
                                                  name="shoppingBagConvertToOrderText"
                                                  autoComplete="off"
                                                  placeholder="Enter Template"
                                                  maxLength={500}
                                                  value={item.description}
                                                  onChange={this.handleSMSWhatsUpTextOnChange.bind(
                                                    this,
                                                    i
                                                  )}
                                                />
                                              </div>
                                              {item.storeDeliveryIsActive ? (
                                                <div
                                                  className={
                                                    "ordcusinputStore" + (i + 1)
                                                  }
                                                >
                                                  <input
                                                    type="text"
                                                    name="shoppingBagConvertToOrderText"
                                                    autoComplete="off"
                                                    placeholder="Enter Template"
                                                    maxLength={500}
                                                    value={
                                                      item.storeDeliveryDescription
                                                    }
                                                    onChange={this.handleSMSWhatsUpStoreDelTextOnChange.bind(
                                                      this,
                                                      i
                                                    )}
                                                  />
                                                </div>
                                              ) : null}
                                            </>
                                          ) : null}
                                        </div>
                                      )
                                    )}
                                </div>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleUpdateOrderConfigMessageTempData.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.update
                                    : "UPDATE"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.ticketingDashboard.shippingtemplate
                      : "Shipping Template"
                  }
                >
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-8 m-auto">
                              <div
                                className="right-sect-div"
                                style={{ padding: "20px" }}
                              >
                                <div
                                  className="row cmpaign-channel-table lbl-fnt-w-400 full-wid-inp"
                                  style={{ margin: "0px" }}
                                >
                                  <div className="col-md-12">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <h3>
                                        {TranslationContext !== undefined
                                          ? TranslationContext
                                              .ticketingDashboard
                                              .shippingtemplate
                                          : "Shipping Template"}
                                      </h3>
                                      <div className="d-flex align-items-center">
                                        <div className="down-excel mr-3">
                                          <p>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p
                                                  .sampletemplate
                                              : "Sample Template"}
                                          </p>
                                          <CSVLink
                                            filename={"OrderTemplate.csv"}
                                            data={config.storeOrder_Template}
                                          >
                                            <img
                                              src={DownExcel}
                                              alt="download icon"
                                            />
                                          </CSVLink>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={this.handleFileUploadData}
                                          className="curshar-pointer"
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext
                                                .ticketingDashboard
                                                .uploadtemplates
                                            : "Upload Templates"}
                                        </button>
                                        <input
                                          type="file"
                                          accept=".csv"
                                          ref="ordUplTemplate"
                                          style={{ display: "none" }}
                                          onChange={this.handleFileUpload}
                                        />
                                        &nbsp;{this.state.fileName}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .templatename
                                          : "Template Name"}
                                      </label>
                                      <input
                                        className="mx-slt-txt"
                                        type="text"
                                        placeholder={
                                          TranslationContext !== undefined
                                            ? TranslationContext
                                                .ticketingDashboard
                                                .entertemplatename
                                            : "Enter Template Name"
                                        }
                                        autoComplete="off"
                                        maxLength={250}
                                        name="OrdTemplatename"
                                        value={this.state.OrdTemplatename}
                                        onChange={this.handleInputOnchange.bind(
                                          this
                                        )}
                                      />
                                      {this.state.OrdTemplatename === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.OrdTemplateNameValidation}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>
                                        {TranslationContext !== undefined
                                          ? TranslationContext
                                              .ticketingDashboard.height
                                          : "Height"}
                                      </label>
                                      <div className="d-flex">
                                        <input
                                          className="mx-slt-txt slot-hour"
                                          type="text"
                                          autoComplete="off"
                                          name="OrdTempHeight"
                                          value={this.state.OrdTempHeight}
                                          maxLength={8}
                                          onChange={this.handleInputValidationChange.bind(
                                            this
                                          )}
                                        />
                                        <select
                                          className="slot-shift"
                                          value={this.state.selectedOrdHeight}
                                          name="selectedOrdHeight"
                                          onChange={this.handleDropDownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="cm">cm</option>
                                          {/* <option value="feet">feet</option>
                                          <option value="inch">inch</option> */}
                                        </select>
                                      </div>
                                      {this.state.OrdTempHeight === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.OrdTempHeightValidation}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>
                                        {TranslationContext !== undefined
                                          ? TranslationContext
                                              .ticketingDashboard.length
                                          : "Length"}
                                      </label>
                                      <div className="d-flex">
                                        <input
                                          className="mx-slt-txt slot-hour"
                                          type="text"
                                          autoComplete="off"
                                          name="OrdTempLength"
                                          value={this.state.OrdTempLength}
                                          maxLength={8}
                                          onChange={this.handleInputValidationChange.bind(
                                            this
                                          )}
                                        />
                                        <select
                                          className="slot-shift"
                                          value={this.state.selectedOrdLength}
                                          name="selectedOrdLength"
                                          onChange={this.handleDropDownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="cm">cm</option>
                                          {/* <option value="feet">feet</option>
                                          <option value="inch">inch</option> */}
                                        </select>
                                      </div>
                                      {this.state.OrdTempLength === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.OrdTempLengthValidation}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>
                                        {TranslationContext !== undefined
                                          ? TranslationContext
                                              .ticketingDashboard.breadth
                                          : "Breadth"}
                                      </label>
                                      <div className="d-flex">
                                        <input
                                          className="mx-slt-txt slot-hour"
                                          type="text"
                                          autoComplete="off"
                                          name="OrdTempBreadth"
                                          value={this.state.OrdTempBreadth}
                                          maxLength={8}
                                          onChange={this.handleInputValidationChange.bind(
                                            this
                                          )}
                                        />
                                        <select
                                          className="slot-shift"
                                          value={this.state.selectedOrdBreadth}
                                          name="selectedOrdBreadth"
                                          onChange={this.handleDropDownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="cm">cm</option>
                                          {/* <option value="feet">feet</option>
                                          <option value="inch">inch</option> */}
                                        </select>
                                      </div>
                                      {this.state.OrdTempBreadth === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.OrdTempBreadthValidation}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>
                                        {TranslationContext !== undefined
                                          ? TranslationContext
                                              .ticketingDashboard.weight
                                          : "Weight"}
                                      </label>
                                      <div className="d-flex">
                                        <input
                                          className="mx-slt-txt slot-hour"
                                          type="text"
                                          autoComplete="off"
                                          name="OrdTempWeight"
                                          value={this.state.OrdTempWeight}
                                          maxLength={8}
                                          onChange={this.handleInputValidationChange.bind(
                                            this
                                          )}
                                        />
                                        <select
                                          className="slot-shift"
                                          value={this.state.selectedOrdWeight}
                                          name="selectedOrdWeight"
                                          onChange={this.handleDropDownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="Kg">Kg</option>
                                          {/* <option value="g">g</option>
                                          <option value="lbs">lbs</option> */}
                                        </select>
                                      </div>
                                      {this.state.OrdTempWeight === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.OrdTempWeightValidation}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div className="col-md-12 my-3 text-center">
                                      <button
                                        className="Schedulenext1 mb-0"
                                        type="button"
                                        onClick={this.handleCheckMethod.bind(
                                          this
                                        )}
                                        disabled={
                                          this.state.ordSettingBtnDisabled
                                        }
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button.submit
                                          : "SUBMIT"}
                                      </button>
                                    </div>
                                    <div
                                      className="col-md-3 my-3 text-center"
                                      style={{ marginRight: "5rem" }}
                                    >
                                      <a
                                        className="ordTempClear"
                                        onClick={this.handleOrdClearData.bind(
                                          this
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.clear
                                          : "CLEAR"}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 store dv-table-paging">
                              <Table
                                loading={this.state.ShipTemploading}
                                noDataContent={
                                  TranslationContext !== undefined
                                    ? TranslationContext.label.norecordfound
                                    : "No Record Found"
                                }
                                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                columns={[
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.templatename
                                        : "Template Name",
                                    dataIndex: "templateName",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                            .height
                                        : "Height",
                                    dataIndex: "height",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          {item.height}&nbsp;{item.height_Unit}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                            .length
                                        : "Length",
                                    dataIndex: "length",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          {item.length}&nbsp;{item.length_Unit}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                            .breadth
                                        : "Breadth",
                                    dataIndex: "breath",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          {item.breath}&nbsp;{item.breath_Unit}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                            .weight
                                        : "Weight",
                                    dataIndex: "weight",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          {item.weight}&nbsp;{item.weight_Unit}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.actions
                                        : "Actions",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          <span>
                                            <button
                                              className="react-tabel-button editre"
                                              onClick={this.openSlotEditModal.bind(
                                                this,
                                                item
                                              )}
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.button.edit
                                                : "EDIT"}
                                            </button>
                                          </span>
                                        </>
                                      );
                                    },
                                  },
                                ]}
                                rowKey={(record) => {
                                  if (record.id) {
                                    uid = uid + 1;
                                    return record.id + "i" + uid;
                                  } else {
                                    uid = uid + 1;
                                    return "i" + uid;
                                  }
                                }}
                                pagination={false}
                                dataSource={this.state.ShippingTempData}
                              ></Table>
                              <Pagination
                                currentPage={this.state.currentPage}
                                totalSize={this.state.totalCount}
                                sizePerPage={this.state.postsPerPage}
                                changeCurrentPage={this.PaginationOnChange}
                                theme="bootstrap"
                              />
                              <div className="position-relative">
                                <div className="item-selection Camp-pagination">
                                  <select
                                    value={this.state.postsPerPage}
                                    onChange={this.handlePageItemchange}
                                  >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                  </select>
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.itemsperpage
                                      : "Items per page"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab label={"WhatsApp Template"}>
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5">
                              <div className="right-sect-div">
                                <h3>WhatsApp Template</h3>
                                <div className="module-switch-cntr">
                                  {this.state.orderWhatsAppTemplate !== null &&
                                    this.state.orderWhatsAppTemplate.map(
                                      (item, i) => (
                                        <div className="module-switch ord-m-t20">
                                          <div className="switch switch-primary">
                                            <label className="storeRole-name-text m-0 ordSttd-store">
                                              {(() => {
                                                switch (item.messageName) {
                                                  case "Campaign":
                                                    return item.messageName;
                                                  case "Shopping Bab to order":
                                                    return item.messageName;
                                                  case "Payment Link":
                                                    return item.messageName;
                                                  case "AWB Assigned":
                                                    return item.messageName;
                                                  case "Delivered":
                                                    return item.messageName;
                                                  case "Cancelled":
                                                    return item.messageName;
                                                  case "Out For Delivery":
                                                    return item.messageName;
                                                  case "Undelivered":
                                                    return item.messageName;
                                                }
                                              })()}
                                            </label>
                                          </div>
                                          <div
                                            className={"ordcusinput" + (i + 1)}
                                          >
                                            <input
                                              type="text"
                                              autoComplete="off"
                                              placeholder="Enter Template"
                                              maxLength={500}
                                              value={item.templateName}
                                              onChange={this.handleWhatsAppTemplateTextOnChange.bind(
                                                this,
                                                i
                                              )}
                                            />
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleUpdateWhatsAppTemplateData.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.update
                                    : "UPDATE"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </section>
            {/* edit slot starts */}
            <Modal
              show={this.state.editSlotModal}
              onHide={this.closeSlotEditModal}
              dialogClassName="slotEditModal"
            >
              <div className="edtpadding">
                <div className="">
                  <label className="popover-header-text">
                    {TranslationContext !== undefined
                      ? TranslationContext.ticketingDashboard
                          .editshippingtemplate
                      : "EDIT SHIPPING TEMPLATE"}
                  </label>
                </div>
                <div className="pop-over-div edit-slot shipping-template-edit">
                  <div className="cmpaign-channel-table slot-setting-options right-sect-div">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.templatename
                        : "Template Name"}
                    </label>
                    <input
                      className="mx-slt-txt"
                      type="text"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .entertemplatename
                          : "Enter Template Name"
                      }
                      autoComplete="off"
                      maxLength={250}
                      name="templateName"
                      value={this.state.editTemplate.templateName}
                      onChange={this.handleEditInputOnchange.bind(this)}
                    />
                    {this.state.editTemplate.templateName === "" && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        {this.state.EditOrdTempNameValidation}
                      </p>
                    )}
                    <label className="edit-slot-lbl">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.height
                        : "Height"}
                    </label>
                    <div className="slot-timings">
                      <div className="d-flex">
                        <input
                          className="mx-slt-txt slot-hour"
                          type="text"
                          autoComplete="off"
                          name="height"
                          value={this.state.editTemplate.height}
                          maxLength={8}
                          onChange={this.handleEditInputValidationChange.bind(
                            this
                          )}
                        />
                        <select
                          className="slot-shift"
                          value={this.state.editTemplate.height_Unit}
                          name="height_Unit"
                          onChange={this.handleEditInputOnchange.bind(this)}
                        >
                          <option value="cm">cm</option>
                          {/* <option value="feet">feet</option>
                          <option value="inch">inch</option> */}
                        </select>
                        {this.state.editTemplate.height === "" && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "10px",
                            }}
                          >
                            {this.state.EditOrdTempHeightValidation}
                          </p>
                        )}
                      </div>
                    </div>
                    <label className="edit-slot-lbl">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.length
                        : "Length"}
                    </label>
                    <div className="slot-timings">
                      <div className="d-flex">
                        <input
                          className="mx-slt-txt slot-hour"
                          type="text"
                          autoComplete="off"
                          name="length"
                          value={this.state.editTemplate.length}
                          maxLength={8}
                          onChange={this.handleEditInputValidationChange.bind(
                            this
                          )}
                        />
                        <select
                          className="slot-shift"
                          value={this.state.editTemplate.length_Unit}
                          name="length_Unit"
                          onChange={this.handleEditInputOnchange.bind(this)}
                        >
                          <option value="cm">cm</option>
                          {/* <option value="feet">feet</option>
                          <option value="inch">inch</option> */}
                        </select>
                        {this.state.editTemplate.length === "" && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "10px",
                            }}
                          >
                            {this.state.EditOrdTempLengthValidation}
                          </p>
                        )}
                      </div>
                    </div>
                    <label className="edit-slot-lbl">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.breadth
                        : "Breadth"}
                    </label>
                    <div className="slot-timings">
                      <div className="d-flex">
                        <input
                          className="mx-slt-txt slot-hour"
                          type="text"
                          autoComplete="off"
                          name="breath"
                          value={this.state.editTemplate.breath}
                          maxLength={8}
                          onChange={this.handleEditInputValidationChange.bind(
                            this
                          )}
                        />
                        <select
                          className="slot-shift"
                          value={this.state.editTemplate.breath_Unit}
                          name="breath_Unit"
                          onChange={this.handleEditInputOnchange.bind(this)}
                        >
                          <option value="cm">cm</option>
                          {/* <option value="feet">feet</option>
                          <option value="inch">inch</option> */}
                        </select>
                        {this.state.editTemplate.breath === "" && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "10px",
                            }}
                          >
                            {this.state.EditOrdTempBreadthValidation}
                          </p>
                        )}
                      </div>
                    </div>
                    <label className="edit-slot-lbl">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.weight
                        : "Weight"}
                    </label>
                    <div className="slot-timings">
                      <div className="d-flex">
                        <input
                          className="mx-slt-txt slot-hour"
                          type="text"
                          autoComplete="off"
                          name="weight"
                          value={this.state.editTemplate.weight}
                          maxLength={8}
                          onChange={this.handleEditInputValidationChange.bind(
                            this
                          )}
                        />
                        <select
                          className="slot-shift"
                          value={this.state.editTemplate.weight_Unit}
                          name="weight_Unit"
                          onChange={this.handleEditInputOnchange.bind(this)}
                        >
                          <option value="Kg">Kg</option>
                          {/* <option value="g">g</option>
                          <option value="lbs">lbs</option> */}
                        </select>
                        {this.state.editTemplate.weight === "" && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "10px",
                            }}
                          >
                            {this.state.EditOrdTempWeightValidation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="text-center">
                  <a
                    className="pop-over-cancle"
                    onClick={this.closeSlotEditModal}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.cancel
                      : "CANCEL"}
                  </a>
                  <button
                    className={
                      this.state.editButtonShow
                        ? "pop-over-button FlNone pop-over-btnsave-text order-grid-btn-disable"
                        : "pop-over-button FlNone pop-over-btnsave-text"
                    }
                    onClick={this.handleUpdateShippingTemplate.bind(this)}
                    disabled={this.state.editButtonShow}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.label.save
                      : "SAVE"}
                  </button>
                </div>
              </div>
            </Modal>
            {/* edit slot ends */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default OrderSetting;
