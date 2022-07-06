import DataTree from "./DataTree";
import './App.scss'
import {useState} from "react";
import treeData from './tree.json'
const modes = {
    MODE_NORMAL: 0,
    MODE_EDIT: 1,
    MODE_CREATE: 2,
}

function App() {

    const [nodeForEdit, setNodeForEdit] = useState()
    const [mode, setMode] = useState(modes.MODE_NORMAL)
    const [data, setData] = useState(treeData)

    const treeMap = (data, id, cb) => {
        if (!data)
            return undefined
        return data.map(item => {
            if (item.id === id)
                return cb(item);
            else return {...item, children: treeMap(item.children, id, cb)};
        })
    }

    const treeFilter = (data, cb) => {
        if (!data)
            return undefined;
        return data.filter(item => cb(item)).map(item => ({...item, children: treeFilter(item.children, cb)}))
    }

    const handleDeleteNode = (id) => {
        setData(data => treeFilter(data, item => item.id !== id))
    }

    const handleEditNode = (node) => {
        setMode(modes.MODE_EDIT)
        setNodeForEdit(node)
    }

    const onChangeEditableNodeTitle = (e) => {
        setNodeForEdit(node => ({...node, title: e.target.value}))
    };

    const handleSaveEdit = () => {
        setData(data => treeMap(data, nodeForEdit.id, (item) => ({...item, title: nodeForEdit.title})))
        setNodeForEdit(undefined)
        setMode(modes.MODE_NORMAL)
    }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    const handleAddChild = (id) => {
        const newItem = {id: uuidv4(), title: ""};
        setData(data => treeMap(data, id, (item) => ({
            ...item,
            isExpanded :false,
            children: item.children ? [...item.children, newItem] : [newItem]
        })))
        setNodeForEdit(newItem)
        setMode(modes.MODE_CREATE)
    }

    const handleToggleCollapse = (id) => {
        setData(data => treeMap(data, id, (item) => ({...item, isExpanded: !item.isExpanded})))
    }

    const handleCancelEdit = () => {
        if (mode === modes.MODE_CREATE)
            setData(data => treeFilter(data, item => item.id !== nodeForEdit?.id && !nodeForEdit.title))
        setNodeForEdit()
        setMode(modes.MODE_NORMAL)
    }

    return (
        <div className="App">
            <DataTree data={data} nodeForEdit={nodeForEdit} onChangeEditableNodeTitle={onChangeEditableNodeTitle}
                      handleDeleteNode={handleDeleteNode} handleAddChild={handleAddChild}
                      handleToggleCollapse={handleToggleCollapse} handleCancelEdit={handleCancelEdit}
                      handleSaveEdit={handleSaveEdit} handleEditNode={handleEditNode}/>
        </div>
    );
}

export default App;
