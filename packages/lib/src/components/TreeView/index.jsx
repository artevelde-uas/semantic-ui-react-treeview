import React, { useEffect, useState, useRef } from 'react';
import { useUpdateEffect } from 'react-use';
import { Checkbox } from 'semantic-ui-react';

import styles from './index.module.css';


/**
 * @module TreeView
 * 
 * @description A TreeView
 * 
 */
export default ({
    data: initialData = [],
    name,
    value: initialValue = '',
    onChange,
    ...props
}) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState(initialValue);
    const [keys, setKeys] = useState(new Set(value.split(',')));
    const [itemRefs, setItemRefs] = useState(new Map());
    const hiddenInputRef = useRef();

    //#region Effects

    useEffect(() => {
        const data = processItems(initialData);

        setData(data);
    }, [initialData, initialValue]);

    useEffect(() => {
        const value = Array.from(keys).join(',');

        setValue(value);
    }, [keys]);

    useUpdateEffect(() => {
        const event = new Event('input', { bubbles: true });

        hiddenInputRef.current.dispatchEvent(event);
    }, [value]);

    //#endregion

    //#region Functions

    function processItems(items = [], parent = null) {
        return items.map(({ key, children, ...props }) => {
            const item = {
                ...props,
                key,
                parent
            };

            // Check items that are in key list
            if (keys.has(key)) {
                item.checked = true;
            }

            // Recursively process the child items if present
            if (Array.isArray(children)) {
                item.children = processItems(children, item);
                setItemState(item);
            }

            // Store a reference to the item
            itemRefs.set(key, item);

            return item;
        });
    }

    function setItemState(item) {
        const siblings = item.children;
        const checkedCount = siblings.reduce(
            (count, { checked }) => (count + (checked ? 1 : 0)), 0
        );
        const hasIndeterminate = siblings.some(item => item.indeterminate);

        item.checked = checkedCount === siblings.length;
        item.indeterminate = hasIndeterminate || (0 < checkedCount && checkedCount < siblings.length);
    }

    function setParentStates({ parent }) {
        if (parent === null) return;

        setItemState(parent);
        setParentStates(parent);
    }

    function setChildStates({ children, checked, key }) {
        // Store the leaf item keys
        if (!Array.isArray(children)) {
            if (checked) {
                keys.add(key);
            } else {
                keys.delete(key);
            }

            return;
        }

        // Set child states
        children.forEach(item => {
            item.checked = checked;
            item.indeterminate = false;
            setChildStates(item);
        });
    }

    //#endregion

    //#region Event handlers

    function handleChange(event, { checked }) {
        const key = event.target.parentElement.dataset.key;
        const item = itemRefs.get(key);

        item.checked = checked;
        item.indeterminate = false;

        setChildStates(item);
        setParentStates(item);

        setItemRefs(new Map(itemRefs));
        setKeys(new Set(keys));

        event.stopPropagation();
    }

    function handleHiddenInput(event) {
        if (onChange) {
            // Change synthetic event type
            event._reactName = 'onChange';
            event.type = 'change';

            // Fire the change event
            onChange(event, value);
        }
    }

    //#endregion

    //#region Components

    const ItemList = ({ items }) => (
        <ul className={styles.list}>
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </ul>
    );

    const Item = ({ item }) => (
        <li className={styles.item}>
            <label>
                <Checkbox
                    className={styles.checkbox}
                    checked={item.checked}
                    indeterminate={item.indeterminate}
                    data-key={item.key}
                    onChange={handleChange}
                />
                {item.label}
            </label>
            {item.children && (
                <ItemList items={item.children} />
            )}
        </li>
    );

    //#endregion

    return (
        <div
            {...props}
            className={styles.treeview}
        >
            <ItemList items={data} />
            <input
                type='hidden'
                name={name}
                value={value}
                ref={hiddenInputRef}
                onInput={handleHiddenInput}
            />
        </div>
    );
};
