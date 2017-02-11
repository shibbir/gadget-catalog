import React from 'react';

export const FileInput = ({ input: { name, onChange }, id, label, meta: { touched, error } }) => {
    let formGroupClass = touched && error ? 'form-group has-danger' : 'form-group';
    let formControlClass = touched && error ? 'form-control-file form-control-danger' : 'form-control-file';

    return (
        <div class={formGroupClass}>
            <label for={id}>{label}</label>
            <input type="file" name={name} class={formControlClass} id={id} accept="image/*" onChange={e => onChange(e.target.files[0])}/>
            <div class="form-control-feedback">
                {touched && (error && <span>{error}</span>)}
            </div>
        </div>
    );
};

export const TextInput = ({ input, label, id, type, meta: { touched, error } }) => {
    let formGroupClass = touched && error ? 'form-group has-danger' : 'form-group';
    let formControlClass = touched && error ? 'form-control form-control-danger' : 'form-control';

    return (
        <div class={formGroupClass}>
            <label for={id}>{label}</label>
            <input class={formControlClass} {...input} id={id} type={type}/>
            <div class="form-control-feedback">
                {touched && (error && <span>{error}</span>)}
            </div>
        </div>
    );
};

export const DropdownField = ({ input, id, label, options, defaultOption, meta: { touched, error } }) => {
    let formGroupClass = touched && error ? 'form-group has-danger' : 'form-group';
    let formControlClass = touched && error ? 'form-control form-control-danger' : 'form-control';

    return (
        <div class={formGroupClass}>
            <label for={id}>{label}</label>
            <select class={formControlClass} {...input} id={id}>
                <option value="">{defaultOption}</option>
                {options}
            </select>
            <div class="form-control-feedback">
                {touched && (error && <span>{error}</span>)}
            </div>
        </div>
    );
};

export const TextareaField = ({ input, id, label, meta: { touched, error } }) => {
    let formGroupClass = touched && error ? 'form-group has-danger' : 'form-group';
    let formControlClass = touched && error ? 'form-control form-control-danger' : 'form-control';

    return (
        <div class={formGroupClass}>
            <label for={id}>{label}</label>
            <textarea class={formControlClass} {...input} id={id} rows="10"></textarea>
            <div class="form-control-feedback">
                {touched && (error && <span>{error}</span>)}
            </div>
        </div>
    );
};
