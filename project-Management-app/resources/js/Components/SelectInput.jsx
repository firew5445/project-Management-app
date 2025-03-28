import { forwardRef, useImperativeHandle, useRef } from 'react';
import Select from 'react-select';

export default forwardRef(function SelectInput(
    { className = '', options = [], ...props },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    return (
        <Select
            {...props}
            options={options} 
            classNamePrefix="react-select" 
            className={'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' + className}
            ref={localRef}
        />
    );
});
