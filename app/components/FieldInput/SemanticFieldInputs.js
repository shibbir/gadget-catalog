import React from 'react';
import { Input, Form } from 'semantic-ui-react';

export const TextInput = ({ input, attributes, meta: { touched, error } }) => {
    return (
        <Form.Field>
            { attributes.label &&
                <label for={attributes.id}>{attributes.label}</label>
            }
            <Input {...input} {...attributes}/>
            { touched && error &&
                <div class="field-validation-error">
                    {error}
                </div>
            }
        </Form.Field>
    );
};
