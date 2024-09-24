import { Country } from '@/src/app/lib/countries';

/**
 * Template for rendering the selected country or grade in the dropdown.
 */
export const renderSelectedItemTemplate = (option: Country | string, props: any) => {
    
    if (!option) {
        // If the option is null or undefined, display the placeholder text
        return <span>{props.placeholder}</span>;
    }
    
    if (typeof option === 'string') {
        return <span>{option}</span>;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
                alt={option.name}
                src={`./flags/${option.code.toLowerCase()}.svg`}
                style={{ width: '18px', display: 'inline-block', verticalAlign: 'middle' }}
            />
            <span>{option.name}</span>
        </div>
    );
};

/**
 * Template for rendering each option in the dropdown list.
 */
export const renderOptionTemplate = (option: Country | string) => {
    if (typeof option === 'string') {
        return <span>{option}</span>;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
                alt={option.name}
                src={`./flags/${option.code.toLowerCase()}.svg`}
                style={{ width: '18px', display: 'inline-block', verticalAlign: 'middle' }}
            />
            <span>{option.name}</span>
        </div>
    );
};