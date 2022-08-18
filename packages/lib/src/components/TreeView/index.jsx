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

        const data = processItems(initialData);

        setData(data);
    }, initialData);

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
                    name={item.name}
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
