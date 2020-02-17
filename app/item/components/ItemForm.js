import React from "react";
import { Form, withFormik } from "formik";
import { format, parseISO } from "date-fns";
import { Divider, Button } from "semantic-ui-react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Types from "../item.types";
import { itemSchema } from "../item.schema";
import { TextInput, RichEditorInput, DropdownInput, FileInput } from "../../shared/components/FieldInput/FieldInputs";

class ItemForm extends React.Component {
    constructor(props) {
        super();

        props.getBrands();
        props.getCategories();

        if(props.itemId) {
            props.fetchItem(props.itemId);
        }
    }

    render() {
        const {
            values,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting
        } = this.props;

        const categoryOptions = this.props.categories.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        const brandOptions = this.props.brands.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        const handleDropdownChange = (e, data) => {
            if (data && data.name) {
                setFieldValue(data.name, data.value);
            }
        };

        const handleFileChange = e => {
            setFieldValue("files", e.currentTarget.files);
        };

        return (
            <Form onSubmit={handleSubmit} className="ui form">
                <TextInput attributes={{
                    type: "text",
                    name: "name",
                    label: "Name",
                    required: true
                }}/>
                <RichEditorInput attributes={{
                    value: values.description,
                    name: "description",
                    label: "Description",
                    onChange: setFieldValue,
                    onBlur: handleBlur,
                    editorState: values.editorState
                }}/>
                <DropdownInput attributes={{
                    value: values.categoryId,
                    name: "categoryId",
                    placeholder: "Select category",
                    label: "Category",
                    options: categoryOptions,
                    onChange: handleDropdownChange,
                    required: true
                }}/>
                <DropdownInput attributes={{
                    value: values.brandId,
                    name: "brandId",
                    placeholder: "Select brand",
                    label: "Brand",
                    options: brandOptions,
                    onChange: handleDropdownChange,
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
                <FileInput attributes={{
                    type: "file",
                    name: "files",
                    label: "Upload images",
                    multiple: true,
                    onChange: handleFileChange
                }}/>
                <Divider hidden/>
                <Button.Group>
                    <Button type="submit" positive disabled={isSubmitting}>Save</Button>
                    <Button.Or/>
                    <Button type="reset" disabled={isSubmitting}>Reset</Button>
                </Button.Group>
            </Form>
        );
    }
}

ItemForm = withFormik({
    enableReinitialize: true,

    validationSchema: itemSchema,

    mapPropsToValues: (props) => {
        if(props.itemId && props.item) {
            props.item.description = props.item.description || "";
            const blocksFromHTML = convertFromHTML(props.item.description);

            return {
                name: props.item.name,
                categoryId: props.item.categoryId,
                brandId: props.item.brandId,
                purchaseDate: format(parseISO(props.item.purchaseDate), "y-MM-d"),
                price: props.item.price,
                editorState: blocksFromHTML.contentBlocks
                    ? new EditorState.createWithContent(ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap))
                    : new EditorState.createEmpty()
            };
        }

        return {
            name: "",
            categoryId: "",
            brandId: "",
            purchaseDate: "",
            price: "",
            files: "",
            editorState: new EditorState.createEmpty()
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        setSubmitting(false);

        let contentState = values.editorState.getCurrentContent();
        values.description = stateToHTML(contentState);

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

        if(props.itemId) {
            props.updateItem(formData, props.itemId).then(result => {
                const { type, payload } = result.action;

                if(type === Types.PUT_ITEM_FULFILLED) {
                    props.history.push(`/items/${payload.data._id}`);
                }
            });
        } else {
            props.createItem(formData).then(result => {
                const { type, payload } = result.action;

                if(type === Types.POST_ITEM_FULFILLED) {
                    props.history.push(`/items/${payload.data._id}`);
                }
            });
        }
    },

    displayName: "ItemForm"
})(ItemForm);

export default ItemForm;
