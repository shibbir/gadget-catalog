import React from 'react';
import { Form, Input, Select } from 'semantic-ui-react';

import DraftEditor from './DraftEditor';

export const TextInput = ({ input, attributes, label, meta: { touched, error } }) => {
    return (
        <Form.Field>
            { label &&
                <label>{label}</label>
            }
            <Input {...input} {...attributes} fluid/>
            { touched && error &&
                <div class="field-validation-error">
                    {error}
                </div>
            }
        </Form.Field>
    );
};

export const RichEditorInput = ({ input, attributes, label }) => {
    return (
        <Form.Field>
            { label &&
                <label>{label}</label>
            }
            <DraftEditor {...input}/>
        </Form.Field>
    );
};

export const DropdownField = ({ input: { name, onChange }, label, options, placeholder, meta: { touched, error } }) => {
    return (
        <Form.Field>
            { label &&
                <label>{label}</label>
            }

            <Select name={name} options={options} placeholder={placeholder} onChange={(e, d) => onChange(e, d.value)}/>

            { touched && error &&
                <div class="field-validation-error">
                    {error}
                </div>
            }
        </Form.Field>
    );
};

export const FileInput = ({ input: { name, onChange }, label, meta: { touched, error } }) => {
    return (
        <Form.Field>
            { label &&
                <label>{label}</label>
            }
            <Input type="file" name={name} accept="image/*" onChange={e => onChange(e.target.files[0])}/>
            { touched && error &&
                <div class="field-validation-error">
                    {error}
                </div>
            }
        </Form.Field>
    );
};
