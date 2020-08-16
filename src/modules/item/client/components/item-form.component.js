import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { stateToHTML } from "draft-js-export-html";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { EditorState, ContentState, convertFromHTML } from "draft-js";

import Types from "../item.types";
import { itemSchema } from "../item.schema";
import { getBrands } from "../../../brand/client/brand.actions";
import { getVendors } from "../../../vendor/client/vendor.actions";
import { createItem, updateItem, fetchItem } from "../item.actions";
import { getCategories } from "../../../category/client/category.actions";
import { TextInput, RichEditorInput, DropdownInput, FileInput } from "../../../core/client/components/FieldInput/FieldInputs";

export default function ItemForm() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getVendors());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if(id) {
            dispatch(fetchItem(id));
        }
    }, [id, dispatch]);

    const item = useSelector(state => state.itemReducer.item);
    const brands = useSelector(state => state.brandReducer.brands);
    const vendors = useSelector(state => state.vendorReducer.vendors);
    const categories = useSelector(state => state.categoryReducer.categories);

    const blocksFromHTML = convertFromHTML(item && item.description ? item.description : "");

    const categoryOptions = categories.map(function(option) {
        return { key: option._id, value: option._id, text: option.name };
    });

    const brandOptions = brands.map(function(option) {
        return { key: option._id, value: option._id, text: option.name };
    });

    const vendorOptions = vendors.map(function(option) {
        return { key: option._id, value: option._id, text: option.name };
    });

    const currencyOptions = [
        { key: "AUD", text: "AUD", value: "AUD" },
        { key: "BDT", text: "BDT", value: "BDT" },
        { key: "BGN", text: "BGN", value: "BGN" },
        { key: "CAD", text: "CAD", value: "CAD" },
        { key: "CNY", text: "CNY", value: "CNY" },
        { key: "EUR", text: "EUR", value: "EUR" },
        { key: "GBP", text: "GBP", value: "GBP" },
        { key: "INR", text: "INR", value: "INR" },
        { key: "JPY", text: "JPY", value: "JPY" },
        { key: "NZD", text: "NZD", value: "NZD" },
        { key: "RUB", text: "RUB", value: "RUB" },
        { key: "SGD", text: "SGD", value: "SGD" },
        { key: "USD", text: "USD", value: "USD" }
    ];

    return (
        <>
            <h3>Item form</h3>
            <Divider section/>

            <Formik
                initialValues={{
                    name: item ? item.name : "",
                    categoryId: item ? item.categoryId : "",
                    brandId: item ? item.brandId : "",
                    purchaseDate: item && item.purchaseDate ? format(parseISO(item.purchaseDate), "y-MM-d") : "",
                    price: item ? item.price : "",
                    currency: item ? item.currency : "",
                    vendorId: item ? item.vendorId : "",
                    files: "",
                    editorState: blocksFromHTML.contentBlocks
                        ? new EditorState.createWithContent(ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap))
                        : new EditorState.createEmpty()
                }}
                displayName="ItemForm"
                enableReinitialize={true}
                validationSchema={itemSchema}
                onSubmit={(values, actions) => {
                    values.description = stateToHTML(values.editorState.getCurrentContent());

                    let formData = new FormData();

                    if(values.files) {
                        for(let index = 0; index < values.files.length; index++) {
                            formData.append("files", values.files[index]);
                        }
                        delete values.files;
                    }

                    for(let key in values) {
                        if(values.hasOwnProperty(key)) {
                            formData.append(key, values[key]);
                        }
                    }

                    if(id) {
                        dispatch(updateItem(formData, id)).then(result => {
                            const { type, payload } = result.action;

                            if(type === Types.PUT_ITEM_FULFILLED) {
                                history.push(`/items/${payload.data._id}`);
                            }
                        });
                    } else {
                        dispatch(createItem(formData)).then(result => {
                            const { type, payload } = result.action;

                            if(type === Types.POST_ITEM_FULFILLED) {
                                history.push(`/items/${payload.data._id}`);
                            }
                        });
                    }

                    actions.setSubmitting(false);
                }}
            >
                {formikProps => (
                    <Form onSubmit={formikProps.handleSubmit} className="ui form">
                        <TextInput attributes={{
                            type: "text",
                            name: "name",
                            label: "Name",
                            required: true
                        }}/>
                        <RichEditorInput attributes={{
                            value: formikProps.values.description,
                            name: "description",
                            label: "Description",
                            onChange: formikProps.setFieldValue,
                            onBlur: formikProps.handleBlur,
                            editorState: formikProps.values.editorState
                        }}/>
                        <DropdownInput attributes={{
                            value: formikProps.values.categoryId,
                            name: "categoryId",
                            placeholder: "Select category",
                            label: "Category",
                            options: categoryOptions,
                            onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)},
                            required: true
                        }}/>
                        <DropdownInput attributes={{
                            value: formikProps.values.brandId,
                            name: "brandId",
                            placeholder: "Select brand",
                            label: "Brand",
                            options: brandOptions,
                            onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)},
                            required: true
                        }}/>
                        <TextInput attributes={{
                            type: "date",
                            name: "purchaseDate",
                            label: "Purchase date",
                            required: true
                        }}/>
                        <TextInput attributes={{
                            type: "number",
                            name: "price",
                            label: "Price",
                            required: true
                        }}/>
                        <DropdownInput attributes={{
                            value: formikProps.values.currency,
                            name: "currency",
                            placeholder: "Select currency",
                            label: "Currency",
                            options: currencyOptions,
                            onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)},
                            required: true
                        }}/>
                        <DropdownInput attributes={{
                            value: formikProps.values.vendorId,
                            name: "vendorId",
                            placeholder: "Select vendor",
                            label: "Vendor",
                            options: vendorOptions,
                            onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                        }}/>
                        <FileInput attributes={{
                            type: "file",
                            name: "files",
                            label: "Upload images",
                            multiple: true,
                            onChange: event => {formikProps.setFieldValue("files", event.currentTarget.files)}
                        }}/>
                        <Divider hidden/>
                        <Button.Group>
                            <Button type="submit" positive disabled={formikProps.isSubmitting}>Save</Button>
                            <Button.Or/>
                            <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                        </Button.Group>
                    </Form>
                )}
            </Formik>
        </>
    );
}
