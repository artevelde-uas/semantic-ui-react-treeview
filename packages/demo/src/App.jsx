import React, { useState } from 'react';
import { Tab, Container, Header, Item, Form } from 'semantic-ui-react';
import { TreeView } from 'semantic-ui-react-treeview';


const data = [{
    content: 'Item 1',
    name: '1',
    children: [{
        content: 'Item 1.1',
        name: '1.1',
        children: [{
            content: 'Item 1.1.1',
            name: '1.1.1',
            checked: true
        }, {
            content: 'Item 1.1.4',
            name: '1.1.4'
        }, {
            content: 'Item 1.1.3',
            name: '1.1.3',
            checked: true
        }, {
            content: 'Item 1.1.2',
            name: '1.1.2'
        }]
    }, {
        content: 'Item 1.2',
        name: '1.2',
        children: [{
            content: 'Item 1.2.1',
            name: '1.2.1',
            children: [{
                content: 'Item 1.2.1.1',
                name: '1.2.1.1',
            }, {
                content: 'Item 1.2.1.2',
                name: '1.2.1.2',
            }]
        }, {
            content: 'Item 1.2.2',
            name: '1.2.2',
            checked: true
        }, {
            content: 'Item 1.2.3',
            name: '1.2.3',
        }]
    }]
}, {
    content: 'Item 2',
    name: '2',
    children: [{
        content: 'Item 2.1',
        name: '2.1',
    }, {
        content: 'Item 2.2',
        name: '2.2',
    }]
}];


const SubmitForm = () => {
    const [value, setValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');

    function handleChange(event) {

        console.log(event);

        setValue(event.target.value);
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
