import React, { useState } from 'react';
import { Tab, Container, Header, Item, Form } from 'semantic-ui-react';
import { TreeView } from 'semantic-ui-react-treeview';


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
                <Form.Group>
                    <TreeView
                        onChange={handleChange}
                    />
                    <Form.Button type='submit' content='Submit' />
                </Form.Group>
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
