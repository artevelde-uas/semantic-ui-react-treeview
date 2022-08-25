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
