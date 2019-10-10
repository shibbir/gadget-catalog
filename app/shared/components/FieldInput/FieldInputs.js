import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { Field, ErrorMessage } from "formik";
import DraftEditor from "./DraftEditor";

export const TextInput = ({ attributes }) => {
    return (
        <Form.Field required={attributes.required}>
            { attributes.label && <label>{attributes.label}</label> }

            { attributes.icon &&
                <div className="ui fluid input left icon">
                    <Icon name={attributes.icon}/>
                    <Field type={attributes.type} name={attributes.name} placeholder={attributes.placeholder}/>
                </div>
            }

            { !attributes.icon &&
                <div className="ui fluid input">
                    <Field type={attributes.type} name={attributes.name}/>
                </div>
            }

            <div className="field-validation-error">
                <ErrorMessage name={attributes.name}/>
            </div>
        </Form.Field>
    );
};

export const RichEditorInput = ({ attributes }) => {
    return (
        <Form.Field required={attributes.required}>
            { attributes.label && <label>{attributes.label}</label> }

            <DraftEditor {...attributes}/>
        </Form.Field>
    );
};

export const DropdownInput = ({ attributes }) => {
    return (
        <Form.Field required={attributes.required}>
            <Form.Select search {...attributes} options={attributes.options} onChange={attributes.onChange}/>

            <div className="field-validation-error">
                <ErrorMessage name={attributes.name} />
            </div>
        </Form.Field>
    );
};

export const FileInput = ({ attributes }) => {
    return (
        <Form.Field required={attributes.required}>
            { attributes.label && <label>{attributes.label}</label> }

            <Form.Input type="file" name={attributes.name} multiple accept="image/*" onChange={attributes.onChange}/>
            <small>Max number of files is 5</small> | <small>Max file size is 1 MB</small>

            <div className="field-validation-error">
                <ErrorMessage name={attributes.name}/>
            </div>

        </Form.Field>
    );
};
