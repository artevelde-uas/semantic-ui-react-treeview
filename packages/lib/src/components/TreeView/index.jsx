import React from 'react';

import styles from './index.module.css';


/**
 * @module TreeView
 * 
 * @description A TreeView
 * 
 */
export default ({
    ...props
}) => {
    return (
        <div {...props} className={styles.treeview}>
        </div>
    );
};
