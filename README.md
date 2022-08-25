# Semantic UI React Spinbutton

[![npm](https://img.shields.io/npm/v/semantic-ui-react-treeview.svg)](https://www.npmjs.com/package/semantic-ui-react-treeview)
[![license](https://img.shields.io/github/license/artevelde-uas/semantic-ui-react-treeview.svg)](https://spdx.org/licenses/ISC)
[![downloads](https://img.shields.io/npm/dt/semantic-ui-react-treeview.svg)](https://www.npmjs.com/package/semantic-ui-react-treeview)

![Semantic UI logo](/docs/semantic-ui-logo.png)

TreeView control for [Semantic UI React](https://react.semantic-ui.com/)

## Prerequisites

```json
{
  "react": "*",
  "react-dom": "*",
  "semantic-ui-react": "*"
}
```

## Installation

Using Yarn:

```shell
yarn add semantic-ui-react-treeview
```

## Usage

### Examples

```jsx
import { TreeView } from 'semantic-ui-react-treeview';
import 'semantic-ui-react-treeview/dist/index.css';

export default () => (
    <div>
        <TreeView
            name='my-treeview'
            onChange={handleChange}
            data={[{
                label: 'Item 1',
                key: '1',
                children: [{
                    label: 'Item 1.1',
                    key: '1.1'
                }, {
                    label: 'Item 1.2',
                    key: '1.2'
                }]
            }, {
                label: 'Item 2',
                key: '2',
                children: [{
                    label: 'Item 2.1',
                    key: '2.1'
                }, {
                    label: 'Item 2.2',
                    key: '2.2'
                }]
            }]}
        />
    </div>
);
```

## Demo

Clone the package and run `yarn start`

## API

<a name="module_TreeView"></a>

### TreeView

A TreeView

