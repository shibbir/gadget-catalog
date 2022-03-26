import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { stateToHTML } from "draft-js-export-html";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Divider, Button, Form as SemanticUIForm } from "semantic-ui-react";

import Types from "../item.types";
import { itemSchema } from "../item.schema";
import { getBrands } from "../../../brand/client/brand.actions";
import { createItem, updateItem, fetchItem } from "../item.actions";
import { getCategories } from "../../../category/client/category.actions";
import { TextInput, RichEditorInput, DropdownInput, FileInput } from "../../../core/client/components/FieldInput/FieldInputs";

export default function ItemForm() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchItem(id));
    }, [dispatch]);

    const item = useSelector(state => state.itemReducer.item);
    const brands = useSelector(state => state.brandReducer.brands);
    const categories = useSelector(state => state.categoryReducer.categories);

    const blocksFromHTML = convertFromHTML(item && item.description ? item.description : "");

    const categoryOptions = categories.map(function(option) {
        return { key: option._id, value: option._id, text: option.name };
    });

    const brandOptions = brands.map(function(option) {
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
        <Formik
            initialValues={{
                name: item ? item.name : "",
                categoryId: item ? item.categoryId : "",
                brandId: item ? item.brandId : "",
                purchaseDate: item && item.purchaseDate ? format(parseISO(item.purchaseDate), "y-MM-d") : "",
                price: item ? item.price : "",
                currency: item ? item.currency : "",
                images: "",
                invoice: "",
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

                if(values.images) {
                    for(let index = 0; index < values.images.length; index++) {
                        formData.append("images", values.images[index]);
                    }
                    delete values.images;
                }

                if(values.invoice) {
                    formData.append("invoice", values.invoice);
                    delete values.invoice;
                }

                for(let key in values) {
                    if(values[key] && values.hasOwnProperty(key)) {
                        formData.append(key, values[key]);
                    }
                }

                if(id) {
                    dispatch(updateItem(formData, id)).then(result => {
                        const { type } = result.action;

                        if(type === Types.PUT_ITEM_FULFILLED) {
                            window.location.reload();
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

                    <SemanticUIForm.Group widths="equal">
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
                    </SemanticUIForm.Group>

                    <SemanticUIForm.Group widths="equal">
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
                    </SemanticUIForm.Group>

                    <SemanticUIForm.Group widths="equal">
                        <TextInput attributes={{
                            type: "date",
                            name: "purchaseDate",
                            label: "Purchase date",
                            required: true
                        }}/>
                    </SemanticUIForm.Group>

                    <FileInput attributes={{
                        type: "file",
                        name: "images",
                        label: "Upload images",
                        multiple: true,
                        info: "You can upload a maximum of 3 files at a time. The max file size limit is 1.5 MB.",
                        onChange: event => {formikProps.setFieldValue("images", event.currentTarget.files)}
                    }}/>

                    <FileInput attributes={{
                        type: "file",
                        name: "invoice",
                        label: "Upload invoice",
                        info: "The max file size limit is 1.5 MB.",
                        onChange: event => {formikProps.setFieldValue("invoice", event.currentTarget.files[0])}
                    }}/>

                    <Divider hidden/>

                    <Button.Group>
                        <Button type="submit" positive disabled={formikProps.isSubmitting}>Save changes</Button>
                        <Button.Or/>
                        <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                    </Button.Group>
                </Form>
            )}
        </Formik>
    );
}
