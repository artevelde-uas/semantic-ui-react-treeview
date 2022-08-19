import React, { useState } from 'react';
import { Tab, Container, Header, Item, Form } from 'semantic-ui-react';
import { TreeView } from 'semantic-ui-react-treeview';


const data = [{
    label: 'Item 1',
    key: '1',
    children: [{
        label: 'Item 1.1',
        key: '1.1',
        children: [{
            label: 'Item 1.1.1',
            key: '1.1.1'
        }, {
            label: 'Item 1.1.2',
            key: '1.1.2'
        }, {
            label: 'Item 1.1.3',
            key: '1.1.3'
        }, {
            label: 'Item 1.1.4',
            key: '1.1.4'
        }]
    }, {
        label: 'Item 1.2',
        key: '1.2',
        children: [{
            label: 'Item 1.2.1',
            key: '1.2.1',
            children: [{
                label: 'Item 1.2.1.1',
                key: '1.2.1.1'
            }, {
                label: 'Item 1.2.1.2',
                key: '1.2.1.2'
            }]
        }, {
            label: 'Item 1.2.2',
            key: '1.2.2'
        }, {
            label: 'Item 1.2.3',
            key: '1.2.3'
        }]
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
}];


const SubmitForm = () => {
    const [value, setValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');

    function handleChange(event, value) {

        console.log(event, value);

        setValue(value);
    }

    function handleSubmit() {
        setSubmittedValue(value);
    }

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}>
                <TreeView
                    onChange={handleChange}
                    data={data}
                    value='1.1.1,1.1.3,1.2.2'
                />
                <br />
                <Form.Button type='submit' content='Submit' />
            </Form>
            <br />
            <strong>onChange:</strong>
            <pre>
                {JSON.stringify({ value }, null, 2)}
            </pre>
            <strong>onSubmit:</strong>
            <pre>
                {JSON.stringify({ submittedValue }, null, 2)}
            </pre>
        </React.Fragment>
    );
};

const TreeViewExamples = () => (
    <Item.Group>
        <Item>
            <Item.Content>
                <Item.Header>Default TreeView</Item.Header>
                <Item.Meta>Default TreeView</Item.Meta>
                <Item.Description>
                    <TreeView
                        //...
                        data={data}
                        value='1.1.1,1.1.3,1.2.2'
                    />
                </Item.Description>
            </Item.Content>
        </Item>
    </Item.Group>
);

const FormExamples = () => (
    <Item.Group>
        <Item>
            <Item.Content>
                <Item.Header>Capture Form Values</Item.Header>
                <Item.Meta>Default TreeView</Item.Meta>
                <Item.Description>
                    <SubmitForm />
                </Item.Description>
            </Item.Content>
        </Item>
    </Item.Group>
);

const panes = [
    { menuItem: 'TreeView', render: () => <TreeViewExamples /> },
    { menuItem: 'Forms', render: () => <FormExamples /> }
];

export default () => (
    <Container text>
        <Header as='h1'>Semantic UI React Spinbutton</Header>
        <Tab panes={panes} />
    </Container>
);
