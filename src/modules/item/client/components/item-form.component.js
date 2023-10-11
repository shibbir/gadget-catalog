import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Divider, Button, Form as SemanticUIForm } from "semantic-ui-react";
import Dropzone from 'react-dropzone';

import Types from "../item.types";
import { itemSchema } from "../item.schema";
import { getBrands } from "../../../brand/client/brand.actions";
import { createItem, updateItem, getItem } from "../item.actions";
import { getCategories } from "../../../category/client/category.actions";
import { TextInput, RichEditorInput, DropdownInput, FileInput } from "../../../core/client/components/FieldInputs";

export default function ItemForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if(id) dispatch(getItem(id));
    }, [id, dispatch]);

    const item = useSelector(state => state.itemReducer.item);
    const brands = useSelector(state => state.brandReducer.brands);
    const categories = useSelector(state => state.categoryReducer.categories);

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
                description: item ? item.description : "",
                categoryId: item ? item.categoryId : "",
                brandId: item ? item.brandId : "",
                purchaseDate: item?.purchaseDate ? format(parseISO(item.purchaseDate), "y-MM-d") : "",
                price: item ? item.price : "",
                currency: item ? item.currency : "",
                payee: item ? item.payee : "",
                images: "",
                invoice: ""
                // images: []
            }}
            displayName="ItemForm"
            enableReinitialize={true}
            validationSchema={itemSchema}
            onSubmit={(values, actions) => {
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

                for(const key in values) {
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
                            navigate(`/items/${payload.data._id}`);
                        }
                    });
                }

                actions.setSubmitting(false);
            }}
        >
            {formikProps => (
                <Form onSubmit={formikProps.handleSubmit} className="ui form" encType="multipart/form-data">
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
                        placeholder: "Item description goes here...",
                        setFieldValue: formikProps.setFieldValue
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

                        <TextInput attributes={{
                            type: "text",
                            name: "payee",
                            label: "Payee"
                        }}/>
                    </SemanticUIForm.Group>

                    <FileInput attributes={{
                        type: "file",
                        name: "images",
                        label: "Upload images",
                        multiple: true,
                        info: "You can upload a maximum of 3 images at a time. The max file size limit is 1.5 MB.",
                        onChange: event => {formikProps.setFieldValue("images", event.currentTarget.files)}
                    }}/>

                    {/* <Dropzone
                        multiple
                        onDrop={acceptedFiles => {
                            if (acceptedFiles.length === 0) return;
                            formikProps.setFieldValue("images", formikProps.values.images.concat(acceptedFiles));
                        }}
                    >
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone> */}

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
