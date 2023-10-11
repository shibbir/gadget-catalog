import React from "react";
import { Field, ErrorMessage } from "formik";
import { Form, Icon } from "semantic-ui-react";
import { Editor } from "@tinymce/tinymce-react";

export const TextInput = ({ attributes }) => {
    return (
        <Form.Field required={attributes.required}>
            { attributes.label && <label>{attributes.label}</label> }

            { attributes.icon &&
                <div className="ui fluid input left icon">
                    <Icon name={attributes.icon}/>
                    <Field type={attributes.type} name={attributes.name} placeholder={attributes.placeholder} autoComplete={attributes.autoComplete } />
                </div>
            }

            { !attributes.icon &&
                <div className="ui fluid input">
                    <Field type={attributes.type} name={attributes.name} autoComplete={attributes.autoComplete }/>
                </div>
            }

            <div className="field-validation-error">
                <ErrorMessage name={attributes.name}/>
            </div>
        </Form.Field>
    );
};

export const TextareaInput = ({ attributes }) => {
    return (
        <Form.Field required={attributes.required}>
            { attributes.label && <label>{attributes.label}</label> }

            { attributes.icon &&
                <div className="ui fluid input left icon">
                    <Icon name={attributes.icon}/>
                    <Field type={attributes.type} name={attributes.name} placeholder={attributes.placeholder} autoComplete={attributes.autoComplete } />
                </div>
            }

            { !attributes.icon &&
                <div className="ui fluid input">
                    <Field component="textarea" name={attributes.name} autoComplete={attributes.autoComplete }/>
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

            <Editor
                apiKey={process.env.TINYCLOUD_API_KEY}
                value={attributes.value}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link',
                        'anchor', 'visualblocks', 'code',
                        'insertdatetime', 'table'
                    ],
                    toolbar: 'blocks | ' +
                        'bold italic forecolor | ' +
                        'bullist numlist | ' +
                        'removeformat',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    placeholder: attributes.placeholder
                }}
                onEditorChange={(content) => {
                    attributes.setFieldValue(attributes.name, content);
                }}
            />
        </Form.Field>
    );
};

export const DropdownInput = ({ attributes }) => {
    return (
        <Form.Field required={attributes.required}>
            <Form.Select search {...attributes} options={attributes.options}/>

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

            <div className="field" style={{margin: 0}}>
                <div className="ui input">
                    <input type="file" name={attributes.name} multiple={attributes.multiple} accept="image/*" onChange={attributes.onChange}/>
                </div>
            </div>

            <small>{attributes.info}</small>

            <div className="field-validation-error">
                <ErrorMessage name={attributes.name}/>
            </div>

        </Form.Field>
    );
};
