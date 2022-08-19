import React, { useEffect, useState } from 'react';
import { Checkbox } from 'semantic-ui-react';

import styles from './index.module.css';


/**
 * @module TreeView
 * 
 * @description A TreeView
 * 
 */
export default ({
    name,
    data: initialData = [],
    ...props
}) => {
    const [data, setData] = useState([]);
    const [itemRefs, setItemRefs] = useState(new Map());

    useEffect(() => {
        const data = processItems(initialData);

        setData(data);
    }, initialData);

    function processItems(items = [], parent = null) {
        return items.map(({ name, children, ...props }) => {
            const item = {
                ...props,
                name,
                parent
            };

            // Recursively process the child items if present
            if (Array.isArray(children)) {
                item.children = processItems(children, item);
            }

            // Store a reference to the item
            itemRefs.set(name, item);

            return item;
        });
    }

    function setParentStates({ parent }) {
        if (parent === null) return;

        const siblings = parent.children;
        const checkedCount = siblings.reduce(
            (count, { checked }) => (count + (checked ? 1 : 0)), 0
        );
        const hasIndeterminate = siblings.some(item => item.indeterminate);

        parent.checked = checkedCount === siblings.length;
        parent.indeterminate = hasIndeterminate || (0 < checkedCount && checkedCount < siblings.length);

        setParentStates(parent);
    }

    function setChildStates({ children, checked }) {
        if (!Array.isArray(children)) return;

        children.forEach(item => {
            item.checked = checked;
            item.indeterminate = false;
            setChildStates(item);
        });
    }

    function handleClick(event, { name, checked }) {
        const item = itemRefs.get(name);

        item.checked = checked;
        item.indeterminate = false;

        setChildStates(item);
        setParentStates(item);

        setItemRefs(new Map(itemRefs));
    }

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
                    name={item.name}
                    onClick={handleClick}
                />
                {item.content}
            </label>
            {item.children && (
                <ItemList items={item.children} />
            )}
        </li>
    );

    return (
        <div
            {...props}
            className={styles.treeview}
        >
            <ItemList items={data} />
        </div>
    );
};
