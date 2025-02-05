import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    as?: React.ElementType;
    options?: { value: string; label: string }[];
}

export const InputField = ({
    name,
    label,
    type = 'text',
    as = 'input',
    options,
}: InputFieldProps) => (
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>

        {as === 'select' ? (
            <Field as="select" name={name} className="select select-bordered">
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>
        ) : (
            <Field name={name} type={type} className="input input-bordered" as={as} />
        )}

        <ErrorMessage name={name}>
            {(msg) => (
                <label className="label">
                    <span className="label-text-alt text-error">{msg}</span>
                </label>
            )}
        </ErrorMessage>
    </div>
);