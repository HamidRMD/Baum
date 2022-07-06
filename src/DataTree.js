import React from 'react';
import ButtonIcon from "./ButtonIcon";


const DataTree = (props) => {
    const {
        data, handleDeleteNode, handleEditNode, handleAddChild,
        nodeForEdit, onChangeEditableNodeTitle, handleSaveEdit,
        handleCancelEdit, handleToggleCollapse
    } = props;

    return (
        <ul>
            {data.map(item => {
                const isInvisibleNode = nodeForEdit && nodeForEdit.id !== item.id;
                const isEditableNode = nodeForEdit && nodeForEdit.id === item.id
                return <React.Fragment key={item.id}>
                    <li className={`list-group-item ${isInvisibleNode ? "disableItem" : isEditableNode && "editItem"}`}>
                        {item.children && <>
                            {item.isExpanded ?
                                <ButtonIcon className="bi bi-plus-circle-dotted expandIcon" disabled={isInvisibleNode}
                                            onClick={() => handleToggleCollapse(item.id)}/> :
                                <ButtonIcon className="bi bi-dash-circle-dotted expandIcon" disabled={isInvisibleNode}
                                            onClick={() => handleToggleCollapse(item.id)}/>}
                        </>
                        }
                        {isEditableNode ? <input value={nodeForEdit.title} onChange={onChangeEditableNodeTitle}/> :
                            <button disabled={isInvisibleNode} onClick={() => handleToggleCollapse(item.id)}
                                    className="title">{item.title}</button>
                        }
                        {isEditableNode ?
                            <>
                                <ButtonIcon className="bi bi-check2 saveIcon" disabled={!nodeForEdit.title}
                                            onClick={handleSaveEdit}/>
                                <ButtonIcon className="bi bi-x cancelIcon" onClick={handleCancelEdit}/>
                            </> : <>
                                <ButtonIcon className="bi bi-trash-fill deleteIcon" disabled={isInvisibleNode}
                                            onClick={() => handleDeleteNode(item.id)}/>
                                <ButtonIcon className="bi bi-pencil-fill editIcon" disabled={isInvisibleNode}
                                            onClick={() => handleEditNode(item)}/>
                                <ButtonIcon className="bi bi-plus addIcon" disabled={isInvisibleNode}
                                            onClick={() => handleAddChild(item.id)}/>
                            </>}
                    </li>
                    {item.children && !item.isExpanded && item.children.length !== 0 &&
                    <DataTree  {...props} data={item.children}/>}
                </React.Fragment>;
            })}
        </ul>
    );
}


export default DataTree;
