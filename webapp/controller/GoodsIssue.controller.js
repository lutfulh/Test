sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fi.neomore.goodsissue.goodsissue1.controller.GoodsIssue", {
        onInit: function () {
            // Setting up models
            this.getView().setModel(
                new JSONModel(jQuery.sap.getModulePath("fi.neomore.goodsissue.goodsissue1.model", "/CostCenters.json")),
                "costCenters"
            );

            this.getView().setModel(
                new JSONModel(jQuery.sap.getModulePath("fi.neomore.goodsissue.goodsissue1.model", "/GoodsRecipients.json")),
                "goodsRecipients"
            );

            this.getView().setModel(
                new JSONModel(jQuery.sap.getModulePath("fi.neomore.goodsissue.goodsissue1.model", "/Materials.json")),
                "materials"
            );

            this.getView().setModel(
                new JSONModel(jQuery.sap.getModulePath("fi.neomore.goodsissue.goodsissue1.model", "/Plants.json")),
                "plants"
            );

            this.getView().setModel(
                new JSONModel(jQuery.sap.getModulePath("fi.neomore.goodsissue.goodsissue1.model", "/StorageLocations.json")),
                "storageLocations"
            );

            this.getView().setModel(
                new JSONModel(jQuery.sap.getModulePath("fi.neomore.goodsissue.goodsissue1.model", "/UnitOfMeasures.json")),
                "unitOfMeasures"
            );

            // Initialize a local JSON model for the items
            this.getView().setModel(new JSONModel({ items: [] }));

        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query").toLowerCase();
            var oView = this.getView();
            var oSearchField = this.byId("materialSearch");
        
            if (!sQuery) {
                // No query entered, show an error message
                sap.m.MessageToast.show("Please enter a material number or description to search.");
                return;
            }
        
            // Retrieve the material details from the materials model
            var aMaterials = oView.getModel("materials").getData();
            var oSelectedMaterial = aMaterials.find(material =>
                material.MaterialId.toLowerCase() === sQuery ||
                (material.MaterialDescription && material.MaterialDescription.toLowerCase().includes(sQuery))
            );
        
            if (oSelectedMaterial) {
                // Check if the item already exists in the list
                var aItems = oView.getModel().getProperty("/items");
                var isDuplicate = aItems.some(item => item.MaterialId === oSelectedMaterial.MaterialId);
        
                if (!isDuplicate) {
                    // Add the found material to the items array in the model
                    aItems.push(oSelectedMaterial);
                    oView.getModel().setProperty("/items", aItems);
                } else {
                    // Material is already in the list, show an error message
                    sap.m.MessageToast.show("Material is already in the list.");
                }
            } else {
                // Material not found, show an error message
                sap.m.MessageToast.show("Material not found. Please try a different number or description.");
            }
        
            // Clear the search field
            oSearchField.setValue("");
        },

        onDeleteItem: function (oEvent) {
            var oItem = oEvent.getSource().getBindingContext().getObject();
            var aItems = this.getView().getModel().getProperty("/items");

            // Remove the item from the items array
            var iItemIndex = aItems.indexOf(oItem);
            if (iItemIndex !== -1) {
                aItems.splice(iItemIndex, 1);
                this.getView().getModel().setProperty("/items", aItems);
            }
        },

        onPost: function () {
            // Logic to handle posting data to the backend
        },

        onCancel: function () {
            // Logic to clear the form or undo changes
        }

    });
});